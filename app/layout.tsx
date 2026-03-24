import "./globals.css";

import type { Metadata } from "next";

import Providers from "@/app/providers/providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
    title: "Мой проект",
    description: "Современное приложение на Next.js + Tailwind",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={cn("scroll-smooth", "font-sans", geist.variable)}>
        <body className="min-h-screen flex flex-col bg-gray-50 antialiased">
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}