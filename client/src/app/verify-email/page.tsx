'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { apiClient } from '@/utils/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setLoading(true);
    const response = await apiClient.verifyEmail(verificationToken);
    
    if (response.data || response.message) {
      setVerified(true);
      setMessage('Your email has been successfully verified! You can now log in.');
    } else {
      setError(response.error || 'Verification failed');
    }
    
    setLoading(false);
  };

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setResending(true);
    setError('');
    setMessage('');

    const response = await apiClient.resendVerification(email);
    
    if (response.data || response.message) {
      setMessage('Verification email sent! Please check your inbox.');
    } else {
      setError(response.error || 'Failed to send verification email');
    }
    
    setResending(false);
  };

  if (loading && token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Verifying your email...
          </p>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Email Verified!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
            <div className="mt-6">
              <Link href="/login">
                <Button>Go to Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
              <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Verification Failed
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {error}
            </p>
            <div className="mt-6 space-y-3">
              <Link href="/register">
                <Button>Try Again</Button>
              </Link>
              <div>
                <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Resend Verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email address to receive a new verification link
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleResendVerification}>
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            autoComplete="email"
          />

          {error && (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={resending}
            disabled={!email}
          >
            Send Verification Email
          </Button>

          <div className="text-center">
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}