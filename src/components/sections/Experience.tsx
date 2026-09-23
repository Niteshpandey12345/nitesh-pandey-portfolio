"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/lib/data";

function TimelineList({ items }: { items: { period: string; title: string; org: string; description: string; note?: string }[] }) {
  return (
    <div className="relative ml-3 border-l border-[var(--c-border)] pl-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="relative mb-10 last:mb-0"
        >
          <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-[var(--c-accent)] shadow-[0_0_10px_theme(colors.electric.DEFAULT)]" />
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--c-accent-soft)]">{item.period}</p>
          <h3 className="mt-1.5 font-display text-lg text-[var(--c-text)]">{item.title}</h3>
          <p className="text-sm text-[var(--c-text-muted)]">{item.org}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--c-text-muted)]">{item.description}</p>
          {item.note && <p className="mt-2 font-mono text-xs text-[var(--c-accent)]">{item.note}</p>}
        </motion.div>
      ))}
    </div>
  );
}

export function Experience() {
  const experienceItems = profile.experience.map((e) => ({
    period: e.period,
    title: e.role,
    org: e.org,
    description: e.description
  }));
  const educationItems = profile.education.map((e) => ({
    period: e.period,
    title: e.degree,
    org: e.school,
    description: e.description,
    note: e.note
  }));

  return (
    <section id="experience" className="relative bg-[var(--c-bg)] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Career"
          title="Experience & education"
          description="Roles, research, and studies — most recent first."
        />

        <div className="mt-14 grid gap-16 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--c-text-faint)]">Experience</h3>
            <TimelineList items={experienceItems} />
          </div>
          <div>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--c-text-faint)]">Education</h3>
            <TimelineList items={educationItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
