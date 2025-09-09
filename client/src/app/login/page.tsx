'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(email.trim(), password);
      
      // Handle the correct response format: {success: boolean, error?: string}
      if (result && typeof result === 'object' && result.success === true) {
        // Login successful - redirect to home
        router.push('/');
      } else {
        // Login failed - extract error message
        let errorMessage = 'Invalid email or password';
        
        if (result && typeof result === 'object' && result.error) {
          errorMessage = result.error;
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      // Handle different error formats
      let errorMessage = 'Login failed. Please try again.';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = String((err as any).message);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Global CSS for input styling */}
      <style jsx global>{`
        .login-input {
          background-color: var(--color-card, #ffffff) !important;
          color: var(--color-foreground, #0f172a) !important;
          border: 1px solid var(--color-border, #e2e8f0) !important;
        }
        
        .login-input:focus {
          border-color: var(--color-primary, #3b82f6) !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }
        
        .login-input::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }
        
        .dark .login-input {
          background-color: var(--color-card, #1e2433) !important;
          color: var(--color-foreground, #f8fafc) !important;
          border-color: var(--color-border, #334155) !important;
        }
        
        .dark .login-input::placeholder {
          color: var(--color-muted-foreground, #94a3b8) !important;
          opacity: 0.8 !important;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div 
          className="w-full max-w-sm sm:max-w-md space-y-6 md:space-y-8 p-6 md:p-8 rounded-xl shadow-lg border"
          style={{
            backgroundColor: 'var(--color-card, #ffffff)',
            borderColor: 'var(--color-border, #e2e8f0)'
          }}
        >
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl md:text-2xl">T</span>
              </div>
            </div>
            <h2 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Welcome back
            </h2>
            <p 
              className="mt-2 text-sm md:text-base"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Sign in to your ThreadUp account
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div 
                className="border rounded-lg p-3 text-center"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  color: 'var(--color-destructive, #ef4444)'
                }}
              >
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input w-full px-3 py-3 md:py-2 rounded-lg transition-colors duration-200"
                disabled={loading}
                style={{
                  fontSize: '16px'
                }}
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input w-full px-3 py-3 md:py-2 rounded-lg transition-colors duration-200"
                disabled={loading}
                style={{
                  fontSize: '16px'
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              loading={loading}
              className="w-full py-3 text-base md:text-sm font-medium"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Links */}
          <div className="text-center space-y-3">
            <p 
              className="text-sm"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="font-medium underline hover:opacity-80 transition-opacity"
                style={{ color: 'var(--color-primary, #3b82f6)' }}
              >
                Sign up
              </Link>
            </p>
            
            <Link 
              href="/forgot-password" 
              className="block text-sm font-medium underline hover:opacity-80 transition-opacity"
              style={{ color: 'var(--color-primary, #3b82f6)' }}
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}