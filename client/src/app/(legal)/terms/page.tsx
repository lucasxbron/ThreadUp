"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function TermsOfServicePage() {
  const terms = [
    {
      title: "Account Registration & Security",
      content: [
        "You must provide accurate and complete information when creating your account",
        "You are responsible for maintaining the security of your account credentials",
        "You must notify us immediately of any unauthorized use of your account",
        "You must be at least 13 years old to use ThreadUp",
        "One person may not maintain more than one account",
      ],
    },
    {
      title: "Content & Conduct",
      content: [
        "You are responsible for all content you post on ThreadUp",
        "You must not post content that violates our Community Guidelines",
        "You must not engage in harassment, bullying, or abusive behavior",
        "You must not post spam, misleading information, or unauthorized promotional content",
        "You must respect the intellectual property rights of others",
      ],
    },
    {
      title: "Your Content Rights",
      content: [
        "You retain ownership of the content you create and post",
        "By posting content, you grant ThreadUp a license to display and distribute it on our platform",
        "You can delete your content at any time",
        "We may remove content that violates our policies",
        "You represent that you have the right to post all content you share",
      ],
    },
    {
      title: "Our Service",
      content: [
        "We provide ThreadUp as a platform for social networking and content sharing",
        "We may modify or discontinue features with reasonable notice",
        "We strive for reliable service but cannot guarantee 100% uptime",
        "We may limit usage to prevent abuse or maintain service quality",
        "We reserve the right to suspend accounts that violate our terms",
      ],
    },
    {
      title: "Privacy & Data",
      content: [
        "Your use of ThreadUp is governed by our Privacy Policy",
        "We collect only the data necessary to provide our service",
        "We do not sell your personal information to third parties",
        "You can request deletion of your data by deleting your account",
        "We use reasonable security measures to protect your information",
      ],
    },
    {
      title: "Prohibited Activities",
      content: [
        "Creating fake accounts or impersonating others",
        "Attempting to hack, attack, or compromise our systems",
        "Using automated tools to access or interact with our service",
        "Collecting user data without permission",
        "Engaging in any illegal activities through our platform",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Terms of Service
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              These terms govern your use of ThreadUp. By using our service, you
              agree to these terms. Please read them carefully.
            </p>
          </div>

          {/* Agreement Notice */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <div className="flex items-start space-x-4">
              <svg
                className="w-8 h-8 mt-1 flex-shrink-0"
                style={{ color: "var(--color-primary, #3b82f6)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Agreement to Terms
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  By creating an account or using ThreadUp, you agree to be
                  bound by these Terms of Service and our Community Guidelines.
                  If you don't agree to these terms, please don't use our
                  service.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 mb-12">
            {terms.map((section, index) => (
              <div
                key={index}
                className="rounded-xl border p-6"
                style={{
                  backgroundColor: "var(--color-card, #ffffff)",
                  borderColor: "var(--color-border, #e2e8f0)",
                }}
              >
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  {index + 1}. {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: "var(--color-primary, #3b82f6)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Enforcement */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Enforcement & Changes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Violation Consequences
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-warning, #f59e0b)" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Content removal for policy violations
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-destructive, #ef4444)" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                    <span
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Account suspension or termination
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-primary, #3b82f6)" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Legal action for severe violations
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Changes to Terms
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-success, #22c55e)" }}
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
                    <span
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      We may update these terms occasionally
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-success, #22c55e)" }}
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
                    <span
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      We'll notify users of significant changes
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-success, #22c55e)" }}
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
                    <span
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Continued use means acceptance of changes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Questions About These Terms?
            </h2>
            <p
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              If you have questions about these Terms of Service or need
              clarification on any point, our legal team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/contact?subject=legal" className="block">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors"
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
                  Contact Legal Team
                </button>
              </a>
              <Link href="/" className="block">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-foreground, #0f172a)",
                    border: "1px solid var(--color-border, #e2e8f0)",
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
            <p
              className="text-sm mt-4"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Last updated: September 30, 2025
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
