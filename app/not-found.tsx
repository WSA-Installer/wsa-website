import Link from "next/link";
import { SITE } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-error" />
          <span className="text-xs text-text-secondary">404 — Page not found</span>
        </div>
        <h1 className="text-6xl font-bold text-gradient">Lost in Space</h1>
        <p className="mx-auto mt-6 max-w-md text-text-secondary">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Back to {SITE.name}
        </Link>
      </div>
    </div>
  );
}
