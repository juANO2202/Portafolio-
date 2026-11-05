"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SendIcon } from "@/components/ui/icons";

type Status = "idle" | "sending" | "sent" | "error";

// Campos de 16px de radio, borde visible y texto con contraste AA sobre crema.
const field =
  "w-full rounded-2xl border border-ink/20 bg-cream px-4 py-3.5 text-base text-ink outline-none " +
  "transition-[border-color,box-shadow] duration-150 placeholder:text-ink-muted " +
  "focus:border-leaf focus:ring-4 focus:ring-leaf/15";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "No se pudo enviar el mensaje.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el mensaje.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="space-y-5 rounded-3xl bg-cream-2 p-8 sm:p-10">
        <h3 className="display text-4xl">Mensaje enviado</h3>
        <p className="text-lg text-ink-muted">Gracias por escribirme. Te responderé en menos de 24 horas.</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6 rounded-3xl bg-cream-2 p-8 sm:p-10">
      <h3 className="display text-4xl">Envíame un mensaje</h3>

      {/* Campo trampa para bots: las personas no lo ven. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2.5 text-sm font-medium">
          Nombre
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block space-y-2.5 text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={field}
          />
        </label>
      </div>

      <label className="block space-y-2.5 text-sm font-medium">
        Asunto <span className="font-normal text-ink-muted">(opcional)</span>
        <input name="subject" maxLength={150} className={field} />
      </label>

      <label className="block space-y-2.5 text-sm font-medium">
        Mensaje
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          className={`${field} resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          <SendIcon />
          {status === "sending" ? "Enviando…" : "Enviar mensaje"}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
