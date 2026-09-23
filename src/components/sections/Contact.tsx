"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGraduationCap } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedGlobe } from "@/components/three/AnimatedGlobe";
import { profile } from "@/lib/data";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative bg-[var(--c-bg-soft)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's build what's next"
          description="Open to research collaborations, freelance work, and full-time opportunities."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-[var(--c-text-faint)]">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg-soft)] px-4 py-3 text-sm text-[var(--c-text)] focus:border-[var(--c-accent-soft)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-[var(--c-text-faint)]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg-soft)] px-4 py-3 text-sm text-[var(--c-text)] focus:border-[var(--c-accent-soft)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-[var(--c-text-faint)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-bg-soft)] px-4 py-3 text-sm text-[var(--c-text)] focus:border-[var(--c-accent-soft)] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-[var(--c-accent)] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--c-accent-soft)] hover:text-[var(--c-bg)] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && <p className="text-sm text-[var(--c-accent-soft)]">Thanks for reaching out — I'll get back to you soon.</p>}
            {status === "error" && <p className="text-sm text-red-400">Something went wrong — please email me directly instead.</p>}
          </form>

          <div className="flex flex-col gap-6">
            <div className="h-56 overflow-hidden rounded-2xl border border-[var(--c-border)] bg-[var(--c-bg-raised)]">
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
                  <AnimatedGlobe />
                </Canvas>
              </Suspense>
            </div>
            <div className="space-y-3">
              <a href={`mailto:${profile.personal.email}`} className="flex items-center gap-3 rounded-xl border border-[var(--c-border)] px-4 py-3 text-sm text-[var(--c-text)] transition-colors hover:border-[var(--c-accent-soft)]">
                <FaEnvelope className="shrink-0 text-[var(--c-accent-soft)]" />
                <span className="min-w-0 break-all">{profile.personal.email}</span>
              </a>
              <a href={`tel:${profile.personal.phone}`} className="flex items-center gap-3 rounded-xl border border-[var(--c-border)] px-4 py-3 text-sm text-[var(--c-text)] transition-colors hover:border-[var(--c-accent-soft)]">
                <FaPhone className="text-[var(--c-accent-soft)]" /> {profile.personal.phone}
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-[var(--c-border)] px-4 py-3 text-sm text-[var(--c-text)]">
                <FaMapMarkerAlt className="text-[var(--c-accent-soft)]" /> {profile.personal.address}
              </div>
              <a
                href={profile.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[var(--c-border)] px-4 py-3 text-sm text-[var(--c-text)] transition-colors hover:border-[var(--c-accent-soft)]"
              >
                <FaLinkedin className="text-[var(--c-accent-soft)]" /> LinkedIn profile
              </a>
              <a
                href={profile.personal.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[var(--c-border)] px-4 py-3 text-sm text-[var(--c-text)] transition-colors hover:border-[var(--c-accent-soft)]"
              >
                <FaGraduationCap className="text-[var(--c-accent-soft)]" /> Google Scholar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}