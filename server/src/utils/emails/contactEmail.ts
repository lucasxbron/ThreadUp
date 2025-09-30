import { Resend } from "resend";
import config from "../../config/config.js";

const resend = new Resend(config.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  userAgent: string;
  ip: string;
}

export const sendContactEmail = async (data: ContactEmailData) => {
  const { name, email, subject, message, userAgent, ip } = data;
  
  // Format timestamp
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
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
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 700px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
            
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 32px; text-align: center;">
                <h1 style="color: white; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: -0.5px;">
                  📬 New Contact Form Submission
                </h1>
                <p style="color: rgba(255, 255, 255, 0.9); font-size: 14px; margin: 8px 0 0 0;">
                  ThreadUp Contact Form
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 32px;">
                
                <!-- Contact Information -->
                <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                  <h2 style="color: #0f172a; font-size: 18px; font-weight: bold; margin: 0 0 16px 0;">
                    📋 Contact Information
                  </h2>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 6px 0; color: #64748b; font-size: 14px; font-weight: bold; width: 100px;">Name:</td>
                      <td style="padding: 6px 0; color: #0f172a; font-size: 14px;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #64748b; font-size: 14px; font-weight: bold;">Email:</td>
                      <td style="padding: 6px 0;">
                        <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #64748b; font-size: 14px; font-weight: bold;">Subject:</td>
                      <td style="padding: 6px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${subject}</td>
                    </tr>
                  </table>
                </div>

                <!-- Message -->
                <div style="margin-bottom: 24px;">
                  <h2 style="color: #0f172a; font-size: 18px; font-weight: bold; margin: 0 0 12px 0;">
                    💬 Message
                  </h2>
                  <div style="background-color: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px; padding: 16px;">
                    <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>

                <!-- Technical Information -->
                <div style="background-color: #fefce8; border: 1px solid #fde047; border-radius: 8px; padding: 16px;">
                  <h3 style="color: #713f12; font-size: 14px; font-weight: bold; margin: 0 0 12px 0;">
                    🔧 Technical Information
                  </h3>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 4px 0; color: #a16207; font-size: 12px; width: 120px;">Submitted:</td>
                      <td style="padding: 4px 0; color: #713f12; font-size: 12px;">${timestamp} UTC</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0; color: #a16207; font-size: 12px;">IP Address:</td>
                      <td style="padding: 4px 0; color: #713f12; font-size: 12px; font-family: monospace;">${ip}</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0; color: #a16207; font-size: 12px;">User Agent:</td>
                      <td style="padding: 4px 0; color: #713f12; font-size: 12px; font-family: monospace; word-break: break-word;">${userAgent}</td>
                    </tr>
                  </table>
                </div>

              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #f8fafc; padding: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
                <p style="color: #64748b; font-size: 12px; margin: 0;">
                  This email was sent from the ThreadUp contact form.<br>
                  Reply directly to this email to respond to the user.
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