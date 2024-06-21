"use client";
import { ChevronLeft, FileX2 } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

function ErrorPage() {
  const router = useRouter();
  return (
    <main className="flex h-[90dvh] w-full items-center justify-center">
      <div className="flex gap-2">
        <FileX2 size={100} />
        <div className="flex flex-col justify-center">
          <span className="text-3xl font-semibold">User Not Found</span>
          <span>Make sure that user is registered</span>
          <Link
            onClick={() => redirect("/")}
            onClickCapture={() => router.refresh()}
            className="flex items-center text-sm font-semibold underline"
            href={"/"}
          >
            <ChevronLeft size={15} />
            Return to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
