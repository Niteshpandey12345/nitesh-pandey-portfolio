import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form endpoint. Validates the submission, then emails it to the
 * site owner via Resend (https://resend.com). Requires a RESEND_API_KEY
 * environment variable to be set (locally in .env.local, and in the
 * Vercel project's Settings -> Environment Variables for production).
 * Without that key set, submissions are still validated but only logged,
 * not delivered, so the form doesn't hard-fail during setup.
 */
const NOTIFY_EMAIL = "niteshpandey46974@gmail.com";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.email !== "string" || typeof body.message !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("RESEND_API_KEY not set — logging submission instead of emailing:", { name, email, message });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      // Resend's shared sending address — works immediately with no domain
      // setup. Once niteshpandey.in is verified in Resend, this can become
      // e.g. "Portfolio <contact@niteshpandey.in>" instead.
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json({ ok: false, error: "Failed to send. Please email me directly instead." }, { status: 502 });
  }
}