"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function LoginPage() {
  // TOGGLE DEMO BANNER - Set to false to hide
  const SHOW_DEMO_BANNER = true;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await login(email.trim(), password);

      // Handle the correct response format: {success: boolean, error?: string}
      if (result && typeof result === "object" && result.success === true) {
        // Login successful - redirect to home
        router.push("/");
      } else {
        // Login failed - extract error message
        let errorMessage = "Invalid email or password";

        if (result && typeof result === "object" && result.error) {
          errorMessage = result.error;
        }

        setError(errorMessage);
      }
    } catch (err) {
      // Handle different error formats
      let errorMessage = "Login failed. Please try again.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      } else if (err && typeof err === "object" && "message" in err) {
        errorMessage = String((err as { message: unknown }).message);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill demo credentials
  const handleDemoFill = () => {
    setEmail("demo@example.com");
    setPassword("Demo123!");
  };

  return (
    <>
      {/* Global CSS for input styling */}
      <style jsx global>{`
        .login-input {
          background-color: var(--color-card, #ffffff) !important;
          color: var(--color-foreground, #0f172a) !important;
          border: 1px solid var(--color-border, #e2e8f0) !important;
        }

        .login-input:focus {
          border-color: var(--color-primary, #3b82f6) !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }

        .login-input::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }

        .dark .login-input {
          background-color: var(--color-card, #1e2433) !important;
          color: var(--color-foreground, #f8fafc) !important;
          border-color: var(--color-border, #334155) !important;
        }

        .dark .login-input::placeholder {
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
              Welcome back
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Sign in to your ThreadUp account
            </p>
          </div>

          {/* DEMO ACCOUNT BANNER - Remove this entire block to disable */}
          {SHOW_DEMO_BANNER && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎭</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                    Try Demo Account
                  </h3>
                  <p className="text-xs text-blue-800 dark:text-blue-200 mb-3">
                    Experience ThreadUp without registration.
                  </p>
                  <div
                    className="rounded border p-3 space-y-2 mb-3"
                    style={{
                      backgroundColor: "var(--color-card, #ffffff)",
                      borderColor: "var(--color-border, #e2e8f0)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Email:
                      </span>
                      <code
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: "var(--color-muted, #f1f5f9)",
                          color: "var(--color-foreground, #0f172a)",
                        }}
                      >
                        demo@example.com
                      </code>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Password:
                      </span>
                      <code
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: "var(--color-muted, #f1f5f9)",
                          color: "var(--color-foreground, #0f172a)",
                        }}
                      >
                        Demo123!
                      </code>
                    </div>
                  </div>
                  <button
                    onClick={handleDemoFill}
                    type="button"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    → Auto-fill demo credentials
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
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

            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input w-full px-3 py-3 md:py-2 rounded-lg transition-colors duration-200"
                disabled={loading}
                style={{
                  fontSize: "16px",
                }}
              />
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input w-full px-3 py-3 md:py-2 pr-10 rounded-lg transition-colors duration-200"
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

            <Button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              loading={loading}
              className="w-full py-3 text-base md:text-sm font-medium"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Links */}
          <div className="text-center space-y-3">
            <p
              className="text-sm"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Sign up
              </Link>
            </p>

            <Link
              href="/forgot-password"
              className="block text-sm font-medium underline hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-primary, #3b82f6)" }}
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
