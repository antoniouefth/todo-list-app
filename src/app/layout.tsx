import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "reflect-metadata";
import { QueryProvider } from "@/app/ui/shared/components/providers/query-provider";
import { ToastProvider } from "@/app/ui/shared/components/providers/toast-provider";

export const metadata: Metadata = {
  title: "Todo List App",
  description: "Single list todo app built with Next.js 16",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${roboto.variable} ${roboto.className} antialiased`}>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
