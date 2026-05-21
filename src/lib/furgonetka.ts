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
  method: "GET" | "POST" | "DELETE",
  path: string,
  body?: unknown
): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
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
  postal_code: string;
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
  label: string;
};

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
    postal_code: env("FURGONETKA_SENDER_POSTAL_CODE"),
    city: env("FURGONETKA_SENDER_CITY"),
    country_code: "PL",
  };
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

  const res = await request<{ data: FurgonetkaPackage }>("POST", "/packages", payload);
  return res.data;
}

export async function getPackageLabel(packageId: string): Promise<{ url?: string; content?: string }> {
  const res = await request<{ data: { url?: string; content?: string } }>(
    "GET",
    `/packages/${packageId}/label`
  );
  return res.data;
}

export async function getPackageTracking(packageId: string): Promise<unknown> {
  const res = await request<{ data: unknown }>("GET", `/packages/${packageId}/tracking`);
  return res.data;
}

export async function getPackageDetails(packageId: string): Promise<FurgonetkaPackage> {
  const res = await request<{ data: FurgonetkaPackage }>("GET", `/packages/${packageId}`);
  return res.data;
}

export async function cancelPackage(packageId: string): Promise<void> {
  await request("DELETE", `/packages/${packageId}`);
}

export function trackingUrl(trackingNumber: string): string {
  return `https://furgonetka.pl/sledzenie/?nr=${encodeURIComponent(trackingNumber)}`;
}
