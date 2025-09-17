'use client';

import React, { useState, useEffect } from 'react';
import { User } from '@/types/user.types';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/api';

interface ProfileCardProps {
  user: User;
}

interface UserStats {
  postsCount: number;
  followingCount: number;
  followersCount: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const [stats, setStats] = useState<UserStats>({
    postsCount: 0,
    followingCount: user.followingCount || 0,
    followersCount: user.followersCount || 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserStats();
  }, [user._id]);

  const loadUserStats = async () => {
    try {
      setLoading(true);
      
      // Get user's posts count (you'll need to create this endpoint)
      const postsResponse = await apiClient.getUserPosts(user._id);
      const postsCount = postsResponse.data?.totalPosts || 0;

      // Get follow status with updated counts
      const followResponse = await apiClient.getFollowStatus(user._id);
      
      setStats({
        postsCount,
        followingCount: followResponse.data?.followingCount || user.followingCount || 0,
        followersCount: followResponse.data?.followersCount || user.followersCount || 0,
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
      // Use fallback values
      setStats({
        postsCount: 0,
        followingCount: user.followingCount || 0,
        followersCount: user.followersCount || 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Get user initials for avatar
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get full name
  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  // Format numbers with k abbreviation
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  // Format join date
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div 
      className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border"
      style={{
        backgroundColor: 'var(--color-card, #ffffff)',
        borderColor: 'var(--color-border, #e2e8f0)',
        width: '280px',
        minHeight: 'fit-content',
      }}
    >
      {/* Profile Card Content */}
      <div className="p-6 text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full p-1">
            <div 
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-card, #ffffff)' }}
            >
              <span 
                className="text-2xl font-bold"
                style={{ color: 'var(--color-card-foreground, #0f172a)' }}
              >
                {getInitials(user.firstName, user.lastName)}
              </span>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <h2 
          className="text-lg font-bold mb-1"
          style={{ color: 'var(--color-card-foreground, #0f172a)' }}
        >
          {getFullName(user.firstName, user.lastName)}
        </h2>

        {/* Username */}
        <p 
          className="text-sm mb-4"
          style={{ color: 'var(--color-muted-foreground, #64748b)' }}
        >
          @{user.username}
        </p>

        {/* Stats */}
        <div className="flex justify-between items-center mb-4 px-2">
          {/* Posts */}
          <div className="text-center">
            {loading ? (
              <div 
                className="animate-pulse h-6 w-8 rounded mx-auto mb-1"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
            ) : (
              <div 
                className="text-lg font-bold"
                style={{ color: 'var(--color-card-foreground, #0f172a)' }}
              >
                {formatNumber(stats.postsCount)}
              </div>
            )}
            <div 
              className="text-xs"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Posts
            </div>
          </div>

          {/* Following */}
          <div className="text-center">
            {loading ? (
              <div 
                className="animate-pulse h-6 w-8 rounded mx-auto mb-1"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
            ) : (
              <div 
                className="text-lg font-bold"
                style={{ color: 'var(--color-card-foreground, #0f172a)' }}
              >
                {formatNumber(stats.followingCount)}
              </div>
            )}
            <div 
              className="text-xs"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Following
            </div>
          </div>

          {/* Followers */}
          <div className="text-center">
            {loading ? (
              <div 
                className="animate-pulse h-6 w-8 rounded mx-auto mb-1"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
            ) : (
              <div 
                className="text-lg font-bold"
                style={{ color: 'var(--color-card-foreground, #0f172a)' }}
              >
                {formatNumber(stats.followersCount)}
              </div>
            )}
            <div 
              className="text-xs"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Followers
            </div>
          </div>
        </div>

        {/* Join Date */}
        <div 
          className="text-sm flex items-center justify-center"
          style={{ color: 'var(--color-muted-foreground, #64748b)' }}
        >
          <svg 
            className="w-4 h-4 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          Joined {formatJoinDate(user.createdAt)}
        </div>
      </div>
    </div>
  );
};