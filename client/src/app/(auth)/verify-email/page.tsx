"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/utils/api";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setLoading(true);
    const response = await apiClient.verifyEmail(verificationToken);

    if (response.data || response.message) {
      setVerified(true);
      setMessage(
        "Your email has been successfully verified! You can now log in."
      );
    } else {
      setError(response.error || "Verification failed");
    }

    setLoading(false);
  };

  if (loading && token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="w-full max-w-sm sm:max-w-md space-y-6 md:space-y-8 p-6 md:p-8 rounded-xl shadow-lg border text-center"
          style={{
            backgroundColor: "var(--color-card, #ffffff)",
            borderColor: "var(--color-border, #e2e8f0)",
          }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl md:text-2xl">
                T
              </span>
            </div>
          </div>

          <div className="animate-spin rounded-full h-8 w-8 mx-auto border-2 border-transparent border-t-blue-600"></div>

          <div>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Verifying Email
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="w-full max-w-sm sm:max-w-md space-y-6 md:space-y-8 p-6 md:p-8 rounded-xl shadow-lg border"
          style={{
            backgroundColor: "var(--color-card, #ffffff)",
            borderColor: "var(--color-border, #e2e8f0)",
          }}
        >
          {/* Logo and Success Icon */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                <Image
                  src="/threadup_icon_gradient.svg"
                  alt="ThreadUp"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>

            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
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
            </div>

            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Email Verified!
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link href="/login" className="block">
              <Button className="w-full py-3 text-base md:text-sm font-medium">
                Continue to Login
              </Button>
            </Link>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="w-full max-w-sm sm:max-w-md space-y-6 md:space-y-8 p-6 md:p-8 rounded-xl shadow-lg border"
          style={{
            backgroundColor: "var(--color-card, #ffffff)",
            borderColor: "var(--color-border, #e2e8f0)",
          }}
        >
          {/* Logo and Error Icon */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl md:text-2xl">
                  T
                </span>
              </div>
            </div>

            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Verification Failed
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              {error}
            </p>
          </div>

          {/* Error Message */}
          <div
            className="border rounded-lg p-3 text-center"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              borderColor: "rgba(239, 68, 68, 0.3)",
              color: "var(--color-destructive, #ef4444)",
            }}
          >
            <p className="text-sm">
              The verification link may be expired or invalid. Please try
              registering again or contact support.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link href="/register" className="block">
              <Button className="w-full py-3 text-base md:text-sm font-medium">
                Register Again
              </Button>
            </Link>

            <div className="text-center space-y-2">
              <Link
                href="/login"
                className="block text-sm underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Back to Login
              </Link>
              <Link
                href="/"
                className="block text-sm underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default state - no token provided
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        className="w-full max-w-sm sm:max-w-md space-y-6 md:space-y-8 p-6 md:p-8 rounded-xl shadow-lg border"
        style={{
          backgroundColor: "var(--color-card, #ffffff)",
          borderColor: "var(--color-border, #e2e8f0)",
        }}
      >
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl md:text-2xl">
                T
              </span>
            </div>
          </div>

          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "var(--color-foreground, #0f172a)" }}
          >
            Check Your Email
          </h2>
          <p
            className="mt-2 text-sm md:text-base"
            style={{ color: "var(--color-muted-foreground, #64748b)" }}
          >
            We've sent you a verification email. Please click the link in your
            email to verify your account.
          </p>
        </div>

        {/* Info Message */}
        <div
          className="border rounded-lg p-4 text-center"
          style={{
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderColor: "rgba(59, 130, 246, 0.3)",
            color: "var(--color-primary, #3b82f6)",
          }}
        >
          <p className="text-sm">
            <strong>Important:</strong> Check your spam folder if you don't see
            the email in your inbox.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="text-center space-y-3">
            <p
              className="text-sm"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Didn't receive the email?
            </p>

            <Link href="/register" className="block">
              <Button
                variant="secondary"
                className="w-full py-3 text-base md:text-sm font-medium"
              >
                Try Registering Again
              </Button>
            </Link>

            <Link
              href="/login"
              className="block text-sm underline hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-primary, #3b82f6)" }}
            >
              Already verified? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
