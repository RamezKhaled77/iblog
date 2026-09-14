import { Navbar } from "@/components/web/navbar";
import { SiteFooter } from "@/components/web/SiteFooter";
import { ReactNode } from "react";

export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-full">
        <div className="mx-auto w-full max-w-7xl px-3 py-2 md:px-6 lg:px-8">
          <Navbar />
        </div>
      </header>
      <div className="h-[84px] w-full shrink-0" aria-hidden="true" />
      <div className="w-full flex-1 flex flex-col">{children}</div>
      <SiteFooter />
    </>
  );
}
