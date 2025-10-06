'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      title: "Privacy First",
      description: "We believe your data belongs to you. ThreadUp collects only what's necessary and nothing more.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "var(--color-success, #22c55e)"
    },
    {
      title: "Open Source",
      description: "Complete transparency through open source development. Every line of code is available for inspection.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: "var(--color-foreground, #0f172a)"
    },
    {
      title: "Community Driven",
      description: "Built with and for the community. Every feature and decision is guided by user feedback.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "var(--color-purple, #a855f7)"
    },
    {
      title: "Modern & Simple",
      description: "Clean, intuitive design that focuses on what matters most - your content and connections.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "var(--color-primary, #3b82f6)"
    }
  ];

  const features = [
    {
      title: "Share Your Thoughts",
      description: "Create text and image posts to share with your followers. Express yourself authentically.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      title: "Connect with Others",
      description: "Follow friends and discover interesting people. Build meaningful connections.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      title: "Engage & Interact",
      description: "Like, comment, and have conversations. Build community through genuine interaction.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Stay Safe",
      description: "Comprehensive safety tools and community guidelines keep ThreadUp a positive space.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Light & Dark Themes",
      description: "Choose the look that's right for you with beautiful light and dark mode themes.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    },
    {
      title: "Mobile-First Design",
      description: "ThreadUp works beautifully on any device, from phones to desktops.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

//   const milestones = [
//     {
//       date: "October 2025",
//       title: "ThreadUp Launch",
//       description: "ThreadUp goes live with core features for sharing, following, and connecting.",
//       status: "completed"
//     },
//     {
//       date: "2026",
//       title: "Enhanced Safety Tools",
//       description: "Advanced reporting and moderation features to keep the community safe.",
//       status: "planned"
//     },
//     {
//       date: "2026",
//       title: "Mobile Applications",
//       description: "Native iOS and Android apps for the best mobile experience.",
//       status: "planned"
//     },
//     {
//       date: "2026",
//       title: "Advanced Features",
//       description: "Groups, events, and enhanced privacy controls.",
//       status: "planned"
//     }
//   ];

  const stats = [
    {
      number: "100%",
      label: "Open Source",
      description: "Every line of code is transparent"
    },
    {
      number: "2",
      label: "Data Points",
      description: "Only name and email collected"
    },
    {
      number: "0",
      label: "Ads",
      description: "Clean, distraction-free experience"
    },
    {
      number: "24/7",
      label: "Community Support",
      description: "Always here to help"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-1 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              About ThreadUp
            </h1>
            <p 
              className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              ThreadUp is a privacy-first social platform designed to bring people together 
              without compromising their personal data. Built in the open, for the community.
            </p>
          </div>

          {/* Mission Statement */}
          <div 
            className="rounded-2xl border p-8 md:p-12 mb-16 text-center"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderColor: 'rgba(59, 130, 246, 0.2)'
            }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Our Mission
            </h2>
            <p 
              className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              To create a social platform that respects user privacy, promotes authentic connections, 
              and operates with complete transparency. We believe social media should bring out the best in people, 
              not exploit them for profit.
            </p>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 
              className="text-2xl md:text-3xl font-bold text-center mb-12"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="rounded-xl border p-6 hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ color: value.color, backgroundColor: `${value.color}15` }}
                    >
                      {value.icon}
                    </div>
                    <div>
                      <h3 
                        className="text-xl font-bold mb-3"
                        style={{ color: 'var(--color-foreground, #0f172a)' }}
                      >
                        {value.title}
                      </h3>
                      <p 
                        className="leading-relaxed"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="mb-16">
            <h2 
              className="text-2xl md:text-3xl font-bold text-center mb-4"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              What Makes Us Different
            </h2>
            <p 
              className="text-lg text-center mb-12 max-w-3xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              ThreadUp is built differently from the ground up, prioritizing user experience over profit.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl border"
                  style={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                >
                  <div 
                    className="text-3xl md:text-4xl font-bold mb-2"
                    style={{ color: 'var(--color-primary, #3b82f6)' }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--color-foreground, #0f172a)' }}
                  >
                    {stat.label}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                  >
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison */}
            <div 
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--color-card, #ffffff)',
                borderColor: 'var(--color-border, #e2e8f0)'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 
                    className="text-lg font-bold mb-4 flex items-center"
                    style={{ color: 'var(--color-destructive, #ef4444)' }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Traditional Social Media
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                    <li>• Collects vast amounts of personal data</li>
                    <li>• Sells user data to advertisers</li>
                    <li>• Closed-source, no transparency</li>
                    <li>• Algorithmic manipulation for engagement</li>
                    <li>• Ad-driven revenue model</li>
                    <li>• Complex privacy settings</li>
                  </ul>
                </div>
                <div>
                  <h3 
                    className="text-lg font-bold mb-4 flex items-center"
                    style={{ color: 'var(--color-success, #22c55e)' }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ThreadUp
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                    <li>• Only collects name and email</li>
                    <li>• Never sells or shares user data</li>
                    <li>• Completely open source</li>
                    <li>• Chronological, unmanipulated timeline</li>
                    <li>• Community-driven development</li>
                    <li>• Privacy by design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="mb-16">
            <h2 
              className="text-2xl md:text-3xl font-bold text-center mb-12"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              What You Can Do on ThreadUp
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl border hover:shadow-lg transition-shadow duration-300"
                  style={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'var(--color-primary, #3b82f6)', color: 'white' }}
                  >
                    {feature.icon}
                  </div>
                  <h3 
                    className="text-lg font-bold mb-3"
                    style={{ color: 'var(--color-foreground, #0f172a)' }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          {/* <div className="mb-16">
            <h2 
              className="text-2xl md:text-3xl font-bold text-center mb-4"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Our Journey
            </h2>
            <p 
              className="text-lg text-center mb-12 max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Here's what we've accomplished and where we're heading.
            </p>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4 mb-8">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      milestone.status === 'completed' 
                        ? 'bg-green-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    {milestone.status === 'completed' ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div 
                      className="text-sm font-medium mb-1"
                      style={{ color: 'var(--color-primary, #3b82f6)' }}
                    >
                      {milestone.date}
                    </div>
                    <h3 
                      className="text-lg font-bold mb-2"
                      style={{ color: 'var(--color-foreground, #0f172a)' }}
                    >
                      {milestone.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                    >
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Call to Action */}
          <div 
            className="rounded-2xl border p-8 text-center"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderColor: 'rgba(59, 130, 246, 0.2)'
            }}
          >
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Join the ThreadUp Community
            </h3>
            <p 
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Experience social networking that respects your privacy and puts community first. 
              Join thousands of users who've made ThreadUp their digital home.
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
                  Get Started Today
                </button>
              </Link>
              <Link href="/developers" className="block">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors border"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--color-foreground, #0f172a)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  View on GitHub
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}