"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function RegisterPage() {
  // TOGGLE REGISTRATION - Set to false to enable registration
  const REGISTRATION_CLOSED = true;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length (keep original 6 characters)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Add username validation for first/last name registration
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return;
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await register(
        formData.firstName.trim(),
        formData.lastName.trim(),
        formData.username.trim(),
        formData.email.trim(),
        formData.password
      );

      // Handle the correct response format: {success: boolean, error?: string}
      if (result && typeof result === "object" && result.success === true) {
        // Registration successful - redirect to verification or home
        router.push("/verify-email");
      } else {
        // Registration failed - extract error message
        let errorMessage = "Registration failed. Please try again.";

        if (result && typeof result === "object" && result.error) {
          errorMessage = result.error;
        }

        setError(errorMessage);
      }
    } catch (err) {
      // Handle different error formats
      let errorMessage = "Registration failed. Please try again.";

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

  // REGISTRATION CLOSED VIEW - Remove entire if block to enable registration
  if (REGISTRATION_CLOSED) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="w-full max-w-sm sm:max-w-md space-y-6 md:space-y-8 p-6 md:p-8 rounded-xl shadow-lg border"
          style={{
            backgroundColor: "var(--color-card, #ffffff)",
            borderColor: "var(--color-border, #e2e8f0)",
          }}
        >
          {/* Logo */}
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
              Registration Closed
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              New registrations are temporarily unavailable
            </p>
          </div>

          {/* Demo Account Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎭</span>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Try Our Demo Account
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  Experience ThreadUp without creating an account. Demo data
                  resets every 24 hours.
                </p>
                <div className="bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-700 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email:
                    </span>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      demo@example.com
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password:
                    </span>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      Demo123!
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link href="/login" className="block">
              <Button className="w-full py-3 text-base md:text-sm font-medium">
                Go to Login
              </Button>
            </Link>

            <div className="text-center">
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Questions?{" "}
                <Link
                  href="/contact"
                  className="font-medium underline hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-primary, #3b82f6)" }}
                >
                  Contact us
                </Link>
              </p>
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
        .register-input {
          background-color: var(--color-card, #ffffff) !important;
          color: var(--color-foreground, #0f172a) !important;
          border: 1px solid var(--color-border, #e2e8f0) !important;
        }

        .register-input:focus {
          border-color: var(--color-primary, #3b82f6) !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }

        .register-input::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }

        .dark .register-input {
          background-color: var(--color-card, #1e2433) !important;
          color: var(--color-foreground, #f8fafc) !important;
          border-color: var(--color-border, #334155) !important;
        }

        .dark .register-input::placeholder {
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
              Join ThreadUp
            </h2>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Create your account to get started
            </p>
          </div>

          {/* Register Form */}
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

            {/* First and Last Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="register-input w-full px-3 py-3 md:py-2 rounded-lg transition-colors duration-200"
                  disabled={loading}
                  style={{
                    fontSize: "16px", // Prevent iOS zoom
                  }}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="register-input w-full px-3 py-3 md:py-2 rounded-lg transition-colors duration-200"
                  disabled={loading}
                  style={{
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>

            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="register-input w-full px-3 py-3 md:py-2 rounded-lg transition-colors duration-200"
                disabled={loading}
                style={{
                  fontSize: "16px",
                }}
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="register-input w-full px-3 py-3 md:py-2 rounded-lg transition-colors duration-200"
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
                autoComplete="new-password"
                required
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className="register-input w-full px-3 py-3 md:py-2 pr-10 rounded-lg transition-colors duration-200"
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
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="register-input w-full px-3 py-3 md:py-2 pr-10 rounded-lg transition-colors duration-200"
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
              disabled={
                loading ||
                !formData.firstName.trim() ||
                !formData.lastName.trim() ||
                !formData.username.trim() ||
                !formData.email.trim() ||
                !formData.password.trim() ||
                !formData.confirmPassword.trim()
              }
              loading={loading}
              className="w-full py-3 text-base md:text-sm font-medium"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Links */}
          <div className="text-center">
            <p
              className="text-sm"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="text-center">
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
