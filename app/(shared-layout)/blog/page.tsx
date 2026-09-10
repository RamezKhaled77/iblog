import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Our blog
        </h1>
        <p className="text-xl max-w-2xl mx-auto text-muted-foreground pt-4">
          Insights, thoughts, and trends from our team.
        </p>
      </div>
      <Suspense fallback={<BlogListSkeleton />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

async function LoadBlogList() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const data = await fetchQuery(api.posts.getPosts);
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post, key) => (
        <BlogCard key={key} post={post} />
      ))}
    </div>
  );
}

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    body: string;
    imageUrl: string | null;
  };
}

function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="pt-0">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          className="object-cover"
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1604151364473-02e3e26124a6?q=80&w=929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="placeholder image"
          fill
        />
      </div>
      <CardContent>
        <Link href={`/blog/${post._id}`}>
          <h2 className="text-xl font-medium hover:text-primary">
            {post.title}
          </h2>
        </Link>
        <p className="text-muted-foreground line-clamp-3 truncate">
          {post.body}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/${post._id}`}
          className={`${buttonVariants({ variant: "default" })} w-full`}
        >
          View Post
          <ArrowUpRight />
        </Link>
      </CardFooter>
    </Card>
  );
}

function BlogListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="rounded-xl h-48 w-full " />

          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-3 w-3/4" />

            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
