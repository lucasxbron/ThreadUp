"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Modal } from "@/components/ui/Modal";
import { useAuth, isDemoAccount } from "@/contexts/AuthContext";
import { apiClient } from "@/utils/api";

export const DeleteAccountCard: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"confirm" | "password">("confirm");

  const { user, logout } = useAuth();
  const isDemo = isDemoAccount(user);

  const router = useRouter();

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setStep("confirm");
    setPassword("");
    setError("");
  };

  const handleConfirmDelete = () => {
    setStep("password");
    setError("");
  };

  const handleFinalDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiClient.deleteAccount(password);

      if (response.data || response.message) {
        // Account deleted successfully
        await logout(); // Clear auth state
        router.push("/register"); // Redirect to register page
      } else {
        setError(response.error || "Failed to delete account");
      }
    } catch {
      setError("Failed to delete account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setStep("confirm");
    setPassword("");
    setError("");
  };

  return (
    <>
      <div
        className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border"
        style={{
          backgroundColor: "var(--color-card, #ffffff)",
          borderColor: "var(--color-destructive, #ef4444)",
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--color-destructive, #ef4444)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--color-destructive, #ef4444)" }}
              >
                Delete Account
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Permanently delete your account and all data
              </p>
            </div>
          </div>

          {/* DEMO WARNING BANNER */}
          {isDemo && (
            <div className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">🎭</span>
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Demo Account Restriction
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Demo accounts cannot be deleted.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Warning Text */}
          <div
            className="border rounded-lg p-4 mb-4"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.05)",
              borderColor: "rgba(239, 68, 68, 0.2)",
            }}
          >
            <p
              className="text-sm font-medium mb-2"
              style={{ color: "var(--color-destructive, #ef4444)" }}
            >
              ⚠️ This action cannot be undone
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Deleting your account will permanently remove:
            </p>
            <ul
              className="text-sm mt-2 ml-4 space-y-1"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              <li>• Your profile and account information</li>
              <li>• All your posts and images</li>
              <li>• All your comments and likes</li>
              <li>• Your followers and following connections</li>
              <li>• All associated data and activity history</li>
            </ul>
          </div>

          {/* Delete Button */}
          <button
            onClick={handleDeleteClick}
            disabled={isDemo}
            className="w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: isDemo
                ? "var(--color-muted, #f1f5f9)"
                : "var(--color-destructive, #ef4444)",
              color: isDemo
                ? "var(--color-muted-foreground, #64748b)"
                : "white",
              borderColor: isDemo
                ? "var(--color-border, #e2e8f0)"
                : "var(--color-destructive, #ef4444)",
            }}
            onMouseEnter={(e) => {
              if (!isDemo) {
                e.currentTarget.style.backgroundColor =
                  "var(--color-destructive-600, #dc2626)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isDemo) {
                e.currentTarget.style.backgroundColor =
                  "var(--color-destructive, #ef4444)";
              }
            }}
            onMouseDown={(e) => {
              if (!isDemo) {
                e.currentTarget.style.backgroundColor =
                  "var(--color-destructive-700, #b91c1c)";
              }
            }}
            onMouseUp={(e) => {
              if (!isDemo) {
                e.currentTarget.style.backgroundColor =
                  "var(--color-destructive-600, #dc2626)";
              }
            }}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete My Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        title={
          step === "confirm" ? "Delete Account" : "Confirm Account Deletion"
        }
        size="md"
      >
        {step === "confirm" ? (
          /* Confirmation Step */
          <div className="space-y-6">
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "var(--color-destructive, #ef4444)" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>

            {/* Warning Message */}
            <div className="text-center space-y-3">
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                Are you absolutely sure?
              </h3>
              <p
                className="text-base"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                This action <strong>cannot be undone</strong>. This will
                permanently delete your account and remove all your data from
                our servers.
              </p>
            </div>

            {/* Data That Will Be Deleted */}
            <div
              className="border rounded-lg p-4"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.05)",
                borderColor: "rgba(239, 68, 68, 0.2)",
              }}
            >
              <p
                className="text-sm font-medium mb-3"
                style={{ color: "var(--color-destructive, #ef4444)" }}
              >
                The following will be permanently deleted:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  ✗ Profile & account data
                </div>
                <div
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  ✗ All posts & images
                </div>
                <div
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  ✗ Comments & likes
                </div>
                <div
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  ✗ Followers & following
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              {/* Fix the danger button styling */}
              <button
                onClick={handleConfirmDelete}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: "var(--color-destructive, #ef4444)",
                  color: "white",
                  borderColor: "var(--color-destructive, #ef4444)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-destructive-600, #dc2626)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-destructive, #ef4444)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-destructive-700, #b91c1c)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-destructive-600, #dc2626)";
                }}
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        ) : (
          /* Password Confirmation Step */
          <form onSubmit={handleFinalDelete} className="space-y-6">
            {/* Final Warning */}
            <div className="text-center space-y-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "var(--color-destructive, #ef4444)" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-bold"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                Enter your password to confirm
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Please enter your current password to permanently delete your
                account.
              </p>
            </div>

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

            {/* Password Input */}
            <PasswordInput
              placeholder="Enter your current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              autoFocus
            />

            {/* Final Warning */}
            <div
              className="border rounded-lg p-3 text-center"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.05)",
                borderColor: "rgba(239, 68, 68, 0.2)",
              }}
            >
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-destructive, #ef4444)" }}
              >
                ⚠️ FINAL WARNING: This action is irreversible!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep("confirm")}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                Back
              </Button>
              <button
                type="submit"
                disabled={loading || !password.trim()}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    loading || !password.trim()
                      ? "var(--color-muted, #f1f5f9)"
                      : "var(--color-destructive, #ef4444)",
                  color:
                    loading || !password.trim()
                      ? "var(--color-muted-foreground, #64748b)"
                      : "white",
                  borderColor:
                    loading || !password.trim()
                      ? "var(--color-border, #e2e8f0)"
                      : "var(--color-destructive, #ef4444)",
                }}
                onMouseEnter={(e) => {
                  if (!loading && password.trim()) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-destructive-600, #dc2626)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading && password.trim()) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-destructive, #ef4444)";
                  }
                }}
                onMouseDown={(e) => {
                  if (!loading && password.trim()) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-destructive-700, #b91c1c)";
                  }
                }}
                onMouseUp={(e) => {
                  if (!loading && password.trim()) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-destructive-600, #dc2626)";
                  }
                }}
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                )}
                {loading ? "Deleting Account..." : "Permanently Delete Account"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};
