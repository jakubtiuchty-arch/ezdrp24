import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin-auth";
import {
  createPackage,
  cancelPackage,
  trackingUrl,
  type Parcel,
} from "@/lib/furgonetka";
import { Resend } from "resend";

type Body = {
  serviceId: number;
  serviceName: string;
  parcels: Parcel[];
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await req.json()) as Body;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { user: true, items: true },
  });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.furgonetkaPackageId) {
    return NextResponse.json(
      { error: "Shipment already exists for this order" },
      { status: 409 }
    );
  }

  const street = order.deliveryStreet || order.user.street;
  const postalCode = order.deliveryPostalCode || order.user.postalCode;
  const city = order.deliveryCity || order.user.city;

  if (!street || !postalCode || !city) {
    return NextResponse.json(
      { error: "Brak adresu dostawy w zamówieniu" },
      { status: 400 }
    );
  }

  const pkg = await createPackage({
    receiver: {
      name: order.user.contactPerson || order.user.organizationName,
      company: order.user.organizationName,
      email: order.user.email,
      phone: order.user.phone || undefined,
      street,
      postal_code: postalCode,
      city,
      country_code: "PL",
    },
    parcels: body.parcels,
    serviceId: body.serviceId,
    userReferenceNumber: order.orderNumber,
  });

  const tracking = pkg.parcels?.[0]?.tracking_number || null;
  const labelUrl = pkg.label?.url || null;

  const updated = await prisma.order.update({
    where: { id },
    data: {
      furgonetkaPackageId: pkg.package_id,
      trackingNumber: tracking,
      trackingUrl: tracking ? trackingUrl(tracking) : null,
      labelUrl,
      carrierService: body.serviceName,
      carrierServiceId: body.serviceId,
      shipmentStatus: pkg.state,
      shipmentCreatedAt: new Date(),
    },
  });

  // Notify client
  if (process.env.RESEND_API_KEY && order.user.email && tracking) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "EZD RP <noreply@ezdrp24.com.pl>",
        to: order.user.email,
        subject: `Zamówienie ${order.orderNumber} zostało wysłane`,
        html: shipmentEmail({
          orderNumber: order.orderNumber,
          carrier: body.serviceName,
          tracking,
          trackingLink: trackingUrl(tracking),
        }),
      });
    } catch (e) {
      console.error("Resend send failed", e);
    }
  }

  return NextResponse.json({ success: true, order: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order?.furgonetkaPackageId) {
    return NextResponse.json({ error: "No shipment to cancel" }, { status: 404 });
  }

  await cancelPackage(order.furgonetkaPackageId);

  await prisma.order.update({
    where: { id },
    data: {
      furgonetkaPackageId: null,
      trackingNumber: null,
      trackingUrl: null,
      labelUrl: null,
      carrierService: null,
      carrierServiceId: null,
      shipmentStatus: null,
      shipmentCreatedAt: null,
    },
  });

  return NextResponse.json({ success: true });
}

function shipmentEmail(args: {
  orderNumber: string;
  carrier: string;
  tracking: string;
  trackingLink: string;
}) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);border-radius:12px 12px 0 0;padding:32px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">EZD RP</h1>
      <p style="margin:4px 0 0;color:#c4b5fd;font-size:13px;">ezdrp24.com.pl</p>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;">
      <h2 style="margin:0 0 12px;color:#0f172a;font-size:18px;">Twoje zamówienie zostało wysłane</h2>
      <p style="color:#334155;font-size:14px;line-height:1.6;">
        Zamówienie <strong>${args.orderNumber}</strong> zostało nadane kurierem <strong>${args.carrier}</strong>.
      </p>
      <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0;">
        <p style="margin:0 0 4px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Numer listu przewozowego</p>
        <p style="margin:0;color:#0f172a;font-size:16px;font-weight:700;font-family:monospace;">${args.tracking}</p>
      </div>
      <a href="${args.trackingLink}" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">Śledź przesyłkę</a>
    </div>
    <div style="background:#f8fafc;border-radius:0 0 12px 12px;padding:24px 32px;border:1px solid #e2e8f0;border-top:none;text-align:center;">
      <p style="margin:0;color:#94a3b8;font-size:12px;">Scanter Sp. z o.o. | ul. Poświęcka 1a, 51-128 Wrocław</p>
      <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;">
        <a href="mailto:biuro@scanter.pl" style="color:#7c3aed;text-decoration:none;">biuro@scanter.pl</a> ·
        <a href="tel:+48601828711" style="color:#7c3aed;text-decoration:none;">+48 601 828 711</a>
      </p>
    </div>
  </div>
</body></html>`;
}
