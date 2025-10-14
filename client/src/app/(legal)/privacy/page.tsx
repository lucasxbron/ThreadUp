"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const dataCollection = [
    {
      title: "Personal Information",
      description: "Information you provide when creating your account",
      items: [
        "First name and last name",
        "Email address",
        "Username (chosen by you)",
      ],
    },
    {
      title: "Content Information",
      description: "Content you create and share on ThreadUp",
      items: [
        "Posts, comments, and their timestamps",
        "Images and media you upload",
        "Your interactions (likes, follows)",
      ],
    },
    // {
    //   title: "Technical Information",
    //   description: "Automatic information to provide our service",
    //   items: [
    //     "Device type and browser information",
    //     "IP address and general location",
    //     "Usage patterns and performance data"
    //   ]
    // }
    {
      title: "Administrative Security",
      description:
        "Additional security data for users with administrative privileges",
      items: [
        "IP addresses when performing moderation actions",
        "Browser and device information during admin activities",
        "Timestamps of administrative actions for audit purposes",
      ],
    },
    {
      title: "Account Security",
      description: "Essential data to keep your account safe and functional",
      items: [
        "Password (encrypted and never stored in plain text)",
        "Account creation and last login timestamps",
        "Email verification status and tokens",
      ],
    },
  ];

  const dataUse = [
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
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
      title: "Provide Our Service",
      description: "Using your data to deliver ThreadUp's core functionality",
      uses: [
        "Create and maintain your account",
        "Display your posts and profile to other users",
        "Enable messaging and social interactions",
        "Personalize your feed and suggestions",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Safety & Security",
      description: "Protecting you and our community from harmful content",
      uses: [
        "Detect and prevent spam and abuse",
        "Verify account authenticity",
        "Investigate violations of community guidelines",
        "Secure your account from unauthorized access",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Improve Our Platform",
      description: "Making ThreadUp better for everyone",
      uses: [
        "Analyze usage patterns to improve features",
        "Fix bugs and technical issues",
        "Develop new functionality",
        "Optimize platform performance",
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
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Privacy Policy
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              We believe in transparency about how we collect, use, and protect
              your information. This policy explains our privacy practices in
              simple, clear terms.
            </p>
          </div>

          {/* Key Principles */}
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
              Our Privacy Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "var(--color-primary, #3b82f6)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Transparency
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  We're clear about what data we collect and why we need it
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "var(--color-success, #22c55e)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Minimal Collection
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  We only collect data that's necessary to provide our service
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "var(--color-purple, #a855f7)" }}
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
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Your Control
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  You have control over your data and privacy settings
                </p>
              </div>
            </div>
          </div>

          {/* Data We Collect */}
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
              What Information We Collect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataCollection.map((category, index) => (
                <div key={index}>
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    {category.title}
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start space-x-2"
                      >
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
          </div>

          {/* How We Use Data */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
            <div>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                How We Use Your Information
              </h2>
              <div className="space-y-6">
                {dataUse.map((use, index) => (
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
                          backgroundColor: "var(--color-primary, #3b82f6)",
                          color: "white",
                        }}
                      >
                        {use.icon}
                      </div>
                      <div>
                        <h3
                          className="text-xl font-bold mb-2"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          {use.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {use.description}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {use.uses.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start space-x-2"
                        >
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
                              color: "var(--color-foreground, #0f172a)",
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Admin Security Section */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              borderColor: "rgba(168, 85, 247, 0.2)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Administrative Security Measures
            </h2>
            <div className="flex items-start space-x-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "var(--color-purple, #a855f7)",
                  color: "white",
                }}
              >
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
              </div>
              <div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Enhanced Security for Administrators
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  For users with administrative privileges, we collect
                  additional security information to ensure platform safety and
                  maintain an audit trail of moderation activities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4
                  className="font-semibold mb-3"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  What We Collect
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-purple, #a855f7)" }}
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
                      className="text-sm"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      IP address during moderation actions
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-purple, #a855f7)" }}
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
                      className="text-sm"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Browser and device information
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-purple, #a855f7)" }}
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
                      className="text-sm"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Timestamps of all admin actions
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h4
                  className="font-semibold mb-3"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Why We Need This
                </h4>
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
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Prevent unauthorized admin access
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
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Maintain transparent moderation audit trail
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
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Investigate security incidents
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="mt-6 p-4 rounded-lg"
              style={{
                backgroundColor: "rgba(168, 85, 247, 0.1)",
                borderLeft: "4px solid var(--color-purple, #a855f7)",
              }}
            >
              <p
                className="text-sm"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                <strong>Note:</strong> This enhanced security data collection
                only applies to users with administrative privileges and only
                during moderation activities. Regular users are not subject to
                this additional data collection.
              </p>
            </div>
          </div>

          {/* What We Don't Do */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              What We Don't Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 mt-1 flex-shrink-0"
                  style={{ color: "var(--color-destructive, #ef4444)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    We Don't Sell Your Data
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    We never sell your personal information to third parties
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 mt-1 flex-shrink-0"
                  style={{ color: "var(--color-destructive, #ef4444)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    No Excessive Data Collection
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    We only collect what's necessary for our service to work
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 mt-1 flex-shrink-0"
                  style={{ color: "var(--color-destructive, #ef4444)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    No Hidden Tracking
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    We don't track you across other websites or apps
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 mt-1 flex-shrink-0"
                  style={{ color: "var(--color-destructive, #ef4444)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    No Data Without Permission
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    We won't access or use your data without clear permission
                  </p>
                </div>
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
              Questions About Privacy?
            </h2>
            <p
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              If you have any questions about this privacy policy or how we
              handle your data, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/contact?subject=privacy" className="block">
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
                  Contact Privacy Team
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
