import { NextResponse } from "next/server";
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

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;

  try {
    if (web3Key) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key,
          name,
          email,
          project,
          message,
          subject: `Portfolio inquiry — ${project}`,
          from_name: site.fullName,
        }),
      });

      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        return NextResponse.json(
          { error: data.message || "Could not send message." },
          { status: 502 },
        );
      }
    } else {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          project,
          message,
          _subject: `Portfolio inquiry — ${project}`,
          _template: "table",
        }),
      });

      const data = (await res.json()) as { success?: string | boolean; message?: string };
      const ok = data.success === true || data.success === "true";
      if (!res.ok || !ok) {
        return NextResponse.json(
          { error: data.message || "Could not send message." },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Try emailing me directly." },
      { status: 500 },
    );
  }
}
