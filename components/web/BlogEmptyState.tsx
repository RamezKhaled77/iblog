import React from "react";
import Link from "next/link";
import { FileText, PlusCircle, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

interface BlogEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function BlogEmptyState({
  title = "No posts found yet",
  description = "It looks like there aren't any blog posts here right now. Stay tuned or be the first to create one!",
  actionLabel = "Create New Post",
  actionHref = "/create",
}: BlogEmptyStateProps) {
  return (
    <div className="flex min-h-100 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-100/50 p-8 text-center animate-in fade-in-50 dark:border-gray-800 dark:bg-gray-900/30">
      {/* Icon with Glowing Layer */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute -inset-1 rounded-full bg-linear-to-r from-green-500 to-amber-500 opacity-20 blur-lg dark:opacity-30" />
        <div className="relative flex size-20 items-center justify-center rounded-2xl border border-gray-200 bg-background shadow-sm dark:border-gray-800">
          <FileText className="size-10 text-emerald-600 dark:text-emerald-400" />
          <Sparkles className="absolute -right-2 -top-2 size-5 text-amber-300 animate-bounce" />
        </div>
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h3>
      <p className="mb-6 max-w-md text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {actionHref && (
        <Link
          href={actionHref}
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          <PlusCircle className="size-4" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
