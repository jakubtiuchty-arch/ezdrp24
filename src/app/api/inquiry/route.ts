import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inquiry = await prisma.inquiry.create({
      data: {
        name: body.name || null,
        org: body.org || null,
        email: body.email,
        phone: body.phone || null,
        voivodeship: body.voivodeship || null,
        variant: body.variant || null,
        notes: body.notes || null,
        rfq: body.rfq || false,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (err) {
    console.error("Inquiry POST error:", err);
    return NextResponse.json({ success: false, error: "Błąd zapisu" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch {
    return NextResponse.json({ error: "Błąd odczytu" }, { status: 500 });
  }
}
