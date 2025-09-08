'use client';

import React, { useState, useEffect } from 'react';
import { Post } from '@/types/post.types';
import { apiClient } from '@/utils/api';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';

interface PostsResponse {
  posts: Post[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    setError('');
    
    const response = await apiClient.getPosts();
    
    if (response.data) {
      const postsData = response.data as PostsResponse;
      setPosts(postsData.posts || []);
    } else if (response.error) {
      setError(response.error);
    }
    
    setLoading(false);
  };

  const handlePostUpdate = () => {
    loadPosts();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Create post skeleton */}
        <div 
          className="rounded-xl p-4 shadow-sm border"
          style={{
            backgroundColor: 'var(--color-card, #ffffff)',
            borderColor: 'var(--color-border, #e2e8f0)'
          }}
        >
          <div className="animate-pulse flex space-x-3">
            <div 
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
            ></div>
            <div className="flex-1 space-y-2">
              <div 
                className="h-4 rounded w-3/4"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
              <div 
                className="h-4 rounded w-1/2"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Post skeletons */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="rounded-xl p-4 shadow-sm border"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              borderColor: 'var(--color-border, #e2e8f0)'
            }}
          >
            <div className="animate-pulse">
              <div className="flex space-x-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
                <div className="flex-1 space-y-1">
                  <div 
                    className="h-4 rounded w-1/4"
                    style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                  ></div>
                  <div 
                    className="h-3 rounded w-1/6"
                    style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div 
                  className="h-4 rounded w-full"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
                <div 
                  className="h-4 rounded w-3/4"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
              </div>
              <div 
                className="h-40 rounded-lg mb-4"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
              <div className="flex space-x-4">
                <div 
                  className="h-6 rounded w-6"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
                <div 
                  className="h-6 rounded w-6"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
                <div 
                  className="h-6 rounded w-6"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="rounded-xl p-6 border"
        style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.3)'
        }}
      >
        <div className="flex">
          <svg 
            className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            style={{ color: 'var(--color-destructive, #ef4444)' }}
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 
              className="text-sm font-medium"
              style={{ color: 'var(--color-destructive, #ef4444)' }}
            >
              Error loading posts
            </h3>
            <p 
              className="text-sm mt-1"
              style={{ color: 'rgba(239, 68, 68, 0.8)' }}
            >
              {error}
            </p>
            <button
              onClick={loadPosts}
              className="mt-3 text-sm font-medium underline hover:opacity-80"
              style={{ color: 'var(--color-destructive, #ef4444)' }}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CreatePost onPostCreated={handlePostUpdate} />
      
      {posts.length === 0 ? (
        <div 
          className="rounded-xl p-12 text-center shadow-sm border"
          style={{
            backgroundColor: 'var(--color-card, #ffffff)',
            borderColor: 'var(--color-border, #e2e8f0)'
          }}
        >
          <svg 
            className="mx-auto h-12 w-12 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 
            className="text-lg font-medium mb-2"
            style={{ color: 'var(--color-foreground, #0f172a)' }}
          >
            No posts yet
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
          >
            Be the first to share something with the community!
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onPostUpdate={handlePostUpdate}
          />
        ))
      )}
    </div>
  );
};