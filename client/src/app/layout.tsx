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
  icons: {
    icon: [
      { url: '/threadup_icon_gradient_16x16.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/threadup_icon_gradient_32x32.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/threadup_icon_gradient.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/threadup_icon_gradient_32x32.ico',
    apple: '/threadup_icon_gradient.svg'
  },
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
  viewport: 'width=device-width, initial-scale=1',
};

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