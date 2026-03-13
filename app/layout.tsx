import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers/providers";

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
        <html lang="ru" className="scroll-smooth">
        <body className="min-h-screen flex flex-col bg-gray-50 antialiased">
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}