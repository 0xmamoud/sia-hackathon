import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Footer } from "@/components/sections/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Leaz",
  description: "Automate your business with Leaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body
        className={
          `${inter.variable} ${lora.variable} antialiased font-inter bg-gradient-to-b 
            from-gray-50 to-white
        `}
      >
        {children}
      </body>
    </html>
  );
}
