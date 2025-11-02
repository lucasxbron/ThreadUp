import { LegalNotice } from "@/components/legal/LegalNotice";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum & Datenschutzerklärung | ThreadUp",
  description:
    "Rechtliche Informationen und Datenschutzhinweise gemäß deutschem Recht",
  alternates: {
    languages: {
      en: "/legal-notice",
      de: "/impressum-datenschutz",
    },
  },
};

export default function ImpressumDatenschutzPage() {
  return <LegalNotice lang="de" />;
}
