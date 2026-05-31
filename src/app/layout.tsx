import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { NowPlayingBar } from "@/components/player/NowPlayingBar";
import { AmbientGlow } from "@/components/player/AmbientGlow";
import { Toast } from "@/components/player/Toast";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "RESONANCE — Play the Feeling",
  description:
    "A pure-dark, cinematic music site. Click any song and it begins.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain antialiased">
        <PlayerProvider>
          <AmbientGlow />
          <Navbar />
          {children}
          <NowPlayingBar />
          <Toast />
        </PlayerProvider>
      </body>
    </html>
  );
}
