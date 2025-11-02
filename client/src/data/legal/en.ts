import type { LegalNoticeTranslation } from "@/types/legal.types";

export const legalNoticeEN: LegalNoticeTranslation = {
  lastUpdated: "November 1, 2025",

  // Meta
  title: "Legal Notice & Privacy Policy",
  subtitle:
    "Legal information and privacy notices in accordance with German law",

  // TOC
  tocTitle: "Table of Contents",

  // Impressum
  impressumTitle: "Legal Notice",
  impressumCountry: "Germany",
  impressumContactTitle: "Contact",

  // Main sections
  sections: {
    // Section 1: Privacy at a Glance
    section1: {
      title: "1. Privacy at a Glance",
      generalInfo: {
        title: "General Information",
        content:
          "The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is all data by which you can be personally identified. For detailed information on data protection, please refer to our privacy policy listed below this text.",
      },
      dataCollection: {
        title: "Important Notes on Data Collection",
        whoResponsible: {
          question: "Who is responsible for data collection on this website?",
          answer:
            'Data processing on this website is carried out by the website operator. You can find the operator\'s contact details in the section "Note on the Responsible Party" in this privacy policy.',
        },
        howCollect: {
          question: "How do we collect your data?",
          answer1:
            "On the one hand, your data is collected when you provide it to us. This may, for example, be data that you enter in a contact form.",
          answer2:
            "Other data is collected automatically or with your consent when you visit the website by our IT systems. This is mainly technical data (e.g., internet browser, operating system, or time of page access). This data is collected automatically as soon as you enter this website.",
        },
        whatFor: {
          question: "What do we use your data for?",
          answer:
            "Some of the data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior.",
        },
        rights: {
          question: "What rights do you have regarding your data?",
          answer1:
            "You have the right at any time to receive information free of charge about the origin, recipient, and purpose of your stored personal data. You also have the right to request the correction or deletion of this data. If you have given consent to data processing, you can revoke this consent at any time for the future. You also have the right, under certain circumstances, to request the restriction of the processing of your personal data. Furthermore, you have the right to lodge a complaint with the competent supervisory authority.",
          answer2:
            "You can contact us at any time regarding this and other questions about data protection.",
        },
      },
    },

    // Section 2: Hosting
    section2: {
      title: "2. Hosting",
      externalHosting: {
        title: "External Hosting",
        paragraph1:
          "This website is hosted externally. The personal data collected on this website is stored on the servers of the host(s). This may primarily include IP addresses, contact requests, metadata and communication data, contract data, contact details, names, website accesses, and other data generated via a website.",
        paragraph2:
          "External hosting is carried out for the purpose of contract fulfillment towards our potential and existing customers (Art. 6 Para. 1 lit. b GDPR) and in the interest of secure, fast, and efficient provision of our online offering by a professional provider (Art. 6 Para. 1 lit. f GDPR). If corresponding consent has been requested, processing is carried out exclusively on the basis of Art. 6 Para. 1 lit. a GDPR and § 25 Para. 1 TDDDG, insofar as the consent includes the storage of cookies or access to information in the user's end device (e.g., device fingerprinting) within the meaning of the TDDDG. Consent can be revoked at any time.",
        paragraph3:
          "Our host(s) will only process your data to the extent necessary to fulfill their performance obligations and follow our instructions regarding this data.",
        paragraph4: "We use the following host(s):",
        hostInfo: `Render Services, Inc.
525 Brannan St., Suite 300
San Francisco, CA 94107
USA`,
        paragraph5:
          "Transfers to the USA are based on the EU Standard Contractual Clauses and supported by Render's certification under the EU-US Data Privacy Framework (DPF); more information about the certification is available in the official DPF register, and independent dispute resolution is provided through the DPF mechanisms (e.g., JAMS), with details available in Render's privacy notice. Copies of appropriate safeguards (especially the SCC appendices from the Render Data Processing Addendum) are available upon request. Attention is drawn to remaining access risks by US authorities and protective measures taken (e.g., encryption). Render publicly states that it complies with the EU-US DPF, the UK extension, and the Swiss-US DPF; transfers may therefore also be based on the DPF depending on the situation. Data subjects retain their rights (e.g., access, deletion, complaints) even in the case of third-country transfers; more information about the DPF and independent dispute resolution is available via the DPF information pages.",
        paragraph6:
          "For more information on data processing by Render, please refer to Render's Privacy Policy at:",
        renderPrivacyLink: "https://render.com/privacy",
      },
      dataProcessing: {
        title: "Data Processing Agreement",
        content:
          "We have concluded a data processing agreement (DPA) for the use of the above-mentioned service. This is a contract required by data protection law that ensures that the service processes the personal data of our website visitors only according to our instructions and in compliance with the GDPR.",
      },
    },

    // Section 3: General Information and Mandatory Disclosures
    section3: {
      title: "3. General Information and Mandatory Disclosures",
      dataProtection: {
        title: "Data Protection",
        paragraph1:
          "The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.",
        paragraph2:
          "When you use this website, various personal data is collected. Personal data is data with which you can be personally identified. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this is done.",
        paragraph3:
          "We would like to point out that data transmission over the Internet (e.g., communication by email) can have security vulnerabilities. Complete protection of data against access by third parties is not possible.",
      },
      responsibleParty: {
        title: "Note on the Responsible Party",
        paragraph1:
          "The responsible party for data processing on this website is:",
        contactInfo: `Lucas Bron
Am Bierenbonnen 10
53604 Bad Honnef
Germany`,
        paragraph2:
          "The responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of the processing of personal data (e.g., names, email addresses, etc.).",
      },
      storageDuration: {
        title: "Storage Duration",
        paragraph1:
          "Unless a more specific storage period has been specified within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data (e.g., tax or commercial law retention periods); in the latter case, deletion will take place after these reasons cease to apply.",
      },
      legalBasis: {
        title: "Legal Basis for Data Processing",
        paragraph1:
          "We process your personal data only if a legal basis exists. The relevant legal provisions are primarily found in the GDPR. The following legal bases may apply:",
        list: [
          "Consent (Art. 6 Para. 1 lit. a GDPR): You have given us your consent to process your personal data for a specific purpose (e.g., newsletter subscription).",
          "Contract Performance (Art. 6 Para. 1 lit. b GDPR): Processing is necessary for the performance of a contract with you or to carry out pre-contractual measures.",
          "Legal Obligation (Art. 6 Para. 1 lit. c GDPR): Processing is necessary to comply with a legal obligation (e.g., retention of business documents).",
          "Legitimate Interests (Art. 6 Para. 1 lit. f GDPR): Processing is necessary to protect our legitimate interests or those of a third party, unless your interests or fundamental rights and freedoms that require the protection of personal data override those interests.",
        ],
      },
      recipients: {
        title: "Recipients of Personal Data",
        paragraph1:
          "In the course of our business activities, we work with various external parties. In some cases, this also requires the transmission of personal data to these external parties. We only pass on personal data to external parties if this is necessary for contract fulfillment, if we are legally obligated to do so (e.g., passing on data to tax authorities), if we have a legitimate interest in accordance with Art. 6 Para. 1 lit. f GDPR in the transmission, or if another legal basis permits the data transmission. When using processors, we only pass on personal data of our customers on the basis of a valid contract for data processing. In the case of joint processing, a contract for joint processing is concluded.",
        gmailSection: {
          title: "Email Communication via External Service Provider (Gmail)",
          description:
            "For sending and receiving emails, we use the Gmail service provided by Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. This involves processing metadata/communication data (e.g., sender, recipient, time), content data, and any attachments on the provider's servers. Transmission is typically encrypted via TLS; the provider states that data is also encrypted at rest, and in Google Workspace, client-side encryption is optionally available. When using Google Workspace, there is a data processing agreement; when using a private Gmail account, Google processes as an independent controller according to its own privacy policy.",
          purpose:
            "Purposes/Legal Bases: Communication and processing of inquiries as well as contract initiation/fulfillment pursuant to Art. 6 Para. 1 lit. b GDPR; additionally, legitimate interest in efficient and secure communication pursuant to Art. 6 Para. 1 lit. f GDPR; if you have expressly consented to this, additionally Art. 6 Para. 1 lit. a GDPR.",
          storageDuration:
            "Storage Duration: Emails are stored for the duration of communication or to comply with statutory retention obligations and are then deleted.",
          thirdCountry:
            "Third Country Transfer: Google is listed in the Data Privacy Framework (DPF); transfers to the USA are based on the EU-US DPF and/or the EU Standard Contractual Clauses (SCC), depending on the situation.",
          disputeResolution:
            "Independent Dispute Resolution (IRM): For DPF complaints, independent dispute resolution is available (e.g., JAMS in accordance with DPF requirements); details can be found in the DPF register and in Google's privacy notices.",
          copyNote:
            'Copies of appropriate safeguards (especially SCC appendices) and further information are available upon request via the contact details provided in the "Note on the Responsible Party" section.',
          moreInfo:
            "For more information on data processing by Google, please visit:",
          googlePrivacyLink: "https://policies.google.com/privacy",
        },
      },
      revocation: {
        title: "Revocation of Your Consent to Data Processing",
        paragraph1:
          "Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. The legality of the data processing carried out until the revocation remains unaffected by the revocation.",
      },
      rightToObject: {
        title:
          "Right to Object to Data Collection in Special Cases and to Direct Marketing (Art. 21 GDPR)",
        paragraph1:
          "IF DATA PROCESSING IS BASED ON ART. 6 PARA. 1 LIT. E OR F GDPR, YOU HAVE THE RIGHT AT ANY TIME TO OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA FOR REASONS ARISING FROM YOUR PARTICULAR SITUATION; THIS ALSO APPLIES TO PROFILING BASED ON THESE PROVISIONS. THE RESPECTIVE LEGAL BASIS ON WHICH PROCESSING IS BASED CAN BE FOUND IN THIS PRIVACY POLICY. IF YOU OBJECT, WE WILL NO LONGER PROCESS YOUR PERSONAL DATA UNLESS WE CAN DEMONSTRATE COMPELLING LEGITIMATE GROUNDS FOR THE PROCESSING WHICH OVERRIDE YOUR INTERESTS, RIGHTS AND FREEDOMS, OR THE PROCESSING SERVES THE ASSERTION, EXERCISE OR DEFENSE OF LEGAL CLAIMS (OBJECTION UNDER ART. 21 PARA. 1 GDPR).",
        paragraph2:
          "IF YOUR PERSONAL DATA IS PROCESSED FOR DIRECT MARKETING PURPOSES, YOU HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF PERSONAL DATA CONCERNING YOU FOR THE PURPOSE OF SUCH MARKETING; THIS ALSO APPLIES TO PROFILING INSOFAR AS IT IS RELATED TO SUCH DIRECT MARKETING. IF YOU OBJECT, YOUR PERSONAL DATA WILL SUBSEQUENTLY NO LONGER BE USED FOR DIRECT MARKETING PURPOSES (OBJECTION UNDER ART. 21 PARA. 2 GDPR).",
      },
      complaint: {
        title:
          "Right to Lodge a Complaint with the Competent Supervisory Authority",
        paragraph1:
          "In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority, particularly in the Member State of their habitual residence, place of work, or place of the alleged violation. The right to lodge a complaint exists without prejudice to other administrative or judicial remedies.",
      },
      dataPortability: {
        title: "Right to Data Portability",
        paragraph1:
          "You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format. If you request the direct transfer of the data to another controller, this will only be done to the extent technically feasible.",
      },
      access: {
        title: "Access, Rectification, and Erasure",
        paragraph1:
          "Within the framework of the applicable legal provisions, you have the right at any time to free information about your stored personal data, its origin and recipient, and the purpose of data processing and, if applicable, a right to rectification or erasure of this data. You can contact us at any time regarding this and other questions about personal data.",
      },
      restriction: {
        title: "Right to Restriction of Processing",
        paragraph1:
          "You have the right to request the restriction of the processing of your personal data. You can contact us at any time for this purpose. The right to restriction of processing exists in the following cases:",
        list: [
          "If you dispute the accuracy of your personal data stored by us, we usually need time to verify this. For the duration of the review, you have the right to request the restriction of the processing of your personal data.",
          "If the processing of your personal data happened/is happening unlawfully, you can request the restriction of data processing instead of erasure.",
          "If we no longer need your personal data, but you need it to exercise, defend, or assert legal claims, you have the right to request restriction of the processing of your personal data instead of erasure.",
          "If you have lodged an objection pursuant to Art. 21 Para. 1 GDPR, a balance must be struck between your interests and ours. As long as it has not yet been determined whose interests prevail, you have the right to request the restriction of the processing of your personal data.",
        ],
        paragraph2:
          "If you have restricted the processing of your personal data, this data – apart from its storage – may only be processed with your consent or for the assertion, exercise, or defense of legal claims or for the protection of the rights of another natural or legal person or for reasons of an important public interest of the European Union or a Member State.",
      },
      encryption: {
        title: "SSL/TLS Encryption",
        paragraph1:
          'For security reasons and to protect the transmission of confidential content, such as orders or requests that you send to us as the site operator, this site uses SSL or TLS encryption. You can recognize an encrypted connection by the fact that the address line of the browser changes from "http://" to "https://" and by the lock symbol in your browser line.',
        paragraph2:
          "If SSL or TLS encryption is activated, the data you transmit to us cannot be read by third parties.",
      },
    },

    // Section 4: Data Collection on This Website
    section4: {
      title: "4. Data Collection on This Website",
      generalProcessing: {
        title: "General Information on Data Processing",
        paragraph1:
          "We only process personal data to the extent necessary for the operation, security, and functionality of our website and to provide our services. Below, we inform you about which data categories we process, for what purposes this is done, and on what legal basis.",
        list: [
          "Art. 6 Para. 1 lit. a GDPR – Consent (e.g., voluntary registration, comment functions, cookie consent);",
          "Art. 6 Para. 1 lit. b GDPR – Contract performance or pre-contractual measures (e.g., user account, use of the platform);",
          "Art. 6 Para. 1 lit. f GDPR – Legitimate interest (e.g., IT security, abuse prevention).",
        ],
      },
      cookies: {
        title: "Cookies",
        paragraph1:
          'Our website uses so-called "cookies". Cookies are small data packets and do not cause any damage to your end device. They are stored either temporarily for the duration of a session (session cookies) or permanently (permanent cookies) on your end device. Session cookies are automatically deleted after your visit. Permanent cookies remain stored on your end device until you delete them yourself or until they are automatically deleted by your web browser.',
        paragraph2:
          "Cookies can originate from us (first-party cookies) or from third-party companies (so-called third-party cookies). Third-party cookies enable the integration of certain services of third-party companies within websites (e.g., cookies for processing payment services).",
        paragraph3:
          "Cookies have various functions. Many cookies are technically necessary, as certain website functions would not work without them (e.g., the shopping cart function or the display of videos). Other cookies can be used to analyze user behavior or for advertising purposes.",
        paragraph4:
          "Cookies that are necessary to carry out the electronic communication process, to provide certain functions you have requested (e.g., for the shopping cart function), or to optimize the website (e.g., cookies to measure web audience) (necessary cookies) are stored on the basis of Art. 6 Para. 1 lit. f GDPR, unless another legal basis is specified. The website operator has a legitimate interest in storing necessary cookies for the technically error-free and optimized provision of its services. If consent to the storage of cookies and comparable recognition technologies has been requested, processing is carried out exclusively on the basis of this consent (Art. 6 Para. 1 lit. a GDPR and § 25 Para. 1 TDDDG); consent can be revoked at any time.",
        paragraph5:
          "You can set your browser so that you are informed about the setting of cookies and only allow cookies in individual cases, exclude the acceptance of cookies for certain cases or in general, and activate the automatic deletion of cookies when closing the browser. If cookies are deactivated, the functionality of this website may be limited.",
        paragraph6:
          "You can find out which cookies and services are used on this website in this privacy policy.",
        paragraph7:
          "We currently do not use optional analysis, marketing, or audience measurement cookies; device access that is strictly necessary is carried out pursuant to § 25 Para. 2 TDDDG; should consent be required in the future, use will only occur after your consent pursuant to § 25 Para. 1 TDDDG in conjunction with Art. 6 Para. 1 lit. a GDPR.",
      },
      userAccount: {
        title: "User Account / Registration",
        paragraph1:
          "When you create a user account, we process the following data in particular:",
        list: [
          "First and last name (if provided)",
          "Username",
          "Email address",
          "Password (only hashed and never stored in plain text)",
          "Optional: Profile picture and voluntary profile data",
          "Registration times, last login, email verification status",
        ],
        purpose:
          "Purpose: Provision of platform functions, use of personalized areas, login and account management.",
        legalBasis:
          "Legal Basis: Art. 6 Para. 1 lit. b GDPR (contract) and, if applicable, Art. 6 Para. 1 lit. a GDPR (consent).",
        paragraph2:
          "The data entered during registration is stored by us for the duration of your use of the user account and is deleted thereafter, unless there are legal retention obligations. You can delete or modify your data at any time in the settings of your user account. Please contact us if you would like us to delete your account.",
      },
      userContent: {
        title: "User-Generated Content",
        paragraph1:
          "When using our platform, content provided by you is processed:",
        list: [
          "Posts, threads, comments and their contents",
          "Images, media, files including file name, file size, date",
          "Likes, follows, interactions with other users",
          "Username and profile information",
          "Publication timestamp",
        ],
        purpose:
          "Purpose: Display of your content, communication with other users, moderation, ensuring platform integrity.",
        legalBasis:
          "Legal Basis: Art. 6 Para. 1 lit. b GDPR (terms of use) and Art. 6 Para. 1 lit. a GDPR (consent for voluntary publications).",
        paragraph2:
          "Published content is stored by us until you or we delete it. You can usually edit or delete your contributions yourself via your user account. Please contact us if you would like us to delete certain content.",
      },
      adminData: {
        title: "Administration and Moderation Data (for Administrators Only)",
        paragraph1:
          "For users with administrative or moderative rights, the following additional data is processed:",
        list: [
          "IP address during moderation actions",
          "Browser and device information when performing administrative functions",
          "Time and type of administrative action taken (audit log)",
        ],
        purpose:
          "Purpose: Protection against unauthorized access, traceability of moderation decisions, IT security.",
        legalBasis:
          "Legal Basis: Art. 6 Para. 1 lit. f GDPR (legitimate interest in the security and integrity of the platform).",
        note: "Note: This data processing exclusively concerns administrators/moderators. Regular users are not affected by this.",
        paragraph2:
          "This data processing is based on our legitimate interest in maintaining a secure and functional platform in accordance with Art. 6 Para. 1 lit. f GDPR. The data is stored only for as long as necessary for the respective purpose and is deleted after the retention periods have expired, unless there are legal obligations to retain it for longer.",
      },
      accountSecurity: {
        title: "Account Security & Technical Security Measures",
        list: [
          "Stored, hashed passwords (no plain text)",
          "Login status, tokens, session IDs",
          "Date and time of last login",
        ],
        purpose:
          "Purpose: Protection of your account, prevention of unauthorized access, system security.",
        legalBasis:
          "Legal Basis: Art. 6 Para. 1 lit. f GDPR (legitimate interest in security, abuse prevention, enforcement of rights).",
        paragraph1:
          "We use technical and organizational measures to protect your user account. This includes the encryption of passwords, the use of secure connections (SSL/TLS), and monitoring for suspicious activities. These measures serve to protect your data and your account and are based on our legitimate interest in accordance with Art. 6 Para. 1 lit. f GDPR.",
      },
      improvement: {
        title: "Use for Improvement and Analysis",
        paragraph1:
          "To improve our platform, we process anonymized or pseudonymized usage data, such as:",
        list: [
          "Error messages, crash reports",
          "Technical performance data (loading times, server responses)",
          "No web analytics and no automated decision-making including profiling within the meaning of Art. 22 GDPR takes place.",
        ],
        purpose:
          "Purpose: Bug fixing, analysis for optimizing functions, development of new features.",
        legalBasis:
          "Legal Basis: Art. 6 Para. 1 lit. f GDPR (legitimate interest in improving our offering).",
      },
      serverLogs: {
        title: "Server Log Files",
        paragraph1:
          "The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:",
        list: [
          "Browser type and browser version",
          "Operating system used",
          "Referrer URL",
          "Hostname of the accessing computer",
          "Time of the server request",
          "IP address",
        ],
        paragraph2:
          "The logging of access and technical event data (e.g., IP address, date/time, user agent, referrer) is carried out exclusively by our host to ensure operation and IT security. This data is not merged with other data sources by us.",
        paragraph3:
          "This data is collected on the basis of Art. 6 Para. 1 lit. f GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimization of its website – for this purpose, server log files must be recorded. The storage duration is determined by the host; log data is only retained for a short security-related period and stored longer in case of incidents until clarification.",
      },
      contactForm: {
        title: "Contact Form",
        paragraph1:
          "If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in the event of follow-up questions. We do not pass on this data without your consent.",
        paragraph2:
          "The processing of this data is based on Art. 6 Para. 1 lit. b GDPR if your request is related to the fulfillment of a contract or is necessary to carry out pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of the inquiries addressed to us (Art. 6 Para. 1 lit. f GDPR) or on your consent (Art. 6 Para. 1 lit. a GDPR) if this has been requested; consent can be revoked at any time.",
        paragraph3:
          "The data you enter in the contact form will remain with us until you request us to delete it, revoke your consent to storage, or the purpose for data storage no longer applies (e.g., after your request has been processed). Mandatory statutory provisions – in particular retention periods – remain unaffected.",
      },
      emailInquiry: {
        title: "Inquiry by Email",
        paragraph1:
          "If you contact us by email, your inquiry including all resulting personal data (name, inquiry) will be stored and processed by us for the purpose of processing your request. We do not pass on this data without your consent.",
        paragraph2:
          "The processing of this data is based on Art. 6 Para. 1 lit. b GDPR if your request is related to the fulfillment of a contract or is necessary to carry out pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of the inquiries addressed to us (Art. 6 Para. 1 lit. f GDPR) or on your consent (Art. 6 Para. 1 lit. a GDPR) if this has been requested; consent can be revoked at any time.",
        paragraph3:
          'For email communication, we use Gmail (Google LLC); the information in the "Email Service Provider (Gmail)" section applies.',
        paragraph4:
          "The data you send to us via contact requests will remain with us until you request us to delete it, revoke your consent to storage, or the purpose for data storage no longer applies (e.g., after your request has been processed). Mandatory statutory provisions – in particular statutory retention periods – remain unaffected.",
      },
      resend: {
        title: "Email Sending via Resend",
        paragraph1:
          "For sending transactional emails (e.g., registration confirmations, email changes, password reset links, and contact form notifications), we use the Resend service provided by Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA.",
        paragraph2:
          "The following personal data is transmitted to Resend and processed there:",
        list: [
          "Recipient's email address",
          "Recipient's name (if provided)",
          "Email content and subject",
          "Time of sending",
          "Metadata on email delivery (e.g., delivery status)",
        ],
        paragraph3:
          "Resend processes this data exclusively on our behalf and according to our instructions to reliably deliver the emails. Processing is based on a data processing agreement (DPA) pursuant to Art. 28 GDPR.",
        purpose:
          "Purpose and Legal Basis: Email sending serves contract fulfillment (e.g., registration, account changes) pursuant to Art. 6 Para. 1 lit. b GDPR and processing of contact requests based on our legitimate interest in efficient communication pursuant to Art. 6 Para. 1 lit. f GDPR. For newsletter or marketing emails, processing is based on your consent pursuant to Art. 6 Para. 1 lit. a GDPR.",
        storageDuration:
          "Storage Duration: Resend stores email data for the duration of the contract. After termination of use, the data is deleted within 90 days, unless there are statutory retention obligations.",
        thirdCountry:
          "Third Country Transfer: Resend is certified under the EU-US Data Privacy Framework (DPF). Transfers to the USA are based on this certification as well as the EU Standard Contractual Clauses (SCC). Resend is subject to the supervision of the U.S. Federal Trade Commission (FTC). Independent dispute resolution is available for DPF complaints.",
        paragraph4:
          "For more information on data processing by Resend, please refer to Resend's privacy policy at:",
        resendPrivacyLink: "https://resend.com/legal/privacy-policy",
        paragraph5:
          'Copies of the data processing agreement and standard contractual clauses are available upon request via the contact details provided in the "Note on the Responsible Party" section.',
      },
      comments: {
        title: "Comment Function on This Website",
        paragraph1:
          "For the comment function on this site, in addition to your comment, details of when the comment was created, your email address, and, if you do not post anonymously, your chosen username are stored.",
        ipStorage: {
          title: "Storage of IP Address",
          content:
            "Our comment function stores the IP addresses of users who write comments. Since we do not check comments on this website before they are published, we need this data in order to take action against the author in the event of violations of the law such as insults or propaganda.",
        },
        commentDuration: {
          title: "Storage Duration of Comments",
          content:
            "The comments and the associated data are stored and remain on this website until the commented content has been completely deleted or the comments must be deleted for legal reasons (e.g., offensive comments).",
        },
        legalBasis: {
          title: "Legal Basis",
          content:
            "The storage of comments is based on your consent (Art. 6 Para. 1 lit. a GDPR). You can revoke consent you have given at any time. For this purpose, an informal communication by email to us is sufficient. The legality of data processing operations already carried out remains unaffected by the revocation.",
        },
      },
      attribution:
        "This privacy policy was created based on eRecht24.de and individually adapted.",
      attributionLink: "https://www.e-recht24.de",
    },
  },

  // Footer sections
  lastUpdatedLabel: "Last Updated:",
  contactSection: {
    title: "Questions About Privacy?",
    description:
      "If you have any questions about this privacy policy or the processing of your data, please feel free to contact us.",
    contactButton: "Contact Us",
    homeButton: "Back to Home",
  },
};
