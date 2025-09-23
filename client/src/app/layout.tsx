import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FollowProvider } from "@/contexts/FollowContext";
import { ToastProvider } from "@/contexts/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThreadUp - Connect & Share",
  description: "A modern social platform for sharing thoughts and connecting with others",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body 
        className="min-h-screen transition-colors duration-300"
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <AuthProvider>
            <FollowProvider>
              <ToastProvider>
                <div className="min-h-screen flex flex-col">
                  {children}
                </div>
              </ToastProvider>
            </FollowProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}