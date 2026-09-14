"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";

export function Navbar() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav className="flex w-full items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-3 py-2.5 shadow-lg shadow-black/10 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55 sm:px-4 sm:py-3">
      <div className="flex items-center gap-12">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">i</span>Blog
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            Blog
          </Link>
          <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>
        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.add({
                      type: "success",
                      description: "Logged out successfully!",
                    });
                    router.replace("/auth/login");
                  },
                  onError: (error) => {
                    toast.add({
                      type: "error",
                      description: `${error.error.message}`,
                    });
                  },
                },
              })
            }
            className="cursor-pointer"
          >
            Log out
          </Button>
        ) : (
          <>
            <Link href="/auth/sign-up" className={buttonVariants()}>
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
