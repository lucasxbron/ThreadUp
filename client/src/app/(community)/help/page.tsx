"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const helpCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      articles: [
        {
          title: "How to create your ThreadUp account",
          description: "Step-by-step guide to signing up and getting started",
          content: `
            1. Go to threadup.com and click "Sign up"
            2. Enter your first name, last name, email, and password
            3. Check your email for verification link
            4. Click the verification link to activate your account
            5. You're ready to start using ThreadUp!
          `,
        },
        {
          title: "Setting up your profile",
          description: "Complete your profile with photo and information",
          content: `
            1. Click on your profile icon in the top right
            2. Select "Profile" from the dropdown
            3. Click "Upload Avatar" to add a profile picture
            4. Use our built-in cropping tool to adjust your photo
            5. Your profile is now complete!
          `,
        },
        {
          title: "Understanding your feed",
          description: "Learn how posts appear and how to navigate",
          content: `
            Your ThreadUp feed shows:
            • Posts from people you follow
            • Posts sorted by most recent
            • Like and comment on posts you enjoy
            • Use the filter options to customize your view
          `,
        },
      ],
    },
    {
      id: "posts-content",
      title: "Posts & Content",
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
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
      articles: [
        {
          title: "How to create a post",
          description: "Share your thoughts and images with the community",
          content: `
            1. Click the "Create Post" button or the + icon
            2. Type your message (up to character limit)
            3. Optionally add an image by clicking the photo icon
            4. Add emojis using the emoji picker
            5. Click "Post" to share with your followers
          `,
        },
        {
          title: "Adding images to posts",
          description: "Upload and share photos in your posts",
          content: `
            • Click the image icon when creating a post
            • Select an image from your device
            • Images are automatically resized for optimal viewing
            • You can add text along with your image
            • Multiple images per post are supported
          `,
        },
        {
          title: "Liking and commenting",
          description: "Interact with posts from other users",
          content: `
            • Click the heart icon to like a post
            • Click the comment icon to add a comment
            • You can like comments from other users
            • Use emojis in your comments
            • Edit or delete your own comments
          `,
        },
        {
          title: "Deleting your posts",
          description: "Remove posts you no longer want to share",
          content: `
            1. Go to the post you want to delete
            2. Click the three dots menu on your post
            3. Select "Delete Post"
            4. Confirm the deletion
            5. The post will be permanently removed
          `,
        },
      ],
    },
    {
      id: "following-connections",
      title: "Following & Connections",
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      articles: [
        {
          title: "How to follow other users",
          description: "Connect with friends and interesting people",
          content: `
            1. Search for users or browse suggestions
            2. Visit their profile page
            3. Click the "Follow" button
            4. Their posts will now appear in your feed
            5. You can unfollow at any time by clicking "Unfollow"
          `,
        },
        {
          title: "Managing your followers",
          description: "See who follows you and manage connections",
          content: `
            • View your followers in the "Followers" section of your profile
            • See who you're following in the "Following" section
            • Check mutual connections and relationships
            • Your follower count is displayed on your profile
          `,
        },
        {
          title: "Finding people to follow",
          description: "Discover new users and build your network",
          content: `
            • Check the "Suggestions" card for recommended users
            • Look at who your friends are following
            • Browse through comments on posts you enjoy
            • Follow users whose content interests you
          `,
        },
      ],
    },
    {
      id: "account-settings",
      title: "Account & Settings",
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
        </svg>
      ),
      articles: [
        {
          title: "Changing your email address",
          description: "Update your account email safely and securely",
          content: `
            1. Go to your Profile page
            2. Find the "Change Email Address" section
            3. Enter your new email address
            4. Click "Change Email Address"
            5. Check your new email and click the verification link
            6. Your email will be updated once verified
          `,
        },
        {
          title: "Updating your password",
          description: "Keep your account secure with a strong password",
          content: `
            1. Go to your Profile page
            2. Find the "Password Settings" section
            3. Enter your current password
            4. Type your new password (must be at least 6 characters)
            5. Confirm your new password
            6. Click "Update Password"
          `,
        },
        {
          title: "Changing your profile picture",
          description: "Update your avatar with a new photo",
          content: `
            1. Go to your Profile page
            2. Click "Upload Avatar" 
            3. Select a new image from your device
            4. Use the cropping tool to adjust the image
            5. Click "Save" to update your profile picture
            6. Your new avatar will appear across ThreadUp
          `,
        },
        {
          title: "Switching between light and dark mode",
          description: "Choose your preferred visual theme",
          content: `
            • Click the theme toggle button in the header
            • Choose between Light and Dark mode
            • Your preference is automatically saved
            • The theme applies across all pages
            • Switch anytime by clicking the theme button again
          `,
        },
      ],
    },
    {
      id: "safety-privacy",
      title: "Safety & Privacy",
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
      articles: [
        // {
        //   title: 'Reporting inappropriate content',
        //   description: 'Help keep ThreadUp safe by reporting violations',
        //   content: `
        //     If you see content that violates our Community Guidelines:
        //     1. Click the three dots menu on the post or comment
        //     2. Select "Report"
        //     3. Choose the reason for reporting
        //     4. Add any additional details
        //     5. Submit the report

        //     Our team reviews reports within 24-48 hours.
        //   `
        // },
        {
          title: "What information we collect",
          description: "Understand ThreadUp's data practices",
          content: `
            ThreadUp only collects:
            • Your first and last name
            • Email address (for account verification)
            • Posts, comments, and likes you create
            • Basic authentication cookies for login
            
            We DO NOT collect:
            • Location data or browsing history
            • Data from other websites
            • Personal information beyond what you provide
          `,
        },
        {
          title: "Deleting your account",
          description: "Permanently remove your ThreadUp account",
          content: `
            ⚠️ This action cannot be undone!
            
            1. Go to your Profile page
            2. Scroll to "Danger Zone"
            3. Click "Delete My Account"
            4. Click "Yes, Delete My Account" to confirm
            
            All your posts, comments, and data will be permanently removed.
          `,
        },
        {
          title: "Staying safe online",
          description: "Best practices for social media safety",
          content: `
            • Never share passwords, addresses, or phone numbers
            • Be cautious about sharing personal information
            • Don't click suspicious links from unknown users
            • Report any harassment or inappropriate behavior
            • Take breaks from social media when needed
            • Trust your instincts about online interactions
          `,
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
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
      articles: [
        {
          title: "Can't log in to your account",
          description: "Solutions for login problems",
          content: `
            If you can't log in:
            1. Check your email and password are correct
            2. Make sure your email is verified (check your inbox)
            3. Try clearing your browser cookies
            4. Disable browser extensions temporarily
            5. Try a different browser or incognito mode
            
            Still having trouble? Contact our support team.
          `,
        },
        {
          title: "Images not uploading",
          description: "Fix problems with photo uploads",
          content: `
            If images won't upload:
            • Check your internet connection
            • Make sure the image file isn't too large
            • Try a different image format (JPG, PNG, GIF)
            • Refresh the page and try again
            • Clear your browser cache
            • Try uploading from a different device
          `,
        },
        {
          title: "Posts not appearing in feed",
          description: "Why you might not see expected posts",
          content: `
            Posts might not appear if:
            • You're not following the user who posted
            • The post was deleted by the user
            • There's a temporary loading issue
            • Your internet connection is slow
            
            Try refreshing the page or checking back later.
          `,
        },
        {
          title: "Email verification not working",
          description: "Issues with email confirmation",
          content: `
            If you didn't receive a verification email:
            1. Check your spam/junk folder
            2. Make sure you entered the correct email
            3. Wait a few minutes - emails can be delayed
            4. Try requesting a new verification email
            5. Add threadup.com to your email contacts
            
            Contact support if you still don't receive it.
          `,
        },
      ],
    },
  ];

  const filteredCategories = helpCategories.filter(
    (category) => activeCategory === "all" || category.id === activeCategory
  );

  const filteredArticles = filteredCategories.flatMap((category) =>
    category.articles
      .filter(
        (article) =>
          searchQuery === "" ||
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((article) => ({
        ...article,
        categoryTitle: category.title,
        categoryIcon: category.icon,
      }))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Help Center
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto mb-8"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Find answers to common questions and learn how to make the most of
              ThreadUp.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: "var(--color-card, #ffffff)",
                    borderColor: "var(--color-border, #e2e8f0)",
                    color: "var(--color-foreground, #0f172a)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
              }`}
            >
              All Topics
            </button>
            {helpCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Help Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {(searchQuery
              ? filteredArticles
              : filteredCategories.flatMap((cat) =>
                  cat.articles.map((article) => ({
                    ...article,
                    categoryTitle: cat.title,
                    categoryIcon: cat.icon,
                  }))
                )
            ).map((article, index) => (
              <div
                key={index}
                className="rounded-xl border p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                style={{
                  backgroundColor: "var(--color-card, #ffffff)",
                  borderColor: "var(--color-border, #e2e8f0)",
                }}
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "var(--color-primary, #3b82f6)",
                      color: "white",
                    }}
                  >
                    {article.categoryIcon}
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-xs font-medium mb-1"
                      style={{ color: "var(--color-primary, #3b82f6)" }}
                    >
                      {article.categoryTitle}
                    </div>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {article.description}
                    </p>
                  </div>
                </div>
                <div
                  className="border-t pt-4 mt-4"
                  style={{ borderColor: "var(--color-border, #e2e8f0)" }}
                >
                  <div
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    {article.content.trim()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
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
              Still Need Help?
            </h2>
            <p
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Can&apos;t find what you&apos;re looking for? Our support team is
              here to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/safety" className="block">
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
                  Safety Center
                </button>
              </Link>
              <Link href="/guidelines" className="block">
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
                  Community Guidelines
                </button>
              </Link>
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
