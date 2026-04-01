import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Evani Gil | Full Stack Developer",
  description:
    "Portfolio site for Evani Gil, a full stack developer with experience across software engineering, QA, leadership, and operations.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Evani Gil | Full Stack Developer",
    description:
      "Portfolio site for Evani Gil, a full stack developer blending QA precision, technical execution, and operational leadership.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Evani Gil | Full Stack Developer",
    description:
      "Portfolio site for Evani Gil, a full stack developer blending QA precision, technical execution, and operational leadership."
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-slate-950">
        {children}
      </body>
    </html>
  );
}
