"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/lib/data";

export function Achievements() {
  return (
    <section id="achievements" className="relative bg-[var(--c-bg)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Recognition" title="Awards & honours" align="center" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard className="flex h-full flex-col overflow-hidden">
                {award.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--c-bg-raised)]">
                    <Image src={award.image} alt={award.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--c-accent)] to-[var(--c-accent-soft)] text-lg text-[var(--c-accent-contrast)] m-6 mb-0">
                    <FaTrophy />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="font-display text-base text-[var(--c-text)]">{award.title}</h3>
                  <p className="text-sm text-[var(--c-text-muted)]">{award.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}