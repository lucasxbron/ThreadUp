'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';

export default function CookiePolicyPage() {
  const cookieTypes = [
    // {
    //   icon: (
    //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.5-1.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-8.1a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    //     </svg>
    //   ),
    //   title: "Essential Cookies",
    //   description: "Required for basic functionality and security",
    //   purpose: "These cookies are necessary for ThreadUp to function properly and cannot be disabled.",
    //   examples: [
    //     "Authentication tokens to keep you logged in",
    //     "Security tokens to prevent cross-site attacks",
    //     "Session management for your browsing experience",
    //     "Theme preferences (light/dark mode)"
    //   ],
    //   canDisable: false
    // },
    // {
    //   icon: (
    //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    //     </svg>
    //   ),
    //   title: "Functional Cookies",
    //   description: "Enhance your experience with personalized features",
    //   purpose: "These cookies remember your preferences and settings to improve your experience.",
    //   examples: [
    //     "Language preferences",
    //     "Accessibility settings",
    //     "Display preferences and layout choices",
    //     "Notification settings"
    //   ],
    //   canDisable: true
    // }
    {
  icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.5-1.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-8.1a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  ),
  title: "Essential Cookies",
  description: "Required for basic functionality and security",
  purpose: "These cookies are necessary for ThreadUp to function properly and cannot be disabled.",
  examples: [
    "Authentication tokens to keep you logged in",
    "Security tokens to prevent cross-site attacks",
    "Secure session validation and user identification",
    "Server communication for authenticated requests"
  ],
  canDisable: false
}
  ];

  const managementOptions = [
    {
      title: "Browser Settings",
      description: "Most browsers allow you to manage cookies through their settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      )
    },
    // {
    //   title: "Account Settings",
    //   description: "Manage functional cookies through your ThreadUp account preferences",
    //   icon: (
    //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    //     </svg>
    //   )
    // },
    {
      title: "Clear Data",
      description: "You can delete all cookies at any time through your browser",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-1 transition-colors duration-300"
        style={{ backgroundColor: "var(--color-background, #ffffff)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Cookie Policy
            </h1>
            <p 
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              We use minimal cookies to ensure ThreadUp works properly and securely. 
              Here's everything you need to know about our cookie usage.
            </p>
          </div>

          {/* What Are Cookies */}
          <div 
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              borderColor: 'var(--color-border, #e2e8f0)'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              What Are Cookies?
            </h2>
            <p 
              className="mb-4 leading-relaxed"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Cookies are small text files stored on your device when you visit a website. 
              They help websites remember your preferences and provide essential functionality.
            </p>
            <p 
              className="leading-relaxed"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              At ThreadUp, we believe in transparency and minimal data collection. 
              We only use cookies that are absolutely necessary for our service to function properly.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="mb-12">
            <h2 
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Types of Cookies We Use
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {cookieTypes.map((cookie, index) => (
                <div
                  key={index}
                  className="rounded-xl border p-6 hover:shadow-lg transition-shadow duration-300"
                  style={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: cookie.canDisable 
                          ? 'var(--color-secondary, #f1f5f9)' 
                          : 'var(--color-primary, #3b82f6)', 
                        color: cookie.canDisable 
                          ? 'var(--color-primary, #3b82f6)' 
                          : 'white' 
                      }}
                    >
                      {cookie.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 
                          className="text-xl font-bold"
                          style={{ color: 'var(--color-foreground, #0f172a)' }}
                        >
                          {cookie.title}
                        </h3>
                        {!cookie.canDisable && (
                          <span 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: 'var(--color-destructive, #ef4444)', 
                              color: 'white' 
                            }}
                          >
                            Required
                          </span>
                        )}
                      </div>
                      <p 
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        {cookie.description}
                      </p>
                      <p 
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: 'var(--color-foreground, #0f172a)' }}
                      >
                        {cookie.purpose}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 
                      className="font-semibold mb-2"
                      style={{ color: 'var(--color-foreground, #0f172a)' }}
                    >
                      Examples:
                    </h4>
                    <ul className="space-y-1">
                      {cookie.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start space-x-2">
                          <svg 
                            className="w-4 h-4 mt-0.5 flex-shrink-0" 
                            style={{ color: 'var(--color-success, #22c55e)' }}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span 
                            className="text-sm"
                            style={{ color: 'var(--color-foreground, #0f172a)' }}
                          >
                            {example}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We DON'T Use */}
          <div 
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.05)',
              borderColor: 'rgba(34, 197, 94, 0.2)'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              What We DON'T Use
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <svg 
                  className="w-6 h-6 mt-1 flex-shrink-0" 
                  style={{ color: 'var(--color-destructive, #ef4444)' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--color-foreground, #0f172a)' }}>
                    No Tracking Cookies
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                    We don't track your behavior across other websites
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg 
                  className="w-6 h-6 mt-1 flex-shrink-0" 
                  style={{ color: 'var(--color-destructive, #ef4444)' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--color-foreground, #0f172a)' }}>
                    No Analytics Cookies
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                    We don't use Google Analytics or similar services
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg 
                  className="w-6 h-6 mt-1 flex-shrink-0" 
                  style={{ color: 'var(--color-destructive, #ef4444)' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--color-foreground, #0f172a)' }}>
                    No Advertising Cookies
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                    We don't serve targeted ads or use ad networks
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg 
                  className="w-6 h-6 mt-1 flex-shrink-0" 
                  style={{ color: 'var(--color-destructive, #ef4444)' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--color-foreground, #0f172a)' }}>
                    No Third-Party Cookies
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                    We don't allow other companies to set cookies on ThreadUp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Managing Cookies */}
          <div 
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              borderColor: 'var(--color-border, #e2e8f0)'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Managing Your Cookie Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {managementOptions.map((option, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'var(--color-secondary, #f1f5f9)' }}
                  >
                    <div style={{ color: 'var(--color-primary, #3b82f6)' }}>
                      {option.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-foreground, #0f172a)' }}>
                    {option.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div 
            className="rounded-2xl border p-8 text-center"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderColor: 'rgba(59, 130, 246, 0.2)'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Questions About Cookies?
            </h2>
            <p 
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              If you have any questions about our cookie usage or need help managing your preferences, 
              we're here to help. Our commitment is to be transparent about all data practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/" className="block">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: 'var(--color-primary, #3b82f6)',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-600, #2563eb)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary, #3b82f6)';
                  }}
                >
                  Back to ThreadUp
                </button>
              </Link>
              <span 
                className="text-sm"
                style={{ color: 'var(--color-muted-foreground, #64748b)' }}
              >
                Last updated: September 30, 2025
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}