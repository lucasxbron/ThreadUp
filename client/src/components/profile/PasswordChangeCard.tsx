"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { apiClient } from "@/utils/api";

export const PasswordChangeCard: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiClient.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.data || response.message) {
        setSuccess("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(response.error || "Failed to change password");
      }
    } catch {
      setError("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--color-card-foreground, #0f172a)" }}
            >
              Change Password
            </h3>
            <p
              className="text-sm"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Update your account password
            </p>
          </div>
        </div>

        {/* Form */}
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

          {/* Current Password */}
          <PasswordInput
            name="currentPassword"
            placeholder="Enter current password"
            value={passwordData.currentPassword}
            onChange={handleInputChange}
            label="Current Password"
            disabled={loading}
            autoComplete="current-password"
          />

          {/* New Password */}
          <PasswordInput
            name="newPassword"
            placeholder="Enter new password"
            value={passwordData.newPassword}
            onChange={handleInputChange}
            label="New Password"
            disabled={loading}
            autoComplete="new-password"
            helperText="Must be at least 8 characters with uppercase, lowercase, number, and symbol"
          />

          {/* Confirm New Password */}
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm new password"
            value={passwordData.confirmPassword}
            onChange={handleInputChange}
            label="Confirm New Password"
            disabled={loading}
            autoComplete="new-password"
          />

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              loading={loading}
              disabled={
                loading ||
                !passwordData.currentPassword ||
                !passwordData.newPassword ||
                !passwordData.confirmPassword
              }
              className="w-full"
            >
              {loading ? "Changing Password..." : "Change Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
