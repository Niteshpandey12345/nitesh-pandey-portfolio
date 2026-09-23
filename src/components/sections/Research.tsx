"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaFlask } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/lib/data";

const INTERESTS = ["Network Intrusion Detection", "Applied Machine Learning", "Robotics & ROS", "Predictive Maintenance", "Autonomous Systems"];

const sciPublications = profile.publications.filter((p) => p.index === "SCI");
const scopusPublications = profile.publications.filter((p) => p.index === "Scopus");

export function Research() {
  return (
    <section id="research" className="relative bg-[var(--c-bg)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Research"
          title="Publications & research interests"
          description="30 research articles, including recognition in the top 1,200 nationally. Published, indexed papers (SCI / Scopus) are listed below; the full list lives on Google Scholar and ResearchGate."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {INTERESTS.map((interest) => (
            <span key={interest} className="rounded-full border border-[var(--c-accent)]/30 bg-[var(--c-accent)]/5 px-4 py-1.5 text-sm text-[var(--c-accent)]">
              {interest}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={profile.personal.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--c-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--c-accent-soft)] hover:text-[var(--c-bg)]"
          >
            <FaGraduationCap /> Google Scholar
          </a>
          <a
            href={profile.personal.researchGate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--c-border)] px-6 py-3 text-sm font-semibold text-[var(--c-text)] transition-colors hover:border-[var(--c-accent-soft)] hover:text-[var(--c-accent-soft)]"
          >
            <FaFlask /> ResearchGate
          </a>
        </div>

        {/* SCI / Scopus indexed publications */}
        <div className="mt-14 space-y-10">
          {[
            { label: "SCI-indexed", items: sciPublications },
            { label: "Scopus-indexed", items: scopusPublications }
          ].map(
            (group) =>
              group.items.length > 0 && (
                <div key={group.label}>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--c-text-faint)]">
                    {group.label} &middot; {group.items.length}
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {group.items.map((pub, i) => (
                      <motion.div
                        key={pub.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                      >
                        <GlassCard className="h-full p-5">
                          <span className="inline-block rounded-full border border-[var(--c-accent)]/30 bg-[var(--c-accent)]/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--c-accent)]">
                            {pub.index}
                          </span>
                          <h4 className="mt-3 font-display text-base leading-snug text-[var(--c-text)]">{pub.title}</h4>
                          <p className="mt-2 text-sm text-[var(--c-text-muted)]">{pub.citation}</p>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}