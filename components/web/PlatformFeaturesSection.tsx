"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import featureData from "@/features-sec.json";

type Feature = (typeof featureData.features)[number];

const features: Feature[] = featureData.features.map((feature) => ({
  ...feature,
  imgUrl: feature.imgUrl.replace("/public", ""),
}));

export function PlatformFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateFeature = () => {
      frameRef.current = null;
      const section = sectionRef.current;
      if (!section) return;

      const scrollRange = section.offsetHeight - window.innerHeight;
      const progress =
        scrollRange > 0
          ? Math.min(
              1,
              Math.max(0, -section.getBoundingClientRect().top / scrollRange),
            )
          : 0;
      const nextIndex = Math.min(
        features.length - 1,
        Math.floor(progress * features.length),
      );

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    };

    const requestUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateFeature);
      }
    };

    updateFeature();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null)
        window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const activeFeature = features[activeIndex];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="platform-features-heading"
      className="relative min-h-[400vh] border-y border-border/50 bg-background"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
        >
          <div className="absolute left-[-12rem] top-1/3 size-[28rem] rounded-full bg-primary/8 blur-[130px]" />
          <div className="absolute bottom-[-14rem] right-[-8rem] size-[30rem] rounded-full bg-primary/5 blur-[150px]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl sm:mb-14 lg:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
              <span>Why iBlog</span>
            </div>
            <h2
              id="platform-features-heading"
              className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              A better place for ideas to move.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Read with intention, keep what matters, and add your own
              perspective to a living culture of learning.
            </p>
          </div>

          <div className="mb-3 flex justify-end sm:mb-4">
            <div className="inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-card/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-sm backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(143,224,0,0.8)]" />
              Scroll to explore
              <ArrowUpRight className="size-3.5 text-primary" />
            </div>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-border/80 bg-card/75 shadow-2xl shadow-black/20 backdrop-blur-sm lg:grid-cols-[minmax(170px,0.7fr)_minmax(250px,1.25fr)_minmax(280px,1fr)] lg:items-center">
            <nav
              aria-label="Platform features"
              className="border-b  border-border/70 p-3 lg:border-b-0 lg:border-r lg:p-5"
            >
              <ol className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3 ">
                {features.map((feature, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <li key={feature.title}>
                      <div
                        aria-current={isActive ? "step" : undefined}
                        className={`platform-feature-nav relative flex min-h-16 items-center rounded-lg px-3 py-3 text-left transition-all duration-700 sm:px-4 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`mr-3 font-mono text-[14px] tracking-widest ${isActive ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}
                        >
                          0{index + 1}
                        </span>
                        <span className="text-sm font-bold leading-tight ">
                          {feature.title}
                        </span>
                        {isActive && (
                          <span className="absolute bottom-2 left-3 h-1 w-7 rounded-full bg-primary-foreground/70 sm:left-4" />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="flex min-h-[280px] flex-col justify-center p-6 sm:min-h-[320px] sm:p-8 lg:min-h-[360px] lg:p-10">
              <div key={activeFeature.title} className="animate-feature-copy">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
                  Platform feature
                </span>
                <h3 className="mt-5 max-w-md text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {activeFeature.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                  {activeFeature.paragraph}
                </p>
              </div>
            </div>

            <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 bg-background sm:m-5 lg:m-8">
              {features.map((feature, index) => (
                <Image
                  key={feature.imgUrl}
                  src={feature.imgUrl}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className={`platform-feature-media object-cover transition-[opacity,transform] duration-700 ease-out ${
                    index === activeIndex
                      ? "scale-100 opacity-100"
                      : "scale-[0.97] opacity-0"
                  }`}
                  priority={index === 0}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/10" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            <span>Ideas in motion</span>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(features.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
