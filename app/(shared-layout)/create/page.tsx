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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { createBlogAction } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp, Loader } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreatePage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  function handleSubmit(values: z.infer<typeof postSchema>) {
    startTransition(async () => {
      await createBlogAction(values);

      toast.add({
        type: "success",
        description: "Post is created successfully!",
      });
    });
  }

  return (
    <div className="py-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Create Post
        </h1>
        <p className="text-xl max-w-2xl mx-auto text-muted-foreground pt-2">
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
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      id="title"
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
                    <FieldLabel htmlFor="content">Content</FieldLabel>
                    <Textarea
                      id="content"
                      aria-invalid={fieldState.invalid}
                      placeholder="Super cool blog content..."
                      {...field}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="image">Image</FieldLabel>
                    <label
                      htmlFor="image"
                      className={`flex flex-col items-center justify-center w-full h-35 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 
      ${
        fieldState.invalid
          ? "border-red-500 bg-red-50/50 hover:bg-red-50 dark:bg-red-500/20 dark:hover:bg-red-500/30"
          : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-3 pb-4">
                        <ImageUp
                          size={40}
                          className="text-muted-foreground mb-3"
                        />
                        <p className="mb-0.5 text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            Click here to upload an image
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, WEBP (Max 5MB)
                        </p>
                      </div>

                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />
                    </label>

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
