import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/providers/next-auth-provider";
import NextThemeProvider from "@/providers/theme-provider";
import GlobalState from "@/context";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog App",
  description: "This is a full-stack blog application using next.js prisma tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-black">
        <NextThemeProvider>
          <NextAuthProvider>
            <GlobalState>
              <Header />
              {children}
            </GlobalState>
          </NextAuthProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
