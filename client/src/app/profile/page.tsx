'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Header } from '@/components/layout/Header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PasswordChangeCard } from '@/components/profile/PasswordChangeCard';
import { DeleteAccountCard } from '@/components/profile/DeleteAccountCard';
import { EmailChangeCard } from '@/components/profile/EmailChangeCard';
import { AvatarUploadCard } from '@/components/profile/AvatarUploadCard';
import { Avatar } from '@/components/ui/Avatar';
import { ImageModal } from '@/components/ui/ImageModal';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editData.firstName.trim() || !editData.lastName.trim() || !editData.username.trim()) {
      setError('All fields are required');
      return;
    }

    // Check if anything actually changed
    if (editData.firstName.trim() === user?.firstName && 
        editData.lastName.trim() === user?.lastName && 
        editData.username.trim() === user?.username) {
      setError('No changes detected');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatePayload: { firstName?: string; lastName?: string; username?: string } = {};
      
      if (editData.firstName.trim() !== user?.firstName) {
        updatePayload.firstName = editData.firstName.trim();
      }
      if (editData.lastName.trim() !== user?.lastName) {
        updatePayload.lastName = editData.lastName.trim();
      }
      if (editData.username.trim() !== user?.username) {
        updatePayload.username = editData.username.trim();
      }

      const result = await updateProfile(updatePayload);
      
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

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Unknown';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Unknown';
    }
  };

  // Simple loading check - only check auth loading and user existence
  if (isLoading || !user) {
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
                {/* Header Loading Skeleton */}
                <div 
                  className="rounded-xl shadow-lg border p-6"
                  style={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div>
                      <div className="profile-loading h-8 w-32 rounded mb-2"></div>
                      <div className="profile-loading h-4 w-48 rounded"></div>
                    </div>
                    <div className="profile-loading h-10 w-24 rounded-lg"></div>
                  </div>
                </div>

                {/* Profile Loading Skeleton */}
                <div 
                  className="rounded-xl shadow-lg border p-6"
                  style={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                >
                  <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="profile-loading w-24 h-24 rounded-full"></div>
                      <div className="flex-1">
                        <div className="profile-loading h-6 w-40 rounded mb-2"></div>
                        <div className="profile-loading h-4 w-32 rounded mb-1"></div>
                        <div className="profile-loading h-4 w-36 rounded"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="profile-loading h-4 w-20 rounded"></div>
                        <div className="profile-loading h-6 w-32 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="profile-loading h-4 w-20 rounded"></div>
                        <div className="profile-loading h-6 w-40 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Change Card Loading Skeleton */}
                <div 
                  className="rounded-xl shadow-lg border p-6"
                  style={{
                    backgroundColor: 'var(--color-card, #ffffff)',
                    borderColor: 'var(--color-border, #e2e8f0)'
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="profile-loading w-10 h-10 rounded-lg"></div>
                      <div>
                        <div className="profile-loading h-5 w-32 rounded mb-1"></div>
                        <div className="profile-loading h-4 w-40 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="profile-loading h-10 w-full rounded-lg"></div>
                      <div className="profile-loading h-10 w-full rounded-lg"></div>
                      <div className="profile-loading h-10 w-full rounded-lg"></div>
                      <div className="profile-loading h-10 w-32 rounded-lg ml-auto"></div>
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
              {/* Back Button and Page Header */}
              <div 
                className="rounded-xl shadow-lg border p-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-card, #ffffff)',
                  borderColor: 'var(--color-border, #e2e8f0)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    {/* Back Button */}
                    <Link href="/">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Feed</span>
                      </Button>
                    </Link>
                    
                    {/* Title */}
                    <div>
                      <h1 
                        className="text-2xl sm:text-3xl font-bold"
                        style={{ color: 'var(--color-foreground, #0f172a)' }}
                      >
                        Profile Settings
                      </h1>
                      <p 
                        className="mt-1 text-base"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Manage your account information and preferences
                      </p>
                    </div>
                  </div>
                  
                  {/* Edit Button */}
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="primary"
                    size="sm"
                    className="px-6 py-2.5 w-full sm:w-auto"
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="font-medium">{success}</p>
                  </div>
                </div>
              )}

              {/* Profile Information Card */}
              <div 
                className="rounded-xl shadow-lg border p-6 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-card, #ffffff)',
                  borderColor: 'var(--color-border, #e2e8f0)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="space-y-8">
                  {/* Profile Header with Avatar */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar 
                        user={{
                          firstName: user.firstName,
                          lastName: user.lastName,
                          avatarUrl: user.avatarUrl,
                        }}
                        size="xl" 
                        onClick={user.avatarUrl ? () => setShowImageModal(true) : undefined}
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h2 
                        className="text-xl sm:text-2xl font-bold"
                        style={{ color: 'var(--color-foreground, #0f172a)' }}
                      >
                        {user.firstName && user.lastName 
                          ? `${user.firstName} ${user.lastName}`
                          : user.username || 'Unknown'
                        }
                      </h2>
                      <p 
                        className="text-base mt-1"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        @{user.username || 'unknown'}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${user.verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: user.verified ? '#22c55e' : '#f59e0b' }}
                        >
                          {user.verified ? 'Verified Account' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Account Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                      <label 
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        First Name
                      </label>
                      <p 
                        className="text-base font-medium p-3 rounded-lg border"
                        style={{ 
                          color: 'var(--color-foreground, #0f172a)',
                          backgroundColor: 'var(--color-muted, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)'
                        }}
                      >
                        {user.firstName || 'Not set'}
                      </p>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <label 
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Last Name
                      </label>
                      <p 
                        className="text-base font-medium p-3 rounded-lg border"
                        style={{ 
                          color: 'var(--color-foreground, #0f172a)',
                          backgroundColor: 'var(--color-muted, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)'
                        }}
                      >
                        {user.lastName || 'Not set'}
                      </p>
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                      <label 
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Username
                      </label>
                      <p 
                        className="text-base font-medium p-3 rounded-lg border"
                        style={{ 
                          color: 'var(--color-foreground, #0f172a)',
                          backgroundColor: 'var(--color-muted, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)'
                        }}
                      >
                        {user.username || 'Not set'}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label 
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Email Address
                      </label>
                      <p 
                        className="text-base font-medium p-3 rounded-lg border"
                        style={{ 
                          color: 'var(--color-foreground, #0f172a)',
                          backgroundColor: 'var(--color-muted, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)'
                        }}
                      >
                        {user.email || 'Not set'}
                      </p>
                    </div>

                    {/* Account Status */}
                    <div className="space-y-2">
                      <label 
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Account Status
                      </label>
                      <div 
                        className="text-base font-medium p-3 rounded-lg border flex items-center space-x-2"
                        style={{ 
                          backgroundColor: 'var(--color-muted, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)'
                        }}
                      >
                        <div className={`w-2 h-2 rounded-full ${user.verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span 
                          className="text-base font-medium"
                          style={{ color: user.verified ? '#22c55e' : '#f59e0b' }}
                        >
                          {user.verified ? 'Verified' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>

                    {/* Member Since */}
                    <div className="space-y-2">
                      <label 
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        Member Since
                      </label>
                      <p 
                        className="text-base font-medium p-3 rounded-lg border"
                        style={{ 
                          color: 'var(--color-foreground, #0f172a)',
                          backgroundColor: 'var(--color-muted, #f1f5f9)',
                          borderColor: 'var(--color-border, #e2e8f0)'
                        }}
                      >
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar Upload Card */}
              <AvatarUploadCard />
              {/* Email Change Card */}
              <EmailChangeCard />
              {/* Password Change Card */}
              <PasswordChangeCard />
              {/* Delete Account Card */}
              <DeleteAccountCard />
            </div>
          </main>

          {/* Edit Profile Modal */}
          <Modal
            isOpen={isEditing}
            onClose={() => {
              setIsEditing(false);
              setEditData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                username: user.username || ''
              });
              setError('');
            }}
            title="Edit Profile"
          >
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* First and Last Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="firstName"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-foreground, #0f172a)' }}
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={editData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your first name"
                    className="profile-input w-full px-3 py-3 rounded-lg transition-colors duration-200"
                    disabled={loading}
                    style={{ fontSize: '16px' }}
                  />
                </div>
                <div>
                  <label 
                    htmlFor="lastName"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-foreground, #0f172a)' }}
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={editData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your last name"
                    className="profile-input w-full px-3 py-3 rounded-lg transition-colors duration-200"
                    disabled={loading}
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              {/* Username */}
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
                  name="username"
                  type="text"
                  value={editData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your username"
                  className="profile-input w-full px-3 py-3 rounded-lg transition-colors duration-200"
                  disabled={loading}
                  style={{ fontSize: '16px' }}
                />
              </div>

              {/* Error Display */}
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
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      firstName: user.firstName || '',
                      lastName: user.lastName || '',
                      username: user.username || ''
                    });
                    setError('');
                  }}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-2.5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || (!editData.firstName.trim() || !editData.lastName.trim() || !editData.username.trim())}
                  loading={loading}
                  className="w-full sm:w-auto px-6 py-2.5"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Modal>
        </div>
                 {/* Full Size Image Modal */}
          {user.avatarUrl && (
            <ImageModal
              isOpen={showImageModal}
              onClose={() => setShowImageModal(false)}
              imageUrl={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}'s profile picture`}
            />
          )}
      </ProtectedRoute>
    </>
  );
}