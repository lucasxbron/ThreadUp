"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

// Update this date when the document is updated
const LAST_UPDATED = "01.11.2025";

export default function ImpressumPage() {
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
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Impressum & Datenschutz&shy;erklärung
            </h1>
            <p
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Rechtliche Informationen und Datenschutzhinweise gemäß deutschem
              Recht
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
              Impressum
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
                </p>
              </div>

              <div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Kontakt
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
              Inhaltsverzeichnis
            </h2>
            <nav className="space-y-2 text-sm">
              <a
                href="#datenschutz"
                className="block hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                1. Datenschutz auf einen Blick
              </a>
              <div className="ml-4 space-y-1">
                <a
                  href="#allgemeine-hinweise"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Allgemeine Hinweise
                </a>
                <a
                  href="#hinweise-datenerfassung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Wichtige Hinweise zur Datenerfassung
                </a>
              </div>

              <a
                href="#hosting"
                className="block hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                2. Hosting
              </a>
              <div className="ml-4 space-y-1">
                <a
                  href="#externes-hosting"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Externes Hosting
                </a>
                <a
                  href="#auftragsverarbeitung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Auftragsverarbeitung
                </a>
              </div>

              <a
                href="#hinweise-und-pflichtinformationen"
                className="block hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                3. Allgemeine Hinweise und Pflichtinformationen
              </a>
              <div className="ml-4 space-y-1">
                <a
                  href="#datenschutz-info"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Datenschutz
                </a>
                <a
                  href="#verantwortliche-stelle"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Hinweis zur verantwortlichen Stelle
                </a>
                <a
                  href="#speicherdauer"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Speicherdauer
                </a>
                <a
                  href="#rechtsgrundlagen"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Rechtsgrundlagen der Datenverarbeitung
                </a>
                <a
                  href="#empfaenger"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Empfänger von personenbezogenen Daten
                </a>
                <a
                  href="#widerruf"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Widerruf Ihrer Einwilligung
                </a>
                <a
                  href="#widerspruchsrecht"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Widerspruchsrecht
                </a>
                <a
                  href="#beschwerderecht"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Beschwerderecht
                </a>
                <a
                  href="#datenuebertragbarkeit"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Recht auf Datenübertragbarkeit
                </a>
                <a
                  href="#auskunft"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Auskunft, Berichtigung und Löschung
                </a>
                <a
                  href="#einschraenkung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Recht auf Einschränkung
                </a>
                <a
                  href="#verschluesselung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • SSL- bzw. TLS-Verschlüsselung
                </a>
              </div>

              <a
                href="#datenerfassung"
                className="block hover:underline"
                style={{ color: "var(--color-primary, #3b82f6)" }}
              >
                4. Datenerfassung auf dieser Website
              </a>
              <div className="ml-4 space-y-1">
                <a
                  href="#allgemeine-datenverarbeitung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Allgemeine Hinweise zur Datenverarbeitung
                </a>
                <a
                  href="#cookies"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Cookies
                </a>
                <a
                  href="#benutzerkonto"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Benutzerkonto / Registrierung
                </a>
                <a
                  href="#nutzerinhalte"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Von Nutzern bereitgestellte Inhalte
                </a>
                <a
                  href="#admin-daten"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Administrations- und Moderationsdaten
                </a>
                <a
                  href="#kontosicherheit"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Kontosicherheit
                </a>
                <a
                  href="#verbesserung"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Nutzung zur Verbesserung und Analyse
                </a>
                <a
                  href="#server-logs"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Server-Log-Dateien
                </a>
                <a
                  href="#kontaktformular"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Kontaktformular
                </a>
                <a
                  href="#email-anfrage"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Anfrage per E-Mail
                </a>
                <a
                  href="#resend"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • E-Mail-Versand über Resend
                </a>
                <a
                  href="#kommentare"
                  className="block hover:underline"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  • Kommentarfunktion
                </a>
              </div>
            </nav>
          </div>

          {/* Datenschutzerklärung Section */}
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
              Datenschutz&shy;erklärung
            </h2>

            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h3
                  id="datenschutz"
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  1. Datenschutz auf einen Blick
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4
                      id="allgemeine-hinweise"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Allgemeine Hinweise
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Die folgenden Hinweise geben einen einfachen Überblick
                      darüber, was mit Ihren personenbezogenen Daten passiert,
                      wenn Sie diese Website besuchen. Personenbezogene Daten
                      sind alle Daten, mit denen Sie persönlich identifiziert
                      werden können. Ausführliche Informationen zum Thema
                      Datenschutz entnehmen Sie unserer unter diesem Text
                      aufgeführten Datenschutzerklärung.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="hinweise-datenerfassung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Wichtige Hinweise zur Datenerfassung
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Wer ist verantwortlich für die Datenerfassung auf
                          dieser Website?
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Die Datenverarbeitung auf dieser Website erfolgt durch
                          den Websitebetreiber. Dessen Kontaktdaten können Sie
                          dem Abschnitt &quot;Hinweis zur Verantwortlichen
                          Stelle&quot; in dieser Datenschutzerklärung entnehmen.
                        </p>
                      </div>

                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Wie erfassen wir Ihre Daten?
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Ihre Daten werden zum einen dadurch erhoben, dass Sie
                          uns diese mitteilen. Hierbei kann es sich z. B. um
                          Daten handeln, die Sie in ein Kontaktformular
                          eingeben.
                        </p>
                        <p
                          className="leading-relaxed mt-2"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Andere Daten werden automatisch oder nach Ihrer
                          Einwilligung beim Besuch der Website durch unsere
                          IT-Systeme erfasst. Das sind vor allem technische
                          Daten (z. B. Internetbrowser, Betriebssystem oder
                          Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten
                          erfolgt automatisch, sobald Sie diese Website
                          betreten.
                        </p>
                      </div>

                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Wofür nutzen wir Ihre Daten?
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Ein Teil der Daten wird erhoben, um eine fehlerfreie
                          Bereitstellung der Website zu gewährleisten. Andere
                          Daten können zur Analyse Ihres Nutzerverhaltens
                          verwendet werden. Sofern über die Website Verträge
                          geschlossen oder angebahnt werden können, werden die
                          übermittelten Daten auch für Vertragsangebote,
                          Bestellungen oder sonstige Auftragsanfragen
                          verarbeitet.
                        </p>
                      </div>

                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Welche Rechte haben Sie bezüglich Ihrer Daten?
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Sie haben jederzeit das Recht, unentgeltlich Auskunft
                          über Herkunft, Empfänger und Zweck Ihrer gespeicherten
                          personenbezogenen Daten zu erhalten. Sie haben
                          außerdem ein Recht, die Berichtigung oder Löschung
                          dieser Daten zu verlangen. Wenn Sie eine Einwilligung
                          zur Datenverarbeitung erteilt haben, können Sie diese
                          Einwilligung jederzeit für die Zukunft widerrufen.
                          Außerdem haben Sie das Recht, unter bestimmten
                          Umständen die Einschränkung der Verarbeitung Ihrer
                          personenbezogenen Daten zu verlangen. Des Weiteren
                          steht Ihnen ein Beschwerderecht bei der zuständigen
                          Aufsichtsbehörde zu.
                        </p>
                        <p
                          className="leading-relaxed mt-2"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Hierzu sowie zu weiteren Fragen zum Thema Datenschutz
                          können Sie sich jederzeit an uns wenden.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h3
                  id="hosting"
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  2. Hosting
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4
                      id="externes-hosting"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Externes Hosting
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Diese Website wird extern gehostet. Die personenbezogenen
                      Daten, die auf dieser Website erfasst werden, werden auf
                      den Servern des Hosters / der Hoster gespeichert. Hierbei
                      kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta-
                      und Kommunikationsdaten, Vertragsdaten, Kontaktdaten,
                      Namen, Websitezugriffe und sonstige Daten, die über eine
                      Website generiert werden, handeln.
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Das externe Hosting erfolgt zum Zwecke der
                      Vertragserfüllung gegenüber unseren potenziellen und
                      bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im
                      Interesse einer sicheren, schnellen und effizienten
                      Bereitstellung unseres Online-Angebots durch einen
                      professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
                      Sofern eine entsprechende Einwilligung abgefragt wurde,
                      erfolgt die Verarbeitung ausschließlich auf Grundlage von
                      Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit
                      die Einwilligung die Speicherung von Cookies oder den
                      Zugriff auf Informationen im Endgerät des Nutzers (z. B.
                      Device-Fingerprinting) im Sinne des TDDDG umfasst. Die
                      Einwilligung ist jederzeit widerrufbar.
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit
                      verarbeiten, wie dies zur Erfüllung seiner
                      Leistungspflichten erforderlich ist und unsere Weisungen
                      in Bezug auf diese Daten befolgen.
                    </p>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wir setzen folgende(n) Hoster ein:
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
                      Übermittlungen in die USA erfolgen auf Grundlage der
                      EU‑Standardvertragsklauseln und gestützt auf die
                      Zertifizierung von Render unter dem EU‑US Data Privacy
                      Framework (DPF); nähere Informationen zur Zertifizierung
                      sind im offiziellen DPF‑Register abrufbar, und die
                      unabhängige Streitbeilegung erfolgt über die
                      DPF‑Mechanismen (z. B. JAMS), wobei Details dem
                      Privacy‑Hinweis von Render zu entnehmen sind. Kopien
                      geeigneter Garantien (insbesondere die SCC‑Anhänge aus dem
                      Render‑Data‑Processing‑Addendum) stellen wir auf Anfrage
                      zur Verfügung. Es wird auf verbleibende Zugriffsrisiken
                      durch US‑Behörden hingewiesen sowie auf getroffene
                      Schutzmaßnahmen (z. B. Verschlüsselung).​ Render weist
                      öffentlich aus, dass es den EU‑US DPF, die UK‑Erweiterung
                      und den Swiss‑US DPF einhält; Übermittlungen können somit
                      je nach Konstellation auch auf das DPF gestützt werden.​
                      Betroffene behalten ihre Rechte (z. B. Auskunft, Löschung,
                      Beschwerden) auch bei Drittlandübermittlungen; nähere
                      Informationen zum DPF und zur unabhängigen Streitbeilegung
                      sind über die DPF‑Informationsseiten verfügbar.​
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Weitere Informationen zur Datenverarbeitung durch Render
                      entnehmen Sie der Render Privacy Policy unter:{" "}
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
                      Auftragsverarbeitung
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wir haben einen Vertrag über Auftragsverarbeitung (AVV)
                      zur Nutzung des oben genannten Dienstes geschlossen.
                      Hierbei handelt es sich um einen datenschutzrechtlich
                      vorgeschriebenen Vertrag, der gewährleistet, dass dieser
                      die personenbezogenen Daten unserer Websitebesucher nur
                      nach unseren Weisungen und unter Einhaltung der DSGVO
                      verarbeitet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3
                  id="hinweise-und-pflichtinformationen"
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  3. Allgemeine Hinweise und Pflichtinformationen
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4
                      id="datenschutz-info"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Datenschutz
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Die Betreiber dieser Seiten nehmen den Schutz Ihrer
                      persönlichen Daten sehr ernst. Wir behandeln Ihre
                      personenbezogenen Daten vertraulich und entsprechend den
                      gesetzlichen Datenschutzvorschriften sowie dieser
                      Datenschutzerklärung.
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wenn Sie diese Website benutzen, werden verschiedene
                      personenbezogene Daten erhoben. Personenbezogene Daten
                      sind Daten, mit denen Sie persönlich identifiziert werden
                      können. Die vorliegende Datenschutzerklärung erläutert,
                      welche Daten wir erheben und wofür wir sie nutzen. Sie
                      erläutert auch, wie und zu welchem Zweck das geschieht.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wir weisen darauf hin, dass die Datenübertragung im
                      Internet (z. B. bei der Kommunikation per E-Mail)
                      Sicherheitslücken aufweisen kann. Ein lückenloser Schutz
                      der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="verantwortliche-stelle"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Hinweis zur verantwortlichen Stelle
                    </h4>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Die verantwortliche Stelle für die Datenverarbeitung auf
                      dieser Website ist:
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
                      Verantwortliche Stelle ist die natürliche oder juristische
                      Person, die allein oder gemeinsam mit anderen über die
                      Zwecke und Mittel der Verarbeitung von personenbezogenen
                      Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="speicherdauer"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Speicherdauer
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Soweit innerhalb dieser Datenschutzerklärung keine
                      speziellere Speicherdauer genannt wurde, verbleiben Ihre
                      personenbezogenen Daten bei uns, bis der Zweck für die
                      Datenverarbeitung entfällt. Wenn Sie ein berechtigtes
                      Löschersuchen geltend machen oder eine Einwilligung zur
                      Datenverarbeitung widerrufen, werden Ihre Daten gelöscht,
                      sofern wir keine anderen rechtlich zulässigen Gründe für
                      die Speicherung Ihrer personenbezogenen Daten haben (z. B.
                      steuer- oder handelsrechtliche Aufbewahrungsfristen); im
                      letztgenannten Fall erfolgt die Löschung nach Fortfall
                      dieser Gründe.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="rechtsgrundlagen"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Allgemeine Hinweise zu den Rechtsgrundlagen der
                      Datenverarbeitung auf dieser Website
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Sofern Sie in die Datenverarbeitung eingewilligt haben,
                      verarbeiten wir Ihre personenbezogenen Daten auf Grundlage
                      von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a
                      DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1
                      DSGVO verarbeitet werden. Im Falle einer ausdrücklichen
                      Einwilligung in die Übertragung personenbezogener Daten in
                      Drittstaaten erfolgt die Datenverarbeitung außerdem auf
                      Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in
                      die Speicherung von Cookies oder in den Zugriff auf
                      Informationen in Ihr Endgerät (z. B. via
                      Device-Fingerprinting) eingewilligt haben, erfolgt die
                      Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1
                      TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind
                      Ihre Daten zur Vertragserfüllung oder zur Durchführung
                      vorvertraglicher Maßnahmen erforderlich, verarbeiten wir
                      Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO.
                      Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur
                      Erfüllung einer rechtlichen Verpflichtung erforderlich
                      sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die
                      Datenverarbeitung kann ferner auf Grundlage unseres
                      berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO
                      erfolgen. Über die jeweils im Einzelfall einschlägigen
                      Rechtsgrundlagen wird in den folgenden Absätzen dieser
                      Datenschutzerklärung informiert.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="empfaenger"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Empfänger von personenbezogenen Daten
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit
                      verschiedenen externen Stellen zusammen. Dabei ist
                      teilweise auch eine Übermittlung von personenbezogenen
                      Daten an diese externen Stellen erforderlich. Wir geben
                      personenbezogene Daten nur dann an externe Stellen weiter,
                      wenn dies im Rahmen einer Vertragserfüllung erforderlich
                      ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B.
                      Weitergabe von Daten an Steuerbehörden), wenn wir ein
                      berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an
                      der Weitergabe haben oder wenn eine sonstige
                      Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz
                      von Auftragsverarbeitern geben wir personenbezogene Daten
                      unserer Kunden nur auf Grundlage eines gültigen Vertrags
                      über Auftragsverarbeitung weiter. Im Falle einer
                      gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame
                      Verarbeitung geschlossen.
                    </p>

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
                        E-Mail-Kommunikation über externen Dienstleister (Gmail)
                      </p>
                      <p
                        className="leading-relaxed mb-3 text-sm"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        Für den Versand und Empfang von E-Mails nutzen wir den
                        Dienst Gmail des Anbieters Google LLC, 1600 Amphitheatre
                        Parkway, Mountain View, CA 94043, USA; dabei werden
                        Meta-/Kommunikationsdaten (z. B. Absender, Empfänger,
                        Zeitpunkt), Inhaltsdaten und ggf. Anhänge auf Servern
                        des Anbieters verarbeitet. Die Übertragung erfolgt in
                        der Regel verschlüsselt via TLS; der Anbieter gibt an,
                        Daten zudem im Ruhezustand zu verschlüsseln, und in
                        Google Workspace steht optional eine clientseitige
                        Verschlüsselung zur Verfügung. Bei Nutzung von Google
                        Workspace besteht ein Auftragsverarbeitungsvertrag; bei
                        Nutzung eines privaten Gmail‑Kontos verarbeitet Google
                        als eigener Verantwortlicher gemäß eigener
                        Datenschutzerklärung.
                      </p>

                      <div className="space-y-2 text-sm">
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          <strong
                            style={{
                              color: "var(--color-foreground, #0f172a)",
                            }}
                          >
                            Zwecke/Rechtsgrundlagen:
                          </strong>{" "}
                          Kommunikation und Bearbeitung von Anfragen sowie
                          Vertragsanbahnung/-erfüllung nach Art. 6 Abs. 1 lit. b
                          DSGVO; außerdem berechtigtes Interesse an effizienter
                          und sicherer Kommunikation nach Art. 6 Abs. 1 lit. f
                          DSGVO; soweit Sie hierin ausdrücklich eingewilligt
                          haben, zusätzlich Art. 6 Abs. 1 lit. a DSGVO.
                        </p>

                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          <strong
                            style={{
                              color: "var(--color-foreground, #0f172a)",
                            }}
                          >
                            Speicherdauer:
                          </strong>{" "}
                          E-Mails werden für die Dauer der Kommunikation bzw.
                          zur Wahrung gesetzlicher Aufbewahrungspflichten
                          gespeichert und anschließend gelöscht.
                        </p>

                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          <strong
                            style={{
                              color: "var(--color-foreground, #0f172a)",
                            }}
                          >
                            Drittlandübermittlung:
                          </strong>{" "}
                          Google ist im Data Privacy Framework (DPF) gelistet;
                          Übermittlungen in die USA stützen sich je nach
                          Konstellation auf das EU-US DPF und/oder die
                          EU-Standardvertragsklauseln (SCC).
                        </p>

                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          <strong
                            style={{
                              color: "var(--color-foreground, #0f172a)",
                            }}
                          >
                            Unabhängige Streitbeilegung (IRM):
                          </strong>{" "}
                          Für DPF-Beschwerden steht eine unabhängige
                          Streitbeilegung zur Verfügung (z. B. JAMS gemäß
                          DPF-Vorgaben); Details finden sich im DPF-Register und
                          in Googles Datenschutzhinweisen.
                        </p>

                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Kopien geeigneter Garantien (insbesondere SCC-Anhänge)
                          sowie weitergehende Informationen stellen wir auf
                          Anfrage über die im Abschnitt &quot;Hinweis zur
                          Verantwortlichen Stelle&quot; genannten Kontaktdaten
                          zur Verfügung.
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Weitere Informationen zur Datenverarbeitung durch
                          Google finden Sie unter:{" "}
                          <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:no-underline"
                            style={{ color: "var(--color-primary, #3b82f6)" }}
                          >
                            https://policies.google.com/privacy
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4
                      id="widerruf"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Widerruf Ihrer Einwilligung zur Datenverarbeitung
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Viele Datenverarbeitungsvorgänge sind nur mit Ihrer
                      ausdrücklichen Einwilligung möglich. Sie können eine
                      bereits erteilte Einwilligung jederzeit widerrufen. Die
                      Rechtmäßigkeit der bis zum Widerruf erfolgten
                      Datenverarbeitung bleibt vom Widerruf unberührt.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="widerspruchsrecht"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Widerspruchsrecht gegen die Datenerhebung in besonderen
                      Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)
                    </h4>
                    <p
                      className="leading-relaxed mb-3 uppercase font-semibold"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1
                      LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS
                      RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN
                      SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER
                      PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT
                      AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING.
                      DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG
                      BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN
                      SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN
                      PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI
                      DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE
                      VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
                      FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER
                      GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON
                      RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
                    </p>
                    <p
                      className="leading-relaxed uppercase font-semibold"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM
                      DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT,
                      JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE
                      BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER
                      WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING,
                      SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT.
                      WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN
                      DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER
                      DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2
                      DSGVO).
                    </p>
                  </div>

                  <div>
                    <h4
                      id="beschwerderecht"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Beschwerderecht bei der zuständigen Aufsichtsbehörde
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Im Falle von Verstößen gegen die DSGVO steht den
                      Betroffenen ein Beschwerderecht bei einer
                      Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres
                      gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des
                      Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht
                      besteht unbeschadet anderweitiger verwaltungsrechtlicher
                      oder gerichtlicher Rechtsbehelfe.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="datenuebertragbarkeit"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Recht auf Datenübertragbarkeit
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Sie haben das Recht, Daten, die wir auf Grundlage Ihrer
                      Einwilligung oder in Erfüllung eines Vertrags
                      automatisiert verarbeiten, an sich oder an einen Dritten
                      in einem gängigen, maschinenlesbaren Format aushändigen zu
                      lassen. Sofern Sie die direkte Übertragung der Daten an
                      einen anderen Verantwortlichen verlangen, erfolgt dies
                      nur, soweit es technisch machbar ist.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="auskunft"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Auskunft, Berichtigung und Löschung
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Sie haben im Rahmen der geltenden gesetzlichen
                      Bestimmungen jederzeit das Recht auf unentgeltliche
                      Auskunft über Ihre gespeicherten personenbezogenen Daten,
                      deren Herkunft und Empfänger und den Zweck der
                      Datenverarbeitung und ggf. ein Recht auf Berichtigung oder
                      Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum
                      Thema personenbezogene Daten können Sie sich jederzeit an
                      uns wenden.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="einschraenkung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Recht auf Einschränkung der Verarbeitung
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Sie haben das Recht, die Einschränkung der Verarbeitung
                      Ihrer personenbezogenen Daten zu verlangen. Hierzu können
                      Sie sich jederzeit an uns wenden. Das Recht auf
                      Einschränkung der Verarbeitung besteht in folgenden
                      Fällen:
                    </p>
                    <ul
                      className="list-disc list-inside space-y-2 ml-4"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <li>
                        Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
                        personenbezogenen Daten bestreiten, benötigen wir in der
                        Regel Zeit, um dies zu überprüfen. Für die Dauer der
                        Prüfung haben Sie das Recht, die Einschränkung der
                        Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                      </li>
                      <li>
                        Wenn die Verarbeitung Ihrer personenbezogenen Daten
                        unrechtmäßig geschah/geschieht, können Sie statt der
                        Löschung die Einschränkung der Datenverarbeitung
                        verlangen.
                      </li>
                      <li>
                        Wenn wir Ihre personenbezogenen Daten nicht mehr
                        benötigen, Sie sie jedoch zur Ausübung, Verteidigung
                        oder Geltendmachung von Rechtsansprüchen benötigen,
                        haben Sie das Recht, statt der Löschung die
                        Einschränkung der Verarbeitung Ihrer personenbezogenen
                        Daten zu verlangen.
                      </li>
                      <li>
                        Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO
                        eingelegt haben, muss eine Abwägung zwischen Ihren und
                        unseren Interessen vorgenommen werden. Solange noch
                        nicht feststeht, wessen Interessen überwiegen, haben Sie
                        das Recht, die Einschränkung der Verarbeitung Ihrer
                        personenbezogenen Daten zu verlangen.
                      </li>
                    </ul>
                    <p
                      className="leading-relaxed mt-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
                      eingeschränkt haben, dürfen diese Daten – von ihrer
                      Speicherung abgesehen – nur mit Ihrer Einwilligung oder
                      zur Geltendmachung, Ausübung oder Verteidigung von
                      Rechtsansprüchen oder zum Schutz der Rechte einer anderen
                      natürlichen oder juristischen Person oder aus Gründen
                      eines wichtigen öffentlichen Interesses der Europäischen
                      Union oder eines Mitgliedstaats verarbeitet werden.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="verschluesselung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      SSL- bzw. TLS-Verschlüsselung
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Diese Seite nutzt aus Sicherheitsgründen und zum Schutz
                      der Übertragung vertraulicher Inhalte, wie zum Beispiel
                      Bestellungen oder Anfragen, die Sie an uns als
                      Seitenbetreiber senden, eine SSL- bzw.
                      TLS-Verschlüsselung. Eine verschlüsselte Verbindung
                      erkennen Sie daran, dass die Adresszeile des Browsers von
                      &quot;http://&quot; auf &quot;https://&quot; wechselt und
                      an dem Schloss-Symbol in Ihrer Browserzeile.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist,
                      können die Daten, die Sie an uns übermitteln, nicht von
                      Dritten mitgelesen werden.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h3
                  id="datenerfassung"
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  4. Datenerfassung auf dieser Website
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4
                      id="allgemeine-datenverarbeitung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Allgemeine Hinweise zur Datenverarbeitung
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wir verarbeiten personenbezogene Daten nur, soweit dies
                      für den Betrieb, die Sicherheit und die Funktionalität
                      unserer Website sowie zur Erbringung unserer Leistungen
                      erforderlich ist. Im Folgenden informieren wir Sie
                      darüber, welche Datenkategorien wir verarbeiten, zu
                      welchen Zwecken dies erfolgt und auf welcher
                      Rechtsgrundlage dies beruht.
                    </p>
                    <ul
                      className="list-disc list-inside space-y-2 ml-4"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <li>
                        <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> –
                        Einwilligung (z. B. bei freiwilliger Registrierung,
                        Kommentarfunktionen, Cookie-Einwilligung);
                      </li>
                      <li>
                        <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> –
                        Vertragserfüllung oder vorvertragliche Maßnahmen (z. B.
                        Benutzerkonto, Nutzung der Plattform);
                      </li>
                      <li>
                        <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> –
                        berechtigtes Interesse (z. B. IT-Sicherheit,
                        Missbrauchsvermeidung).
                        {/* Missbrauchsvermeidung, Reichweitenmessung). */}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4
                      id="cookies"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Cookies
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Unsere Internetseiten verwenden so genannte
                      &quot;Cookies&quot;. Cookies sind kleine Datenpakete und
                      richten auf Ihrem Endgerät keinen Schaden an. Sie werden
                      entweder vorübergehend für die Dauer einer Sitzung
                      (Session-Cookies) oder dauerhaft (permanente Cookies) auf
                      Ihrem Endgerät gespeichert. Session-Cookies werden nach
                      Ende Ihres Besuchs automatisch gelöscht. Permanente
                      Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie
                      diese selbst löschen oder eine automatische Löschung durch
                      Ihren Webbrowser erfolgt.
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Cookies können von uns (First-Party-Cookies) oder von
                      Drittunternehmen stammen (sog. Third-Party-Cookies).
                      Third-Party-Cookies ermöglichen die Einbindung bestimmter
                      Dienstleistungen von Drittunternehmen innerhalb von
                      Webseiten (z. B. Cookies zur Abwicklung von
                      Zahlungsdienstleistungen).
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Cookies haben verschiedene Funktionen. Zahlreiche Cookies
                      sind technisch notwendig, da bestimmte Webseitenfunktionen
                      ohne diese nicht funktionieren würden (z. B. die
                      Warenkorbfunktion oder die Anzeige von Videos). Andere
                      Cookies können zur Auswertung des Nutzerverhaltens oder zu
                      Werbezwecken verwendet werden.
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {/* Cookies, die zur Durchführung des elektronischen
                      Kommunikationsvorgangs, zur Bereitstellung bestimmter, von
                      Ihnen erwünschter Funktionen oder zur Optimierung der Website (z. B.
                      Cookies zur Messung des Webpublikums) erforderlich sind
                      (notwendige Cookies), werden auf Grundlage von Art. 6 Abs.
                      1 lit. f DSGVO gespeichert, sofern keine andere
                      Rechtsgrundlage angegeben wird. */}
                      Cookies, die zur Durchführung des elektronischen
                      Kommunikationsvorgangs oder zur Bereitstellung bestimmter,
                      von Ihnen ausdrücklich gewünschter Funktionen erforderlich
                      sind (notwendige Cookies), werden auf Grundlage von Art. 6
                      Abs. 1 lit. f DSGVO verarbeitet, sofern keine andere
                      Rechtsgrundlage angegeben wird. Der Websitebetreiber hat
                      ein berechtigtes Interesse an der Speicherung von
                      notwendigen Cookies zur technisch fehlerfreien und
                      optimierten Bereitstellung seiner Dienste. Sofern eine
                      Einwilligung zur Speicherung von Cookies und
                      vergleichbaren Wiedererkennungstechnologien abgefragt
                      wurde, erfolgt die Verarbeitung ausschließlich auf
                      Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO
                      und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit
                      widerrufbar.
                    </p>

                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Der Zugriff auf Informationen in Ihrer Endeinrichtung bzw.
                      das Setzen von Cookies erfolgt, soweit nicht unbedingt
                      erforderlich, nur nach Einwilligung gemäß § 25 Abs. 1
                      TDDDG; unbedingt erforderliche Vorgänge zur
                      Nachrichtenübertragung oder zur Bereitstellung eines von
                      Ihnen ausdrücklich gewünschten digitalen Dienstes sind
                      nach § 25 Abs. 2 TDDDG zulässig.
                    </p>

                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Sie können Ihren Browser so einstellen, dass Sie über das
                      Setzen von Cookies informiert werden und Cookies nur im
                      Einzelfall erlauben, die Annahme von Cookies für bestimmte
                      Fälle oder generell ausschließen sowie das automatische
                      Löschen der Cookies beim Schließen des Browsers
                      aktivieren. Bei der Deaktivierung von Cookies kann die
                      Funktionalität dieser Website eingeschränkt sein.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Derzeit setzen wir keine optionalen Analyse-, Marketing-
                      oder Reichweitenmessungs-Cookies ein; Endgerätezugriffe,
                      die unbedingt erforderlich sind, erfolgen nach § 25 Abs. 2
                      TDDDG; sollte künftig eine Einwilligung erforderlich sein,
                      erfolgt der Einsatz erst nach Ihrer Einwilligung gemäß §
                      25 Abs. 1 TDDDG i.V.m. Art. 6 Abs. 1 lit. a DSGVO.
                    </p>
                  </div>
                  <div>
                    <h4
                      id="benutzerkonto"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Benutzerkonto / Registrierung
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wenn Sie ein Benutzerkonto anlegen, verarbeiten wir
                      insbesondere folgende Daten:
                    </p>
                    <ul
                      className="list-disc list-inside space-y-1 ml-4 mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <li>Vor- und Nachname (falls angegeben)</li>
                      <li>Benutzername</li>
                      <li>E-Mail-Adresse</li>
                      <li>
                        Passwort (ausschließlich gehasht und niemals im Klartext
                        gespeichert)
                      </li>
                      <li>optional: Profilbild und freiwillige Profildaten</li>
                      <li>
                        Zeitpunkte der Registrierung, letzter Login,
                        E-Mail-Verifizierungsstatus
                      </li>
                    </ul>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Zweck:
                      </strong>{" "}
                      Bereitstellung der Plattformfunktionen, Nutzung
                      personalisierter Bereiche, Login und Kontoverwaltung.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Rechtsgrundlage:
                      </strong>{" "}
                      Art. 6 Abs. 1 lit. b DSGVO (Vertrag) und ggf. Art. 6 Abs.
                      1 lit. a DSGVO (Einwilligung).
                    </p>
                  </div>

                  <div>
                    <h4
                      id="nutzerinhalte"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Von Nutzern bereitgestellte Inhalte (User-Generated
                      Content)
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Bei der Nutzung unserer Plattform werden durch Sie
                      bereitgestellte Inhalte verarbeitet:
                    </p>
                    <ul
                      className="list-disc list-inside space-y-1 ml-4 mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <li>Beiträge, Threads, Kommentare und deren Inhalte</li>
                      <li>
                        Bilder, Medien, Dateien inklusive Dateiname, Dateigröße,
                        Datum
                      </li>
                      <li>Likes, Follows, Interaktionen mit anderen Nutzern</li>
                      <li>Benutzername und Profilinformationen</li>
                      <li>Zeitstempel der Veröffentlichung</li>
                    </ul>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Zweck:
                      </strong>{" "}
                      Darstellung Ihrer Inhalte, Kommunikation mit anderen
                      Nutzern, Moderation, Sicherstellung der
                      Plattformintegrität.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Rechtsgrundlage:
                      </strong>{" "}
                      Art. 6 Abs. 1 lit. b DSGVO (Nutzungsvertrag) und Art. 6
                      Abs. 1 lit. a DSGVO (Einwilligung für freiwillige
                      Veröffentlichungen).
                    </p>
                  </div>

                  <div>
                    <h4
                      id="admin-daten"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Administrations- und Moderationsdaten (nur für
                      Administratoren)
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Für Nutzer mit administrativen oder moderativen Rechten
                      werden zusätzlich folgende Daten verarbeitet:
                    </p>
                    <ul
                      className="list-disc list-inside space-y-1 ml-4 mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <li>IP-Adresse bei Moderationshandlungen</li>
                      <li>
                        Browser- und Geräteinformationen beim Ausführen
                        administrativer Funktionen
                      </li>
                      <li>
                        Zeitpunkt und Art der vorgenommenen administrativen
                        Aktion (Audit-Log)
                      </li>
                    </ul>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Zweck:
                      </strong>{" "}
                      Schutz vor unbefugtem Zugriff, Nachvollziehbarkeit von
                      Moderationsentscheidungen, IT-Sicherheit.
                    </p>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Rechtsgrundlage:
                      </strong>{" "}
                      Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
                      Sicherheit und Integrität der Plattform).
                    </p>
                    <p
                      className="leading-relaxed italic"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Hinweis: Diese Datenverarbeitung betrifft ausschließlich
                      Administratoren/Moderatoren. Normale Nutzer sind hiervon
                      nicht betroffen.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="kontosicherheit"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Kontosicherheit & technische Sicherheitsmaßnahmen
                    </h4>
                    <ul
                      className="list-disc list-inside space-y-1 ml-4 mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <li>Gespeicherte, gehashte Passwörter (kein Klartext)</li>
                      <li>Login-Status, Token, Session-IDs</li>
                      <li>Datum und Uhrzeit des letzten Logins</li>
                      {/* <li>
                        IP-Adressen bei sicherheitsrelevanten Ereignissen (z. B.
                        mehrfach falsche Logins)
                      </li> */}
                    </ul>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Zweck:
                      </strong>{" "}
                      Schutz Ihres Kontos, Verhinderung unbefugter Zugriffe,
                      Systemsicherheit.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Rechtsgrundlage:
                      </strong>{" "}
                      Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
                      Sicherheit, Missbrauchsvermeidung, Rechtsdurchsetzung).
                    </p>
                  </div>

                  <div>
                    <h4
                      id="verbesserung"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Nutzung zur Verbesserung und Analyse
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Zur Verbesserung unserer Plattform verarbeiten wir
                      anonymisierte bzw. pseudonymisierte Nutzungsdaten, etwa:
                    </p>
                    <ul
                      className="list-disc list-inside space-y-1 ml-4 mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      {/* <li>Seitenaufrufe, Klickverhalten, Verweildauer</li> */}
                      <li>Fehlermeldungen, Absturzberichte</li>
                      <li>
                        Technische Leistungsdaten (Ladezeiten, Serverantworten)
                      </li>
                      <li>
                        Es findet keine Webanalyse und keine automatisierte
                        Entscheidungsfindung einschließlich Profiling im Sinne
                        von Art. 22 DSGVO statt.
                      </li>
                    </ul>
                    <p
                      className="leading-relaxed mb-2"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Zweck:
                      </strong>{" "}
                      Fehlerbehebung, Analyse zur Optimierung von Funktionen,
                      Entwicklung neuer Features.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <strong
                        style={{ color: "var(--color-foreground, #0f172a)" }}
                      >
                        Rechtsgrundlage:
                      </strong>{" "}
                      Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
                      Verbesserung unseres Angebots).
                    </p>
                  </div>
                  <div>
                    <h4
                      id="server-logs"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Server-Log-Dateien
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Der Provider der Seiten erhebt und speichert automatisch
                      Informationen in so genannten Server-Log-Dateien, die Ihr
                      Browser automatisch an uns übermittelt. Dies sind:
                    </p>
                    <ul
                      className="list-disc list-inside space-y-1 ml-4 mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <li>Browsertyp und Browserversion</li>
                      <li>verwendetes Betriebssystem</li>
                      <li>Referrer URL</li>
                      <li>Hostname des zugreifenden Rechners</li>
                      <li>Uhrzeit der Serveranfrage</li>
                      <li>IP-Adresse</li>
                    </ul>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Die Protokollierung von Zugriffs- und technischen
                      Ereignisdaten (z. B. IP-Adresse, Datum/Uhrzeit,
                      User-Agent, Referrer) erfolgt ausschließlich durch unseren
                      Hoster zur Sicherstellung von Betrieb und IT-Sicherheit.
                      Eine Zusammenführung mit anderen Daten erfolgt nicht durch
                      uns.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Die Erfassung dieser Daten erfolgt auf Grundlage von Art.
                      6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein
                      berechtigtes Interesse an der technisch fehlerfreien
                      Darstellung und der Optimierung seiner Website - hierzu
                      müssen die Server-Log-Files erfasst werden. Die
                      Speicherdauer bestimmt der Hoster; Logdaten werden nur für
                      eine kurze sicherheitsbedingte Frist vorgehalten und bei
                      Vorfällen bis zur Klärung länger gespeichert.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="kontaktformular"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Kontaktformular
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                      werden Ihre Angaben aus dem Anfrageformular inklusive der
                      von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                      der Anfrage und für den Fall von Anschlussfragen bei uns
                      gespeichert. Diese Daten geben wir nicht ohne Ihre
                      Einwilligung weiter.
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Die Verarbeitung dieser Daten erfolgt auf Grundlage von
                      Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der
                      Erfüllung eines Vertrags zusammenhängt oder zur
                      Durchführung vorvertraglicher Maßnahmen erforderlich ist.
                      In allen übrigen Fällen beruht die Verarbeitung auf
                      unserem berechtigten Interesse an der effektiven
                      Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1
                      lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1
                      lit. a DSGVO) sofern diese abgefragt wurde; die
                      Einwilligung ist jederzeit widerrufbar.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Die von Ihnen im Kontaktformular eingegebenen Daten
                      verbleiben bei uns, bis Sie uns zur Löschung auffordern,
                      Ihre Einwilligung zur Speicherung widerrufen oder der
                      Zweck für die Datenspeicherung entfällt (z. B. nach
                      abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende
                      gesetzliche Bestimmungen – insbesondere
                      Aufbewahrungsfristen – bleiben unberührt.
                    </p>
                  </div>
                  <div>
                    <h4
                      id="email-anfrage"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Anfrage per E-Mail, Telefon oder Telefax
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Wenn Sie uns per E-Mail, Telefon oder Telefax
                      kontaktieren, wird Ihre Anfrage inklusive aller daraus
                      hervorgehenden personenbezogenen Daten (Name, Anfrage) zum
                      Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert
                      und verarbeitet. Diese Daten geben wir nicht ohne Ihre
                      Einwilligung weiter.
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Die Verarbeitung dieser Daten erfolgt auf Grundlage von
                      Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der
                      Erfüllung eines Vertrags zusammenhängt oder zur
                      Durchführung vorvertraglicher Maßnahmen erforderlich ist.
                      In allen übrigen Fällen beruht die Verarbeitung auf
                      unserem berechtigten Interesse an der effektiven
                      Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1
                      lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1
                      lit. a DSGVO) sofern diese abgefragt wurde; die
                      Einwilligung ist jederzeit widerrufbar.
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Für die E-Mail-Kommunikation nutzen wir Gmail (Google
                      LLC); es gelten die Hinweise im Abschnitt
                      &quot;E-Mail-Dienstleister (Gmail)&quot;.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Die von Ihnen an uns per Kontaktanfragen übersandten Daten
                      verbleiben bei uns, bis Sie uns zur Löschung auffordern,
                      Ihre Einwilligung zur Speicherung widerrufen oder der
                      Zweck für die Datenspeicherung entfällt (z. B. nach
                      abgeschlossener Bearbeitung Ihres Anliegens). Zwingende
                      gesetzliche Bestimmungen – insbesondere gesetzliche
                      Aufbewahrungsfristen – bleiben unberührt.
                    </p>
                  </div>

                  <div>
                    <h4
                      id="resend"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      E-Mail-Versand über Resend
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Für den Versand von transaktionalen E-Mails (z. B.
                      Registrierungsbestätigungen, E-Mail-Änderungen,
                      Passwort-Zurücksetzen-Links und
                      Kontaktformular-Benachrichtigungen) nutzen wir den Dienst
                      Resend der Plus Five Five, Inc., 2261 Market Street #5039,
                      San Francisco, CA 94114, USA.
                    </p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Dabei werden folgende personenbezogene Daten an Resend
                      übermittelt und dort verarbeitet:
                    </p>
                    <ul
                      className="list-disc list-inside space-y-1 ml-4 mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      <li>E-Mail-Adresse des Empfängers</li>
                      <li>Name des Empfängers (sofern angegeben)</li>
                      <li>E-Mail-Inhalt und -Betreff</li>
                      <li>Zeitpunkt des Versands</li>
                      <li>
                        Metadaten zur E-Mail-Zustellung (z. B. Zustellstatus)
                      </li>
                    </ul>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Resend verarbeitet diese Daten ausschließlich im Auftrag
                      und nach unseren Weisungen, um die E-Mails zuverlässig
                      zuzustellen. Die Verarbeitung erfolgt auf Grundlage eines
                      Auftragsverarbeitungsvertrags (AVV) gemäß Art. 28 DSGVO.
                    </p>

                    <div className="space-y-3 mb-3">
                      <p
                        className="leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        <strong
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Zweck und Rechtsgrundlage:
                        </strong>{" "}
                        Der E-Mail-Versand dient der Vertragserfüllung (z. B.
                        Registrierung, Kontoänderungen) nach Art. 6 Abs. 1 lit.
                        b DSGVO sowie der Bearbeitung von Kontaktanfragen auf
                        Grundlage unseres berechtigten Interesses an effizienter
                        Kommunikation nach Art. 6 Abs. 1 lit. f DSGVO. Bei
                        Newsletter- oder Marketing-E-Mails erfolgt die
                        Verarbeitung auf Grundlage Ihrer Einwilligung nach Art.
                        6 Abs. 1 lit. a DSGVO.
                      </p>

                      <p
                        className="leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        <strong
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Speicherdauer:
                        </strong>{" "}
                        Resend speichert die E-Mail-Daten für die Dauer der
                        Vertragslaufzeit. Nach Beendigung der Nutzung werden die
                        Daten innerhalb von 90 Tagen gelöscht, sofern keine
                        gesetzlichen Aufbewahrungspflichten bestehen.
                      </p>

                      <p
                        className="leading-relaxed"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                        }}
                      >
                        <strong
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Drittlandübermittlung:
                        </strong>{" "}
                        Resend ist im EU-US Data Privacy Framework (DPF)
                        zertifiziert. Übermittlungen in die USA stützen sich auf
                        diese Zertifizierung sowie auf die
                        EU-Standardvertragsklauseln (SCC). Resend unterliegt der
                        Aufsicht der US-amerikanischen Federal Trade Commission
                        (FTC). Bei DPF-Beschwerden steht eine unabhängige
                        Streitbeilegung zur Verfügung.
                      </p>
                    </div>

                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Weitere Informationen zur Datenverarbeitung durch Resend
                      entnehmen Sie der Datenschutzerklärung von Resend unter:{" "}
                      <a
                        href="https://resend.com/legal/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                        style={{ color: "var(--color-primary, #3b82f6)" }}
                      >
                        https://resend.com/legal/privacy-policy
                      </a>
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Kopien des Auftragsverarbeitungsvertrags und der
                      Standardvertragsklauseln stellen wir auf Anfrage über die
                      im Abschnitt &quot;Hinweis zur Verantwortlichen
                      Stelle&quot; genannten Kontaktdaten zur Verfügung.
                    </p>
                  </div>
                  <div>
                    <h4
                      id="kommentare"
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      Kommentarfunktion auf dieser Website
                    </h4>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Für die Kommentarfunktion auf dieser Seite werden neben
                      Ihrem Kommentar auch Angaben zum Zeitpunkt der Erstellung
                      des Kommentars, Ihre E-Mail-Adresse und, wenn Sie nicht
                      anonym posten, der von Ihnen gewählte Nutzername
                      gespeichert.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Speicherung der IP-Adresse
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Unsere Kommentarfunktion speichert die IP-Adressen der
                          Nutzer, die Kommentare verfassen. Da wir Kommentare
                          auf dieser Website nicht vor der Freischaltung prüfen,
                          benötigen wir diese Daten, um im Falle von
                          Rechtsverletzungen wie Beleidigungen oder Propaganda
                          gegen den Verfasser vorgehen zu können.
                        </p>
                      </div>

                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Speicherdauer der Kommentare
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Die Kommentare und die damit verbundenen Daten werden
                          gespeichert und verbleiben auf dieser Website, bis der
                          kommentierte Inhalt vollständig gelöscht wurde oder
                          die Kommentare aus rechtlichen Gründen gelöscht werden
                          müssen (z. B. beleidigende Kommentare).
                        </p>
                      </div>

                      <div>
                        <p
                          className="font-medium mb-1"
                          style={{ color: "var(--color-foreground, #0f172a)" }}
                        >
                          Rechtsgrundlage
                        </p>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: "var(--color-muted-foreground, #64748b)",
                          }}
                        >
                          Die Speicherung der Kommentare erfolgt auf Grundlage
                          Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie
                          können eine von Ihnen erteilte Einwilligung jederzeit
                          widerrufen. Dazu reicht eine formlose Mitteilung per
                          E-Mail an uns. Die Rechtmäßigkeit der bereits
                          erfolgten Datenverarbeitungsvorgänge bleibt vom
                          Widerruf unberührt.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="pt-4 border-t"
                    style={{ borderColor: "var(--color-border, #e2e8f0)" }}
                  >
                    <p
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Diese Datenschutzerklärung wurde auf Grundlage von{" "}
                      <a
                        href="https://www.e-recht24.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                        style={{ color: "var(--color-primary, #3b82f6)" }}
                      >
                        eRecht24.de
                      </a>{" "}
                      erstellt und individuell angepasst.
                    </p>
                  </div>
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
                Letzte Aktualisierung:
              </strong>{" "}
              {LAST_UPDATED}
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
              Fragen zum Datenschutz?
            </h3>
            <p
              className="mb-6 max-w-2xl mx-auto"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Wenn Sie Fragen zu dieser Datenschutzerklärung oder zur
              Verarbeitung Ihrer Daten haben, kontaktieren Sie uns gerne.
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
                  Kontakt aufnehmen
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
                      "var(--color-muted, #f1f5f9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Zurück zur Startseite
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
