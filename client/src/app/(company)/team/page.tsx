"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Lucas Bron",
      role: "Project Lead & Full Stack Developer",
      description:
        "Passionate about creating meaningful social connections through technology. Leads platform architecture, privacy framework, and overall product vision.",
      avatar: "/avatars/developers/lucas_bron_avatar.png",
      gradient: "from-blue-500 to-purple-600",
      expertise: [
        "Full-Stack Development",
        "System Architecture",
        "Privacy Engineering",
        "Product Strategy",
      ],
      contributions: [
        "Platform architecture and design",
        "Privacy-first framework development",
        "UI/UX design and implementation",
        "Security and authentication systems",
        "Project leadership and vision",
      ],
      github: "lucasxbron",
      // technologies: ["Next.js", "Node.js", "TypeScript", "MongoDB"],
    },
    {
      name: "Sophie Kock",
      role: "Full Stack Developer",
      description:
        "Creative full-stack developer passionate about building intuitive user interfaces and robust backend systems. Specializes in user experience and frontend optimization.",
      avatar: "/avatars/developers/sophie_kock_avatar.png",
      gradient: "from-pink-500 to-rose-600",
      expertise: [
        "Frontend Development",
        "UI/UX Design",
        "Component Architecture",
        "User Experience",
      ],
      contributions: [
        "Frontend development and optimization",
        "Component architecture and design",
        "User interface enhancements",
        "Responsive design implementation",
        "User experience research",
      ],
      github: "Sophie-Kock",
      // technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    },
    {
      name: "Marcus Stöppler",
      role: "Full Stack Developer",
      description:
        "Versatile full-stack developer with expertise in modern web technologies. Focused on performance optimization and scalable application development.",
      avatar: "/avatars/developers/marcus_stoeppler_avatar.png",
      gradient: "from-green-500 to-teal-600",
      expertise: [
        "Backend Development",
        "Database Design",
        "Performance Optimization",
        "API Development",
      ],
      contributions: [
        "Backend API development",
        "Database optimization and design",
        "Performance monitoring and tuning",
        "Server-side logic implementation",
        "Infrastructure and deployment",
      ],
      github: "DCI-Mendo",
      // technologies: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    },
  ];

  const values = [
    {
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "User-Centric",
      description:
        "We build for people, not metrics. Every decision is made with user privacy and experience in mind.",
    },
    {
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
      title: "Privacy First",
      description:
        "We collect minimal data, respect user privacy, and maintain transparency in everything we do.",
    },
    {
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
            d="M8 9l3 3-3 3m13 0h-6m-2-5h6m2 5V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2z"
          />
        </svg>
      ),
      title: "Open Source",
      description:
        "We believe in transparency and community collaboration. ThreadUp is built in the open.",
    },
    {
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Innovation",
      description:
        "We constantly explore new ways to improve social networking while respecting user autonomy.",
    },
  ];

  const workingPrinciples = [
    {
      title: "Remote-First",
      description:
        "We believe great work can happen anywhere. Our team is distributed and values flexibility.",
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
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
          />
        </svg>
      ),
    },
    {
      title: "Async Communication",
      description:
        "We respect deep work and minimize meetings. Most communication happens asynchronously.",
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
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      title: "Quality Over Speed",
      description:
        "We prioritize building things right over building things fast. Quality and security come first.",
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
      title: "Community Driven",
      description:
        "We listen to our users and the open source community. The best ideas come from collaboration.",
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Meet the Team
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              ThreadUp is built by a passionate team dedicated to creating
              authentic social connections while respecting user privacy. We're
              a small, focused team that believes in quality over quantity.
            </p>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`rounded-2xl border p-6 hover:scale-105 transition-all duration-300 ${
                  index === 0
                    ? "animate-slide-in-left"
                    : index === 1
                    ? "animate-slide-in-up"
                    : "animate-slide-in-right"
                }`}
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                }}
              >
                {/* Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-white shadow-lg">
                    <Image
                      src={member.avatar}
                      alt={`${member.name} avatar`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient background with initials if image fails
                        const target = e.currentTarget;
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        target.style.display = "none";
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center hidden`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium mb-3 text-blue-300">
                    {member.role}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {member.description}
                  </p>
                </div>

                {/* Expertise */}
                <div className="mb-4">
                  <h4
                    className="font-semibold mb-2 text-left"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-foreground)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                {/* <div className="mb-4">
                  <h4
                    className="font-semibold mb-2 text-left"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {member.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div> */}

                {/* Key Contributions */}
                <div className="mb-4">
                  <h4
                    className="font-semibold mb-2 text-left"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Key Contributions:
                  </h4>
                  <ul className="text-left space-y-1">
                    {member.contributions
                      .slice(0, 3)
                      .map((contribution, contribIndex) => (
                        <li
                          key={contribIndex}
                          className="flex items-start space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span
                            className="text-sm"
                            style={{ color: "var(--color-muted-foreground)" }}
                          >
                            {contribution}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* GitHub Link */}
                <div className="text-center">
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-foreground)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-sm">@{member.github}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="rounded-xl border p-6 hover:shadow-lg transition-shadow duration-300"
                  style={{
                    backgroundColor: "var(--color-card, #ffffff)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: "var(--color-primary, #3b82f6)",
                        color: "white",
                      }}
                    >
                      {value.icon}
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        {value.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How We Work */}
          <div
            className="rounded-2xl border p-8 mb-12"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              How We Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workingPrinciples.map((principle, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      backgroundColor: "var(--color-secondary, #f1f5f9)",
                    }}
                  >
                    <div style={{ color: "var(--color-primary, #3b82f6)" }}>
                      {principle.icon}
                    </div>
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {principle.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join Us */}
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
              Want to Join Us?
            </h2>
            <p
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              We're always looking for passionate people who share our values.
              Whether you're interested in contributing to our open source
              project or joining the team, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://github.com/lucasxbron/ThreadUp"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
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
                  Contribute on GitHub
                </button>
              </a>
              <Link href="/developers" className="block">
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
                  Developer Resources
                </button>
              </Link>
              <Link href="/" className="block">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-muted-foreground, #64748b)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      "var(--color-foreground, #0f172a)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      "var(--color-muted-foreground, #64748b)";
                  }}
                >
                  Back to ThreadUp
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
