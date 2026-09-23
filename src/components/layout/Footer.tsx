"use client";

import { FaLinkedin, FaGraduationCap, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--c-border)] bg-[var(--c-bg-soft)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg text-[var(--c-text)]">
            N<span className="text-[var(--c-accent-soft)]">.</span>P
          </p>
          <p className="mt-1 text-sm text-[var(--c-text-muted)]">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profile.personal.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--c-border)] text-[var(--c-text-muted)] transition-colors hover:border-[var(--c-accent-soft)] hover:text-[var(--c-accent-soft)]"
          >
            <FaEnvelope />
          </a>
          <a
            href={profile.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--c-border)] text-[var(--c-text-muted)] transition-colors hover:border-[var(--c-accent-soft)] hover:text-[var(--c-accent-soft)]"
          >
            <FaLinkedin />
          </a>
          <a
            href={profile.personal.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Scholar"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--c-border)] text-[var(--c-text-muted)] transition-colors hover:border-[var(--c-accent-soft)] hover:text-[var(--c-accent-soft)]"
          >
            <FaGraduationCap />
          </a>
        </div>

        <a
          href="#home"
          className="flex items-center gap-2 rounded-full border border-[var(--c-border)] px-4 py-2 font-mono text-xs uppercase tracking-wide text-[var(--c-text-muted)] transition-colors hover:border-[var(--c-accent-soft)] hover:text-[var(--c-accent-soft)]"
        >
          Top <FaArrowUp className="text-[10px]" />
        </a>
      </div>
    </footer>
  );
}
