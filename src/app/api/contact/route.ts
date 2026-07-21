import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/portfolio";

type ContactBody = {
  name?: string;
  email?: string;
  project?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const project = body.project?.trim() || "General inquiry";
  const message = body.message?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Message should be at least 10 characters." },
      { status: 400 },
    );
  }

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

  if (!gmailUser || !gmailPass) {
    return NextResponse.json(
      { error: "Email is not configured yet. Please email me directly." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO?.trim() || gmailUser;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `"${site.fullName} Portfolio" <${gmailUser}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio inquiry — ${project}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project: ${project}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Project:</strong> ${escapeHtml(project)}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try emailing me directly." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
