import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { sendContactEmail } from "../utils/emails/contactEmail.js";
import validator from "validator";

export const submitContactForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, subject, message, customSubject } = req.body;

    // Validation
    if (!name || !email || !message) {
      throw createHttpError(400, "Name, email, and message are required");
    }

    if (!validator.isEmail(email)) {
      throw createHttpError(400, "Please provide a valid email address");
    }

    if (name.trim().length < 2) {
      throw createHttpError(400, "Name must be at least 2 characters long");
    }

    if (message.trim().length < 10) {
      throw createHttpError(400, "Message must be at least 10 characters long");
    }

    if (message.trim().length > 2000) {
      throw createHttpError(400, "Message must be less than 2000 characters");
    }

    // Determine final subject
    let finalSubject = subject;
    if (subject === 'other' && customSubject) {
      if (customSubject.trim().length < 5) {
        throw createHttpError(400, "Custom subject must be at least 5 characters long");
      }
      finalSubject = customSubject.trim();
    }

    if (!finalSubject || finalSubject === 'other') {
      throw createHttpError(400, "Please select a subject or provide a custom subject");
    }

    // Send email
    await sendContactEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: finalSubject,
      message: message.trim(),
      userAgent: req.get('User-Agent') || 'Unknown',
      ip: req.ip || req.connection.remoteAddress || 'Unknown'
    });

    res.status(200).json({
      message: "Your message has been sent successfully! We'll get back to you within 24-48 hours."
    });

  } catch (error) {
    next(error);
  }
};