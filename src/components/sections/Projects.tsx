"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaPlayCircle } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/data";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");

  const tags = useMemo(() => {
    const all = new Set<string>();
    profile.projects.forEach((p) => p.tags.forEach((t) => all.add(t)));
    return ["All", ...Array.from(all)];
  }, []);

  const filtered = profile.projects.filter((p) => {
    const matchesTag = filter === "All" || p.tags.includes(filter);
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <section id="projects" className="relative bg-[var(--c-bg-soft)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          description="Robotics and hardware builds. Descriptions and links for a few are still pending — see the TODO in the README."
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
                  filter === tag
                    ? "border-[var(--c-accent-soft)] bg-[var(--c-accent-soft)]/10 text-[var(--c-accent-soft)]"
                    : "border-[var(--c-border)] text-[var(--c-text-muted)] hover:border-[var(--c-text-faint)] hover:text-[var(--c-text)]"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            aria-label="Search projects"
            className="w-full rounded-full border border-[var(--c-border)] bg-[var(--c-bg-soft)] px-4 py-2 text-sm text-[var(--c-text)] placeholder:text-[var(--c-text-faint)] focus:border-[var(--c-accent-soft)] focus:outline-none sm:w-56"
          />
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard className="flex h-full flex-col">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg-raised)]/90 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg text-[var(--c-text)]">{project.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-[var(--c-text-muted)]">{project.description}</p>
                    {project.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                          <span key={t} className="rounded-full bg-[var(--c-bg-soft)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--c-text-faint)]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-4 border-t border-[var(--c-border)] pt-4 text-sm">
                      {project.media && (
                        <a
                          href={project.media}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[var(--c-text-muted)] transition-colors hover:text-[var(--c-accent-soft)]"
                        >
                          <FaPlayCircle /> Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[var(--c-text-muted)] transition-colors hover:text-[var(--c-accent-soft)]"
                        >
                          <FaGithub /> Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[var(--c-text-muted)] transition-colors hover:text-[var(--c-accent-soft)]"
                        >
                          <FaExternalLinkAlt /> Live
                        </a>
                      )}
                      {!project.media && !project.github && !project.demo && (
                        <span className="font-mono text-xs text-[var(--c-text-faint)]">Links pending</span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
