import Link from "next/link";
import { Activity, ArrowUpRight } from "lucide-react";

const navigation = [
  { label: "Explore", href: "/" },
  { label: "Articles", href: "/blog" },
  { label: "Create", href: "/create" },
  { label: "Authors", href: "/blog" },
  {
    label: "Changelog",
    href: "https://github.com/RamezKhaled77/nextjs-tutorial/commits/main",
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/RamezKhaled77/nextjs-tutorial",
    mark: "GH",
  },

  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ramez-khaled/",
    mark: "in",
  },
];

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-baseline text-3xl font-bold tracking-tight text-foreground"
            >
              <span className="text-primary">i</span>Blog
            </Link>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              A thoughtful space for curious minds to read, learn, and share
              what moves the web forward.
            </p>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
              Created by Ramez Khaled
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Navigate
            </h2>
            <nav
              aria-label="Footer navigation"
              className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3"
            >
              {navigation.map((item) => {
                const external = isExternalLink(item.href);
                const className =
                  "text-sm text-muted-foreground transition-colors hover:text-primary";

                return external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${className} inline-flex items-center gap-1`}
                  >
                    {item.label}
                    <ArrowUpRight className="size-3" />
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} className={className}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="lg:justify-self-end">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Connect
            </h2>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ label, href, mark }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border/80 bg-card/50 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <span className="font-mono text-[10px] font-bold tracking-tight">
                    {mark}
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-7 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs font-medium text-muted-foreground">
              <Activity className="size-3.5 text-emerald-400" />
              <span>All systems operational</span>
              <span
                className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                aria-label="Operational"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <span>iBlog / Knowledge in motion</span>
          <span>© iBlog</span>
        </div>
      </div>
    </footer>
  );
}
