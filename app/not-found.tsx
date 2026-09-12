import Link from "next/link";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[85vh] w-full flex-col items-center justify-center p-4 text-center space-y-4">
      {/* Background Glow */}
      <div className="relative mb-6 flex items-center justify-center ">
        <div className="absolute -inset-4 rounded-full bg-linear-to-r from-green-900/20 via-amber-900/20 to-indigo-900/20 blur-2xl dark:from-amber-500/30 dark:to-green-500/30" />

        {/* Glowing Badge / Icon */}
        <div className="relative flex size-24 items-center justify-center rounded-3xl border border-gray-200 bg-background/80 shadow-xl backdrop-blur-md dark:border-gray-800">
          <FileQuestion className="size-12 text-destructive dark:text-destructive" />
        </div>
      </div>

      {/* 404 Large Text */}
      <span className="text-xs font-semibold tracking-widest text-destructive dark:text-destructive uppercase">
        404 Error
      </span>

      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base leading-relaxed">
        Sorry, we couldn’t find the page you’re looking for. It might have been
        moved, deleted, or never existed.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          <Home className="size-4" />
          Back to Home
        </Link>

        <Link
          href="/blog"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          <ArrowLeft className="size-4" />
          Explore Posts
        </Link>
      </div>
    </div>
  );
}
