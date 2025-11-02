"use client";
import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { legalNoticeEN } from "@/data/legal/en";
import { legalNoticeDE } from "@/data/legal/de";

interface LegalNoticeProps {
  lang: "de" | "en";
}

export const LegalNotice: React.FC<LegalNoticeProps> = ({ lang }) => {
  const isGerman = lang === "de";
  const t = isGerman ? legalNoticeDE : legalNoticeEN;

  return (
    <div className="min-h-screen flex flex-col">
      <style jsx global>{`
        /* Scroll offset for anchor links to account for fixed header */
        h2[id],
        h3[id],
        h4[id] {
          scroll-margin-top: 120px;
        }
      `}</style>
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            {/* Language Switcher */}
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex items-center rounded-full border shadow-sm"
                style={{
                  backgroundColor: "var(--color-card, #ffffff)",
                  borderColor: "var(--color-border, #e2e8f0)",
                }}
              >
                <Link
                  href="/impressum-datenschutz"
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isGerman ? "" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  style={{
                    backgroundColor: isGerman
                      ? "var(--color-primary, #3b82f6)"
                      : "transparent",
                    color: isGerman
                      ? "white"
                      : "var(--color-muted-foreground, #64748b)",
                  }}
                >
                  <span className="text-base">🇩🇪</span>
                  <span className="hidden sm:inline">Deutsch</span>
                </Link>
                <div
                  className="w-px h-6 mx-1"
                  style={{
                    backgroundColor: "var(--color-border, #e2e8f0)",
                  }}
                />
                <Link
                  href="/legal-notice"
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !isGerman ? "" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  style={{
                    backgroundColor: !isGerman
                      ? "var(--color-primary, #3b82f6)"
                      : "transparent",
                    color: !isGerman
                      ? "white"
                      : "var(--color-muted-foreground, #64748b)",
                  }}
                >
                  <span className="text-base">🇬🇧</span>
                  <span className="hidden sm:inline">English</span>
                </Link>
              </div>
            </div>

            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              {t.title}
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              {t.subtitle}
            </p>
          </div>

          {/* Impressum Section */}
          <div
            className="rounded-2xl border p-8 mb-8"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              {t.impressumTitle}
            </h2>

            <div className="space-y-6">
              <div>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Lucas Bron
                  <br />
                  Am Bierenbonnen 10
                  <br />
                  53604 Bad Honnef
                  <br />
                  {t.impressumCountry}
                </p>
              </div>

              <div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  {t.impressumContactTitle}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  E-Mail: threadup.social@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div
            className="rounded-2xl border p-6 mb-8"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              {t.tocTitle}
            </h2>
            <nav className="space-y-2 text-sm">
              <a
                href="#datenschutz"
                className="block hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                {t.sections.section1.title}
              </a>
              <div className="ml-4 space-y-1">
                <a
                  href="#allgemeine-hinweise"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section1.generalInfo.tocTitle ||
                    t.sections.section1.generalInfo.title}
                </a>
                <a
                  href="#hinweise-datenerfassung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section1.dataCollection.tocTitle ||
                    t.sections.section1.dataCollection.title}
                </a>
              </div>

              <a
                href="#hosting"
                className="block hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                {t.sections.section2.title}
              </a>
              <div className="ml-4 space-y-1">
                <a
                  href="#externes-hosting"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section2.externalHosting.tocTitle ||
                    t.sections.section2.externalHosting.title}
                </a>
                <a
                  href="#auftragsverarbeitung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section2.dataProcessing.tocTitle ||
                    t.sections.section2.dataProcessing.title}
                </a>
              </div>

              <a
                href="#hinweise-und-pflichtinformationen"
                className="block hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                {t.sections.section3.title}
              </a>
              <div className="ml-4 space-y-1">
                <a
                  href="#datenschutz-info"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.dataProtection.tocTitle ||
                    t.sections.section3.dataProtection.title}
                </a>
                <a
                  href="#verantwortliche-stelle"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.responsibleParty.tocTitle ||
                    t.sections.section3.responsibleParty.title}
                </a>
                <a
                  href="#speicherdauer"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.storageDuration.tocTitle ||
                    t.sections.section3.storageDuration.title}
                </a>
                <a
                  href="#rechtsgrundlagen"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.legalBasis.tocTitle ||
                    t.sections.section3.legalBasis.title}
                </a>
                <a
                  href="#empfaenger"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.recipients.tocTitle ||
                    t.sections.section3.recipients.title}
                </a>
                <a
                  href="#widerruf"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.revocation.tocTitle ||
                    t.sections.section3.revocation.title}
                </a>
                <a
                  href="#widerspruchsrecht"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.rightToObject.tocTitle ||
                    t.sections.section3.rightToObject.title}
                </a>
                <a
                  href="#beschwerderecht"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.complaint.tocTitle ||
                    t.sections.section3.complaint.title}
                </a>
                <a
                  href="#datenuebertragbarkeit"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.dataPortability.tocTitle ||
                    t.sections.section3.dataPortability.title}
                </a>
                <a
                  href="#auskunft"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.access.tocTitle ||
                    t.sections.section3.access.title}
                </a>
                <a
                  href="#einschraenkung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.restriction.tocTitle ||
                    t.sections.section3.restriction.title}
                </a>
                <a
                  href="#verschluesselung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section3.encryption.tocTitle ||
                    t.sections.section3.encryption.title}
                </a>
              </div>

              <a
                href="#datenerfassung"
                className="block hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                {t.sections.section4.title}
              </a>
              <div className="ml-4 space-y-1">
                <a
                  href="#allgemeine-datenverarbeitung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.generalProcessing.tocTitle ||
                    t.sections.section4.generalProcessing.title}
                </a>
                <a
                  href="#cookies"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.cookies.tocTitle ||
                    t.sections.section4.cookies.title}
                </a>
                <a
                  href="#benutzerkonto"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.userAccount.tocTitle ||
                    t.sections.section4.userAccount.title}
                </a>
                <a
                  href="#nutzerinhalte"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.userContent.tocTitle ||
                    t.sections.section4.userContent.title}
                </a>
                <a
                  href="#admin-daten"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.adminData.tocTitle ||
                    t.sections.section4.adminData.title}
                </a>
                <a
                  href="#kontosicherheit"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.accountSecurity.tocTitle ||
                    t.sections.section4.accountSecurity.title}
                </a>
                <a
                  href="#verbesserung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.improvement.tocTitle ||
                    t.sections.section4.improvement.title}
                </a>
                <a
                  href="#server-logs"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.serverLogs.tocTitle ||
                    t.sections.section4.serverLogs.title}
                </a>
                <a
                  href="#kontaktformular"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.contactForm.tocTitle ||
                    t.sections.section4.contactForm.title}
                </a>
                <a
                  href="#email-anfrage"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.emailInquiry.tocTitle ||
                    t.sections.section4.emailInquiry.title}
                </a>
                <a
                  href="#resend"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.resend.tocTitle ||
                    t.sections.section4.resend.title}
                </a>
                <a
                  href="#kommentare"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  •{" "}
                  {t.sections.section4.comments.tocTitle ||
                    t.sections.section4.comments.title}
                </a>
              </div>
            </nav>
          </div>

          {/* Privacy Policy Content */}
          <div
            className="rounded-2xl border p-8 mb-8"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              {isGerman ? "Datenschutzerklärung" : "Privacy Policy"}
            </h2>

            <div className="space-y-8">
              {/* Section 1: Privacy at a Glance */}
              <div>
                <h3
                  id="datenschutz"
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  {t.sections.section1.title}
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4
                      id="allgemeine-hinweise"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section1.generalInfo.title}
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section1.generalInfo.content}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="hinweise-datenerfassung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section1.dataCollection.title}
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          {
                            t.sections.section1.dataCollection.whoResponsible
                              .question
                          }
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {
                            t.sections.section1.dataCollection.whoResponsible
                              .answer
                          }
                        </p>
                      </div>

                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          {
                            t.sections.section1.dataCollection.howCollect
                              .question
                          }
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {
                            t.sections.section1.dataCollection.howCollect
                              .answer1
                          }
                        </p>
                        <p
                          className="leading-relaxed mt-2"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {
                            t.sections.section1.dataCollection.howCollect
                              .answer2
                          }
                        </p>
                      </div>

                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          {t.sections.section1.dataCollection.whatFor.question}
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section1.dataCollection.whatFor.answer}
                        </p>
                      </div>

                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          {t.sections.section1.dataCollection.rights.question}
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section1.dataCollection.rights.answer1}
                        </p>
                        <p
                          className="leading-relaxed mt-2"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section1.dataCollection.rights.answer2}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Hosting */}
              <div>
                <h3
                  id="hosting"
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  {t.sections.section2.title}
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4
                      id="externes-hosting"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section2.externalHosting.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section2.externalHosting.paragraph1}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section2.externalHosting.paragraph2}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section2.externalHosting.paragraph3}
                    </p>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section2.externalHosting.paragraph4}
                    </p>
                    <p
                      className="leading-relaxed  mb-3"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Render Services, Inc.
                      <br />
                      525 Brannan St., Suite 300
                      <br />
                      San Francisco, CA 94107
                      <br />
                      USA
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section2.externalHosting.paragraph5}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section2.externalHosting.paragraph6}{" "}
                      <a
                        href="https://render.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                        style={{ color: "var(--color-primary, #3b82f6)" }}
                      >
                        https://render.com/privacy
                      </a>
                    </p>
                  </div>

                  <div>
                    <h4
                      id="auftragsverarbeitung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section2.dataProcessing.title}
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section2.dataProcessing.content}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: General Information */}
              <div>
                <h3
                  id="hinweise-und-pflichtinformationen"
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  {t.sections.section3.title}
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4
                      id="datenschutz-info"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.dataProtection.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.dataProtection.paragraph1}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.dataProtection.paragraph2}
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.dataProtection.paragraph3}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="verantwortliche-stelle"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.responsibleParty.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.responsibleParty.paragraph1}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Lucas Bron
                      <br />
                      Am Bierenbonnen 10
                      <br />
                      53604 Bad Honnef
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      E-Mail: threadup.social@gmail.com
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.responsibleParty.paragraph2}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="speicherdauer"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.storageDuration.title}
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.storageDuration.paragraph1}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="rechtsgrundlagen"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.legalBasis.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.legalBasis.paragraph1}
                    </p>
                    {"list" in t.sections.section3.legalBasis &&
                      Array.isArray(t.sections.section3.legalBasis.list) && (
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {t.sections.section3.legalBasis.list.map(
                            (item: string, index: number) => (
                              <li
                                key={index}
                                className="leading-relaxed"
                                style={{
                                  color:
                                    "var(--color-muted-foreground, #64748b)",
                                }}
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                  </div>

                  <div>
                    <h4
                      id="empfaenger"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.recipients.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.recipients.paragraph1}
                    </p>

                    {"gmailSection" in t.sections.section3.recipients && (
                      <div
                        className="mt-4 p-4 rounded-lg border"
                        style={{
                          backgroundColor: "rgba(59, 130, 246, 0.05)",
                          borderColor: "rgba(59, 130, 246, 0.2)",
                        }}
                      >
                        <p
                          className="font-semibold mb-2"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          {t.sections.section3.recipients.gmailSection.title}
                        </p>
                        <p
                          className="leading-relaxed mb-3 text-sm"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {
                            t.sections.section3.recipients.gmailSection
                              .description
                          }
                        </p>

                        <div className="space-y-2 text-sm">
                          <p
                            className="leading-relaxed"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            {
                              t.sections.section3.recipients.gmailSection
                                .purpose
                            }
                          </p>

                          <p
                            className="leading-relaxed"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            {
                              t.sections.section3.recipients.gmailSection
                                .storageDuration
                            }
                          </p>

                          <p
                            className="leading-relaxed"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            {
                              t.sections.section3.recipients.gmailSection
                                .thirdCountry
                            }
                          </p>

                          <p
                            className="leading-relaxed"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            {
                              t.sections.section3.recipients.gmailSection
                                .disputeResolution
                            }
                          </p>

                          <p
                            className="leading-relaxed"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            {
                              t.sections.section3.recipients.gmailSection
                                .copyNote
                            }
                          </p>
                          <p
                            className="leading-relaxed"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            {
                              t.sections.section3.recipients.gmailSection
                                .moreInfo
                            }{" "}
                            <a
                              href={
                                t.sections.section3.recipients.gmailSection
                                  .googlePrivacyLink
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:no-underline"
                              style={{ color: "var(--color-primary, #3b82f6)" }}
                            >
                              {
                                t.sections.section3.recipients.gmailSection
                                  .googlePrivacyLink
                              }
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4
                      id="widerruf"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.revocation.title}
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.revocation.paragraph1}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="widerspruchsrecht"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.rightToObject.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.rightToObject.paragraph1}
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.rightToObject.paragraph2}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="beschwerderecht"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.complaint.title}
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.complaint.paragraph1}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="datenuebertragbarkeit"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.dataPortability.title}
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.dataPortability.paragraph1}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="auskunft"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.access.title}
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.access.paragraph1}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="einschraenkung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.restriction.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.restriction.paragraph1}
                    </p>
                    <ul className="list-disc list-inside space-y-1 mb-3 ml-4">
                      {t.sections.section3.restriction.list.map(
                        (item: string, index: number) => (
                          <li
                            key={index}
                            className="leading-relaxed"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.restriction.paragraph2}
                    </p>
                  </div>

                  <div>
                    <h4
                      id="verschluesselung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section3.encryption.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.encryption.paragraph1}
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section3.encryption.paragraph2}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4: Data Collection */}
              <div>
                <h3
                  id="datenerfassung"
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  {t.sections.section4.title}
                </h3>

                <div className="space-y-4">
                  {/* General Processing */}
                  <div>
                    <h4
                      id="allgemeine-datenverarbeitung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section4.generalProcessing.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.generalProcessing.paragraph1}
                    </p>
                    <ul
                      className="list-disc list-inside space-y-2 ml-4"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.generalProcessing.list.map(
                        (item, index) => (
                          <li key={index}>
                            <strong>{item.split("–")[0]}–</strong>
                            {item.split("–")[1]}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Cookies */}
                  <div>
                    <h4
                      id="cookies"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section4.cookies.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.cookies.paragraph1}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.cookies.paragraph2}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.cookies.paragraph3}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.cookies.paragraph4}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.cookies.paragraph5}
                    </p>
                    {t.sections.section4.cookies.paragraph6 && (
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.cookies.paragraph6}
                      </p>
                    )}
                    {"paragraph7" in t.sections.section4.cookies &&
                      t.sections.section4.cookies.paragraph7 && (
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section4.cookies.paragraph7}
                        </p>
                      )}
                  </div>

                  {/* User Account */}
                  {t.sections.section4.userAccount && (
                    <div>
                      <h4
                        id="benutzerkonto"
                        className="text-lg font-semibold mb-2"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        {t.sections.section4.userAccount.title}
                      </h4>
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.userAccount.paragraph1}
                      </p>
                      {"list" in t.sections.section4.userAccount &&
                        Array.isArray(t.sections.section4.userAccount.list) && (
                          <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                            {t.sections.section4.userAccount.list.map(
                              (item: string, index: number) => (
                                <li
                                  key={index}
                                  className="leading-relaxed"
                                  style={{
                                    color:
                                      "var(--color-muted-foreground, #64748b)",
                                  }}
                                >
                                  {item}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      <p
                        className="leading-relaxed mb-2"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.userAccount.purpose}
                      </p>
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.userAccount.legalBasis}
                      </p>
                      {t.sections.section4.userAccount.paragraph2 && (
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section4.userAccount.paragraph2}
                        </p>
                      )}
                    </div>
                  )}

                  {/* User Content */}
                  {t.sections.section4.userContent && (
                    <div>
                      <h4
                        id="nutzerinhalte"
                        className="text-lg font-semibold mb-2"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        {t.sections.section4.userContent.title}
                      </h4>
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.userContent.paragraph1}
                      </p>
                      {"list" in t.sections.section4.userContent &&
                        Array.isArray(t.sections.section4.userContent.list) && (
                          <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                            {t.sections.section4.userContent.list.map(
                              (item: string, index: number) => (
                                <li
                                  key={index}
                                  className="leading-relaxed"
                                  style={{
                                    color:
                                      "var(--color-muted-foreground, #64748b)",
                                  }}
                                >
                                  {item}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      <p
                        className="leading-relaxed mb-2"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.userContent.purpose}
                      </p>
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.userContent.legalBasis}
                      </p>
                      {t.sections.section4.userContent.paragraph2 && (
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section4.userContent.paragraph2}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Admin Data */}
                  <div>
                    <h4
                      id="admin-daten"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section4.adminData.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.adminData.paragraph1}
                    </p>
                    {"list" in t.sections.section4.adminData &&
                      Array.isArray(t.sections.section4.adminData.list) && (
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                          {t.sections.section4.adminData.list.map(
                            (item: string, index: number) => (
                              <li
                                key={index}
                                className="leading-relaxed"
                                style={{
                                  color:
                                    "var(--color-muted-foreground, #64748b)",
                                }}
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.adminData.purpose}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.adminData.legalBasis}
                    </p>
                    <p
                      className="leading-relaxed italic"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.adminData.note}
                    </p>
                    {t.sections.section4.adminData.paragraph2 && (
                      <p
                        className="leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.adminData.paragraph2}
                      </p>
                    )}
                  </div>

                  {/* Account Security */}
                  <div>
                    <h4
                      id="kontosicherheit"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section4.accountSecurity.title}
                    </h4>
                    {"list" in t.sections.section4.accountSecurity &&
                      Array.isArray(
                        t.sections.section4.accountSecurity.list
                      ) && (
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                          {t.sections.section4.accountSecurity.list.map(
                            (item: string, index: number) => (
                              <li
                                key={index}
                                className="leading-relaxed"
                                style={{
                                  color:
                                    "var(--color-muted-foreground, #64748b)",
                                }}
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.accountSecurity.purpose}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.accountSecurity.legalBasis}
                    </p>
                    {t.sections.section4.accountSecurity.paragraph1 && (
                      <p
                        className="leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.accountSecurity.paragraph1}
                      </p>
                    )}
                  </div>

                  {/* Improvement */}
                  <div>
                    <h4
                      id="verbesserung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section4.improvement.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.improvement.paragraph1}
                    </p>
                    {"list" in t.sections.section4.improvement &&
                      Array.isArray(t.sections.section4.improvement.list) && (
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                          {t.sections.section4.improvement.list.map(
                            (item: string, index: number) => (
                              <li
                                key={index}
                                className="leading-relaxed"
                                style={{
                                  color:
                                    "var(--color-muted-foreground, #64748b)",
                                }}
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.improvement.purpose}
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.improvement.legalBasis}
                    </p>
                  </div>

                  {/* Server Logs */}
                  <div>
                    <h4
                      id="server-logs"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section4.serverLogs.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.serverLogs.paragraph1}
                    </p>
                    {"list" in t.sections.section4.serverLogs &&
                      Array.isArray(t.sections.section4.serverLogs.list) && (
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                          {t.sections.section4.serverLogs.list.map(
                            (item: string, index: number) => (
                              <li
                                key={index}
                                className="leading-relaxed"
                                style={{
                                  color:
                                    "var(--color-muted-foreground, #64748b)",
                                }}
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    {t.sections.section4.serverLogs.paragraph2 && (
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.serverLogs.paragraph2}
                      </p>
                    )}
                    {t.sections.section4.serverLogs.paragraph3 && (
                      <p
                        className="leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.serverLogs.paragraph3}
                      </p>
                    )}
                  </div>

                  {/* Contact Form */}
                  <div>
                    <h4
                      id="kontaktformular"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section4.contactForm.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.contactForm.paragraph1}
                    </p>
                    {t.sections.section4.contactForm.paragraph2 && (
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.contactForm.paragraph2}
                      </p>
                    )}
                    {t.sections.section4.contactForm.paragraph3 && (
                      <p
                        className="leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.contactForm.paragraph3}
                      </p>
                    )}
                  </div>

                  {/* Email Inquiry */}
                  {t.sections.section4.emailInquiry && (
                    <div>
                      <h4
                        id="email-anfrage"
                        className="text-lg font-semibold mb-2"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        {t.sections.section4.emailInquiry.title}
                      </h4>
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.emailInquiry.paragraph1}
                      </p>
                      {t.sections.section4.emailInquiry.paragraph2 && (
                        <p
                          className="leading-relaxed mb-3"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section4.emailInquiry.paragraph2}
                        </p>
                      )}
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.emailInquiry.paragraph3}
                      </p>
                      {t.sections.section4.emailInquiry.paragraph4 && (
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section4.emailInquiry.paragraph4}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Resend */}
                  <div>
                    <h4
                      id="resend"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {t.sections.section4.resend.title}
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.resend.paragraph1}
                    </p>
                    {t.sections.section4.resend.paragraph2 && (
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.resend.paragraph2}
                      </p>
                    )}
                    {"list" in t.sections.section4.resend &&
                      Array.isArray(t.sections.section4.resend.list) && (
                        <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                          {t.sections.section4.resend.list.map(
                            (item: string, index: number) => (
                              <li
                                key={index}
                                className="leading-relaxed"
                                style={{
                                  color:
                                    "var(--color-muted-foreground, #64748b)",
                                }}
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    {t.sections.section4.resend.paragraph3 && (
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.resend.paragraph3}
                      </p>
                    )}
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.resend.purpose}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.resend.storageDuration}
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {t.sections.section4.resend.thirdCountry}
                    </p>
                    {t.sections.section4.resend.paragraph4 && (
                      <p
                        className="leading-relaxed mb-2"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.resend.paragraph4}{" "}
                        <a
                          href={t.sections.section4.resend.resendPrivacyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:no-underline"
                          style={{ color: "var(--color-primary, #3b82f6)" }}
                        >
                          {t.sections.section4.resend.resendPrivacyLink}
                        </a>
                      </p>
                    )}
                    {t.sections.section4.resend.paragraph5 && (
                      <p
                        className="leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.resend.paragraph5}
                      </p>
                    )}
                  </div>

                  {/* Comments */}
                  {t.sections.section4.comments && (
                    <div>
                      <h4
                        id="kommentare"
                        className="text-lg font-semibold mb-2"
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        {t.sections.section4.comments.title}
                      </h4>
                      <p
                        className="leading-relaxed mb-3"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        {t.sections.section4.comments.paragraph1}
                      </p>
                      <div className="mb-3">
                        <p
                          className="font-medium mb-1"
                          style={{
                            color: "var(--color-foreground, #0f172a)",
                          }}
                        >
                          {t.sections.section4.comments.ipStorage.title}
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section4.comments.ipStorage.content}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p
                          className="font-medium mb-1"
                          style={{
                            color: "var(--color-foreground, #0f172a)",
                          }}
                        >
                          {t.sections.section4.comments.commentDuration.title}
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section4.comments.commentDuration.content}
                        </p>
                      </div>
                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{
                            color: "var(--color-foreground, #0f172a)",
                          }}
                        >
                          {t.sections.section4.comments.legalBasis.title}
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          {t.sections.section4.comments.legalBasis.content}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div
            className="rounded-2xl border p-4 mb-8 text-center"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <p
              className="text-sm"
              style={{
                color: "var(--color-muted-foreground, #64748b)",
              }}
            >
              <strong style={{ color: "var(--color-foreground, #0f172a)" }}>
                {t.lastUpdatedLabel}
              </strong>{" "}
              {t.lastUpdated}
            </p>
          </div>

          {/* Contact Section */}
          <div
            className="rounded-2xl border p-8 text-center"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderColor: "rgba(59, 130, 246, 0.2)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              {t.contactSection.title}
            </h3>
            <p
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              {t.contactSection.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/contact?subject=privacy" className="block">
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
                  {t.contactSection.contactButton}
                </button>
              </a>
              <Link href="/" className="block">
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
                  {t.contactSection.homeButton}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
