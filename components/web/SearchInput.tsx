import { Loader, Search } from "lucide-react";
import { Input } from "../ui/input";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, term: term } : "skip",
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
    setOpen(true);
  }

  return (
    <div className="relative w-full max-w-sm z-10">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search Posts..."
          className="w-full pl-8 pr-12 bg-background"
          value={term}
          onChange={handleInputChange}
          onFocus={() => term.length >= 2 && setOpen(true)}
        />
        <kbd className="pointer-events-none absolute right-[6.3px] top-[6.3px] hidden h-5 select-none items-center gap-1 rounded-sm border border-primary bg-muted px-1.5 font-mono text-[10px] font-medium text-primary opacity-100 sm:flex">
          <span className="text-xs">⌘</span>/
        </kbd>
      </div>

      {open && term.length >= 2 && (
        <div className="absolute top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader className="mr-2 size-4 animate-spin" />
              Searching...
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground text-center">
              No results found!
            </p>
          ) : (
            <div className="py-1">
              {results.map((post) => (
                <Link
                  className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  href={`/blog/${post._id}`}
                  key={post._id}
                  onClick={() => {
                    setOpen(false);
                    setTerm("");
                  }}
                >
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground pt-1">
                    {post.body.substring(0, 60)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
