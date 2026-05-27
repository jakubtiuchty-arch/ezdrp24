import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getCarrierServices } from "@/lib/furgonetka";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await getCarrierServices();
    return NextResponse.json({ services });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Nieznany błąd";
    console.error("Furgonetka services error:", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
