"use client";

import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreatePage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const mutation = useMutation(api.posts.createPost);
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function handleSubmit(values: z.infer<typeof postSchema>) {
    startTransition(() => {
      mutation({
        title: values.title,
        body: values.content,
      });

      toast.add({
        type: "success",
        description: "Post is created successfully!",
      });

      router.push("/");
    });
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Super cool title"
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Post content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Super cool blog content..."
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-6">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  <span>creating...</span>
                </>
              ) : (
                <span>Create Post</span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
