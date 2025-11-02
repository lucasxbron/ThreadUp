import { LegalNotice } from "@/components/legal/LegalNotice";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice & Privacy Policy | ThreadUp",
  description:
    "Legal information and privacy notices in accordance with German law",
  alternates: {
    languages: {
      en: "/legal-notice",
      de: "/impressum-datenschutz",
    },
  },
};

export default function LegalNoticePage() {
  return <LegalNotice lang="en" />;
}
