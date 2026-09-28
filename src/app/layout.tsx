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
  title: "Live Order Tracking | Real-Time Delivery Intelligence",
  description:
    "Modern mobile order tracking experience for e-commerce with real-time milestone telemetry, delay resolution, and instant delivery dispute claims.",
  keywords: [
    "Order Tracking",
    "Delivery Tracking",
    "E-commerce UX",
    "Next.js 16",
    "React 19",
    "Tailwind CSS v4",
    "Mobile Design",
  ],
  authors: [
    {
      name: "Mahmudul Hasan",
      url: "https://github.com/mahmudulhasanzb",
    },
  ],
  creator: "Mahmudul Hasan",
  publisher: "Mahmudul Hasan",
  openGraph: {
    title: "Live Order Tracking | Real-Time Delivery Intelligence",
    description:
      "Engineered by Mahmudul Hasan — Full-Stack Developer & AI Integration Specialist based in Sylhet.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
