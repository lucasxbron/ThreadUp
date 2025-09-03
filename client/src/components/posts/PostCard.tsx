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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {post.authorId.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {post.authorId.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            loading={deleteLoading}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        )}
      </div>

      {/* Post content */}
      <div className="px-4 pb-4">
        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
          {post.text}
        </p>
      </div>

      {/* Post image */}
      {post.imageUrl && (
        <div className="px-4 pb-4">
          <img
            src={post.imageUrl}
            alt="Post image"
            className="w-full max-h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Post actions */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              disabled={loading}
              className={`flex items-center space-x-2 transition-colors ${
                liked 
                  ? 'text-red-600' 
                  : 'text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500'
              }`}
            >
              <svg 
                className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} 
                fill={liked ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium">{likeCount}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm font-medium">
                {showComments ? 'Hide' : 'Comment'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <CommentSection postId={post._id} />
        </div>
      )}
    </div>
  );
};