"use client";

import React, { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  TrendingUp,
  Clock,
  Sparkles,
  Users,
  Code2,
  ArrowUpRight,
  Flame,
  Activity,
  BookOpen,
  Eye,
  Zap,
  Globe,
  Target,
  ArrowUp,
  Network,
} from "lucide-react";

/* ─── Live Clock (useSyncExternalStore avoids hydration mismatch) ─── */
function subscribeClock(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
const getClockSnapshot = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
const getServerClock = () => "12:00:00 AM";

/* ─── Mini sparkline bar data ─────────────────────────────────────── */
const viewsBars = [35, 52, 41, 68, 74, 55, 83, 91, 78, 95];
const readerBars = [40, 58, 62, 49, 71, 83, 77, 90, 85, 100];

export function BentoGridSection() {
  const time = useSyncExternalStore(
    subscribeClock,
    getClockSnapshot,
    getServerClock,
  );

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-28 overflow-hidden bg-background">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[140px] dark:bg-primary/5"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider border border-primary/30 bg-primary/10 text-foreground mb-3">
              <span>Platform Vitals &amp; Momentum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-foreground">
              The heartbeat of our tech ecosystem
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2.5">
              Live snapshots of developer culture, ongoing reading sprints,
              real-time presence, and creative energy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-xs text-xs font-semibold text-foreground">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time Sync Active</span>
            </div>
          </div>
        </div>

        {/* ═══ BENTO GRID — 4 cols on lg, 2 on md, 1 on mobile ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 auto-rows-auto">
          {/* ── 1. WEEKLY SPRINT (tall, spans 2 rows on md+) ─────── */}
          <div className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-sm hover:border-primary/60 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 md:row-span-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Weekly Sprint
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-foreground">
                  <Flame className="size-3 text-primary" /> 5d streak
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mt-2">
                Knowledge Goal
              </h3>
            </div>

            {/* Circular Progress */}
            <div className="relative my-6 flex items-center justify-center">
              <svg className="size-36 -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  className="stroke-muted/40 fill-none"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  className="stroke-primary fill-none transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray="301.59"
                  strokeDashoffset="75.4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black font-heading text-foreground tracking-tight">
                  75%
                </span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                  In Progress
                </span>
              </div>
            </div>

            {/* Weekday bar chart */}
            <div className="mb-4">
              <p className="text-[10px] uppercase font-semibold text-muted-foreground mb-2">
                This Week
              </p>
              <div className="flex items-end gap-1 h-10">
                {(["M", "T", "W", "T", "F", "S", "S"] as const).map((d, i) => {
                  const hs = [70, 85, 60, 90, 75, 40, 20];
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center flex-1 gap-0.5"
                    >
                      <div
                        className="w-full rounded-sm bg-primary/70 group-hover:bg-primary transition-all duration-500"
                        style={{
                          height: `${hs[i]}%`,
                          opacity: i < 5 ? 1 : 0.35,
                        }}
                      />
                      <span className="text-[8px] text-muted-foreground font-medium">
                        {d}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stat + topic chips */}
            <div className="border-t border-border/60 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black font-heading text-foreground">
                  2.5K
                </span>
                <span className="text-xs font-semibold text-emerald-500">
                  +18% this month
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                263 technical articles finished this season
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["React", "Systems", "DevOps"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-foreground border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── 2. ARTICLE VIEWS ─────────────────────────────────── */}
          <div className="group p-6 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-sm hover:border-rose-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Article Views
              </span>
              <div className="size-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 transition-transform group-hover:scale-110">
                <Eye className="size-4" />
              </div>
            </div>

            <div className="mt-3">
              <span className="text-3xl sm:text-4xl font-black font-heading text-foreground tracking-tight">
                4.8K
              </span>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Unique readers · last 24 h
              </p>
            </div>

            {/* Sparkline */}
            <div className="mt-4">
              <div className="flex items-end gap-[3px] h-10">
                {viewsBars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-rose-500/50 group-hover:bg-rose-500 transition-all duration-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-muted-foreground mt-1 font-medium">
                <span>10 days ago</span>
                <span>Today</span>
              </div>
            </div>

            <div className="border-t border-border/60 pt-3 mt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-medium">
                Peak: 09:00 AM
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-500">
                <Heart className="size-3 fill-current" /> 91% retention
              </span>
            </div>
          </div>

          {/* ── 3. ACTIVE READERS ────────────────────────────────── */}
          <div className="group p-6 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-sm hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Active Readers
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                <TrendingUp className="size-3" /> +10%
              </span>
            </div>

            <div className="mt-3">
              <span className="text-3xl sm:text-4xl font-black font-heading text-foreground tracking-tight">
                57K
              </span>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Subscribed developers worldwide
              </p>
            </div>

            {/* Mini bar chart */}
            <div className="mt-4">
              <div className="flex items-end gap-[3px] h-10">
                {readerBars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-indigo-500/40 group-hover:bg-indigo-500/70 transition-all duration-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-muted-foreground mt-1 font-medium">
                <span>10 wk ago</span>
                <span>Now</span>
              </div>
            </div>

            <div className="border-t border-border/60 pt-3 mt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-medium">
                Goal: 100K
              </span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[57%] bg-indigo-500 rounded-full" />
                </div>
                <span className="text-[11px] font-bold text-indigo-500">
                  57%
                </span>
              </div>
            </div>
          </div>

          {/* ── 4. COLLABORATIVE AUTHORS (presence) ──────────────── */}
          <div className="group p-6 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-sm hover:border-primary/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Collaborative Authors
                </span>
                <Users className="size-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-bold text-foreground mt-2 leading-snug">
                Passionate engineers &amp; designers writing daily
              </p>
            </div>

            <div className="my-4 flex items-center -space-x-2.5 overflow-hidden">
              <div className="relative size-9 rounded-full border-2 border-background overflow-hidden ring-1 ring-border">
                <Image
                  src="/icon.jpeg"
                  alt="Ramez"
                  width={36}
                  height={36}
                  className="object-cover size-full"
                />
                <span className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-500 ring-1 ring-background" />
              </div>
              {(
                [
                  ["JD", "from-indigo-500 to-purple-500", true],
                  ["AK", "from-amber-500 to-rose-500", true],
                  ["SA", "from-cyan-500 to-blue-500", false],
                ] as [string, string, boolean][]
              ).map(([initials, grad, online]) => (
                <div
                  key={initials}
                  className={`relative size-9 rounded-full border-2 border-background ring-1 ring-border bg-gradient-to-tr ${grad} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {initials}
                  {online && (
                    <span className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-500 ring-1 ring-background" />
                  )}
                </div>
              ))}
              <div className="size-9 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[11px] font-bold text-foreground">
                +14
              </div>
            </div>

            <div className="border-t border-border/60 pt-3 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase text-muted-foreground font-semibold">
                  Daily New Authors
                </span>
                <p className="text-xl font-black font-heading text-foreground">
                  54{" "}
                  <span className="text-xs font-bold text-emerald-500">
                    +40%
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ── 5. CENTERPIECE: 3D Male Developer Character ───────── */}
          <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-primary/10 dark:from-card dark:via-card/70 dark:to-primary/5 p-6 sm:p-8 md:col-span-2 shadow-md hover:border-primary/60 transition-all duration-300 flex flex-col justify-between min-h-[360px]">
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Interactive Creator Hub
                </span>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                Studio View 3.0
              </span>
            </div>

            <div className="relative my-4 flex items-center justify-center">
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-border/60 shadow-inner group-hover:scale-[1.01] transition-transform duration-500">
                <Image
                  src="/bento-character-1.jpg"
                  alt="Male developer with holographic dashboard"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 bg-background/90 dark:bg-card/90 backdrop-blur-md border border-border/80 rounded-xl px-3 py-1.5 shadow-lg pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <Activity className="size-3 text-primary" />
                    <span className="text-[11px] font-bold text-foreground">
                      26,807
                    </span>
                  </div>
                  <p className="text-[9px] text-muted-foreground font-semibold">
                    Active Interactions
                  </p>
                </div>
                <div className="absolute bottom-3 right-3 bg-background/90 dark:bg-card/90 backdrop-blur-md border border-border/80 rounded-xl px-3 py-1.5 shadow-lg pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <Heart className="size-3 text-rose-500 fill-current" />
                    <span className="text-[11px] font-bold text-foreground">
                      19.46%
                    </span>
                  </div>
                  <p className="text-[9px] text-emerald-500 font-semibold">
                    ▲ +102.48% Engagement
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-border/60 pt-3">
              <p className="text-xs text-muted-foreground font-medium">
                Engaging readers with modern interactive software concepts
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-primary transition-colors"
              >
                <span>Explore posts</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* ── 6. DEVELOPER CREED ───────────────────────────────── */}
          <div className="group p-6 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-sm hover:border-primary/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Developer Creed
              </span>
              <div className="mt-3 inline-block bg-foreground text-background dark:bg-white dark:text-black font-black font-heading text-lg sm:text-xl px-4 py-2 rounded-2xl shadow-md tracking-tight">
                Think. Code. Ship.
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Empowering software builders to turn thoughts into production
                systems.
              </p>
              {/* Value pillars */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  {
                    icon: <Target className="size-3.5 text-primary" />,
                    label: "Focus",
                  },
                  {
                    icon: <Zap className="size-3.5 text-amber-500" />,
                    label: "Speed",
                  },
                  {
                    icon: <BookOpen className="size-3.5 text-blue-500" />,
                    label: "Learn",
                  },
                  {
                    icon: <ArrowUp className="size-3.5 text-emerald-500" />,
                    label: "Grow",
                  },
                  {
                    icon: <Users className="size-3.5 text-fuchsia-500" />,
                    label: "Share",
                  },
                  {
                    icon: <Network className="size-3.5 text-red-500" />,
                    label: "Connect",
                  },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 py-2 rounded-xl bg-muted/60 border border-border/40"
                  >
                    {icon}
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4">
              <div className="relative size-11 rounded-full overflow-hidden border-2 border-primary">
                <Image
                  src="/icon.jpeg"
                  alt="Ramez Khaled"
                  width={44}
                  height={44}
                  className="object-cover size-full"
                />
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-1 ring-card" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  Ramez Khaled
                </p>
                <p className="text-[11px] text-muted-foreground font-medium">
                  Architect &amp; Lead Writer
                </p>
              </div>
            </div>
          </div>

          {/* ── 7. LIVE CLOCK (digital seven-segment style) ──────── */}
          <div className="group p-6 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-sm hover:border-primary/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Live Studio Time
              </span>
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="my-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Clock className="size-4" />
                <span className="text-xs font-mono font-medium">
                  LOCAL TIME
                </span>
              </div>
              {/* Digital clock — Share Tech Mono, fixed-width container */}
              <div
                suppressHydrationWarning
                className="font-digital clock-display text-2xl sm:text-3xl font-black text-primary bg-muted/60 dark:bg-muted/30 px-4 py-3 rounded-xl border border-border/50 w-full"
              >
                {time}
              </div>
              <p className="text-[10px] text-muted-foreground font-medium mt-2 text-center">
                Your local time zone
              </p>
            </div>

            <div className="border-t border-border/60 pt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Next Dispatch</span>
              <span className="font-semibold text-foreground">
                Friday 9:00 AM
              </span>
            </div>
          </div>

          {/* ── 8. DESIGN IDENTITY ───────────────────────────────── */}
          <div className="group p-6 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-sm hover:border-primary/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Design Identity
              </span>
              <h4 className="text-xl font-bold font-heading text-foreground mt-1">
                Typography &amp; Style
              </h4>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                Space Grotesk + Inter
              </p>
            </div>
            <div className="my-5 flex items-center gap-2">
              {[
                { bg: "bg-neutral-900", title: "Deep Charcoal" },
                { bg: "bg-slate-500", title: "Slate" },
                {
                  bg: "bg-primary ring-2 ring-primary/20 border-primary/50",
                  title: "Electric Lime",
                },
                { bg: "bg-neutral-100 dark:bg-neutral-800", title: "Surface" },
              ].map(({ bg, title }) => (
                <div
                  key={title}
                  className={`size-8 rounded-xl border border-border shadow-xs ${bg}`}
                  title={title}
                />
              ))}
            </div>
            <div className="border-t border-border/60 pt-3 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
              <span>OKLCH Tailored</span>
              <span className="text-primary font-bold">100% Contrast</span>
            </div>
          </div>

          {/* ── 9. INNOVATION STATEMENT (wide, 2 cols) ────────────── */}
          <div className="group relative overflow-hidden p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md md:col-span-2 shadow-sm hover:border-primary/60 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                The Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight mt-1 leading-tight">
                We Build the Future of Tech Writing
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                Crafting meaningful engineering architecture, software systems,
                and real-world implementation guides.
              </p>
            </div>
            <div className="relative shrink-0 size-24 sm:size-28 flex items-center justify-center">
              <div className="size-20 rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/40 border border-primary/50 rotate-12 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-45">
                <Code2 className="size-9 text-primary -rotate-12 group-hover:-rotate-45 transition-transform duration-500" />
              </div>
              <span className="absolute -top-1 -right-1 size-3 rounded-full bg-primary animate-ping" />
            </div>
          </div>

          {/* ── 13. JOIN THE COMMUNITY CTA ───────────────────────── */}
          <div className="group relative overflow-hidden p-6  rounded-3xl md:col-span-2 border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-card dark:from-primary/10 dark:via-card dark:to-card backdrop-blur-md shadow-sm hover:border-primary/60 hover:shadow-md hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between">
            {/* Decorative blurred orb */}
            <div
              className="pointer-events-none absolute -top-6 -right-6 size-24 rounded-full bg-primary/20 blur-2xl"
              aria-hidden="true"
            />

            <div>
              <span className="text-lg font-bold uppercase tracking-wider text-primary">
                Community
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight mt-1 leading-tight">
                Write with us. And Discover ideas
                <br />
                Grow together.
              </h4>
              <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                Join 57K+ developers publishing their best engineering work on
                iBlog.
              </p>
            </div>

            <Link
              href="/auth/login"
              className="mt-5 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold tracking-wide hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20"
            >
              <Zap className="size-3.5" />
              Start writing free
            </Link>
          </div>

          {/* ── 12. TOP TOPICS ───────────────────────────────────── */}
          <div className="group p-6 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-sm hover:border-primary/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Top Topics
              </span>
              <TrendingUp className="size-4 text-primary" />
            </div>

            <div className="flex flex-col gap-2.5 flex-1">
              {[
                { label: "React", pct: 92, color: "bg-sky-500" },
                { label: "TypeScript", pct: 85, color: "bg-blue-500" },
                { label: "DevOps", pct: 71, color: "bg-primary" },
                { label: "Rust", pct: 58, color: "bg-orange-500" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-muted-foreground w-20 shrink-0">
                    {label}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-700 group-hover:opacity-90`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground w-7 text-right">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border/60 pt-3 mt-4 text-[10px] text-muted-foreground font-medium">
              Based on last 30 days of reads
            </div>
          </div>

          {/* ── 10. WORLDWIDE / BRAND EMBLEM (inline in grid) ─────── */}
          <div className="group p-6 rounded-3xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-sm hover:border-primary/60 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center">
            <div className="relative size-16 mb-3 flex items-center justify-center">
              <div className="absolute size-16 rounded-full border border-primary/20 animate-spin [animation-duration:8s]" />
              <div className="absolute size-10 rounded-full border border-primary/40 animate-spin [animation-duration:4s] [animation-direction:reverse]" />
              <Globe className="size-8 text-primary relative z-10" />
            </div>
            <h4 className="text-xl font-black font-heading tracking-tight text-foreground">
              <span className="text-primary">i</span>Blog
            </h4>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">
              Est. 2026 · Worldwide
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span>Live globally</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
