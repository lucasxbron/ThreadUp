"use client";

import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/utils/api";
import { ImageCropper } from "@/components/ui/ImageCropper";
import { ImageModal } from "@/components/ui/ImageModal";
import { Avatar } from "@/components/ui/Avatar";

export const AvatarUploadCard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, refreshProfile } = useAuth();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (10MB max - your backend limit)
      if (file.size > 10 * 1024 * 1024) {
        setError("Image must be less than 10MB");
        return;
      }

      setSelectedFile(file);
      setShowCropper(true);
      setError("");
    }
  };

  const handleCropComplete = async (croppedFile: File) => {
    setUploading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Upload image using existing upload endpoint
      const formData = new FormData();
      formData.append("file", croppedFile);
      formData.append("type", "profile");

      const uploadResponse = await apiClient.uploadAvatar(formData);

      if (uploadResponse.data?.file) {
        // Step 2: Update user profile with new avatar
        const { url, public_id } = uploadResponse.data.file;

        const profileResponse = await apiClient.updateUserAvatar(
          url,
          public_id
        );

        if (profileResponse.data) {
          setSuccess("Profile picture updated successfully!");
          await refreshProfile();
          setTimeout(() => setSuccess(""), 3000);
        } else {
          setError(profileResponse.error || "Failed to update profile");
        }
      } else {
        setError(uploadResponse.error || "Failed to upload image");
      }
    } catch (err) {
      setError("Failed to upload profile picture. Please try again.");
    } finally {
      setUploading(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteAvatar = async () => {
    if (!user?.avatarUrl || deleting) return;

    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiClient.deleteAvatar();

      if (response.data || response.message) {
        setSuccess("Profile picture removed successfully!");
        await refreshProfile();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(response.error || "Failed to remove profile picture");
      }
    } catch (err) {
      setError("Failed to remove profile picture. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName || ""} ${lastName || ""}`.trim();
  };

  return (
    <>
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--color-card-foreground, #0f172a)" }}
              >
                Profile Picture
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Update your profile picture
              </p>
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div
              className="border rounded-lg p-3 mb-4"
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                borderColor: "rgba(34, 197, 94, 0.3)",
                color: "var(--color-success, #22c55e)",
              }}
            >
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          {error && (
            <div
              className="border rounded-lg p-3 mb-4"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
                color: "var(--color-destructive, #ef4444)",
              }}
            >
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Current Avatar Display */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-shrink-0">
              <div className="flex-shrink-0">
                {user && (
                  <Avatar
                    user={{
                      firstName: user.firstName,
                      lastName: user.lastName,
                      avatarUrl: user.avatarUrl,
                    }}
                    size="xl"
                    onClick={
                      user.avatarUrl ? () => setShowImageModal(true) : undefined
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex-1">
              <h4
                className="font-medium text-base"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                {user
                  ? getFullName(user.firstName, user.lastName)
                  : "Loading..."}
              </h4>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                {user?.avatarUrl
                  ? "Click to view full size"
                  : "Using initials as avatar"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors border"
              style={{
                backgroundColor: "var(--color-primary, #3b82f6)",
                color: "white",
                borderColor: "var(--color-primary, #3b82f6)",
              }}
              onMouseEnter={(e) => {
                if (!uploading) {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-primary-600, #2563eb)";
                }
              }}
              onMouseLeave={(e) => {
                if (!uploading) {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-primary, #3b82f6)";
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {uploading ? "Uploading..." : "Upload New Picture"}
            </button>

            {user?.avatarUrl && (
              <button
                onClick={handleDeleteAvatar}
                disabled={deleting}
                className="w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors border"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-destructive, #ef4444)",
                  borderColor: "var(--color-destructive, #ef4444)",
                }}
                onMouseEnter={(e) => {
                  if (!deleting) {
                    e.currentTarget.style.backgroundColor =
                      "rgba(239, 68, 68, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!deleting) {
                    e.currentTarget.style.backgroundColor = "transparent";
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
                {deleting ? "Removing..." : "Remove Picture"}
              </button>
            )}
          </div>

          {/* Info */}
          <div
            className="border rounded-lg p-4 mt-6"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <p
              className="text-sm"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              <strong>Tips:</strong> Upload a square image for best results.
              Recommended size: 400x400px or larger. Max file size: 10MB.
            </p>
          </div>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {selectedFile && (
        <ImageCropper
          isOpen={showCropper}
          onClose={() => {
            setShowCropper(false);
            setSelectedFile(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
          imageFile={selectedFile}
          onCropComplete={handleCropComplete}
        />
      )}

      {/* Full Size Image Modal */}
      {user?.avatarUrl && (
        <ImageModal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          imageUrl={user.avatarUrl}
          alt={`${getFullName(
            user.firstName,
            user.lastName
          )}'s profile picture`}
        />
      )}
    </>
  );
};
