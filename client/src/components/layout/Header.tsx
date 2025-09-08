"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/Button";
import { NoSSR } from "@/components/ui/NoSSR";

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme } = useTheme(); // Get current theme from context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (dropdownOpen && !target.closest('[data-dropdown]')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg transition-colors cursor-pointer hover:scale-105 transform duration-200"
        style={{ 
          color: 'var(--color-muted-foreground, #64748b)',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
          e.currentTarget.style.color = 'var(--color-foreground, #0f172a)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--color-muted-foreground, #64748b)';
        }}
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
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
        ) : (
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
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </button>
    );
  };

  // Get theme-aware background colors
  const getHeaderBackground = () => {
    const isDark = theme === 'dark';
    
    if (isScrolled) {
      return isDark 
        ? 'rgba(30, 36, 51, 0.8)' // Dark mode scrolled - semi-transparent dark
        : 'rgba(255, 255, 255, 0.8)'; // Light mode scrolled - semi-transparent white
    } else {
      return isDark 
        ? '#1e2433' // Dark mode default - solid dark
        : '#ffffff'; // Light mode default - solid white
    }
  };

  const getHeaderBorderColor = () => {
    const isDark = theme === 'dark';
    
    if (isScrolled) {
      return isDark 
        ? 'rgba(51, 65, 85, 0.5)' // Dark mode scrolled border
        : 'rgba(226, 232, 240, 0.5)'; // Light mode scrolled border
    } else {
      return isDark 
        ? '#334155' // Dark mode default border
        : '#e2e8f0'; // Light mode default border
    }
  };

  return (
    <header 
      className="sticky top-0 z-50 transition-all duration-300 border-b"
      style={{
        backgroundColor: getHeaderBackground(),
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderColor: getHeaderBorderColor(),
        boxShadow: isScrolled 
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition-opacity duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span 
                className="text-xl font-bold"
                style={{ color: 'var(--color-foreground, #0f172a)' }}
              >
                ThreadUp
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <NoSSR>
              <ThemeToggle />
            </NoSSR>

            {isAuthenticated ? (
              <div className="relative" data-dropdown>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 transform"
                  style={{ 
                    color: 'var(--color-muted-foreground, #64748b)',
                    backgroundColor: dropdownOpen ? 'var(--color-secondary, #f1f5f9)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!dropdownOpen) {
                      e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                      e.currentTarget.style.color = 'var(--color-foreground, #0f172a)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!dropdownOpen) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--color-muted-foreground, #64748b)';
                    }
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-semibold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span 
                    className="text-sm font-medium hidden sm:block"
                    style={{ color: 'inherit' }}
                  >
                    {user?.username}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg border py-2 z-50 animate-fade-in"
                    style={{
                      backgroundColor: 'var(--color-card, #ffffff)',
                      borderColor: 'var(--color-border, #e2e8f0)',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    {/* User Info Header */}
                    <div 
                      className="px-4 py-3 border-b"
                      style={{ borderColor: 'var(--color-border, #e2e8f0)' }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white text-sm font-semibold">
                            {user?.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p 
                            className="text-sm font-semibold truncate"
                            style={{ color: 'var(--color-foreground, #0f172a)' }}
                          >
                            {user?.username}
                          </p>
                          <p 
                            className="text-xs truncate"
                            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                          >
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                          e.currentTarget.style.color = 'var(--color-foreground, #0f172a)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--color-muted-foreground, #64748b)';
                        }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Link>

                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                          e.currentTarget.style.color = 'var(--color-foreground, #0f172a)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--color-muted-foreground, #64748b)';
                        }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>

                      <Link
                        href="/help"
                        className="flex items-center px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                          e.currentTarget.style.color = 'var(--color-foreground, #0f172a)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--color-muted-foreground, #64748b)';
                        }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Help & Support
                      </Link>

                      {/* Divider */}
                      <div 
                        className="my-1 border-t"
                        style={{ borderColor: 'var(--color-border, #e2e8f0)' }}
                      />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
                        style={{ color: 'var(--color-destructive, #ef4444)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="cursor-pointer">
                  <Button
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" className="cursor-pointer">
                  <Button
                    variant="primary"
                    className="cursor-pointer"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};