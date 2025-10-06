"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/utils/api";

export const EmailChangeCard: React.FC = () => {
  const [formData, setFormData] = useState({
    newEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pendingChange, setPendingChange] = useState(false);

  const { user, refreshProfile } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.newEmail.trim() || !formData.password) {
      setError("Both fields are required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.newEmail.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.newEmail.trim().toLowerCase() === user?.email?.toLowerCase()) {
      setError("New email must be different from current email");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiClient.requestEmailChange({
        newEmail: formData.newEmail.trim(),
        password: formData.password,
      });

      if (response.data || response.message) {
        setSuccess(
          "Verification email sent! Please check your new email address to confirm the change."
        );
        setFormData({ newEmail: "", password: "" });
        setPendingChange(true);

        // Refresh profile to get updated user data
        await refreshProfile();
      } else {
        setError(response.error || "Failed to request email change");
      }
    } catch (err) {
      setError("Failed to request email change. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelChange = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.cancelEmailChange();

      if (response.data || response.message) {
        setSuccess("Email change request cancelled successfully.");
        setPendingChange(false);
        await refreshProfile();
      } else {
        setError(response.error || "Failed to cancel email change");
      }
    } catch (err) {
      setError("Failed to cancel email change. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if user has pending email change
  const hasPendingChange =
    user?.pendingEmail && user.pendingEmail !== user.email;

  return (
    <>
      {/* Global CSS for input styling */}
      <style jsx global>{`
        .email-change-input {
          background-color: var(--color-card, #ffffff) !important;
          color: var(--color-foreground, #0f172a) !important;
          border: 1px solid var(--color-border, #e2e8f0) !important;
        }

        .email-change-input:focus {
          border-color: var(--color-primary, #3b82f6) !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }

        .email-change-input::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }

        .dark .email-change-input {
          background-color: var(--color-card, #1e2433) !important;
          color: var(--color-foreground, #f8fafc) !important;
          border-color: var(--color-border, #334155) !important;
        }

        .dark .email-change-input::placeholder {
          color: var(--color-muted-foreground, #94a3b8) !important;
          opacity: 0.8 !important;
        }
      `}</style>

      <div
        className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border"
        style={{
          backgroundColor: "var(--color-card, #ffffff)",
          borderColor: "var(--color-border, #e2e8f0)",
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--color-secondary, #f1f5f9)" }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--color-card-foreground, #0f172a)" }}
              >
                Change Email Address
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Update your account email address
              </p>
            </div>
          </div>

          {/* Current Email Display */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Current Email Address
            </label>
            <div
              className="px-3 py-3 rounded-lg border"
              style={{
                backgroundColor: "var(--color-muted, #f1f5f9)",
                borderColor: "var(--color-border, #e2e8f0)",
                color: "var(--color-foreground, #0f172a)",
              }}
            >
              {user?.email}
            </div>
          </div>

          {/* Pending Email Change Notice */}
          {hasPendingChange && (
            <div
              className="border rounded-lg p-4 mb-6"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
            >
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "var(--color-primary, #3b82f6)" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary, #3b82f6)" }}
                  >
                    Email Change Pending
                  </p>
                  <p
                    className="text-sm mb-3"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    A verification email has been sent to{" "}
                    <strong>{user?.pendingEmail}</strong>. Please check your
                    email and click the verification link to complete the
                    change.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelChange}
                    disabled={loading}
                    className="text-xs"
                  >
                    Cancel Email Change
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {!hasPendingChange && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Success Message */}
              {success && (
                <div
                  className="border rounded-lg p-3 text-center"
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    borderColor: "rgba(34, 197, 94, 0.3)",
                    color: "var(--color-success, #22c55e)",
                  }}
                >
                  <p className="text-sm font-medium">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
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
              )}

              {/* New Email */}
              <div>
                <label
                  htmlFor="newEmail"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  New Email Address
                </label>
                <input
                  id="newEmail"
                  name="newEmail"
                  type="email"
                  value={formData.newEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your new email address"
                  className="email-change-input w-full px-3 py-3 rounded-lg transition-colors duration-200"
                  disabled={loading}
                  style={{ fontSize: "16px" }}
                />
              </div>

              {/* Password Confirmation */}
              <PasswordInput
                name="password"
                placeholder="Enter your current password"
                value={formData.password}
                onChange={handleInputChange}
                label="Current Password"
                disabled={loading}
                autoComplete="current-password"
                helperText="Required to confirm your identity"
              />

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={
                    loading ||
                    !formData.newEmail.trim() ||
                    !formData.password.trim()
                  }
                  className="w-full"
                >
                  {loading ? "Sending Verification..." : "Change Email Address"}
                </Button>
              </div>
            </form>
          )}

          {/* Info Notice */}
          <div
            className="border rounded-lg p-4 mt-6"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "var(--color-primary, #3b82f6)" }}
                >
                  How email change works
                </p>
                <ul
                  className="text-sm space-y-1"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  <li>• We'll send a verification email to your new address</li>
                  <li>
                    • Your current email remains active until verification
                  </li>
                  <li>• The verification link expires in 24 hours</li>
                  <li>• You can cancel the change request at any time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
