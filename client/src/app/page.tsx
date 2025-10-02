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
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        {/* Main Content */}
        <div className="flex-1 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] lg:min-h-0 flex items-center justify-center px-4 py-8 lg:py-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16">
              {/* Left Side - Mockup/Visual (hidden on mobile) */}
              <div className="flex-1 max-w-md hidden sm:block">
                <div className="relative">
                  {/* Realistic Phone Frame */}
                  <div className="mx-auto w-80 h-[600px] relative">
                    {/* Phone Body - Outer Frame */}
                    <div className="absolute inset-0 bg-[#1A1A1C] rounded-[3rem] shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden">
                      {/* Inner shadow effect - explicitly visible in both modes */}
                      <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                        {/* Top highlight - creates edge definition */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20"></div>

                        {/* Left highlight */}
                        <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-white/15"></div>

                        {/* Bottom shadow */}
                        <div className="absolute bottom-0 left-8 right-8 h-[3px] bg-black/50"></div>

                        {/* Right shadow */}
                        <div className="absolute top-8 bottom-8 right-0 w-[2px] bg-black/40"></div>

                        {/* Inner bevel effect */}
                        <div className="absolute inset-[1px] rounded-[2.9rem] shadow-[inset_0_0_20px_5px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
                      </div>
                      {/* Light mode specific inner glow */}
                      <div className="absolute inset-[3px] rounded-[2.8rem] bg-gradient-to-b from-[rgba(255,255,255,0.15)] to-transparent h-[30px] dark:hidden"></div>

                      {/* Subtle metal band */}
                      <div className="absolute inset-0 rounded-[3rem] border border-[#2A2A2C] opacity-50"></div>

                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/0 via-white/5 to-white/10 rounded-[3rem]"></div>

                      {/* Screen Bezel */}
                      <div className="absolute inset-[3px] bg-black rounded-[2.8rem] overflow-hidden shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]">
                        {/* Screen */}
                        <div className="w-full h-full bg-white dark:bg-gray-100 rounded-[2.7rem] overflow-hidden relative">
                          {/* Dynamic Island / Notch */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[18px] z-10 flex items-center justify-center">
                            {/* FaceID Sensors and Front Camera */}
                            <div className="flex items-center space-x-3">
                              <div className="w-[5px] h-[5px] bg-[#1a1a1a] rounded-full border border-[#333] opacity-70"></div>
                              <div className="w-[8px] h-[8px] bg-[#252525] rounded-full border border-[#333] opacity-80"></div>
                              <div className="w-[4px] h-[4px] bg-[#202020] rounded-full border border-[#333] opacity-60"></div>
                            </div>
                          </div>

                          {/* App content remains the same */}
                          {/* Status Bar */}
                          <div className="flex justify-between items-center px-6 pt-8 pb-2 text-xs">
                            <div className="flex items-center space-x-1 text-gray-900 dark:text-gray-900">
                              <span>9:41</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-900 dark:text-gray-900">
                              <div className="flex space-x-0.5">
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                              </div>
                              <svg
                                className="w-4 h-3"
                                viewBox="0 0 24 12"
                                fill="none"
                              >
                                <rect
                                  x="1"
                                  y="2"
                                  width="20"
                                  height="8"
                                  rx="2"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  fill="none"
                                />
                                <rect
                                  x="22"
                                  y="4"
                                  width="1"
                                  height="4"
                                  rx="0.5"
                                  fill="currentColor"
                                />
                                <rect
                                  x="2"
                                  y="3"
                                  width="16"
                                  height="6"
                                  rx="1"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Mock ThreadUp Interface */}
                          <div className="p-4 border-b border-gray-200 dark:border-gray-300">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-7 h-7 flex items-center justify-center">
                                  <Image
                                    src="/threadup_icon_gradient.svg"
                                    alt="ThreadUp"
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <span className="font-bold text-gray-900 dark:text-gray-900 text-sm">
                                  ThreadUp
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Mock Posts */}
                          <div className="p-4 space-y-4">
                            {/* Mock Post 1 */}
                            <div className="bg-white dark:bg-gray-200 rounded-lg border border-gray-200 dark:border-gray-300 p-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-900">
                                  sarah_creates
                                </span>
                              </div>
                              <div className="w-full h-24 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-900 dark:to-purple-900 rounded-lg mb-2"></div>
                              <p className="text-xs text-gray-700 dark:text-gray-700">
                                Just finished my latest design project! 🎨
                              </p>
                            </div>

                            {/* Mock Post 2 */}
                            <div className="bg-white dark:bg-gray-200 rounded-lg border border-gray-200 dark:border-gray-300 p-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                                <span className="text-xs font-semibold text-gray-900 dark:text-gray-900">
                                  tech_explorer
                                </span>
                              </div>
                              <p className="text-xs text-gray-700 dark:text-gray-700 mb-2">
                                Just upgraded my home network setup with Wi-Fi
                                6! 🚀 The speed difference is amazing!
                              </p>
                              <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-500">
                                <span>❤️ 24</span>
                                <span>💬 8</span>
                              </div>
                            </div>
                          </div>

                          {/* Home Indicator (iPhone style) */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                        </div>
                      </div>

                      {/* Side Buttons */}
                      {/* Volume Buttons */}
                      <div className="absolute left-0 top-24 w-1 h-8 bg-gray-300 dark:bg-[#242426] rounded-r-sm opacity-80"></div>
                      <div className="absolute left-0 top-36 w-1 h-8 bg-gray-500 dark:bg-[#242426] rounded-r-sm opacity-80"></div>

                      {/* Power Button */}
                      <div className="absolute right-0 top-32 w-1 h-12 bg-gray-500 dark:bg-[#242426] rounded-l-sm opacity-80"></div>

                      {/* Reflection/Gloss Effect */}
                      <div className="absolute inset-2 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.5rem] pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Sign Up Form (Top on mobile) */}
              <div className="flex-1 max-w-sm w-full">
                <div className="text-center mb-8">
                  <div className="w-18 h-18 flex items-center justify-center mx-auto mb-4">
                    <Image
                      src="/threadup_icon_gradient.svg"
                      alt="ThreadUp"
                      width={72}
                      height={72}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
                    ThreadUp
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Connect with friends and the world around you on ThreadUp.
                  </p>
                </div>

                {/* Sign Up Form */}
                <div className="bg-card border border-border rounded-lg p-6 mb-4">
                  <div className="space-y-4">
                    <Link href="/register" className="block cursor-pointer">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full font-semibold cursor-pointer"
                      >
                        Sign up
                      </Button>
                    </Link>

                    <div className="flex items-center my-6 mx-1">
                      <div className="flex-grow h-0.5 bg-gray-300 dark:bg-slate-600"></div>
                      <span className="mx-2 text-xs uppercase text-muted-foreground bg-card px-2">
                        Or
                      </span>
                      <div className="flex-grow h-0.5 bg-gray-300 dark:bg-slate-600"></div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Already have an account?
                      </p>
                      <Link href="/login" className="cursor-pointer">
                        <Button
                          variant="secondary"
                          className="font-semibold cursor-pointer"
                        >
                          Log in
                        </Button>
                      </Link>
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

  // Authenticated user's feed with ProfileCard and SuggestionsCard
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main
          className="flex-1 transition-colors duration-300"
          style={{ backgroundColor: "var(--color-background, #ffffff)" }}
        >
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

              {/* Right Sidebar */}
              {/* <div className="hidden lg:block">
                <div className="sticky top-20 space-y-6"> */}
              {/* Followers/Following Card */}
              {/* {isAuthenticated && user && <FollowersCard />}
                </div>
              </div> */}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
