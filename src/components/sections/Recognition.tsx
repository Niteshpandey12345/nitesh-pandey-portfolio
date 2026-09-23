"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { profile } from "@/lib/data";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];
const isVideo = (src: string) => VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext));

/**
 * Featured record recognitions (Asia Book of Records, India Book of Records,
 * the news telecast covering them), each shown with its certificate/photo or
 * video, sized to match the Awards & Honours cards (aspect-[16/10]). Place
 * the referenced files — ABR.JPG, IBR.JPG, India_Tv.mp4 — in public/images/
 * or public/video/ (filenames are case-sensitive).
 */
export function Recognition() {
  return (
    <section id="recognition" className="relative bg-[var(--c-bg-soft)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Recognition"
          title="Certified national & continental record holder"
          description="Officially certified by the India Book of Records and the Asia Book of Records for filing the highest number of patents by an individual in a single day."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.records.map((record, i) => (
            <motion.div
              key={record.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="flex h-full flex-col overflow-hidden">
                {record.image &&
                  (isVideo(record.image) ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      <video
                        src={record.image}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--c-bg-raised)]">
                      <Image
                        src={record.image}
                        alt={record.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="font-display text-lg text-[var(--c-text)]">{record.title}</h3>
                  <p className="text-sm text-[var(--c-text-muted)]">{record.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}