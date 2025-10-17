"use client";

import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/utils/api";
import { Button } from "@/components/ui/Button";
import { EmojiPicker } from "@/components/ui/EmojiPicker";
import { Avatar } from "@/components/ui/Avatar";

interface CreatePostProps {
  onPostCreated: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
        setText("");
        removeImage();
        onPostCreated();
      }
    } catch {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = text.slice(0, start) + emoji + text.slice(end);
      setText(newText);

      // Restore cursor position after emoji
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    } else {
      setText((prev) => prev + emoji);
    }
  };

  return (
    <>
      {/* Global CSS for placeholder styling */}
      <style jsx global>{`
        .create-post-textarea::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }

        .dark .create-post-textarea::placeholder {
          color: var(--color-muted-foreground, #94a3b8) !important;
          opacity: 0.8 !important;
        }
      `}</style>

      <div
        className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-3 sm:p-4 mb-4 sm:mb-6 border"
        style={{
          backgroundColor: "var(--color-card, #ffffff)",
          borderColor: "var(--color-border, #e2e8f0)",
        }}
      >
        <div className="flex space-x-2 sm:space-x-3">
          {/* Avatar */}
          {user && (
            <Avatar
              user={{
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl,
              }}
              size="sm"
              className="sm:w-10 sm:h-10"
            />
          )}

          <div className="flex-1 min-w-0">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Textarea Container with Emoji Button */}
              <div
                className={`rounded-lg p-2 sm:p-3 transition-all duration-200 relative ${
                  isFocused ? "ring-2" : ""
                }`}
                style={
                  {
                    backgroundColor: "var(--color-muted, #f1f5f9)",
                    border: `1px solid ${
                      isFocused
                        ? "var(--color-primary, #3b82f6)"
                        : "var(--color-border, #e2e8f0)"
                    }`,
                    "--tw-ring-color": "var(--color-primary, #3b82f6)",
                    "--tw-ring-opacity": "0.2",
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
                  rows={window.innerWidth < 640 ? 2 : 3}
                  maxLength={500}
                  className="create-post-textarea w-full resize-none border-0 bg-transparent p-0 focus:ring-0 focus:outline-none text-sm sm:text-base pr-10"
                  style={{
                    color: "var(--color-card-foreground, #0f172a)",
                    backgroundColor: "transparent",
                  }}
                />

                {/* Emoji Button */}
                <button
                  ref={emojiButtonRef}
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg transition-all duration-200 hover:scale-110 hidden lg:block"
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

              {/* Emoji Picker */}
              <EmojiPicker
                isOpen={showEmojiPicker}
                onClose={() => setShowEmojiPicker(false)}
                onEmojiSelect={handleEmojiSelect}
                triggerRef={emojiButtonRef}
              />

              {/* Image Preview with variable height */}
              {imagePreview && (
                <div className="relative rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto object-contain"
                    style={{
                      maxHeight: "400px",
                      backgroundColor: "var(--color-muted, #f1f5f9)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors duration-200"
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
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
                  className="border rounded-lg p-2 sm:p-3"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    borderColor: "rgba(239, 68, 68, 0.3)",
                    color: "var(--color-destructive, #ef4444)",
                  }}
                >
                  <p className="text-xs sm:text-sm">{error}</p>
                </div>
              )}

              {/* Actions Bar */}
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t space-y-3 sm:space-y-0"
                style={{ borderColor: "var(--color-border, #e2e8f0)" }}
              >
                <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Photo Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200"
                    style={{
                      color: "var(--color-muted-foreground, #64748b)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-secondary, #f1f5f9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    disabled={loading}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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
                    <span className="text-xs sm:text-sm font-medium">
                      Photo
                    </span>
                  </button>

                  {/* Character Counter */}
                  <div
                    className="flex items-center space-x-1.5 sm:space-x-2"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    <span className="text-xs sm:text-sm">
                      {text.length}/500
                    </span>
                    <div
                      className="w-4 sm:w-6 h-1 rounded-full overflow-hidden"
                      style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                    >
                      <div
                        className={`h-full transition-all duration-300 ${
                          text.length > 450
                            ? "bg-red-500"
                            : text.length > 350
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${(text.length / 500) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Share Button */}
                <Button
                  type="submit"
                  disabled={!text.trim() || loading}
                  loading={loading}
                  size="sm"
                  className="px-4 sm:px-6 w-full sm:w-auto text-sm"
                >
                  Share
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
