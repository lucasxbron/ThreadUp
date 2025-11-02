// Types for Legal Notice translations

export interface QuestionAnswer {
  question: string;
  answer?: string;
  answer1?: string;
  answer2?: string;
}

export interface DataCollection {
  title: string;
  whoResponsible: QuestionAnswer;
  howCollect: QuestionAnswer;
  whatFor: QuestionAnswer;
  rights: QuestionAnswer;
}

export interface Section1 {
  title: string;
  tocTitle?: string; // Shortened title for TOC
  generalInfo: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    content: string;
  };
  dataCollection: DataCollection & {
    tocTitle?: string; // Shortened title for TOC
  };
}

export interface ExternalHosting {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  hostInfo: string;
  paragraph5: string;
  paragraph6: string;
  renderPrivacyLink: string;
}

export interface Section2 {
  title: string;
  tocTitle?: string; // Shortened title for TOC
  externalHosting: ExternalHosting & {
    tocTitle?: string; // Shortened title for TOC
  };
  dataProcessing: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    content: string;
  };
}

export interface GmailSection {
  title: string;
  description: string;
  purpose: string;
  storageDuration: string;
  thirdCountry: string;
  disputeResolution: string;
  copyNote: string;
  moreInfo: string;
  googlePrivacyLink: string;
}

export interface Section3 {
  title: string;
  tocTitle?: string; // Shortened title for TOC
  dataProtection: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  responsibleParty: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    contactInfo: string;
    paragraph2: string;
  };
  storageDuration: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
  };
  legalBasis: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    list?: string[];
  };
  recipients: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    gmailSection: GmailSection;
  };
  revocation: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
  };
  rightToObject: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    paragraph2: string;
  };
  complaint: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
  };
  dataPortability: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
  };
  access: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
  };
  restriction: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    list: string[];
    paragraph2: string;
  };
  encryption: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    paragraph2: string;
  };
}

export interface SubSection {
  title: string;
  content: string;
}

export interface CommentsSection {
  title: string;
  paragraph1: string;
  ipStorage: SubSection;
  commentDuration: SubSection;
  legalBasis: SubSection;
}

export interface UserAccountSection {
  title: string;
  paragraph1: string;
  list: string[];
  purpose: string;
  legalBasis: string;
  paragraph2?: string;
}

export interface UserContentSection {
  title: string;
  paragraph1: string;
  list: string[];
  purpose: string;
  legalBasis: string;
  paragraph2?: string;
}

export interface AdminDataSection {
  title: string;
  paragraph1: string;
  list: string[];
  purpose: string;
  legalBasis: string;
  note: string;
  paragraph2?: string;
}

export interface EmailInquirySection {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4?: string;
}

export interface ResendSection {
  title: string;
  paragraph1: string;
  paragraph2: string;
  list: string[];
  paragraph3: string;
  purpose: string;
  storageDuration: string;
  thirdCountry: string;
  paragraph4: string;
  resendPrivacyLink: string;
  paragraph5: string;
}

export interface Section4 {
  title: string;
  tocTitle?: string; // Shortened title for TOC
  generalProcessing: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    list: string[];
  };
  cookies: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    paragraph5: string;
    paragraph6?: string;
    paragraph7?: string;
  };
  userAccount: UserAccountSection & {
    tocTitle?: string; // Shortened title for TOC
  };
  userContent: UserContentSection & {
    tocTitle?: string; // Shortened title for TOC
  };
  adminData: AdminDataSection & {
    tocTitle?: string; // Shortened title for TOC
  };
  accountSecurity: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    list: string[];
    purpose: string;
    legalBasis: string;
    paragraph1?: string;
  };
  improvement: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    list: string[];
    purpose: string;
    legalBasis: string;
  };
  serverLogs: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    list: string[];
    paragraph2: string;
    paragraph3: string;
  };
  contactForm: {
    title: string;
    tocTitle?: string; // Shortened title for TOC
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  emailInquiry: EmailInquirySection & {
    tocTitle?: string; // Shortened title for TOC
  };
  resend: ResendSection & {
    tocTitle?: string; // Shortened title for TOC
  };
  comments: CommentsSection & {
    tocTitle?: string; // Shortened title for TOC
  };
  attribution: string;
  attributionLink: string;
}

export interface LegalNoticeTranslation {
  lastUpdated: string;
  title: string;
  subtitle: string;
  tocTitle: string;
  impressumTitle: string;
  impressumCountry: string;
  impressumContactTitle: string;
  sections: {
    section1: Section1;
    section2: Section2;
    section3: Section3;
    section4: Section4;
  };
  lastUpdatedLabel: string;
  contactSection: {
    title: string;
    description: string;
    contactButton: string;
    homeButton: string;
  };
}
