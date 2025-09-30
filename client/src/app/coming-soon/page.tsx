'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ComingSoonPage() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-1 flex items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: "var(--color-background, #ffffff)" }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <div className="animate-pulse">
                <svg 
                  className="w-12 h-12 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
            </div>
            {/* Floating dots animation */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Main Content */}
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--color-foreground, #0f172a)' }}
          >
            🚧 Coming Soon!
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-8 leading-relaxed"
            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
          >
            This feature is currently under development. 
            We're working hard to bring it to you soon!
          </p>

          {/* Feature Status */}
          <div 
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: 'var(--color-primary, #3b82f6)'
            }}
          >
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">In Development</span>
          </div>

          {/* What to expect */}
          <div 
            className="rounded-xl border p-6 mb-8 text-left max-w-md mx-auto"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              borderColor: 'var(--color-border, #e2e8f0)'
            }}
          >
            <h3 
              className="text-lg font-bold mb-4 text-center"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              What to Expect
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Carefully designed user experience
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Privacy-first implementation
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Thoroughly tested functionality
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Community feedback integration
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={goBack}
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
              ← Go Back
            </button>
            
            <Link href="/" className="block">
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
                🏠 Home
              </button>
            </Link>

            <Link href="/updates" className="block">
              <button
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-muted-foreground, #64748b)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-foreground, #0f172a)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-muted-foreground, #64748b)';
                }}
              >
                📋 View Roadmap
              </button>
            </Link>
          </div>

          {/* Footer Message */}
          <div className="mt-12">
            <p 
              className="text-sm"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Want to stay updated? Follow our progress on{' '}
              <a 
                href="https://github.com/lucasxbron/ThreadUp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline transition-all"
                style={{ color: 'var(--color-primary, #3b82f6)' }}
              >
                GitHub
              </a>{' '}
              or check our{' '}
              <Link 
                href="/updates"
                className="underline hover:no-underline transition-all"
                style={{ color: 'var(--color-primary, #3b82f6)' }}
              >
                updates page
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}