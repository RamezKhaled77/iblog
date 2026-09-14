"use client";

import Link from "next/link";
import { ArrowRight, CircleDot, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const particles = [
  [8, 24, 0],
  [16, 76, 1.8],
  [27, 14, 3.2],
  [38, 84, 0.8],
  [52, 18, 4.5],
  [64, 72, 2.6],
  [76, 27, 1.2],
  [88, 68, 3.8],
  [94, 38, 5.2],
] as const;

export function CommunityCtaSection() {
  return (
    <section
      aria-labelledby="community-cta-heading"
      className="relative isolate overflow-hidden border-t border-border/60 bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="cta-grid absolute inset-0 opacity-40" />
        <div className="cta-ambient cta-ambient-left absolute -left-40 top-1/4 size-[28rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="cta-ambient cta-ambient-right absolute -right-40 bottom-0 size-[30rem] rounded-full bg-cyan-400/8 blur-[130px]" />
        {particles.map(([left, top, delay], index) => (
          <span
            key={index}
            className="cta-particle absolute size-1 rounded-full bg-primary/80 shadow-[0_0_12px_rgba(143,224,0,0.8)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/65 px-6 py-10 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-10 sm:py-14 lg:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute -right-14 -top-16 h-64 w-72 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/5 rotate-6"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-64 w-72 rounded-[2rem] border border-primary/30 bg-primary/5 rotate-6"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
              <span>Join the signal</span>
            </div>
            <h2
              id="community-cta-heading"
              className="max-w-xl text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              Your next idea deserves a place to land.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              Read what is moving the craft forward, then add something of your
              own to the conversation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/auth/sign-up"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "h-11 gap-2 rounded-xl px-6 font-semibold shadow-lg shadow-primary/10 transition-transform hover:scale-[1.02]",
                })}
              >
                Start writing
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border/80 bg-background/50 px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                Explore the library
                <ArrowRight className="size-4 text-primary" />
              </Link>
            </div>
          </div>

          <div className="relative z-10 mt-10 flex items-center gap-3 border-t border-border/60 pt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:absolute sm:bottom-8 sm:right-10 sm:mt-0 sm:border-t-0 sm:pt-0">
            <CircleDot className="size-3.5 text-primary" />
            <span>Open knowledge network</span>
          </div>
        </div>
      </div>
    </section>
  );
}
