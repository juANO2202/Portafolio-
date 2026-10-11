"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SendIcon } from "@/components/ui/icons";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-line bg-pill px-4 py-3 text-base outline-none transition-colors duration-150 placeholder:text-muted focus:border-accent";

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
      <div role="status" className="surface space-y-4 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">¡Mensaje enviado!</h2>
        <p className="text-muted">Gracias por escribirme. Te responderé en menos de 24 horas.</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface relative space-y-5 p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight">Envíame un mensaje</h2>

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
        <label className="block space-y-2 text-sm font-medium">
          Nombre
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block space-y-2 text-sm font-medium">
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

      <label className="block space-y-2 text-sm font-medium">
        Asunto <span className="font-normal text-muted">(opcional)</span>
        <input name="subject" maxLength={150} className={field} />
      </label>

      <label className="block space-y-2 text-sm font-medium">
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
        <Button type="submit">
          <SendIcon />
          {status === "sending" ? "Enviando…" : "Enviar mensaje"}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
