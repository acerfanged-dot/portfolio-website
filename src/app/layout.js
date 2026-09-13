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

export const metadata = {
  // Without this, Next builds og:image as a localhost URL and every social
  // preview breaks. Update it if the deployment URL changes.
  metadataBase: new URL("https://portfolio-website-dusky-gamma-96.vercel.app"),
  title: "Acer Carl Fanged",
  description:
    "I build the half of a web application you never see — databases, access rules, payments — and verify it actually works before it ships.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
