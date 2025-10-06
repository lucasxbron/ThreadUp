"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { apiClient } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

function VerifyEmailChangeContent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const { refreshProfile } = useAuth();

  useEffect(() => {
    if (token) {
      verifyEmailChange(token);
    }
  }, [token]);

  const verifyEmailChange = async (verificationToken: string) => {
    setLoading(true);
    const response = await apiClient.verifyEmailChange(verificationToken);

    if (response.data) {
      setVerified(true);
      setNewEmail(response.data.user?.email || "");
      setMessage("Your email address has been successfully updated!");

      // Refresh the user profile to get updated data
      await refreshProfile();
    } else {
      setError(response.error || "Email verification failed");
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
              <span className="text-white font-bold text-lg md:text-xl">T</span>
            </div>
          </div>

          <div className="animate-spin rounded-full h-8 w-8 mx-auto border-2 border-transparent border-t-blue-600"></div>

          <div>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Verifying Email Change
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Please wait while we update your email address...
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
            <div className="flex justify-center mb-4">
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
              Email Updated!
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Your email address has been successfully changed to{" "}
              <strong>{newEmail}</strong>
            </p>
          </div>

          {/* Success Message */}
          <div
            className="border rounded-lg p-4 text-center"
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              borderColor: "rgba(34, 197, 94, 0.3)",
              color: "var(--color-success, #22c55e)",
            }}
          >
            <p className="text-sm font-medium">{message}</p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link href="/profile" className="block">
              <Button variant="primary" className="w-full">
                Go to Profile
              </Button>
            </Link>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm font-medium hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Return to Home
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
                <span className="text-white font-bold text-lg md:text-xl">
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
              className="text-xl md:text-2xl font-bold mb-2"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Verification Failed
            </h2>
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
            <p className="text-sm font-medium">{error}</p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link href="/profile" className="block">
              <Button variant="primary" className="w-full">
                Back to Profile
              </Button>
            </Link>

            <div className="text-center">
              <Link
                href="/"
                className="text-sm font-medium hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Return to Home
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
              <span className="text-white font-bold text-lg md:text-xl">T</span>
            </div>
          </div>

          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "var(--color-foreground, #0f172a)" }}
          >
            Invalid Link
          </h2>
          <p
            className="mt-2 text-sm md:text-base"
            style={{ color: "var(--color-muted-foreground, #64748b)" }}
          >
            This email verification link is invalid or has expired.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link href="/profile" className="block">
            <Button variant="primary" className="w-full">
              Go to Profile
            </Button>
          </Link>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm font-medium hover:underline"
              style={{ color: "var(--color-primary, #3b82f6)" }}
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function VerifyEmailChangeFallback() {
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
            <span className="text-white font-bold text-lg md:text-xl">T</span>
          </div>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 mx-auto border-2 border-transparent border-t-blue-600"></div>
        <div>
          <h2
            className="text-xl md:text-2xl font-bold"
            style={{ color: "var(--color-foreground, #0f172a)" }}
          >
            Loading...
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailChangePage() {
  return (
    <Suspense fallback={<VerifyEmailChangeFallback />}>
      <VerifyEmailChangeContent />
    </Suspense>
  );
}