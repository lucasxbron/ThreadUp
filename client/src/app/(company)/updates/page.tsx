"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Update {
  version: string;
  date: string;
  title: string;
  type: string;
  status: string;
  description: string;
  features: Feature[];
  improvements: string[];
}

interface UpcomingFeature {
  title: string;
  description: string;
  status: string;
  timeline: string;
  priority: string;
}

export default function UpdatesPage() {
  const [activeTab, setActiveTab] = useState("latest");

  const updates: Update[] = [
    {
      version: "v0.1.0",
      date: "October 2025",
      title: "ThreadUp Beta Launch",
      type: "major",
      status: "latest",
      description:
        "The initial beta release of ThreadUp with core social networking features.",
      features: [
        {
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ),
          title: "User Authentication",
          description:
            "Secure user registration, login, and profile management",
        },
        {
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          ),
          title: "Post Creation & Sharing",
          description:
            "Create posts with text and images, share thoughts with the community",
        },
        {
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          ),
          title: "Likes & Comments",
          description: "Engage with posts through likes and threaded comments",
        },
        {
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          ),
          title: "Following System",
          description:
            "Follow other users and see their posts in your personalized feed",
        },
        {
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          ),
          title: "Image Upload & Processing",
          description:
            "Upload and share images with automatic optimization and cropping",
        },
        {
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ),
          title: "Dark/Light Mode",
          description:
            "Toggle between light and dark themes for comfortable viewing",
        },
      ],
      improvements: [
        "Privacy-focused design with minimal data collection",
        "Responsive design that works on all devices",
        "Fast and intuitive user interface",
        "Secure authentication with JWT tokens",
        "Real-time updates for likes and comments",
      ],
    },
  ];

  const upcomingFeatures: UpcomingFeature[] = [
    // {
    //   title: "Real-time Messaging",
    //   description: "Direct messages between users with real-time delivery",
    //   status: "planning",
    //   timeline: "tba",
    //   priority: "high",
    // },
    // {
    //   title: "Enhanced Search",
    //   description: "Search for users, posts, and content across the platform",
    //   status: "development",
    //   timeline: "tba",
    //   priority: "medium",
    // },
    // {
    //   title: "Mobile Applications",
    //   description: "Native iOS and Android apps for better mobile experience",
    //   status: "planning",
    //   timeline: "tba",
    //   priority: "high",
    // },
    // {
    //   title: "Content Moderation Tools",
    //   description:
    //     "Advanced tools for community moderation and content filtering",
    //   status: "research",
    //   timeline: "tba",
    //   priority: "medium",
    // },
    // {
    //   title: "API Documentation",
    //   description: "Public API for developers to build on ThreadUp",
    //   status: "planning",
    //   timeline: "tba",
    //   priority: "low",
    // },
    // {
    //   title: "Advanced Privacy Controls",
    //   description: "Granular privacy settings and content visibility controls",
    //   status: "research",
    //   timeline: "tba",
    //   priority: "high",
    // },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "development":
        return "var(--color-primary, #3b82f6)";
      case "planning":
        return "var(--color-warning, #f59e0b)";
      case "research":
        return "var(--color-purple, #a855f7)";
      default:
        return "var(--color-muted-foreground, #64748b)";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "var(--color-destructive, #ef4444)";
      case "medium":
        return "var(--color-warning, #f59e0b)";
      case "low":
        return "var(--color-success, #22c55e)";
      default:
        return "var(--color-muted-foreground, #64748b)";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              What's New
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Stay up to date with the latest ThreadUp features, improvements,
              and upcoming changes. We're constantly working to make ThreadUp
              better for our community.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div
              className="flex rounded-lg border p-1"
              style={{
                backgroundColor: "var(--color-secondary, #f1f5f9)",
                borderColor: "var(--color-border, #e2e8f0)",
              }}
            >
              <button
                onClick={() => setActiveTab("latest")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "latest"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Latest Updates
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Coming Soon
              </button>
            </div>
          </div>

          {/* Latest Updates Tab */}
          {activeTab === "latest" && (
            <div className="space-y-8">
              {updates.map((update, index) => (
                <div
                  key={index}
                  className="rounded-2xl border p-8"
                  style={{
                    backgroundColor: "var(--color-card, #ffffff)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                >
                  {/* Update Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor:
                              update.type === "major"
                                ? "var(--color-success, #22c55e)"
                                : "var(--color-primary, #3b82f6)",
                            color: "white",
                          }}
                        >
                          {update.version}
                        </span>
                        {update.status === "latest" && (
                          <span
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: "var(--color-warning, #f59e0b)",
                              color: "white",
                            }}
                          >
                            Latest
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        {update.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        Released {update.date}
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-lg mb-8"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    {update.description}
                  </p>

                  {/* New Features */}
                  <div className="mb-8">
                    <h4
                      className="text-xl font-bold mb-4 flex items-center space-x-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: "var(--color-primary, #3b82f6)" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      <span>New Features</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {update.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start space-x-3 p-4 rounded-lg"
                          style={{
                            backgroundColor: "var(--color-secondary, #f1f5f9)",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: "var(--color-primary, #3b82f6)",
                              color: "white",
                            }}
                          >
                            {feature.icon}
                          </div>
                          <div>
                            <h5
                              className="font-semibold mb-1"
                              style={{
                                color: "var(--color-foreground, #0f172a)",
                              }}
                            >
                              {feature.title}
                            </h5>
                            <p
                              className="text-sm"
                              style={{
                                color: "var(--color-muted-foreground, #64748b)",
                              }}
                            >
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Improvements */}
                  <div>
                    <h4
                      className="text-xl font-bold mb-4 flex items-center space-x-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: "var(--color-primary, #3b82f6)" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>Key Highlights</span>
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {update.improvements.map(
                        (improvement, improvementIndex) => (
                          <li
                            key={improvementIndex}
                            className="flex items-start space-x-2"
                          >
                            <svg
                              className="w-5 h-5 mt-0.5 flex-shrink-0"
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
                              {improvement}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upcoming Features Tab */}
          {activeTab === "upcoming" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  🔮 Coming Soon
                </h2>
                <p
                  className="text-lg"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  Here's what we're working on to make ThreadUp even better.
                  Timelines are estimates and may change based on development
                  priorities.
                </p>
              </div>

              {upcomingFeatures.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="rounded-xl border p-6 hover:shadow-lg transition-shadow duration-300"
                      style={{
                        backgroundColor: "var(--color-card, #ffffff)",
                        borderColor: "var(--color-border, #e2e8f0)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3
                          className="text-lg font-bold"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          {feature.title}
                        </h3>
                        <span
                          className="text-xs px-2 py-1 rounded-full capitalize"
                          style={{
                            backgroundColor: `${getPriorityColor(
                              feature.priority
                            )}20`,
                            color: getPriorityColor(feature.priority),
                          }}
                        >
                          {feature.priority}
                        </span>
                      </div>

                      <p
                        className="text-sm mb-4 leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {feature.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: getStatusColor(feature.status),
                            }}
                          ></span>
                          <span
                            className="text-xs capitalize font-medium"
                            style={{ color: getStatusColor(feature.status) }}
                          >
                            {feature.status}
                          </span>
                        </div>
                        <span
                          className="text-xs"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {feature.timeline}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State Message */
                <div
                  className="rounded-2xl border p-12 text-center"
                  style={{
                    backgroundColor: "var(--color-card, #ffffff)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    No Upcoming Features Planned
                  </h3>
                  <p
                    className="text-lg mb-6 max-w-md mx-auto"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    We're currently focused on perfecting the existing features.
                    New updates will be announced as they're planned!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="https://github.com/lucasxbron/ThreadUp/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
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
                        Suggest Features
                      </button>
                    </a>
                    <Link href="/developers" className="block">
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
                        Contribute
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Feedback Section */}
              {/* <div
                className="rounded-2xl border p-8 text-center mt-12"
                style={{
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  borderColor: "rgba(59, 130, 246, 0.2)",
                }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Have Ideas or Feedback?
                </h3>
                <p
                  className="mb-6 max-w-2xl mx-auto"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  We'd love to hear your thoughts on upcoming features or
                  suggestions for new ones. ThreadUp is built with community
                  input in mind.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="https://github.com/lucasxbron/ThreadUp/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
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
                      Share Feedback
                    </button>
                  </a>
                  <Link href="/developers" className="block">
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
                      Contribute
                    </button>
                  </Link>
                </div>
              </div> */}
            </div>
          )}

          {/* Stay Updated */}
          <div
            className="rounded-2xl border p-8 text-center mt-12"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Stay in the Loop
            </h3>
            <p
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Follow our development progress and be the first to know about new
              features and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
