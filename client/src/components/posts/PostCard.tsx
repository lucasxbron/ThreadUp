'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/types/post.types';
import { useAuth } from '@/contexts/AuthContext';
import { useFollow } from '@/contexts/FollowContext';
import { apiClient } from '@/utils/api';
import { CommentSection } from './CommentSection';
import { ImageModal } from '@/components/ui/ImageModal';

interface PostCardProps {
  post: Post;
  onPostUpdate: () => void;
  onFollowUpdate?: (userId: string, newFollowingStatus: boolean, newFollowerCount: number) => void;
}

interface LikeResponse {
  liked: boolean;
  likeCount: number;
  likedAt?: string;
  unlikedAt?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPostUpdate, onFollowUpdate }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const { getFollowState, toggleFollow, updateFollowState } = useFollow();

  // Get follow state from global context
  const globalFollowState = getFollowState(post.authorId._id);
  const following = globalFollowState?.isFollowing ?? post.following ?? false;
  const followerCount = globalFollowState?.followersCount ?? post.authorId.followersCount ?? 0;
  const followLoading = globalFollowState?.isLoading ?? false;

  // Initialize global follow state if not present
  useEffect(() => {
    if (!globalFollowState && post.authorId._id) {
      updateFollowState(
        post.authorId._id,
        post.following ?? false,
        post.authorId.followersCount ?? 0
      );
    }
  }, [post.authorId._id, post.following, post.authorId.followersCount, globalFollowState, updateFollowState]);

  // Update local like states when post prop changes
  useEffect(() => {
    setLiked(Boolean(post.liked));
    setLikeCount(post.likeCount || 0);
  }, [post.liked, post.likeCount, post._id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 7) {
      return date.toLocaleDateString();
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated || !user || loading) {
      return;
    }
    
    setLoading(true);
    const response = await apiClient.toggleLike(post._id);
    
    if (response.data) {
      const likeData = response.data as LikeResponse;
      setLiked(likeData.liked);
      setLikeCount(likeData.likeCount);
    }
    
    setLoading(false);
  };

  const handleFollow = async () => {
    if (!isAuthenticated || !user || followLoading) {
      return;
    }

    const success = await toggleFollow(post.authorId._id, followerCount);
    
    if (success) {
      // Get updated state from global context
      const updatedState = getFollowState(post.authorId._id);
      if (updatedState && onFollowUpdate) {
        onFollowUpdate(post.authorId._id, updatedState.isFollowing, updatedState.followersCount);
      }
    }
  };

  const handleDelete = async () => {
    if (deleteLoading) return;
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    setDeleteLoading(true);
    const response = await apiClient.deletePost(post._id);
    
    if (response.data || response.message) {
      onPostUpdate();
    }
    
    setDeleteLoading(false);
  };

  const canDelete = user?._id === post.authorId._id;
  const isOwnPost = user?._id === post.authorId._id;

  // Get user initials for avatar
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get full name
  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  return (
    <>
      <div 
        className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border"
        style={{
          backgroundColor: 'var(--color-card, #ffffff)',
          borderColor: 'var(--color-border, #e2e8f0)'
        }}
      >
        {/* Post header */}
        <div className="flex items-center justify-between p-3 sm:p-4 pb-2 sm:pb-3">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full p-0.5">
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-card, #ffffff)' }}
                >
                  <span 
                    className="text-xs sm:text-sm font-semibold"
                    style={{ color: 'var(--color-card-foreground, #0f172a)' }}
                  >
                    {getInitials(post.authorId.firstName, post.authorId.lastName)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <p 
                  className="font-semibold text-sm truncate"
                  style={{ color: 'var(--color-card-foreground, #0f172a)' }}
                >
                  {getFullName(post.authorId.firstName, post.authorId.lastName)}
                </p>
                
                {/* Follow Button - Only show for other users */}
                {isAuthenticated && !isOwnPost && (
                  <button
                    onClick={handleFollow}
                    disabled={followLoading}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                      following
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    style={{
                      minWidth: '60px',
                      backgroundColor: following 
                        ? 'var(--color-secondary, #f1f5f9)' 
                        : 'var(--color-primary, #3b82f6)',
                      color: following 
                        ? 'var(--color-secondary-foreground, #1f2937)' 
                        : 'white'
                    }}
                    onMouseEnter={(e) => {
                      if (!following) {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary-600, #2563eb)';
                      } else {
                        e.currentTarget.style.backgroundColor = 'var(--color-secondary-400, #e2e8f0)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!following) {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary, #3b82f6)';
                      } else {
                        e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                      }
                    }}
                  >
                    {followLoading ? (
                      <div 
                        className="animate-spin rounded-full h-3 w-3 border border-t-transparent mx-auto"
                        style={{ borderColor: following ? 'var(--color-secondary-foreground, #1f2937)' : 'white' }}
                      ></div>
                    ) : following ? (
                      'Following'
                    ) : (
                      'Follow'
                    )}
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-1 text-xs mt-1">
                <span 
                  style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                >
                  @{post.authorId.username}
                </span>
                <span 
                  style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                >
                  •
                </span>
                <span 
                  style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                >
                  {formatDate(post.createdAt)}
                </span>
                {followerCount !== undefined && (
                  <>
                    <span 
                      style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                    >
                      •
                    </span>
                    <span 
                      style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                    >
                      {followerCount} followers
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Actions Menu */}
          <div className="flex items-center space-x-1">
            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors duration-200"
                style={{ color: 'var(--color-muted-foreground, #64748b)' }}
              >
                {deleteLoading ? (
                  <div 
                    className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border border-t-transparent"
                    style={{ borderColor: 'var(--color-muted-foreground, #64748b)' }}
                  ></div>
                ) : (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            )}
            <button 
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Post content text */}
        <div className="px-3 sm:px-4 pb-2 sm:pb-3">
          <div 
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-card-foreground, #0f172a)' }}
          >
            <span className="font-semibold mr-2">
              {getFullName(post.authorId.firstName, post.authorId.lastName)}
            </span>
            <span className="whitespace-pre-wrap break-words">{post.text}</span>
          </div>
        </div>

        {/* Post image with constrained scaling */}
        {post.imageUrl && (
          <div className="w-full relative group">
            <img
              src={post.imageUrl}
              alt="Post content"
              className="w-full h-auto object-contain cursor-pointer transition-transform duration-200 group-hover:scale-[1.01]"
              style={{
                maxHeight: '400px',
                minHeight: '200px',
                backgroundColor: 'var(--color-muted, #f1f5f9)'
              }}
              onClick={() => setImageModalOpen(true)}
            />
            
            {/* Expand button */}
            <button
              onClick={() => setImageModalOpen(true)}
              className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>

            {/* Subtle overlay on hover */}
            <div 
              className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none"
            />
          </div>
        )}

        {/* Post actions */}
        <div className="px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Like Button */}
              <button
                onClick={handleLike}
                disabled={loading || !isAuthenticated}
                className={`flex items-center space-x-1 transition-all duration-200 ${
                  isAuthenticated ? 'hover:scale-110' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <svg 
                  className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${
                    liked ? 'text-red-500 fill-current' : ''
                  }`}
                  fill={liked ? 'currentColor' : 'none'}
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ 
                    color: liked ? '#ef4444' : 'var(--color-muted-foreground, #64748b)',
                    strokeWidth: liked ? 0 : 2
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {loading && (
                  <div 
                    className="animate-spin rounded-full h-3 w-3 border border-t-transparent ml-1"
                    style={{ borderColor: 'var(--color-muted-foreground, #64748b)' }}
                  ></div>
                )}
              </button>

              {/* Comment Button */}
              <button
                onClick={() => setShowComments(!showComments)}
                className="transition-colors duration-200 hover:scale-110"
                style={{ color: 'var(--color-muted-foreground, #64748b)' }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>

              {/* Share Button */}
              <button 
                className="transition-colors duration-200 hover:scale-110"
                style={{ color: 'var(--color-muted-foreground, #64748b)' }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>

            <button 
              className="transition-colors duration-200"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>

          {/* Like count */}
          {likeCount > 0 && (
            <p 
              className="font-semibold text-sm mb-1 sm:mb-2"
              style={{ color: 'var(--color-card-foreground, #0f172a)' }}
            >
              {likeCount} {likeCount === 1 ? 'like' : 'likes'}
            </p>
          )}

          {/* View comments button */}
          {!showComments && (
            <button
              onClick={() => setShowComments(true)}
              className="text-sm mt-1 sm:mt-2 transition-colors duration-200"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              View all comments
            </button>
          )}
        </div>

        {/* Comments section */}
        {showComments && (
          <div 
            className="border-t"
            style={{ 
              borderColor: 'var(--color-border, #e2e8f0)',
              backgroundColor: 'var(--color-muted, #f1f5f9)' 
            }}
          >
            <CommentSection postId={post._id} />
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        imageUrl={post.imageUrl || ''}
        alt={`Post by ${getFullName(post.authorId.firstName, post.authorId.lastName)}`}
      />
    </>
  );
};