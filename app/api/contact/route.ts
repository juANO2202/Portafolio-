import { profile } from "@/data/profile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function fail(error: string, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const body: Record<string, unknown> = await request.json().catch(() => ({}));

  // Honeypot: se responde como éxito para no darle pistas al bot.
  if (clean(body.website, 10)) return Response.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150);
  const message = clean(body.message, 3000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return fail("Revisa tu nombre, correo y mensaje (mínimo 10 caracteres).", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return fail("El envío de mensajes no está configurado todavía.", 503);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portafolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || profile.email],
      reply_to: email,
      subject: subject || `Nuevo mensaje de ${name}`,
      html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) return fail("No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.", 502);
  return Response.json({ ok: true });
}
