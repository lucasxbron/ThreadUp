'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';

export default function CommunityGuidelinesPage() {
  const guidelines = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Be Respectful",
      description: "Treat everyone with kindness and respect. We're all here to connect and share meaningful experiences.",
      rules: [
        "Use respectful language in all interactions",
        "Be considerate of different opinions and perspectives",
        "Avoid personal attacks, insults, or discriminatory language",
        "Respect cultural, religious, and personal differences"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Keep It Safe",
      description: "ThreadUp should be a safe space for everyone. Help us maintain a secure environment for all users.",
      rules: [
        "No explicit, adult, or sexual content of any kind",
        "Don't share personal information (addresses, phone numbers, etc.)",
        "Report suspicious or harmful behavior immediately",
        "Don't engage with or encourage dangerous activities",
        "Protect minors - no inappropriate content involving anyone under 18"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Stay Authentic",
      description: "Be genuine and honest in your interactions. Authenticity builds trust and meaningful connections.",
      rules: [
        "Use your real identity - no fake accounts or impersonation",
        "Share original content or properly credit sources",
        "Don't spread false information or misinformation",
        "Be honest about your affiliations and sponsorships"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V18.75A.75.75 0 0112 18zM5.636 5.636a.75.75 0 011.061 0l1.06 1.061a.75.75 0 11-1.06 1.06L5.636 6.697a.75.75 0 010-1.06zM16.243 16.243a.75.75 0 011.061 0l1.06 1.061a.75.75 0 11-1.06 1.06l-1.061-1.06a.75.75 0 010-1.061zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM18 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18.75A.75.75 0 0118 12z" />
        </svg>
      ),
      title: "No Harassment",
      description: "Everyone deserves to feel safe and welcome. Help us create a harassment-free environment.",
      rules: [
        "No bullying, intimidation, or threats of any kind",
        "Don't repeatedly contact someone who has asked you to stop",
        "Respect boundaries when someone declines to interact",
        "No doxxing or sharing private information about others",
        "Don't coordinate attacks against other users"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      title: "Respect Content Rights",
      description: "Respect intellectual property and give credit where it's due. Only share content you have the right to post.",
      rules: [
        "Don't post copyrighted content without permission",
        "Give proper credit when sharing others' work",
        "Only post images you have rights to use",
        "Respect privacy - don't post photos of others without consent",
        "Report copyright violations if you see them"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      title: "No Spam or Abuse",
      description: "Keep the platform clean and valuable for everyone by avoiding spam and system abuse.",
      rules: [
        "Don't send unsolicited messages or friend requests in bulk",
        "Avoid repetitive posts or excessive self-promotion",
        "Don't create multiple accounts to evade restrictions",
        "No automated posting or bot-like behavior",
        "Don't abuse the reporting system with false reports"
      ]
    }
  ];

  const reportingSteps = [
    {
      step: "1",
      title: "Identify the Issue",
      description: "Recognize content or behavior that violates our guidelines"
    },
    {
      step: "2", 
      title: "Use Report Button",
      description: "Click the report option on posts, comments, or user profiles"
    },
    {
      step: "3",
      title: "Provide Details",
      description: "Give specific information about the violation to help our review"
    },
    {
      step: "4",
      title: "We Review",
      description: "Our team investigates and takes appropriate action within 24-48 hours"
    }
  ];

  const consequences = [
    {
      level: "Warning",
      description: "First-time minor violations receive a formal warning",
      color: "var(--color-warning, #f59e0b)"
    },
    {
      level: "Temporary Restriction",
      description: "Repeated violations may result in temporary limitations on account features",
      color: "var(--color-primary, #3b82f6)"
    },
    // {
    //   level: "Account Suspension",
    //   description: "Serious violations can lead to temporary account suspension",
    //   color: "var(--color-destructive, #ef4444)"
    // },
    {
      level: "Permanent Ban",
      description: "Severe or repeated serious violations result in permanent account termination",
      color: "var(--color-destructive, #dc2626)"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-1 transition-colors duration-300"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Community Guidelines
            </h1>
            <p 
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              ThreadUp is built on the foundation of respect, authenticity, and meaningful connections. 
              These guidelines help us maintain a safe, welcoming environment for everyone to share, connect, and grow together.
            </p>
          </div>

          {/* Core Values */}
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
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--color-success, #22c55e)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-foreground, #0f172a)' }}>Respect</h3>
                <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                  Every person deserves to be treated with dignity and kindness
                </p>
              </div>
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--color-primary, #3b82f6)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-foreground, #0f172a)' }}>Authenticity</h3>
                <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                  Be genuine and honest in all your interactions and content
                </p>
              </div>
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--color-purple, #a855f7)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-foreground, #0f172a)' }}>Safety</h3>
                <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                  Create a secure environment where everyone can share freely
                </p>
              </div>
            </div>
          </div>

          {/* Guidelines Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {guidelines.map((guideline, index) => (
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
                    style={{ backgroundColor: 'var(--color-primary, #3b82f6)', color: 'white' }}
                  >
                    {guideline.icon}
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ color: 'var(--color-foreground, #0f172a)' }}
                    >
                      {guideline.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                    >
                      {guideline.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {guideline.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start space-x-2">
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
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Reporting Section */}
          {/* <div 
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
              How to Report Violations
            </h2>
            <p 
              className="text-center mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              If you see content or behavior that violates these guidelines, please report it. 
              Your reports help us maintain a safe community for everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reportingSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ 
                      backgroundColor: 'var(--color-primary, #3b82f6)',
                      color: 'white'
                    }}
                  >
                    <span className="font-bold">{step.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-foreground, #0f172a)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Consequences Section */}
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
              Enforcement & Consequences
            </h2>
            <p 
              className="text-center mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              We take violations seriously and apply consequences fairly. 
              The severity of the action depends on the nature and frequency of the violation.
            </p>
            <div className="space-y-4">
              {consequences.map((consequence, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--color-secondary, #f1f5f9)',
                    borderColor: consequence.color
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: consequence.color }}
                  ></div>
                  <div className="flex-1">
                    <h4 className="font-semibold" style={{ color: 'var(--color-foreground, #0f172a)' }}>
                      {consequence.level}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                      {consequence.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Message */}
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
              Thank You for Making ThreadUp Better
            </h2>
            <p 
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              These guidelines are living documents that may be updated as our community grows. 
              By following these guidelines, you're helping create a positive space where meaningful connections can flourish.
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