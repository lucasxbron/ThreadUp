"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <div className="animate-pulse">
                <svg
                  className="w-12 h-12 text-white"
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
            </div>
            {/* Floating dots animation */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-1/2 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Main Content */}
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--color-foreground, #0f172a)" }}
          >
            🚧 Coming Soon!
          </h1>

          <p
            className="text-xl md:text-2xl mb-8 leading-relaxed"
            style={{ color: "var(--color-muted-foreground, #64748b)" }}
          >
            This feature is currently under development. We&apos;re working hard
            to bring it to you soon!
          </p>

          {/* Feature Status */}
          <div
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8"
            style={{
              backgroundColor: "rgba(234, 179, 8, 0.1)",
              color: "var(--color-yellow-600, #ca8a04)",
            }}
          >
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">In Development</span>
          </div>

          {/* What to expect */}
          <div
            className="rounded-xl border p-6 mb-8 text-left max-w-md mx-auto"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h3
              className="text-lg font-bold mb-4 text-center"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              What to Expect
            </h3>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Carefully designed user experience
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Privacy-first implementation
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Thoroughly tested functionality
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Community feedback integration
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center whitespace-nowrap">
            <a
              href="https://github.com/lucasxbron/ThreadUp"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                style={{
                  backgroundColor: "var(--color-primary, #3b82f6)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-primary-600, #2563eb)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-primary, #3b82f6)";
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>View on GitHub</span>
              </button>
            </a>

            <Link href="/developers" className="block">
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors border whitespace-nowrap"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-foreground, #0f172a)",
                  borderColor: "var(--color-border, #e2e8f0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-secondary, #f1f5f9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Developer Resources
              </button>
            </Link>

            <Link href="/" className="block">
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors border whitespace-nowrap"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-foreground, #0f172a)",
                  borderColor: "var(--color-border, #e2e8f0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-secondary, #f1f5f9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Back to ThreadUp
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
