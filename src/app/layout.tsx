import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import DeviceDetector from "./components/DeviceDetector";

// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });
const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "My App",
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "My devestating app",
  icons: { icon: process.env.NEXT_PUBLIC_FAVICON || "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className}
              // //  antialiased
            `}
      >
        <DeviceDetector />
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
