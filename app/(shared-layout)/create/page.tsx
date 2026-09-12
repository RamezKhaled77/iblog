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
import { createBlogAction } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp, Loader } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import Image from "next/image";

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
                render={({ field, fieldState }) => {
                  // إنشاء رابط معاينة للـ File في حالة وجوده
                  const selectedFile =
                    field.value instanceof File ? field.value : null;
                  const previewUrl = selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : typeof field.value === "string"
                      ? field.value
                      : null;

                  return (
                    <Field>
                      <FieldLabel htmlFor="image">Image</FieldLabel>

                      {previewUrl ? (
                        /* Card - after upload the image */
                        <div className="relative flex items-center justify-between w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                          <div className="flex items-center gap-6 ">
                            {/* Preview thumbnail */}
                            <Image
                              src={previewUrl}
                              alt="Selected preview"
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                              width={16}
                              height={16}
                            />
                            {/* Image info */}
                            <div className="flex flex-col overflow-hidden">
                              <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[200px]">
                                {selectedFile
                                  ? selectedFile.name
                                  : "Uploaded Image"}
                              </span>
                              {selectedFile && (
                                <span className="text-xs text-muted-foreground">
                                  {(selectedFile.size / (1024 * 1024)).toFixed(
                                    2,
                                  )}{" "}
                                  MB
                                </span>
                              )}
                              <span className="text-xs text-green-600 dark:text-green-400 font-medium mt-1 flex items-center gap-1">
                                ✓ Ready for upload
                              </span>
                            </div>
                          </div>

                          {/* Remove/Change actions */}
                          <div className="flex flex-col items-center gap-2">
                            <label
                              htmlFor="image"
                              className="text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 font-medium cursor-pointer px-2 py-1 rounded-md hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors"
                            >
                              Change
                            </label>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => field.onChange(null)}
                              className="text-xs cursor-pointer text-red-500 hover:text-red-600 font-medium px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* OG ui */
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
                        </label>
                      )}

                      {/* Hidden input */}
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                          }
                        }}
                      />

                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  );
                }}
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
