import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Bricolage_Grotesque} from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument"
});

const bricolage = Bricolage_Grotesque({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bricolage"
});

export const metadata: Metadata = {
  title: "Ŋwà' Exam Portal",
  description: "AI-Powered Exam Paper Management & Study Platform for GCE students.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ŋwà'",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icons/icon-512x512.png",
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#22C55E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} ${bricolage.variable} font-sans bg-background text-foreground min-h-screen selection:bg-primary/30 overflow-x-hidden`}>
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ServiceWorkerRegistration />
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
