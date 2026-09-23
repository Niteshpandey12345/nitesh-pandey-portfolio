"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { profile } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#recognition", label: "Recognition" },
  { href: "#skills", label: "Skills" },
  { href: "#research", label: "Research" },
  { href: "#experience", label: "Experience" },
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[110] h-[2px] w-full origin-left bg-gradient-to-r from-[var(--c-accent)] to-[var(--c-accent-soft)]"
      />

      {/* Always keeps a translucent panel behind its contents (not just after
          scroll) so the links, resume button, and theme toggle stay legible
          over the full-bleed hero video/canvas behind them, in both themes. */}
      <header
        className={`fixed left-1/2 top-4 z-[100] w-[94%] max-w-5xl -translate-x-1/2 rounded-2xl border border-[var(--c-border)] bg-[var(--c-bg)]/70 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.35)]" : ""
        }`}
      >
        <nav className="flex items-center justify-between px-5 py-3">
          <a href="#home" className="font-display text-base font-semibold text-[var(--c-text)]">
            N<span className="text-[var(--c-accent-soft)]">.</span>P
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-mono text-xs uppercase tracking-wide text-[var(--c-text-muted)] transition-colors hover:text-[var(--c-text)]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--c-accent-soft)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href={profile.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--c-border)] bg-[var(--c-bg-soft)] px-4 py-2 font-mono text-xs uppercase tracking-wide text-[var(--c-text)] transition-colors hover:border-[var(--c-accent-soft)] hover:text-[var(--c-accent-soft)]"
            >
              Resume
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--c-border)] bg-[var(--c-bg-soft)] text-xl text-[var(--c-text)]"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </nav>

        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--c-border)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-mono text-sm uppercase tracking-wide text-[var(--c-text-muted)] hover:bg-[var(--c-bg-soft)] hover:text-[var(--c-text)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={profile.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-lg bg-[var(--c-accent)] px-3 py-2.5 text-center font-mono text-sm uppercase tracking-wide text-white"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}