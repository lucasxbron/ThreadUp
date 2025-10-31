"use client";

import React from "react";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

export const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-center flex-1 px-4 py-12 min-h-[calc(100vh-20rem)]">
          <div className="max-w-2xl mx-auto w-full text-center">
            {/* Logo and Brand */}
            <div className="mb-8 flex flex-col items-center">
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="w-12 h-12 sm:w-18 sm:h-18 flex items-center justify-center animate-pulse">
                  <Image
                    src="/threadup_icon_gradient.svg"
                    alt="ThreadUp Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain drop-shadow-lg"
                    priority
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ThreadUp
                </h1>
              </div>
            </div>

            {/* Maintenance Message */}
            <div
              className="backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-xl mb-8"
              style={{
                backgroundColor: "var(--color-card, #ffffff)",
                borderColor: "var(--color-border, #e2e8f0)",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              {/* Construction Icon */}
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ backgroundColor: "rgba(249, 115, 22, 0.1)" }}
              >
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h2
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                We&apos;re Under Maintenance
              </h2>

              <p
                className="text-base sm:text-lg mb-6 leading-relaxed"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                We&apos;re currently performing scheduled maintenance to improve
                your experience. We&apos;ll be back online shortly.
              </p>

              {/* Contact Info */}
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Need urgent assistance?{" "}
                <a
                  href="/contact"
                  className="underline hover:no-underline"
                  style={{ color: "var(--color-primary, #3b82f6)" }}
                >
                  Contact us!
                </a>
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className="backdrop-blur-sm rounded-xl p-4 hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-card, #ffffff)",
                  borderColor: "var(--color-border, #e2e8f0)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                >
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold mb-1 text-sm"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Your Data is Safe
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  All your content and data remain secure during maintenance.
                </p>
              </div>

              <div
                className="backdrop-blur-sm rounded-xl p-4 hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-card, #ffffff)",
                  borderColor: "var(--color-border, #e2e8f0)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold mb-1 text-sm"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Coming Back Stronger
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  We&apos;re adding new features and improving performance.
                </p>
              </div>

              <div
                className="backdrop-blur-sm rounded-xl p-4 hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-card, #ffffff)",
                  borderColor: "var(--color-border, #e2e8f0)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                >
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold mb-1 text-sm"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Back Soon
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  Thank you for your patience while we improve ThreadUp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Always visible and functional */}
      <Footer />
    </div>
  );
};
