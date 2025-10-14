"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function DMCAPage() {
  const noticeRequirements = [
    {
      title: "Identification of Copyrighted Work",
      description:
        "Clearly identify the copyrighted work that you claim has been infringed",
      icon: (
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "Location of Infringing Material",
      description:
        "Provide the specific URL or location of the allegedly infringing content on ThreadUp",
      icon: (
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Contact Information",
      description: "Your full name, address, phone number, and email address",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Good Faith Statement",
      description:
        "A statement that you have a good faith belief that the use is not authorized",
      icon: (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Accuracy Statement",
      description:
        "A statement that the information in your notice is accurate and that you are the copyright owner",
      icon: (
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
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      title: "Physical or Electronic Signature",
      description:
        "Your physical or electronic signature (typed full name is acceptable)",
      icon: (
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
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
    },
  ];

  //   const counterNoticeSteps = [
  //     {
  //       step: "1",
  //       title: "Receive Notice",
  //       description: "You'll be notified if your content is removed due to a DMCA claim"
  //     },
  //     {
  //       step: "2",
  //       title: "Submit Counter-Notice",
  //       description: "If you believe the removal was in error, you can file a counter-notice"
  //     },
  //     {
  //       step: "3",
  //       title: "Waiting Period",
  //       description: "We wait 10-14 business days for the claimant to file a court action"
  //     },
  //     {
  //       step: "4",
  //       title: "Restoration",
  //       description: "If no court action is filed, we may restore your content"
  //     }
  //   ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              DMCA Policy
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              ThreadUp respects intellectual property rights and complies with
              the Digital Millennium Copyright Act (DMCA). This page explains
              how we handle copyright infringement claims.
            </p>
          </div>

          {/* Our Commitment */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Our Commitment to Copyright Protection
            </h2>
            <p
              className="mb-4 leading-relaxed"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              ThreadUp is committed to protecting intellectual property rights
              and providing a platform where creators can share their original
              content safely. We respond promptly to valid DMCA takedown notices
              and work to prevent copyright infringement on our platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "var(--color-success, #22c55e)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Fast Response
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  We respond to valid DMCA notices within 24-48 hours
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "var(--color-primary, #3b82f6)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Fair Process
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  We provide a fair counter-notice process for disputed claims
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: "var(--color-purple, #a855f7)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  className="font-semibold mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Creator Protection
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  We protect both copyright holders and legitimate content
                  creators
                </p>
              </div>
            </div>
          </div>

          {/* Filing a DMCA Notice */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Filing a DMCA Takedown Notice
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              If you believe your copyrighted work has been used on ThreadUp
              without permission, you can file a DMCA takedown notice. Your
              notice must include all of the following information to be valid:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {noticeRequirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg border"
                  style={{
                    backgroundColor: "var(--color-secondary, #f1f5f9)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "var(--color-primary, #3b82f6)",
                      color: "white",
                    }}
                  >
                    {requirement.icon}
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {requirement.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {requirement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-8 p-6 rounded-lg"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.05)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              <h3
                className="font-semibold mb-2"
                style={{ color: "var(--color-foreground, #0f172a)" }}
              >
                Send Your DMCA Notice To:
              </h3>
              <p style={{ color: "var(--color-muted-foreground, #64748b)" }}>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:threadup.social@gmail.com"
                  className="underline hover:no-underline"
                  style={{ color: "var(--color-primary, #3b82f6)" }}
                >
                  threadup.social@gmail.com
                </a>
                <br />
                <strong>Subject Line:</strong> DMCA Takedown Notice
              </p>
            </div>
          </div>

          {/* Counter-Notice Process */}
          {/* <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Counter-Notice Process
            </h2>
            <p
              className="text-center mb-8 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              If your content was removed due to a DMCA claim and you believe
              the removal was in error, you can file a counter-notice to have
              your content restored.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {counterNoticeSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      backgroundColor: "var(--color-primary, #3b82f6)",
                      color: "white",
                    }}
                  >
                    <span className="font-bold">{step.step}</span>
                  </div>
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Important Notes */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Important Legal Notices
            </h2>
            <div className="space-y-4">
              {/* <div className="flex items-start space-x-3">
                <svg 
                  className="w-6 h-6 mt-1 flex-shrink-0" 
                  style={{ color: 'var(--color-warning, #f59e0b)' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--color-foreground, #0f172a)' }}>
                    Perjury Warning
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
                    Filing a false DMCA notice may result in liability for damages, including costs and attorney fees. 
                    Only file a DMCA notice if you have a good faith belief that the content infringes your copyright.
                  </p>
                </div>
              </div> */}
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 mt-1 flex-shrink-0"
                  style={{ color: "var(--color-primary, #3b82f6)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    Repeat Infringers
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    ThreadUp reserves the right to terminate accounts of users
                    who are repeat copyright infringers.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 mt-1 flex-shrink-0"
                  style={{ color: "var(--color-success, #22c55e)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    Fair Use Consideration
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    Before filing a DMCA notice, please consider whether the use
                    might qualify as fair use under copyright law.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Questions About DMCA?
            </h2>
            <p
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              If you have questions about our DMCA policy or need assistance
              with the takedown or counter-notice process, please don't hesitate
              to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/" className="block">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--color-primary, #3b82f6)",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-primary-600, #2563eb)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-primary, #3b82f6)";
                  }}
                >
                  Back to ThreadUp
                </button>
              </Link>
              <span
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Last updated: September 30, 2025
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
