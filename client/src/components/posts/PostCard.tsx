/* filepath: /home/lb/Documents/repos/ThreadUp/client/src/components/posts/PostCard.tsx */
'use client';

import React, { useState } from 'react';
import { Post } from '@/types/post.types';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/api';
import { Button } from '@/components/ui/Button';
import { CommentSection } from './CommentSection';

interface PostCardProps {
  post: Post;
  onPostUpdate: () => void;
}

interface LikeResponse {
  liked: boolean;
  likeCount: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPostUpdate }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const { user } = useAuth();

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
    if (loading) return;
    
    setLoading(true);
    const response = await apiClient.toggleLike(post._id);
    
    if (response.data) {
      const likeData = response.data as LikeResponse;
      setLiked(likeData.liked);
      setLikeCount(likeData.likeCount);
    }
    
    setLoading(false);
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

  return (
    <div 
      className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border"
      style={{
        backgroundColor: 'var(--color-card, #ffffff)',
        borderColor: 'var(--color-border, #e2e8f0)'
      }}
    >
      {/* Post header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full p-0.5">
              <div 
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-card, #ffffff)' }}
              >
                <span 
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-card-foreground, #0f172a)' }}
                >
                  {post.authorId.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p 
              className="font-semibold text-sm"
              style={{ color: 'var(--color-card-foreground, #0f172a)' }}
            >
              {post.authorId.username}
            </p>
            <p 
              className="text-xs"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors duration-200"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              {deleteLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          )}
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Post image */}
      {post.imageUrl && (
        <div className="w-full">
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full h-auto max-h-[600px] object-cover"
          />
        </div>
      )}

      {/* Post actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              disabled={loading}
              className={`transition-all duration-200 hover:scale-110 ${
                liked 
                  ? 'text-red-500 hover:text-red-600 scale-110' 
                  : 'hover:text-red-500'
              }`}
              style={{ 
                color: liked ? '#ef4444' : 'var(--color-muted-foreground, #64748b)' 
              }}
            >
              <svg 
                className={`w-6 h-6 transition-all duration-200 ${liked ? 'fill-current' : ''}`} 
                fill={liked ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={liked ? 0 : 2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="transition-colors duration-200 hover:scale-110"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            <button 
              className="transition-colors duration-200 hover:scale-110"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>

          <button 
            className="transition-colors duration-200"
            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Like count */}
        {likeCount > 0 && (
          <p 
            className="font-semibold text-sm mb-2"
            style={{ color: 'var(--color-card-foreground, #0f172a)' }}
          >
            {likeCount} {likeCount === 1 ? 'like' : 'likes'}
          </p>
        )}

        {/* Post content */}
        <div 
          className="text-sm"
          style={{ color: 'var(--color-card-foreground, #0f172a)' }}
        >
          <span className="font-semibold mr-2">{post.authorId.username}</span>
          <span className="whitespace-pre-wrap">{post.text}</span>
        </div>

        {/* View comments button */}
        {!showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="text-sm mt-2 transition-colors duration-200"
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
  );
};