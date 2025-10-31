"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PostFeed } from "@/components/posts/PostFeed";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { SuggestionsCard } from "@/components/profile/SuggestionsCard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FollowersCard } from "@/components/profile/FollowersCard";
import Image from "next/image";

export default function HomePage() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-200">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6 justify-center">
            {/* Profile Card Skeleton */}
            <div className="hidden lg:block flex-shrink-0 w-80">
              <div className="animate-pulse bg-white dark:bg-gray-300 rounded-xl p-6 shadow-sm border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-300 dark:bg-gray-400 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-400 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-400 rounded mb-4 w-24 mx-auto"></div>
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <div className="h-6 w-8 bg-gray-300 dark:bg-gray-400 rounded mb-1"></div>
                      <div className="h-3 w-8 bg-gray-300 dark:bg-gray-400 rounded"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-6 w-8 bg-gray-300 dark:bg-gray-400 rounded mb-1"></div>
                      <div className="h-3 w-12 bg-gray-300 dark:bg-gray-400 rounded"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-6 w-8 bg-gray-300 dark:bg-gray-400 rounded mb-1"></div>
                      <div className="h-3 w-12 bg-gray-300 dark:bg-gray-400 rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-400 rounded w-32 mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Post Feed Skeleton */}
            <div className="flex-1 max-w-2xl">
              <div className="animate-pulse space-y-4">
                <div className="h-32 bg-gray-300 dark:bg-gray-400 rounded-lg"></div>
                <div className="h-48 bg-gray-300 dark:bg-gray-400 rounded-lg"></div>
                <div className="h-48 bg-gray-300 dark:bg-gray-400 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Landing page for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Hero Section */}
        <div className="flex-1 relative overflow-hidden">
          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center flex-1 px-4 py-8 sm:py-12 lg:py-4 xl:py-16 min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-26rem)]">
            <div className="max-w-6xl mx-auto w-full">
              {/* Responsive Layout: Mobile stacked, Desktop side-by-side */}
              <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-16">
                {/* Mobile/Tablet: Sign Up Form (Top) */}
                <div className="xl:hidden flex-shrink-0 w-full max-w-sm order-1">
                  <div
                    className="backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl"
                    style={{
                      backgroundColor: "var(--color-card, #ffffff)",
                      borderColor: "var(--color-border, #e2e8f0)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4 mx-auto animate-pulse">
                        <Image
                          src="/threadup_icon_gradient.svg"
                          alt="ThreadUp Logo"
                          width={64}
                          height={64}
                          className="w-full h-full object-contain drop-shadow-lg"
                          priority
                        />
                      </div>
                      <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ThreadUp
                      </h1>
                      <p
                        className="text-base sm:text-lg mb-4 sm:mb-6"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        Connect with friends and the world around you.
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <Link href="/register" className="block">
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full font-semibold text-base sm:text-lg py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          Sign up free
                        </Button>
                      </Link>

                      <div className="flex items-center my-4 sm:my-6">
                        <div
                          className="flex-grow h-px"
                          style={{
                            backgroundColor: "var(--color-border, #e2e8f0)",
                          }}
                        ></div>
                        <span
                          className="mx-3 sm:mx-4 text-xs uppercase px-2 sm:px-3 py-1 rounded-full"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                            backgroundColor: "var(--color-card, #ffffff)",
                          }}
                        >
                          Or
                        </span>
                        <div
                          className="flex-grow h-px"
                          style={{
                            backgroundColor: "var(--color-border, #e2e8f0)",
                          }}
                        ></div>
                      </div>

                      <div className="text-center">
                        <p
                          className="text-sm mb-2 sm:mb-3"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Already have an account?
                        </p>
                        <Link href="/login">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="w-full font-semibold py-2 sm:py-3 hover:scale-105 transition-all duration-200"
                          >
                            Log in
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div
                      className="mt-4 sm:mt-6 pt-4 sm:pt-6"
                      style={{
                        borderTopColor: "var(--color-border, #e2e8f0)",
                        borderTopWidth: "1px",
                        borderTopStyle: "solid",
                      }}
                    >
                      <div
                        className="flex justify-center items-center space-x-4 sm:space-x-6 text-xs"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Free forever</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Secure & private</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content - Responsive sizing */}
                <div className="flex-1 text-center xl:text-left max-w-2xl order-2 xl:order-1">
                  {/* Logo and Brand - Hidden on mobile/tablet */}
                  <div className="mb-4 flex-col items-center xl:items-start hidden xl:flex">
                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center animate-pulse">
                        <Image
                          src="/threadup_icon_gradient.svg"
                          alt="ThreadUp Logo"
                          width={80}
                          height={80}
                          className="w-full h-full object-contain drop-shadow-lg"
                          priority
                        />
                      </div>
                      <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ThreadUp
                      </h1>
                    </div>
                  </div>

                  {/* Main Headline - Responsive sizing */}
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    Connect.
                    <span className="text-blue-600"> Share.</span>
                    <br />
                    <span className="text-purple-600">Discover.</span>
                  </h2>

                  {/* Subheading - Responsive sizing */}
                  <p
                    className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 leading-relaxed"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    Join a community where your voice matters. Share your
                    thoughts, connect with like-minded people, and discover
                    amazing content.
                  </p>

                  {/* Feature Highlights - Better mobile layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <div
                      className="backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: "var(--color-card, #ffffff)",
                        borderColor: "var(--color-border, #e2e8f0)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }}
                    >
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto xl:mx-0"
                        style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                          />
                        </svg>
                      </div>
                      <h3
                        className="font-semibold mb-2 text-sm sm:text-base"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Real Conversations
                      </h3>
                      <p
                        className="text-xs sm:text-sm"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        Engage in meaningful discussions with people who share
                        your interests.
                      </p>
                    </div>

                    <div
                      className="backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: "var(--color-card, #ffffff)",
                        borderColor: "var(--color-border, #e2e8f0)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }}
                    >
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto xl:mx-0"
                        style={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
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
                      </div>
                      <h3
                        className="font-semibold mb-2 text-sm sm:text-base"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Find Your Space
                      </h3>
                      <p
                        className="text-xs sm:text-sm"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        Connect with friends and discover new communities that
                        match your vibe.
                      </p>
                    </div>

                    <div
                      className="backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 shadow-sm sm:col-span-2 lg:col-span-1"
                      style={{
                        backgroundColor: "var(--color-card, #ffffff)",
                        borderColor: "var(--color-border, #e2e8f0)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }}
                    >
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto xl:mx-0"
                        style={{ backgroundColor: "rgba(236, 72, 153, 0.1)" }}
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600"
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
                        className="font-semibold mb-2 text-sm sm:text-base"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Express Yourself
                      </h3>
                      <p
                        className="text-xs sm:text-sm"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        Share your thoughts, photos, and moments in a space that
                        celebrates creativity.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop: Sign Up Form (Right Side) - Only shows on XL screens */}
                <div className="hidden xl:block flex-shrink-0 w-full max-w-sm order-3 xl:order-2">
                  <div
                    className="backdrop-blur-md rounded-2xl p-8 shadow-2xl"
                    style={{
                      backgroundColor: "var(--color-card, #ffffff)",
                      borderColor: "var(--color-border, #e2e8f0)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    <div className="text-center mb-6">
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Join ThreadUp
                      </h3>
                      <p
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        Start your journey today
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Link href="/register" className="block">
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full font-semibold text-lg py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          Sign up free
                        </Button>
                      </Link>

                      <div className="flex items-center my-6">
                        <div
                          className="flex-grow h-px"
                          style={{
                            backgroundColor: "var(--color-border, #e2e8f0)",
                          }}
                        ></div>
                        <span
                          className="mx-4 text-xs uppercase px-3 py-1 rounded-full"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                            backgroundColor: "var(--color-card, #ffffff)",
                          }}
                        >
                          Or
                        </span>
                        <div
                          className="flex-grow h-px"
                          style={{
                            backgroundColor: "var(--color-border, #e2e8f0)",
                          }}
                        ></div>
                      </div>

                      <div className="text-center">
                        <p
                          className="text-sm mb-3"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Already have an account?
                        </p>
                        <Link href="/login">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="w-full font-semibold py-3 hover:scale-105 transition-all duration-200"
                          >
                            Log in
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div
                      className="mt-6 pt-6"
                      style={{
                        borderTopColor: "var(--color-border, #e2e8f0)",
                        borderTopWidth: "1px",
                        borderTopStyle: "solid",
                      }}
                    >
                      <div
                        className="flex justify-center items-center space-x-6 text-xs"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Free forever</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-3 h-3 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Secure & private</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // Authenticated user's feed
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex gap-6 justify-center">
              {/* Profile Card and Suggestions - Left Side (Hidden on mobile/tablet) */}
              <div className="hidden lg:block flex-shrink-0 space-y-6">
                {/* ProfileCard */}
                {user && <ProfileCard user={user} />}

                {/* SuggestionsCard */}
                <SuggestionsCard />

                {/* FollowersCard */}
                {isAuthenticated && user && <FollowersCard />}
              </div>

              {/* Post Feed - Center */}
              <div className="flex-1 max-w-2xl">
                <PostFeed />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
