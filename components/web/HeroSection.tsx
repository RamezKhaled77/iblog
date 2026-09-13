"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Compass, LogIn } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] pt-10 pb-16 md:pt-14 md:pb-24 lg:pt-18 lg:pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 -z-10 h-[380px] w-[650px] rounded-full bg-primary/15 blur-[120px] dark:bg-primary/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 -left-20 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden="true"
      />

      {/* Hero Content Area */}
      <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 space-y-32">
        
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-primary/80 bg-background/80 backdrop-blur-md text-muted-foreground shadow-xs mb-8 transition-colors hover:border-primary/50">
          <span className="flex size-2 rounded-full bg-primary animate-pulse" />
          <span>The modern space for curious minds & tech writers</span>
         
        </div>

        {/* Main Headline with Custom Selection Box & Cursor Tag */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground font-heading leading-[1.12] sm:leading-[1.14]">
          Find and improve your{" "}
          <br className="hidden sm:inline" />
          <span className="text-primary">awareness</span> with{" "}
          <span className="relative inline-block px-2 sm:px-3.5 py-0.5 my-1 border-2 border-primary/90 bg-primary/10 rounded-xs font-heading font-black text-foreground transition-transform hover:scale-[1.02]">
            {/* Selection Drag Handles (Corners & Edges) */}
            <span className="absolute -top-1.5 -left-1.5 size-2.5 bg-background border-2 border-primary rounded-xs shadow-xs" />
            <span className="absolute -top-1.5 -right-1.5 size-2.5 bg-background border-2 border-primary rounded-xs shadow-xs" />
            <span className="absolute -bottom-1.5 -left-1.5 size-2.5 bg-background border-2 border-primary rounded-xs shadow-xs" />
            <span className="absolute -bottom-1.5 -right-1.5 size-2.5 bg-background border-2 border-primary rounded-xs shadow-xs" />
            <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 size-2 bg-background border-2 border-primary rounded-xs shadow-xs" />
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 size-2 bg-background border-2 border-primary rounded-xs shadow-xs" />

            our blogs

            {/* Pointer Cursor Badge Labeled 'iBlog' */}
            <span className="absolute -bottom-7 -right-5 sm:-bottom-8 sm:-right-8 flex items-center gap-1.5 bg-primary text-primary-foreground text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md shadow-md select-none pointer-events-none z-30 transition-all group-hover:translate-x-0.5">
              <svg
                className="size-3 sm:size-3.5 fill-current -rotate-12 -ml-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M3 3l7 18 3-7 7-3L3 3z" />
              </svg>
              <span>iBlog</span>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground mt-7 mb-8 leading-relaxed">
          Knowledge platform worldwide. We connect engineers, designers, and creators in an easy way to write, read, and share insights 
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
          <Link
            href="/blog"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className:
                "h-11 px-6 rounded-xl font-semibold shadow-md gap-2 cursor-pointer transition-all hover:scale-[1.02]",
            })}
          >
            <Compass className="size-4" />
            <span>Discover our topics</span>
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href="/auth/login"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "h-11 px-6 rounded-xl font-semibold border-border/80 bg-background/80 hover:bg-muted/80 gap-2 cursor-pointer transition-all hover:scale-[1.02]",
            })}
          >
            <LogIn className="size-4" />
            <span>Login</span>
          </Link>
        </div>

        {/* Decorative Blueprint Lines & Floating Founder Card (Desktop & Tablet) */}
        <div className="hidden lg:block absolute left-[-60px] xl:left-[-110px] top-[140px] pointer-events-none select-none z-10">
          <div className="relative">
            {/* SVG Blueprint Wall Line Art */}
            <svg
              className="w-56 h-48 stroke-border/70 dark:stroke-border/40 fill-none"
              strokeWidth="1.5"
              viewBox="0 0 220 180"
            >
              {/* Brick / Blueprint Grid Lines */}
              <path d="M 10 30 L 190 30" strokeDasharray="3 3" />
              <path d="M 30 70 L 210 70" strokeDasharray="3 3" />
              <path d="M 60 30 L 60 70" strokeDasharray="3 3" />
              <path d="M 130 30 L 130 70" strokeDasharray="3 3" />
              
              {/* Routed Solid Circuit / Connector Line */}
              <path
                d="M 50 10 L 50 80 L 110 80 L 110 145"
                className="stroke-primary"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="50" cy="10" r="3" className="fill-primary" />
            </svg>

            {/* Floating Creator Profile Card */}
            <div className="pointer-events-auto absolute left-14 top-[140px] w-52 bg-card/95 backdrop-blur-md rounded-xl border border-border p-3.5 shadow-xl text-left transition-transform hover:-translate-y-1">
              {/* Primary Top Color Bar */}
              <div className="absolute top-0 left-4 right-4 h-1 bg-primary rounded-b" />
              
              <div className="flex items-center gap-3">
                <div className="relative size-10 rounded-full overflow-hidden border-2 border-primary ring-2 ring-background">
                  <Image
                    src="/icon.jpeg"
                    alt="Ramez Khaled"
                    width={40}
                    height={40}
                    className="object-cover size-full"
                    priority
                  />
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-foreground">Ramez Khaled</p>
                    <CheckCircle2 className="size-3 text-primary" />
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium">Founder & Lead Writer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Blueprint Wall Line Art Accent */}
        <div className="hidden lg:block absolute right-[-50px] xl:right-[-90px] top-[200px] pointer-events-none select-none z-10">
          <svg
            className="w-48 h-36 stroke-border/70 dark:stroke-border/40 fill-none"
            strokeWidth="1.5"
            viewBox="0 0 190 140"
          >
            <path d="M 10 30 L 180 30" strokeDasharray="3 3" />
            <path d="M 30 70 L 170 70" strokeDasharray="3 3" />
            <path d="M 70 30 L 70 70" strokeDasharray="3 3" />
            <path d="M 140 30 L 140 70" strokeDasharray="3 3" />
            <path d="M 40 70 L 40 110" strokeDasharray="3 3" />
            <path d="M 110 70 L 110 110" strokeDasharray="3 3" />
          </svg>
        </div>

      </div>

      {/* Contained & Rounded Stats Banner (Light & Dark mode compatible) */}
      <div className="mt-14 sm:mt-18 lg:mt-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card/90 dark:bg-card/70 text-card-foreground p-6 sm:p-8 md:p-10 shadow-xl backdrop-blur-md">
          {/* Subtle Ambient Radial Glow inside banner */}
          <div
            className="pointer-events-none absolute -right-16 -bottom-16 size-72 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-16 -top-16 size-72 rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
            {/* Left Title */}
            <div className="max-w-xs text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading tracking-tight leading-tight text-foreground">
                People Productivity performance
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-normal">
                Empowering readers and software craftspeople worldwide.
              </p>
            </div>

            {/* Right Stat Columns with Dividers (Strict 1-row layout) */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:justify-end divide-y sm:divide-y-0 sm:divide-x divide-border/80 border-t border-border/70 pt-6 lg:border-t-0 lg:pt-0">
              {/* Stat 1 */}
              <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 py-2 text-center">
                <span className="text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-muted-foreground">
                  ARTICLES
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight mt-1 text-foreground">
                  <span className="text-primary font-bold">+</span> 12.4K
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 py-2 text-center">
                <span className="text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-muted-foreground">
                  READERS
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight mt-1 text-foreground">
                  <span className="text-primary font-bold">+</span> 450K
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 py-2 text-center">
                <span className="text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-muted-foreground">
                  WRITERS
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight mt-1 text-foreground">
                  <span className="text-primary font-bold">+</span> 8.2K
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
