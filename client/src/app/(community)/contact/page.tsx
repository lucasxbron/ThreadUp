"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/utils/api";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const preSelectedSubject = searchParams?.get("subject");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: preSelectedSubject || "",
    customSubject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const subjects = [
    { value: "privacy", label: "🔒 Privacy Concerns" },
    { value: "legal", label: "⚖️ Legal Issues" },
    { value: "safety", label: "🛡️ Safety Report" },
    { value: "technical", label: "🔧 Technical Support" },
    { value: "feature", label: "💡 Feature Request" },
    { value: "bug", label: "🐛 Bug Report" },
    { value: "account", label: "👤 Account Issues" },
    { value: "feedback", label: "💬 General Feedback" },
    { value: "partnership", label: "🤝 Partnership Inquiry" },
    { value: "press", label: "📰 Press & Media" },
    { value: "other", label: "📝 Other (specify below)" },
  ];

  // Set pre-selected subject on mount
  useEffect(() => {
    if (preSelectedSubject) {
      setFormData((prev) => ({ ...prev, subject: preSelectedSubject }));
    }
  }, [preSelectedSubject]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (!formData.subject) {
      setError("Please select a subject");
      return;
    }

    if (formData.subject === "other" && !formData.customSubject.trim()) {
      setError("Please specify your custom subject");
      return;
    }

    if (formData.message.length < 10) {
      setError("Message must be at least 10 characters long");
      return;
    }

    if (formData.message.length > 2000) {
      setError("Message must be less than 2000 characters");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiClient.submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject,
        customSubject: formData.customSubject.trim(),
        message: formData.message.trim(),
      });

      if (response.data || response.message) {
        setSuccess(
          response.message || "Your message has been sent successfully!"
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          customSubject: "",
          message: "",
        });
      } else {
        setError(response.error || "Failed to send message");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Global CSS for input styling */}
      <style jsx global>{`
        .contact-input,
        .contact-select,
        .contact-textarea {
          background-color: var(--color-card, #ffffff) !important;
          color: var(--color-foreground, #0f172a) !important;
          border: 1px solid var(--color-border, #e2e8f0) !important;
        }

        .contact-input:focus,
        .contact-select:focus,
        .contact-textarea:focus {
          border-color: var(--color-primary, #3b82f6) !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }

        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }

        .dark .contact-input,
        .dark .contact-select,
        .dark .contact-textarea {
          background-color: var(--color-card, #1e2433) !important;
          color: var(--color-foreground, #f8fafc) !important;
          border-color: var(--color-border, #334155) !important;
        }

        .dark .contact-input::placeholder,
        .dark .contact-textarea::placeholder {
          color: var(--color-muted-foreground, #94a3b8) !important;
          opacity: 0.8 !important;
        }
      `}</style>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1
                className="text-4xl font-bold mb-4"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                Contact Us
              </h1>
              <p
                className="text-xl leading-relaxed max-w-3xl mx-auto"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Have a question, suggestion, or need help? We&apos;d love to
                hear from you. Our team typically responds within 24-48 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div
                  className="rounded-xl border p-6 sm:p-8"
                  style={{
                    backgroundColor: "var(--color-card, #ffffff)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                >
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    Send us a message
                  </h2>

                  {/* Success Message */}
                  {success && (
                    <div
                      className="border rounded-lg p-4 mb-6"
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        borderColor: "rgba(34, 197, 94, 0.3)",
                        color: "var(--color-success, #22c55e)",
                      }}
                    >
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
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
                        <p className="text-sm font-medium">{success}</p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div
                      className="border rounded-lg p-4 mb-6"
                      style={{
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        borderColor: "rgba(239, 68, 68, 0.3)",
                        color: "var(--color-destructive, #ef4444)",
                      }}
                    >
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-sm font-medium">{error}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          disabled={loading}
                          className="contact-input w-full px-3 py-3 rounded-lg border text-sm transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          disabled={loading}
                          className="contact-input w-full px-3 py-3 rounded-lg border text-sm transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="contact-select w-full px-3 py-3 rounded-lg border text-sm transition-colors"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((subject) => (
                          <option key={subject.value} value={subject.value}>
                            {subject.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Custom Subject */}
                    {formData.subject === "other" && (
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Custom Subject *
                        </label>
                        <input
                          type="text"
                          name="customSubject"
                          value={formData.customSubject}
                          onChange={handleInputChange}
                          placeholder="Please specify your subject"
                          disabled={loading}
                          className="contact-input w-full px-3 py-3 rounded-lg border text-sm transition-colors"
                        />
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        disabled={loading}
                        rows={6}
                        maxLength={2000}
                        className="contact-textarea w-full px-3 py-3 rounded-lg border text-sm transition-colors resize-none"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p
                          className="text-xs"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Minimum 10 characters
                        </p>
                        <p
                          className="text-xs"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {formData.message.length}/2000
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors"
                      style={{
                        backgroundColor: "var(--color-primary, #3b82f6)",
                        color: "white",
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.currentTarget.style.backgroundColor =
                            "var(--color-primary-600, #2563eb)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          e.currentTarget.style.backgroundColor =
                            "var(--color-primary, #3b82f6)";
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
                      {loading ? "Sending Message..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information Sidebar */}
              <div className="space-y-6">
                {/* Response Time */}
                <div
                  className="rounded-xl border p-6"
                  style={{
                    backgroundColor: "var(--color-card, #ffffff)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--color-primary, #3b82f6)",
                        color: "white",
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Response Time
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    We typically respond to all inquiries within 24-48 hours
                    during business days. For urgent safety issues, we aim to
                    respond within a few hours.
                  </p>
                </div>

                {/* Alternative Contact */}
                <div
                  className="rounded-xl border p-6"
                  style={{
                    backgroundColor: "var(--color-card, #ffffff)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--color-success, #22c55e)",
                        color: "white",
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
                          d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Email Us Directly
                    </h3>
                  </div>
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    You can also reach us directly at:
                  </p>
                  <a
                    href="mailto:threadup.social@gmail.com"
                    className="text-sm font-medium break-all"
                    style={{ color: "var(--color-primary, #3b82f6)" }}
                  >
                    threadup.social@gmail.com
                  </a>
                </div>

                {/* Help Center */}
                <div
                  className="rounded-xl border p-6"
                  style={{
                    backgroundColor: "var(--color-card, #ffffff)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--color-purple, #a855f7)",
                        color: "white",
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
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Help Center
                    </h3>
                  </div>
                  <p
                    className="text-sm mb-3"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    Looking for quick answers? Check our help center first.
                  </p>
                  <a
                    href="/help"
                    className="inline-flex items-center text-sm font-medium"
                    style={{ color: "var(--color-primary, #3b82f6)" }}
                  >
                    Visit Help Center
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Loading fallback component
function ContactPageFallback() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Contact Us
            </h1>
            <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
              <div
                className="h-4 rounded mx-auto"
                style={{
                  backgroundColor: "var(--color-muted, #f1f5f9)",
                  width: "60%",
                }}
              ></div>
              <div
                className="h-4 rounded mx-auto"
                style={{
                  backgroundColor: "var(--color-muted, #f1f5f9)",
                  width: "40%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactPageFallback />}>
      <ContactPageContent />
    </Suspense>
  );
}
