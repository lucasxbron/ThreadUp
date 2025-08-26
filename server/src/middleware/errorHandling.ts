import express, { Request, Response, NextFunction } from "express";
import { isHttpError } from "http-errors";

export function errorHandling(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error", error);
  if (isHttpError(error)) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof Error) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.status(500).json({
    message: "Unknown error",
  });
}
