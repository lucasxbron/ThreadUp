import { Resend } from "resend";
import config from "../../config/config.js";

const resend = new Resend(config.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  // userAgent: string;
  // ip: string;
}

export const sendContactEmail = async (data: ContactEmailData) => {
  const { name, email, subject, message } = data;
  // const { name, email, subject, message, userAgent, ip } = data;

  // Format timestamp
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "ThreadUp Contact Form <noreply@threadup.social>",
      to: ["threadup.social@gmail.com"],
      replyTo: email,
      subject: `[ThreadUp Contact] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ThreadUp Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
            
            <tr>
              <td style="padding: 40px 32px;">
                <h1 style="color: #0f172a; font-size: 28px; font-weight: bold; margin: 0 0 8px 0; letter-spacing: -0.5px; text-align: center;">
                  New Contact Form Submission
                </h1>
                <p style="color: #64748b; font-size: 16px; margin: 0 0 32px 0; text-align: center;">
                  ThreadUp Support Request
                </p>
                
                <h2 style="color: #0f172a; font-size: 20px; font-weight: bold; margin: 0 0 16px 0;">
                  Contact Information
                </h2>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; border-radius: 6px; margin: 0 0 32px 0;">
                  <tr>
                    <td style="padding: 20px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold; width: 80px; vertical-align: top;">Name:</td>
                          <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold; vertical-align: top;">Email:</td>
                          <td style="padding: 8px 0;">
                            <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold; vertical-align: top;">Subject:</td>
                          <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${subject}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <h2 style="color: #0f172a; font-size: 20px; font-weight: bold; margin: 0 0 16px 0;">
                  Message
                </h2>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 2px solid #e2e8f0; border-radius: 6px; margin: 0 0 32px 0;">
                  <tr>
                    <td style="padding: 20px;">
                      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 24px 0;">
                  <tr>
                    <td style="padding: 16px;">
                      <p style="color: #92400e; font-size: 14px; margin: 0 0 8px 0; font-weight: bold;">
                        Technical Information
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 4px 0; color: #a16207; font-size: 12px; width: 100px; vertical-align: top;">Submitted:</td>
                          <td style="padding: 4px 0; color: #713f12; font-size: 12px;">${timestamp} UTC</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <tr>
              <td style="background-color: #f8fafc; padding: 32px; border-top: 1px solid #e2e8f0;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <p style="color: #64748b; font-size: 14px; margin: 0; font-weight: bold;">
                    ThreadUp
                  </p>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                
                <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0; line-height: 1.4;">
                  This email was sent from the ThreadUp contact form.<br>
                  Reply directly to this email to respond to the user.
                </p>
                
                <p style="color: #cbd5e1; font-size: 11px; text-align: center; margin: 16px 0 0 0;">
                  © 2025 ThreadUp. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send contact email");
    }

    return emailData;
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};
