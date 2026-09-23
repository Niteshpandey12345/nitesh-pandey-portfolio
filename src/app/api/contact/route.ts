import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form endpoint. Currently only validates and logs the submission
 * server-side — it does not send an email yet. See README.md "Content
 * TODO" for wiring up a real provider (Resend, Nodemailer + SMTP, etc.).
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.email !== "string" || typeof body.message !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
  }

  console.log("New contact form submission:", { name, email, message });

  return NextResponse.json({ ok: true });
}
