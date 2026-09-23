"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { profile } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative bg-[var(--c-bg)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About"
          title="Engineering intelligence into machines"
          description="A quick snapshot of who I am, what I work on, and how the numbers add up."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.stats.map((stat) => {
            // "Research articles" links out to ResearchGate and "Patented
            // projects" to Google Scholar — the two stats with a public
            // profile to back them up. StatCounter renders the card as a
            // hoverable link only when href is provided.
            const href =
              stat.label === "Research articles"
                ? profile.personal.researchGate
                : stat.label === "Patented projects"
                ? profile.personal.googleScholar
                : undefined;
            return <StatCounter key={stat.label} {...stat} href={href} />;
          })}
        </div>
      </div>
    </section>
  );
}