import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrafficSourceTracker from "@/components/TrafficSourceTracker";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

export const metadata: Metadata = {
  title: {
    default: "BoatDetailers.com — Get Your Marine Detailing Business Listed",
    template: "%s | BoatDetailers.com",
  },
  description:
    "The premier directory of professional boat detailing businesses nationwide. Get listed and reach boat owners actively searching for cleaning, polishing, ceramic coatings, and marine appearance services.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://boatdetailers.com"),
  icons: {
    icon: "/sailing-boat.svg",
    shortcut: "/sailing-boat.svg",
    apple: "/sailing-boat.svg",
  },
  openGraph: {
    type: "website",
    siteName: "BoatDetailers.com",
  },
};

const GA_ID = "G-XXXXXXXXXX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body>
        <Suspense fallback={null}>
          <TrafficSourceTracker />
        </Suspense>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
