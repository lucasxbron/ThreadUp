"use client";

import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/utils/api";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { EmojiPicker } from "@/components/ui/EmojiPicker";
import { Avatar } from "../ui/Avatar";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
}) => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useAuth();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image must be less than 10MB");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = text.slice(0, start) + emoji + text.slice(end);
      setText(newText);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    } else {
      setText((prev) => prev + emoji);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Post text is required");
      return;
    }

    if (text.length > 500) {
      setError("Post text must be less than 500 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("text", text.trim());
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await apiClient.createPost(formData);

      if (response.error) {
        setError(response.error);
      } else {
        // Reset form
        setText("");
        removeImage();
        setError("");
        setShowEmojiPicker(false);
        onPostCreated();
        onClose();
      }
    } catch (err) {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setText("");
    removeImage();
    setError("");
    setIsFocused(false);
    setShowEmojiPicker(false);
    onClose();
  };

  return (
    <>
      {/* Global CSS for placeholder styling */}
      <style jsx global>{`
        .create-post-modal-textarea {
          background-color: transparent !important;
          color: var(--color-foreground, #0f172a) !important;
          border: none !important;
          outline: none !important;
          resize: none !important;
        }

        .create-post-modal-textarea::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }

        .dark .create-post-modal-textarea {
          color: var(--color-foreground, #f8fafc) !important;
        }

        .dark .create-post-modal-textarea::placeholder {
          color: var(--color-muted-foreground, #94a3b8) !important;
          opacity: 0.8 !important;
        }
      `}</style>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Create new post"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <Avatar
                user={{
                  firstName: user?.firstName || "",
                  lastName: user?.lastName || "",
                  avatarUrl: user?.avatarUrl,
                }}
                size="md"
              />
            </div>
            <div>
              <h4
                className="font-medium text-base"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </h4>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                @{user?.username || "loading"}
              </p>
            </div>
          </div>

          {/* Textarea Container with Emoji Button */}
          <div
            className={`rounded-lg p-3 sm:p-4 transition-all duration-200 border relative ${
              isFocused ? "ring-2 ring-opacity-20" : ""
            }`}
            style={
              {
                backgroundColor: "var(--color-muted, #f1f5f9)",
                borderColor: isFocused
                  ? "var(--color-primary, #3b82f6)"
                  : "var(--color-border, #e2e8f0)",
                "--tw-ring-color": "var(--color-primary, #3b82f6)",
              } as React.CSSProperties
            }
          >
            <textarea
              ref={textareaRef}
              placeholder={`What's on your mind, ${
                user?.firstName || user?.username
              }?`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={4}
              maxLength={500}
              className="create-post-modal-textarea w-full p-0 text-base pr-10"
              autoFocus
            />

            {/* Emoji Button */}
            <button
              ref={emojiButtonRef}
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute bottom-3 right-3 p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
              style={{
                color: "var(--color-muted-foreground, #64748b)",
                backgroundColor: "transparent",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-secondary, #f1f5f9)";
                e.currentTarget.style.color =
                  "var(--color-foreground, #0f172a)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color =
                  "var(--color-muted-foreground, #64748b)";
              }}
            >
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Image Preview with variable height */}
          {imagePreview && (
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto object-contain"
                style={{
                  maxHeight: "500px",
                  backgroundColor: "var(--color-muted, #f1f5f9)",
                }}
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                }}
              >
                <svg
                  className="w-4 h-4"
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
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className="border rounded-lg p-3"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
                color: "var(--color-destructive, #ef4444)",
              }}
            >
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Actions Bar */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t space-y-4 sm:space-y-0"
            style={{ borderColor: "var(--color-border, #e2e8f0)" }}
          >
            <div className="flex items-center justify-between sm:justify-start sm:space-x-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />

              {/* Image Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  color: "var(--color-primary, #3b82f6)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-secondary, #f1f5f9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium">Photo</span>
              </button>

              {/* Character Count */}
              <div className="flex items-center space-x-2">
                <span
                  className="text-xs"
                  style={{
                    color:
                      text.length > 450
                        ? "var(--color-destructive, #ef4444)"
                        : "var(--color-muted-foreground, #64748b)",
                  }}
                >
                  {text.length}/500
                </span>
                <div
                  className="w-8 h-1 rounded-full"
                  style={{
                    backgroundColor: "var(--color-muted, #f1f5f9)",
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${Math.min((text.length / 500) * 100, 100)}%`,
                      backgroundColor:
                        text.length > 450
                          ? "var(--color-destructive, #ef4444)"
                          : "var(--color-primary, #3b82f6)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!text.trim() || loading || text.length > 500}
                loading={loading}
                className="w-full sm:w-auto"
              >
                {loading ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* EmojiPicker rendered outside Modal to prevent overflow */}
      {showEmojiPicker && (
        <div style={{ position: "fixed", zIndex: 9999 }}>
          <EmojiPicker
            isOpen={showEmojiPicker}
            onClose={() => setShowEmojiPicker(false)}
            onEmojiSelect={handleEmojiSelect}
            triggerRef={emojiButtonRef}
          />
        </div>
      )}
    </>
  );
};
