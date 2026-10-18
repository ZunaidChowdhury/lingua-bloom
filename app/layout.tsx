import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const rounded = Baloo_2({
  variable: "--font-round",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: "LinguaBloom — Little words. Big worlds.",
  description:
    "A warm, safe English-learning chatbot for children under 7, with playful lessons across three growing levels.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rounded.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
