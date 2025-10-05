import { Resend } from "resend";
import config from "../../config/config.js";

const resend = new Resend(config.RESEND_API_KEY);

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
  userName: string
) => {
  const resetLink = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "ThreadUp <noreply@threadup.social>",
      to: [email],
      subject: "ThreadUp - Reset your password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password - ThreadUp</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
            
            <tr>
              <td style="padding: 40px 32px;">
                <h1 style="color: #0f172a; font-size: 28px; font-weight: bold; margin: 0 0 8px 0; letter-spacing: -0.5px; text-align: center;">
                  Password Reset Request
                </h1>
                <p style="color: #64748b; font-size: 16px; margin: 0 0 32px 0; text-align: center;">
                  Reset your ThreadUp password
                </p>
                
                <h2 style="color: #0f172a; font-size: 20px; font-weight: bold; margin: 0 0 16px 0;">
                  Hi ${userName}!
                </h2>
                
                <p style="color: #475569; font-size: 16px; line-height: 1.5; margin: 0 0 16px 0;">
                  We received a request to reset the password for your ThreadUp account. If you made this request, click the button below to reset your password.
                </p>
                
                <p style="color: #475569; font-size: 16px; line-height: 1.5; margin: 0 0 32px 0;">
                  If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                </p>

                <div style="text-align: center; margin: 32px 0;">
                  <a href="${resetLink}" style="display: inline-block; background-color: #3b82f6; color: white; text-decoration: none; padding: 16px 32px; border-radius: 6px; font-weight: bold; font-size: 16px; border: 2px solid #3b82f6;">
                    Reset Password
                  </a>
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; border-radius: 6px; margin: 32px 0;">
                  <tr>
                    <td style="padding: 20px;">
                      <p style="color: #475569; font-size: 14px; margin: 0 0 8px 0; font-weight: bold;">
                        Can't click the button? Copy and paste this link:
                      </p>
                      <p style="color: #64748b; font-size: 14px; word-break: break-all; margin: 0; font-family: 'Courier New', monospace; background-color: white; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0;">
                        ${resetLink}
                      </p>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 24px 0;">
                  <tr>
                    <td style="padding: 16px;">
                      <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: bold;">
                        ⏰ This reset link expires in 1 hour
                      </p>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dbeafe; border-left: 4px solid #3b82f6; border-radius: 4px; margin: 24px 0;">
                  <tr>
                    <td style="padding: 16px;">
                      <p style="color: #1d4ed8; font-size: 14px; margin: 0; font-weight: bold;">
                        🔒 Security Notice
                      </p>
                      <p style="color: #1e3a8a; font-size: 13px; margin: 8px 0 0 0; line-height: 1.4;">
                        If you didn't request this password reset, please contact our support team immediately. Someone may be trying to access your account.
                      </p>
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
                  If you didn't request this password reset, you can safely ignore this email.<br>
                  Your password will remain unchanged.
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
      throw new Error("Failed to send password reset email");
    }

    return data;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};