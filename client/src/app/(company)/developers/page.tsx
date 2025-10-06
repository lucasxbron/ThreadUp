"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const techStack = [
    {
      category: "Frontend",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      technologies: [
        { name: "Next.js 14", description: "React framework with App Router" },
        { name: "TypeScript", description: "Type-safe JavaScript" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "React Hooks", description: "Modern React state management" },
      ],
    },
    {
      category: "Backend",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
      technologies: [
        { name: "Node.js", description: "JavaScript runtime environment" },
        { name: "Express.js", description: "Fast web framework" },
        { name: "MongoDB", description: "NoSQL document database" },
        { name: "Mongoose", description: "MongoDB object modeling" },
      ],
    },
    {
      category: "Authentication",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      technologies: [
        { name: "JWT Tokens", description: "Secure authentication tokens" },
        { name: "bcrypt", description: "Password hashing" },
        { name: "HTTP-only Cookies", description: "Secure token storage" },
        {
          name: "Email Verification",
          description: "Account validation system",
        },
      ],
    },
    {
      category: "Development Tools",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
        </svg>
      ),
      technologies: [
        { name: "Git", description: "Version control system" },
        { name: "GitHub", description: "Code hosting and collaboration" },
        { name: "VS Code", description: "Integrated development environment" },
        { name: "Postman", description: "API development and testing" },
      ],
    },
  ];

  const features = [
    {
      title: "Open Source",
      description: "ThreadUp is completely open source and available on GitHub",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "var(--color-foreground, #0f172a)",
    },
    {
      title: "Modern Stack",
      description: "Built with the latest technologies for optimal performance",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      color: "var(--color-primary, #3b82f6)",
    },
    {
      title: "Privacy First",
      description: "Minimal data collection with transparent privacy practices",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      color: "var(--color-success, #22c55e)",
    },
    {
      title: "Community Driven",
      description: "Built with community feedback and contributions",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "var(--color-purple, #a855f7)",
    },
  ];

  const contributionAreas = [
    {
      title: "Frontend Development",
      description: "Help improve the user interface and user experience",
      skills: ["React", "TypeScript", "CSS", "UI/UX Design"],
      difficulty: "Beginner to Advanced",
    },
    {
      title: "Backend Development",
      description:
        "Work on API endpoints, database optimization, and server logic",
      skills: ["Node.js", "Express", "MongoDB", "API Design"],
      difficulty: "Intermediate to Advanced",
    },
    {
      title: "Mobile Development",
      description: "Help build native mobile applications for iOS and Android",
      skills: ["React Native", "Swift", "Kotlin", "Mobile UI"],
      difficulty: "Advanced",
    },
    {
      title: "Documentation",
      description: "Improve documentation, write tutorials, and create guides",
      skills: ["Technical Writing", "Markdown", "API Documentation"],
      difficulty: "Beginner to Intermediate",
    },
    {
      title: "Testing & QA",
      description: "Write tests, find bugs, and improve code quality",
      skills: ["Jest", "Testing", "Bug Reporting", "Quality Assurance"],
      difficulty: "Beginner to Intermediate",
    },
    {
      title: "Design & Branding",
      description: "Create designs, icons, and improve the visual identity",
      skills: ["Figma", "Adobe Creative Suite", "Branding", "Icon Design"],
      difficulty: "Beginner to Advanced",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              For Developers
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              ThreadUp is built in the open. Explore our codebase, contribute to
              development, and help shape the future of privacy-focused social
              networking.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div
              className="flex rounded-lg border p-1"
              style={{
                backgroundColor: "var(--color-secondary, #f1f5f9)",
                borderColor: "var(--color-border, #e2e8f0)",
              }}
            >
              {[
                { id: "overview", label: "Overview" },
                { id: "tech-stack", label: "Tech Stack" },
                // { id: 'contribute', label: 'Contribute' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-12">
              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-xl border p-6 hover:shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: "var(--color-card, #ffffff)",
                      borderColor: "var(--color-border, #e2e8f0)",
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          color: feature.color,
                          backgroundColor: `${feature.color}15`,
                        }}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <h3
                          className="text-xl font-bold mb-2"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* GitHub Repository */}
              <div
                className="rounded-2xl border p-8"
                style={{
                  backgroundColor: "var(--color-card, #ffffff)",
                  borderColor: "var(--color-border, #e2e8f0)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <div>
                      <h2
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        ThreadUp Repository
                      </h2>
                      <p
                        className="text-sm"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        lucasxbron/ThreadUp
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://github.com/lucasxbron/ThreadUp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
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
                      <span>View on GitHub</span>
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </button>
                  </a>
                </div>

                <p
                  className="mb-6"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  ThreadUp is completely open source and available on GitHub.
                  You can explore the codebase, report issues, suggest features,
                  and contribute to development.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    className="text-center p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-secondary, #f1f5f9)",
                    }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "var(--color-primary, #3b82f6)" }}
                    >
                      MIT
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      License
                    </div>
                  </div>
                  <div
                    className="text-center p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-secondary, #f1f5f9)",
                    }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "var(--color-success, #22c55e)" }}
                    >
                      TypeScript
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Language
                    </div>
                  </div>
                  <div
                    className="text-center p-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-secondary, #f1f5f9)",
                    }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "var(--color-warning, #f59e0b)" }}
                    >
                      v0.1.0
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Version
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Tab */}
          {activeTab === "tech-stack" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Technology Stack
                </h2>
                <p
                  className="text-lg max-w-2xl mx-auto"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  ThreadUp is built with modern technologies that prioritize
                  performance, security, and developer experience.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {techStack.map((category, index) => (
                  <div
                    key={index}
                    className="rounded-xl border p-6"
                    style={{
                      backgroundColor: "var(--color-card, #ffffff)",
                      borderColor: "var(--color-border, #e2e8f0)",
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--color-primary, #3b82f6)",
                          color: "white",
                        }}
                      >
                        {category.icon}
                      </div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        {category.category}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {category.technologies.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="flex items-start justify-between"
                        >
                          <div>
                            <h4
                              className="font-semibold"
                              style={{
                                color: "var(--color-foreground, #0f172a)",
                              }}
                            >
                              {tech.name}
                            </h4>
                            <p
                              className="text-sm"
                              style={{
                                color: "var(--color-muted-foreground, #64748b)",
                              }}
                            >
                              {tech.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contribute Tab */}
          {/* {activeTab === 'contribute' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 
                  className="text-2xl font-bold mb-4"
                  style={{ color: 'var(--color-foreground, #0f172a)' }}
                >
                  How to Contribute
                </h2>
                <p 
                  className="text-lg max-w-2xl mx-auto"
                  style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                >
                  We welcome contributions of all kinds! Whether you're a seasoned developer 
                  or just getting started, there are ways you can help improve ThreadUp.
                </p>
              </div> */}

          {/* Contribution Areas */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {contributionAreas.map((area, index) => (
                  <div
                    key={index}
                    className="rounded-xl border p-6 hover:shadow-lg transition-shadow duration-300"
                    style={{
                      backgroundColor: 'var(--color-card, #ffffff)',
                      borderColor: 'var(--color-border, #e2e8f0)'
                    }}
                  >
                    <h3 
                      className="text-lg font-bold mb-3"
                      style={{ color: 'var(--color-foreground, #0f172a)' }}
                    >
                      {area.title}
                    </h3>
                    <p 
                      className="text-sm mb-4 leading-relaxed"
                      style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                    >
                      {area.description}
                    </p>
                    <div className="mb-4">
                      <div className="text-xs font-semibold mb-2" style={{ color: 'var(--color-foreground, #0f172a)' }}>
                        Skills:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {area.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: 'var(--color-secondary, #f1f5f9)',
                              color: 'var(--color-foreground, #0f172a)'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-primary, #3b82f6)' }}>
                      {area.difficulty}
                    </div>
                  </div>
                ))}
              </div> */}

          {/* Getting Started Steps */}
          {/* <div 
                className="rounded-2xl border p-8"
                style={{
                  backgroundColor: 'var(--color-card, #ffffff)',
                  borderColor: 'var(--color-border, #e2e8f0)'
                }}
              >
                <h3 
                  className="text-xl font-bold mb-6"
                  style={{ color: 'var(--color-foreground, #0f172a)' }}
                >
                  Getting Started with Contributing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { step: '1', title: 'Fork the Repo', description: 'Fork ThreadUp on GitHub to your account' },
                    { step: '2', title: 'Clone & Setup', description: 'Clone locally and install dependencies' },
                    { step: '3', title: 'Make Changes', description: 'Create a branch and implement your changes' },
                    { step: '4', title: 'Submit PR', description: 'Push changes and create a pull request' }
                  ].map((step, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: 'var(--color-primary, #3b82f6)', color: 'white' }}
                      >
                        <span className="font-bold">{step.step}</span>
                      </div>
                      <h4 
                        className="font-semibold mb-2"
                        style={{ color: 'var(--color-foreground, #0f172a)' }}
                      >
                        {step.title}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )} */}

          {/* Call to Action */}
          <div
            className="rounded-2xl border p-8 text-center mt-12"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Ready to Get Started?
            </h3>
            <p
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Join our community of developers and help build the future of
              privacy-focused social networking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://github.com/lucasxbron/ThreadUp"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>View on GitHub</span>
                </button>
              </a>
              <a
                href="https://github.com/lucasxbron/ThreadUp/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors border"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-foreground, #0f172a)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-secondary, #f1f5f9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Report Issues
                </button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
