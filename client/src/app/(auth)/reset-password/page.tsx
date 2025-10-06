"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { apiClient } from "@/utils/api";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 symbol"
      );
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiClient.resetPassword({
        token,
        newPassword: password,
      });

      if (response.data || response.message) {
        setResetSuccess(true);
        setMessage(
          "Your password has been reset successfully! You can now log in with your new password."
        );
      } else {
        setError(
          response.error || "Failed to reset password. Please try again."
        );
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="w-full max-w-sm sm:max-w-md space-y-6 md:space-y-8 p-6 md:p-8 rounded-xl shadow-lg border"
          style={{
            backgroundColor: "var(--color-card, #ffffff)",
            borderColor: "var(--color-border, #e2e8f0)",
          }}
        >
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
              Invalid Reset Link
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              This password reset link is invalid or has expired.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/forgot-password" className="block">
              <Button className="w-full py-3 text-base md:text-sm font-medium">
                Request New Reset Link
              </Button>
            </Link>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (resetSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="w-full max-w-sm sm:max-w-md space-y-6 md:space-y-8 p-6 md:p-8 rounded-xl shadow-lg border"
          style={{
            backgroundColor: "var(--color-card, #ffffff)",
            borderColor: "var(--color-border, #e2e8f0)",
          }}
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl md:text-2xl">
                  T
                </span>
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
              Password Reset!
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              {message}
            </p>
          </div>

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

  return (
    <>
      {/* Global CSS for input styling */}
      <style jsx global>{`
        .reset-input {
          background-color: var(--color-card, #ffffff) !important;
          color: var(--color-foreground, #0f172a) !important;
          border: 1px solid var(--color-border, #e2e8f0) !important;
        }

        .reset-input:focus {
          border-color: var(--color-primary, #3b82f6) !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }

        .reset-input::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }

        .dark .reset-input {
          background-color: var(--color-card, #1e2433) !important;
          color: var(--color-foreground, #f8fafc) !important;
          border-color: var(--color-border, #334155) !important;
        }

        .dark .reset-input::placeholder {
          color: var(--color-muted-foreground, #94a3b8) !important;
          opacity: 0.8 !important;
        }
      `}</style>

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
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Reset Password
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Enter your new password below
            </p>
          </div>

          {/* Reset Password Form */}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div
                className="border rounded-lg p-3 text-center"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  borderColor: "rgba(239, 68, 68, 0.3)",
                  color: "var(--color-destructive, #ef4444)",
                }}
              >
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="New password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="reset-input w-full px-3 py-3 md:py-2 pr-10 rounded-lg transition-colors duration-200"
                disabled={loading}
                style={{
                  fontSize: "16px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="reset-input w-full px-3 py-3 md:py-2 pr-10 rounded-lg transition-colors duration-200"
                disabled={loading}
                style={{
                  fontSize: "16px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading || !password.trim() || !confirmPassword.trim()}
              loading={loading}
              className="w-full py-3 text-base md:text-sm font-medium"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>

          {/* Links */}
          <div className="text-center">
            <Link
              href="/login"
              className="text-sm underline hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-primary, #3b82f6)" }}
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
