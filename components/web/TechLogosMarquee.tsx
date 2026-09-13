"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface TechItem {
  name: string;
  category: string;
  logo: string;
}

const ROW_ONE: TechItem[] = [
  {
    name: "Next.js",
    category: "Framework",
    logo: "/logos/nextjs.png",
  },
  {
    name: "React",
    category: "UI Library",
    logo: "/logos/react-native.png",
  },
  {
    name: "TypeScript",
    category: "Language",
    logo: "/logos/typescript.png",
  },
  {
    name: "JavaScript",
    category: "Language",
    logo: "/logos/javascript--v1.png",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    logo: "/logos/tailwindcss.png",
  },
  {
    name: "Node.js",
    category: "Runtime",
    logo: "/logos/nodejs.png",
  },
  {
    name: "Python",
    category: "AI & Backend",
    logo: "/logos/python--v1.png",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    logo: "/logos/postgreesql.png",
  },
  {
    name: "MySQL",
    category: "Database",
    logo: "/logos/my-sql.png",
  },
  {
    name: "MongoDB",
    category: "NoSQL DB",
    logo: "/logos/mongodb.png",
  },
  {
    name: "Docker",
    category: "DevOps",
    logo: "/logos/docker.png",
  },
  {
    name: "Kubernetes",
    category: "Orchestration",
    logo: "/logos/kubernetes.png",
  },
];

const ROW_TWO: TechItem[] = [
  {
    name: "AWS",
    category: "Cloud Platform",
    logo: "/logos/amazon-web-services.png",
  },
  {
    name: "Firebase",
    category: "Cloud Backend",
    logo: "/logos/google-firebase-console.png",
  },
  {
    name: "GraphQL",
    category: "API Query",
    logo: "/logos/graphql.png",
  },
  {
    name: "Redis",
    category: "Cache & DB",
    logo: "/logos/redis.png",
  },
  {
    name: "Golang",
    category: "Backend",
    logo: "/logos/golang.png",
  },
  {
    name: "Rust",
    category: "Systems Lang",
    logo: "/logos/rust-programming-language.png",
  },
  {
    name: "Vue.js",
    category: "Frontend",
    logo: "/logos/vue-js.png",
  },
  {
    name: "Angular",
    category: "Framework",
    logo: "/logos/angularjs.png",
  },
  {
    name: "Flutter",
    category: "Cross-Platform",
    logo: "/logos/flutter.png",
  },
  {
    name: "Figma",
    category: "Design System",
    logo: "/logos/figma--v1.png",
  },
  {
    name: "Git",
    category: "Version Control",
    logo: "/logos/git.png",
  },
  {
    name: "GitHub",
    category: "Code & CI/CD",
    logo: "/logos/github--v1.png",
  },
  {
    name: "Linux",
    category: "Operating System",
    logo: "/logos/linux--v1.png",
  },
];

export function TechLogosMarquee() {
  // Duplicate arrays to create continuous infinite loops
  const rowOneItems = [...ROW_ONE, ...ROW_ONE, ...ROW_ONE];
  const rowTwoItems = [...ROW_TWO, ...ROW_TWO, ...ROW_TWO];

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden border-t border-border/50 bg-background/50">
      {/* Header Info */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider border border-primary/30 bg-primary/10 text-foreground mb-4">
          <span>Technology Ecosystem</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading tracking-tight text-foreground">
          Covering all tech topics & modern stacks
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
          From full-stack development to cloud infrastructure and AI — read deep-dives and tutorials authored by the community.
        </p>
      </div>

      {/* Marquee Wrapper with Smooth Edge Fade Masks */}
      <div className="relative w-full overflow-hidden marquee-group">
        {/* Left and Right Smooth Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 z-20 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 z-20 bg-gradient-to-l from-background via-background/80 to-transparent" />

        {/* Row 1: Smooth Left Scroll */}
        <div className="flex w-max gap-4 sm:gap-6 py-2 animate-marquee mb-4 sm:mb-6">
          {rowOneItems.map((tech, idx) => (
            <Link
              href={`/blog?q=${encodeURIComponent(tech.name)}`}
              key={`row1-${tech.name}-${idx}`}
              className="group relative flex items-center gap-3.5 px-6 py-4 sm:px-7 sm:py-5 min-w-[200px] sm:min-w-[230px] rounded-2xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:bg-card select-none cursor-pointer"
            >
              {/* Subtle hover accent corner glow */}
              <div className="pointer-events-none absolute top-0 right-0 size-16 rounded-tr-2xl bg-primary/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative size-10 sm:size-11 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={44}
                  height={44}
                  className="object-contain size-full"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-sm sm:text-base text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  {tech.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 2: Smooth Right (Reverse) Scroll */}
        <div className="flex w-max gap-4 sm:gap-6 py-2 animate-marquee-reverse">
          {rowTwoItems.map((tech, idx) => (
            <Link
              href={`/blog?q=${encodeURIComponent(tech.name)}`}
              key={`row2-${tech.name}-${idx}`}
              className="group relative flex items-center gap-3.5 px-6 py-4 sm:px-7 sm:py-5 min-w-[200px] sm:min-w-[230px] rounded-2xl border border-border/80 bg-card/90 dark:bg-card/60 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:bg-card select-none cursor-pointer"
            >
              {/* Subtle hover accent corner glow */}
              <div className="pointer-events-none absolute top-0 right-0 size-16 rounded-tr-2xl bg-primary/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative size-10 sm:size-11 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={44}
                  height={44}
                  className="object-contain size-full"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-sm sm:text-base text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  {tech.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
