import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./secondary.css";
import { PwaRegister } from "@/components/pwa-register";

export const metadata: Metadata = {
  title: "Bayanihan — Help, where it matters.",
  description: "Live, verified disaster updates and trusted ways to help communities across the Philippines.",
  applicationName: "Bayanihan",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Bayanihan" },
  formatDetection: { telephone: false },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f7f9f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PwaRegister />{children}</body></html>;
}
