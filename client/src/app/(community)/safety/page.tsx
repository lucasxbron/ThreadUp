"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function SafetyPage() {
  const safetyFeatures = [
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      title: "Account Security",
      description:
        "Your account is protected with industry-standard security measures.",
      features: [
        "Secure password encryption and storage",
        "Email verification for account changes",
        "Session management and automatic logout",
        // "Regular security audits and updates"
      ],
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Privacy Protection",
      description:
        "We're committed to protecting your personal information and privacy.",
      features: [
        "Minimal data collection - only what's necessary",
        "No selling or sharing of personal data",
        "Transparent privacy practices and policies",
        // "User control over profile visibility and data"
      ],
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      title: "Content Moderation",
      description:
        "Advanced systems help keep our community safe from harmful content.",
      features: [
        // "Automated content scanning for violations",
        "Human review team for complex cases",
        "Quick response to reports (24-48 hours)",
        "Proactive identification of harmful behavior",
      ],
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      title: "Community Support",
      description: "Multiple ways to get help and support when you need it.",
      features: [
        "24/7 reporting system for urgent safety issues",
        "Comprehensive help center with guides",
        "Direct contact with our safety team",
        // "Community-driven support and guidance"
      ],
    },
  ];

  const safetyTips = [
    {
      title: "Protect Your Personal Information",
      tips: [
        "Never share passwords, addresses, or phone numbers",
        "Be cautious about sharing location information",
        "Think twice before posting personal details",
        "Use privacy settings to control who sees your content",
      ],
    },
    {
      title: "Recognize and Avoid Scams",
      tips: [
        "Be wary of requests for money or financial information",
        "Don't click on suspicious links or downloads",
        "Verify identities before sharing sensitive information",
        "Report suspicious accounts or messages immediately",
      ],
    },
    {
      title: "Practice Digital Wellness",
      tips: [
        "Take regular breaks from social media",
        "Curate your feed to include positive content",
        "Don't feel obligated to respond to everyone",
        "Set boundaries around your online interactions",
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
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Safety Center
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Your safety is our top priority. We&apos;ve built comprehensive
              features and policies to help protect you and create a secure
              environment for meaningful connections.
            </p>
          </div>

          {/* Safety Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {safetyFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border p-6 hover:shadow-lg transition-shadow duration-300"
                style={{
                  backgroundColor: "var(--color-card, #ffffff)",
                  borderColor: "var(--color-border, #e2e8f0)",
                }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "var(--color-success, #22c55e)",
                      color: "white",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
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

          {/* Safety Tips */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Safety Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safetyTips.map((category, index) => (
                <div key={index}>
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2">
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
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <svg
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: "var(--color-destructive, #ef4444)" }}
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
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Need Immediate Help?
            </h2>
            <p
              className="mb-6"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              If you&apos;re experiencing harassment, threats, or any safety
              concerns, please report it immediately. For emergencies, contact
              your local authorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/contact?subject=safety" className="block">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--color-destructive, #ef4444)",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-destructive-600, #dc2626)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-destructive, #ef4444)";
                  }}
                >
                  Report Safety Issue
                </button>
              </a>
              <Link href="/" className="block">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors border"
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
        </div>
      </main>
    </div>
  );
}
