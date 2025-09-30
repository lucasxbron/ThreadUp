"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { PostFeed } from "@/components/posts/PostFeed";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { SuggestionsCard } from "@/components/profile/SuggestionsCard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FollowersCard } from "@/components/profile/FollowersCard";

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
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16">
              {/* Left Side - Mockup/Visual (Bottom on mobile) */}
              <div className="flex-1 max-w-md">
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
                                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-bold text-xs">
                                    T
                                  </span>
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
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-2xl">T</span>
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
        <footer className="bg-muted border-t border-border py-12">
          <div className="max-w-6xl mx-auto px-4">
            {/* Responsive Grid: 4 cols -> 2 cols -> 1 col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center sm:text-left">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/team"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/updates"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      What's New
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/developers"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      Developers
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  Community
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/guidelines"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      Community Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/safety"
                      className="hover:text-foreground transition-colors cursor-colors cursor-pointer"
                    >
                      Safety
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/help"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dmca"
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      DMCA
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Connect</h3>
                <div className="flex justify-center sm:justify-start space-x-4 mb-4">
                  {/* X (Twitter) */}
                  <Link
                    href="/coming-soon"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <span className="sr-only">X</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Link>

                  {/* Instagram */}
                  <Link
                    href="/coming-soon"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.017 0C8.396 0 7.969.013 6.748.072 5.527.13 4.718.333 3.999.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.859.131 5.668.072 6.889.013 8.11 0 8.537 0 12.017s.013 3.907.072 5.128c.059 1.22.26 2.03.558 2.749.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.72.295 1.529.497 2.749.558 1.22.058 1.647.072 5.128.072 3.48 0 3.907-.013 5.128-.072 1.22-.059 2.029-.263 2.748-.558.789-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.295-.719.496-1.529.558-2.748.059-1.22.072-1.647.072-5.128 0-3.48-.013-3.907-.072-5.128C23.497 5.527 23.295 4.718 23 3.999c-.306-.789-.718-1.459-1.384-2.126C20.948.935 20.279.63 19.49.63c-.72-.295-1.529-.497-2.749-.558C15.521.013 15.094 0 11.614 0H12.017zm-.056 5.487c3.426 0 6.204 2.778 6.204 6.204 0 3.426-2.778 6.204-6.204 6.204-3.426 0-6.204-2.778-6.204-6.204 0-3.426 2.778-6.204 6.204-6.204zm0 10.230c2.222 0 4.025-1.803 4.025-4.026S14.183 7.665 11.961 7.665c-2.222 0-4.025 1.803-4.025 4.026s1.803 4.025 4.025 4.025zM19.539 5.287c0 .8-.649 1.449-1.449 1.449-.8 0-1.449-.649-1.449-1.449 0-.8.649-1.449 1.449-1.449.8 0 1.449.649 1.449 1.449z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>

                  {/* YouTube */}
                  <Link
                    href="/coming-soon"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <span className="sr-only">YouTube</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>

                  {/* Facebook */}
                  <Link
                    href="/coming-soon"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  Follow us for updates and news
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>© 2025 ThreadUp</span>
                  <span>•</span>
                  <span>Made with ❤️</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <select className="bg-transparent border-none text-muted-foreground cursor-pointer">
                    <option>English</option>
                    <option>Español</option>
                    <option>Français</option>
                    <option>Deutsch</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </footer>
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
              </div>

              {/* Post Feed - Center */}
              <div className="flex-1 max-w-2xl">
                <PostFeed />
              </div>

              {/* Right Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-20 space-y-6">
                  {/* Followers/Following Card */}
                  {isAuthenticated && user && (
                    <FollowersCard />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
