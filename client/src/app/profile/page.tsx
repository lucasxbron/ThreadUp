'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (username.trim() === user?.username) {
      setError('Username is the same as current');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await updateProfile(username.trim());
      
      if (result && result.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result?.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <>
        {/* Global CSS for consistent styling */}
        <style jsx global>{`
          .profile-loading {
            background: linear-gradient(90deg, var(--color-muted, #f1f5f9) 25%, var(--color-muted-foreground, #94a3b8) 50%, var(--color-muted, #f1f5f9) 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          
          .dark .profile-loading {
            background: linear-gradient(90deg, var(--color-muted, #334155) 25%, var(--color-muted-foreground, #64748b) 50%, var(--color-muted, #334155) 75%);
            background-size: 200% 100%;
          }
        `}</style>

        <ProtectedRoute>
          <div 
            className="min-h-screen"
            style={{ backgroundColor: 'var(--color-background, #ffffff)' }}
          >
            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="space-y-6">
                {/* Header skeleton */}
                <div 
                  className="rounded-xl shadow-lg border p-6"
                  style={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="profile-loading h-8 w-32 rounded"></div>
                    <div className="profile-loading h-10 w-24 rounded-lg"></div>
                  </div>
                </div>

                {/* Profile info skeleton */}
                <div 
                  className="rounded-xl shadow-lg border p-6"
                  style={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="profile-loading w-20 h-20 rounded-full"></div>
                      <div className="space-y-2 flex-1">
                        <div className="profile-loading h-6 w-32 rounded"></div>
                        <div className="profile-loading h-4 w-48 rounded"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="profile-loading h-4 w-20 rounded"></div>
                          <div className="profile-loading h-5 w-32 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </ProtectedRoute>
      </>
    );
  }

  return (
    <>
      {/* Global CSS for input styling */}
      <style jsx global>{`
        .profile-input {
          background-color: var(--color-card, #ffffff) !important;
          color: var(--color-foreground, #0f172a) !important;
          border: 1px solid var(--color-border, #e2e8f0) !important;
        }
        
        .profile-input:focus {
          border-color: var(--color-primary, #3b82f6) !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }
        
        .profile-input::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }
        
        .dark .profile-input {
          background-color: var(--color-card, #1e2433) !important;
          color: var(--color-foreground, #f8fafc) !important;
          border-color: var(--color-border, #334155) !important;
        }
        
        .dark .profile-input::placeholder {
          color: var(--color-muted-foreground, #94a3b8) !important;
          opacity: 0.8 !important;
        }
      `}</style>

      <ProtectedRoute>
        <div 
          className="min-h-screen"
          style={{ backgroundColor: 'var(--color-background, #ffffff)' }}
        >
          <Header />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="space-y-6">
              {/* Page Header */}
              <div 
                className="rounded-xl shadow-lg border p-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-card, #ffffff)',
                  borderColor: 'var(--color-border, #e2e8f0)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <h1 
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: 'var(--color-foreground, #0f172a)' }}
                    >
                      Profile
                    </h1>
                    <p 
                      className="mt-1 text-sm sm:text-base"
                      style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                    >
                      Manage your account settings and preferences
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="secondary"
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </Button>
                </div>
              </div>

              {/* Success Message */}
              {success && (
                <div 
                  className="rounded-xl border p-4 transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderColor: 'rgba(34, 197, 94, 0.3)',
                    color: 'var(--color-success, #22c55e)'
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm font-medium">{success}</p>
                  </div>
                </div>
              )}

              {/* Profile Information */}
              <div 
                className="rounded-xl shadow-lg border p-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-card, #ffffff)',
                  borderColor: 'var(--color-border, #e2e8f0)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="space-y-8">
                  {/* Profile Picture & Basic Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-3xl sm:text-4xl font-bold">
                          {user?.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div 
                        className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 flex items-center justify-center"
                        style={{
                          backgroundColor: user?.verified ? '#22c55e' : '#f59e0b',
                          borderColor: 'var(--color-card, #ffffff)'
                        }}
                      >
                        {user?.verified ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <h2 
                        className="text-2xl sm:text-3xl font-bold"
                        style={{ color: 'var(--color-foreground, #0f172a)' }}
                      >
                        {user?.username}
                      </h2>
                      <p 
                        className="text-base sm:text-lg"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        {user?.email}
                      </p>
                      <div className="flex items-center space-x-2 pt-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: user?.verified ? '#22c55e' : '#f59e0b' }}
                        />
                        <span 
                          className="text-sm font-medium"
                          style={{ color: 'var(--color-foreground, #0f172a)' }}
                        >
                          {user?.verified ? 'Verified Account' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label 
                        className="block text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Email Address
                      </label>
                      <div 
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: 'var(--color-secondary, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)',
                          color: 'var(--color-foreground, #0f172a)'
                        }}
                      >
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label 
                        className="block text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Username
                      </label>
                      <div 
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: 'var(--color-secondary, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)',
                          color: 'var(--color-foreground, #0f172a)'
                        }}
                      >
                        <p className="font-medium">{user?.username}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label 
                        className="block text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Member Since
                      </label>
                      <div 
                        className="p-3 rounded-lg border"
                        style={{
                          backgroundColor: 'var(--color-secondary, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)',
                          color: 'var(--color-foreground, #0f172a)'
                        }}
                      >
                        <p className="font-medium">
                          {user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label 
                        className="block text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Account Status
                      </label>
                      <div 
                        className="p-3 rounded-lg border flex items-center space-x-3"
                        style={{
                          backgroundColor: 'var(--color-secondary, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)',
                          color: 'var(--color-foreground, #0f172a)'
                        }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: user?.verified ? '#22c55e' : '#f59e0b' }}
                        />
                        <span className="font-medium">
                          {user?.verified ? 'Verified' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Account Roles */}
                  {user?.roles && user.roles.length > 0 && (
                    <div className="space-y-4">
                      <label 
                        className="block text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Account Roles
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {user.roles.map((role, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 rounded-full text-sm font-medium border"
                            style={{
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              borderColor: 'rgba(59, 130, 246, 0.3)',
                              color: 'var(--color-primary, #3b82f6)'
                            }}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* Edit Profile Modal */}
          <Modal
            isOpen={isEditing}
            onClose={() => {
              setIsEditing(false);
              setUsername(user?.username || '');
              setError('');
            }}
            title="Edit Profile"
          >
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label 
                  htmlFor="username"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--color-foreground, #0f172a)' }}
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                  className="profile-input w-full px-3 py-3 rounded-lg transition-colors duration-200"
                  disabled={loading}
                  style={{ fontSize: '16px' }}
                />
              </div>

              {error && (
                <div 
                  className="border rounded-lg p-3"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    color: 'var(--color-destructive, #ef4444)'
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setUsername(user?.username || '');
                    setError('');
                  }}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-2.5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  disabled={!username.trim() || username.trim() === user?.username}
                  className="w-full sm:w-auto px-6 py-2.5"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Modal>
        </div>
      </ProtectedRoute>
    </>
  );
}