/**
 * Furgonetka.pl REST API client.
 * Docs: https://furgonetka.pl/api/rest
 * OAuth: password grant; token cached in-memory, refreshed via refresh_token.
 */

const BASE_URL = "https://api.furgonetka.pl";
const TOKEN_URL = `${BASE_URL}/oauth/token`;

type TokenCache = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function basicAuth(): string {
  const id = env("FURGONETKA_CLIENT_ID");
  const secret = env("FURGONETKA_CLIENT_SECRET");
  return "Basic " + Buffer.from(`${id}:${secret}`).toString("base64");
}

async function fetchToken(body: Record<string, string>): Promise<TokenCache> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuth(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body).toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Furgonetka OAuth failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    // refresh 60s before actual expiry
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
}

async function getAccessToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.accessToken;
  }

  if (tokenCache?.refreshToken) {
    try {
      tokenCache = await fetchToken({
        grant_type: "refresh_token",
        refresh_token: tokenCache.refreshToken,
      });
      return tokenCache.accessToken;
    } catch {
      tokenCache = null;
    }
  }

  tokenCache = await fetchToken({
    grant_type: "password",
    scope: "api",
    username: env("FURGONETKA_USERNAME"),
    password: env("FURGONETKA_PASSWORD"),
  });
  return tokenCache.accessToken;
}

async function request<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: unknown
): Promise<T> {
  const token = await getAccessToken();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Furgonetka ${method} ${path} failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<T>;
}

export type AddressDetails = {
  name: string;
  email?: string;
  phone?: string;
  street: string;
  postcode: string;
  city: string;
  country_code?: string;
  company?: string;
};

export type Parcel = {
  width: number;
  height: number;
  depth: number;
  weight: number;
  description?: string;
  is_nstd?: boolean;
};

export type Service = {
  id: number;
  name: string;
  label?: string;
  service?: string;
};

export async function getCarrierServices(): Promise<Service[]> {
  const res = await request<{ data?: { services?: Service[] }; services?: Service[] }>(
    "GET",
    "/account/services"
  );
  return res.data?.services || res.services || [];
}

export type CreatePackageInput = {
  receiver: AddressDetails;
  parcels: Parcel[];
  serviceId: number;
  userReferenceNumber?: string;
};

export type FurgonetkaPackage = {
  package_id: string;
  pricing?: { gross?: number; net?: number };
  service: string;
  service_id: number;
  state: string;
  parcels: Array<{ tracking_number?: string }>;
  label?: { url?: string };
  documents_url?: string | null;
};

function senderFromEnv(): AddressDetails {
  return {
    name: env("FURGONETKA_SENDER_NAME"),
    company: process.env.FURGONETKA_SENDER_COMPANY || env("FURGONETKA_SENDER_NAME"),
    email: env("FURGONETKA_SENDER_EMAIL"),
    phone: env("FURGONETKA_SENDER_PHONE"),
    street: env("FURGONETKA_SENDER_STREET"),
    postcode: env("FURGONETKA_SENDER_POSTAL_CODE"),
    city: env("FURGONETKA_SENDER_CITY"),
    country_code: "PL",
  };
}

// Helper - Furgonetka zwraca response albo top-level, albo pod `data`. Obsługujemy oba warianty.
function unwrap<T>(res: { data?: T } & T): T {
  return (res.data ?? res) as T;
}

export async function createPackage(
  input: CreatePackageInput
): Promise<FurgonetkaPackage> {
  const sender = senderFromEnv();
  const payload = {
    pickup: sender,
    sender,
    receiver: { country_code: "PL", ...input.receiver },
    service_id: input.serviceId,
    parcels: input.parcels,
    user_reference_number: input.userReferenceNumber,
    type: "package" as const,
  };

  const res = await request<{ data?: FurgonetkaPackage } & FurgonetkaPackage>(
    "POST",
    "/packages",
    payload
  );
  return unwrap(res);
}

export async function getPackageLabel(
  packageId: string
): Promise<{ contentType: string; body: Buffer; isJson: boolean }> {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}/packages/${packageId}/label`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/pdf, application/json",
    },
  });

  const contentType = res.headers.get("content-type") || "application/octet-stream";
  const arrayBuffer = await res.arrayBuffer();
  const body = Buffer.from(arrayBuffer);

  if (!res.ok) {
    throw new Error(
      `Furgonetka GET /packages/${packageId}/label failed (${res.status}): ${body.toString("utf-8").slice(0, 500)}`
    );
  }

  return { contentType, body, isJson: contentType.includes("json") };
}

export async function getPackageTracking(packageId: string): Promise<unknown> {
  const res = await request<{ data?: unknown }>("GET", `/packages/${packageId}/tracking`);
  return res.data ?? res;
}

export async function getPackageDetails(packageId: string): Promise<FurgonetkaPackage> {
  const res = await request<{ data?: FurgonetkaPackage } & FurgonetkaPackage>(
    "GET",
    `/packages/${packageId}`
  );
  return unwrap(res);
}

export async function cancelPackage(packageId: string): Promise<void> {
  await request("DELETE", `/packages/${packageId}`);
}

/**
 * Confirms ("orders") a previously-created package so a courier is dispatched.
 * The waiting → ordered transition; required before label can be printed.
 * UUID is generated client-side per the REST API contract.
 */
export async function orderShipment(packageId: string): Promise<{ uuid: string }> {
  const uuid = crypto.randomUUID();
  await request("PUT", `/order-commands/${uuid}`, {
    packages: [{ id: packageId }],
  });
  return { uuid };
}

export type OrderCommandStatus = {
  status: string;
  datetime_change: string | null;
  errors: Array<{ message?: string }>;
  uuid: string;
};

export async function getOrderCommandStatus(uuid: string): Promise<OrderCommandStatus> {
  const res = await request<{ data?: OrderCommandStatus } & OrderCommandStatus>(
    "GET",
    `/order-commands/${uuid}`
  );
  return unwrap(res);
}

export function trackingUrl(trackingNumber: string): string {
  return `https://furgonetka.pl/sledzenie/?nr=${encodeURIComponent(trackingNumber)}`;
}
