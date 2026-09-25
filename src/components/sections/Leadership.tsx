"use client";

import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/lib/data";

export function Leadership() {
  return (
    <section id="leadership" className="relative bg-[var(--c-bg-soft)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Leadership & community"
          title="Conferences, institutions & recommendations"
          description="Speaking engagements, technical visits, and the organizations that have vouched for the work."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--c-text-faint)]">Conferences</h3>
            <div className="flex flex-wrap gap-2">
              {profile.conferences.map((c) => (
                <span key={c.name} className="rounded-full border border-[var(--c-border)] px-3.5 py-1.5 text-sm text-[var(--c-text-muted)]">
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--c-text-faint)]">Meetups & institutional visits</h3>
            <div className="flex flex-wrap gap-2">
              {profile.meetups.map((m, i) => (
                <span key={`${m.name}-${i}`} className="rounded-full border border-[var(--c-border)] px-3.5 py-1.5 text-sm text-[var(--c-text-muted)]">
                  {m.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--c-text-faint)]">Recommended by</h3>
            <div className="space-y-3">
              {profile.recommendations.map((r) => (
                <motion.div
                  key={r.org}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard className="p-4">
                    <p className="font-display text-sm text-[var(--c-text)]">{r.org}</p>
                    {r.quote && <p className="mt-1 text-xs text-[var(--c-text-faint)]">{r.quote}</p>}
                    {r.letterUrl && (
                      <a
                        href={r.letterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--c-accent-soft)] hover:underline"
                      >
                        <FaFilePdf /> View recommendation letter (PDF)
                      </a>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}