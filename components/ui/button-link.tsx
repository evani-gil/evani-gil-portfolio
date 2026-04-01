import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-gradient-to-br from-cyan-600 to-slate-900 text-white shadow-lg shadow-cyan-600/20 hover:-translate-y-0.5",
  secondary:
    "border border-slate-200 bg-white text-slate-900 hover:border-cyan-200 hover:bg-slate-50",
  ghost: "text-cyan-700 underline decoration-cyan-300 underline-offset-4 hover:text-cyan-900"
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className
}: Readonly<{
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  external?: boolean;
  className?: string;
}>) {
  const sharedProps = external ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-200",
        styles[variant],
        className
      )}
      {...sharedProps}
    >
      {children}
    </Link>
  );
}
