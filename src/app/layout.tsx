import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import QueryProvider from "./(providers)/usequery-provider";
import { NextProvider } from "./(providers)/nextui-provider";
import { SearchProvider } from "./(providers)/search-provider";

const dmSans = DM_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "MovieBox",
  description: "Explore the world of movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={dmSans.className}>
        <QueryProvider>
          <NextProvider>
            <SearchProvider>{children}</SearchProvider>
          </NextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
