import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio MFE: Fintech App",
  description: "A micro-frontend representing the Portfolio page in the fintech platform. Follows Next.js Multi-Zones Micro-frontend Architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <title>Portfolio MFE: Fintech App</title>
        <script type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: { selector_matches: '.prerender' },
                  eagerness: 'immediate' // "immediate" for page load or "moderate" (on hover)
                },
                {
                  where: { selector_matches: '.prerender-hover' },
                  eagerness: 'moderate' // "immediate" for page load or "moderate" (on hover)
                }
              ],
              prefetch: [{
                where: { selector_matches: '.prefetch' },
                eagerness: 'immediate'
              }]
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
