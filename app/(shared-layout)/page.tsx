import type { Metadata } from "next";
import { HeroSection } from "@/components/web/HeroSection";
import { TechLogosMarquee } from "@/components/web/TechLogosMarquee";

export const metadata: Metadata = {
  title: {
    default: "iBlog — Modern Blogging Platform",
    template: "%s | iBlog",
  },
  description:
    "Discover inspiring articles, tech insights, and creative stories on iBlog. Join our community of readers and writers today.",

  keywords: [
    "iBlog",
    "Blog",
    "Tech Articles",
    "Software Engineering",
    "Web Development",
    "Writing Platform",
    "Blog Posts",
  ],

  authors: [{ name: "Ramez Khaled" }],
  creator: "iBlog",
  publisher: "iBlog",

  openGraph: {
    title: "iBlog — Modern Blogging Platform",
    description:
      "Discover inspiring articles, tech insights, and creative stories on iBlog.",
    url: "https://iblog-eosin.vercel.app",
    siteName: "iBlog",
    images: [
      {
        url: "https://iblog-eosin.vercel.app/icon.jpeg",
        width: 1200,
        height: 630,
        alt: "iBlog Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "iBlog — Modern Blogging Platform",
    description:
      "Discover inspiring articles, tech insights, and creative stories on iBlog.",
    images: ["https://iblog-eosin.vercel.app/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <TechLogosMarquee />
    </div>
  );
}
