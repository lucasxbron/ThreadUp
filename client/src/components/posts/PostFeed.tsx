'use client';

import React, { useState, useEffect } from 'react';
import { Post } from '@/types/post.types';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/api';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';
import { FeedFilter, FeedFilterType } from './FeedFilter';

interface PostsResponse {
  posts: Post[];
  filter: string;
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
  const [activeFilter, setActiveFilter] = useState<FeedFilterType>('recent');
  
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadPosts();
  }, [activeFilter]);

  // Listen for refresh events from header create post modal
  useEffect(() => {
    const handleRefresh = () => {
      loadPosts();
    };

    window.addEventListener('refreshPosts', handleRefresh);
    return () => window.removeEventListener('refreshPosts', handleRefresh);
  }, [activeFilter]);

  const loadPosts = async () => {
    setLoading(true);
    setError('');
    
    const response = await apiClient.getFilteredPosts(activeFilter);
    
    if (response.data) {
      const postsData = response.data as PostsResponse;
      setPosts(postsData.posts || []);
    } else if (response.error) {
      setError(response.error);
    }
    
    setLoading(false);
  };

  const handleFilterChange = (filter: FeedFilterType) => {
    setActiveFilter(filter);
  };

  const handlePostUpdate = () => {
    loadPosts();
  };

  const handleFollowUpdate = (userId: string, newFollowingStatus: boolean, newFollowerCount: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.authorId._id === userId) {
          return {
            ...post,
            following: newFollowingStatus,
            authorId: {
              ...post.authorId,
              followersCount: newFollowerCount
            }
          };
        }
        return post;
      })
    );
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
        {/* Feed Filter Skeleton */}
        <div 
          className="rounded-lg md:rounded-xl p-4 shadow-sm border"
          style={{
            backgroundColor: 'var(--color-card, #ffffff)',
            borderColor: 'var(--color-border, #e2e8f0)'
          }}
        >
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div 
                className="h-6 w-16 rounded"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="h-8 w-20 rounded-lg"
                    style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                  ></div>
                ))}
              </div>
            </div>
            <div 
              className="h-4 w-3/4 rounded"
              style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
            ></div>
          </div>
        </div>

        {/* Create post skeleton */}
        <div 
          className="rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border"
          style={{
            backgroundColor: 'var(--color-card, #ffffff)',
            borderColor: 'var(--color-border, #e2e8f0)'
          }}
        >
          <div className="animate-pulse flex space-x-2 md:space-x-3">
            <div 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
            ></div>
            <div className="flex-1 space-y-2">
              <div 
                className="h-3 md:h-4 rounded w-3/4"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
              <div 
                className="h-3 md:h-4 rounded w-1/2"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Post skeletons */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              borderColor: 'var(--color-border, #e2e8f0)'
            }}
          >
            <div className="animate-pulse">
              <div className="flex space-x-2 md:space-x-3 mb-3 md:mb-4">
                <div 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
                <div className="flex-1 space-y-1">
                  <div 
                    className="h-3 md:h-4 rounded w-1/4"
                    style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                  ></div>
                  <div 
                    className="h-3 rounded w-1/6"
                    style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2 mb-3 md:mb-4">
                <div 
                  className="h-3 md:h-4 rounded w-full"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
                <div 
                  className="h-3 md:h-4 rounded w-3/4"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
              </div>
              <div 
                className="h-32 md:h-40 rounded-lg mb-3 md:mb-4"
                style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
              ></div>
              <div className="flex space-x-3 md:space-x-4">
                <div 
                  className="h-5 md:h-6 rounded w-5 md:w-6"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
                <div 
                  className="h-5 md:h-6 rounded w-5 md:w-6"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
                <div 
                  className="h-5 md:h-6 rounded w-5 md:w-6"
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
      <div className="max-w-2xl mx-auto">
        <div 
          className="rounded-lg md:rounded-xl p-4 md:p-6 border"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)'
          }}
        >
          <div className="flex flex-col sm:flex-row">
            <svg 
              className="w-5 h-5 mb-2 sm:mb-0 sm:mr-3 flex-shrink-0 sm:mt-0.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              style={{ color: 'var(--color-destructive, #ef4444)' }}
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--color-destructive, #ef4444)' }}
              >
                Error Loading Posts
              </h3>
              <p 
                className="text-sm"
                style={{ color: 'var(--color-destructive, #ef4444)' }}
              >
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
      {/* Feed Filter */}
      <FeedFilter 
        activeFilter={activeFilter} 
        onFilterChange={handleFilterChange} 
      />

      {/* Create Post - Only show for authenticated users */}
      {isAuthenticated && (
        <CreatePost onPostCreated={handlePostUpdate} />
      )}
      
      {posts.length === 0 ? (
        <div 
          className="rounded-lg md:rounded-xl p-8 md:p-12 text-center shadow-sm border"
          style={{
            backgroundColor: 'var(--color-card, #ffffff)',
            borderColor: 'var(--color-border, #e2e8f0)'
          }}
        >
          <svg 
            className="mx-auto h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 
            className="text-base md:text-lg font-medium mb-2"
            style={{ color: 'var(--color-foreground, #0f172a)' }}
          >
            {activeFilter === 'following' ? 'No posts from followed users' : 'No posts yet'}
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
          >
            {activeFilter === 'following' 
              ? 'Follow some users to see their posts here!'
              : activeFilter === 'trending'
              ? 'No trending posts at the moment. Check back later!'
              : 'Be the first to share something with the community!'
            }
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onPostUpdate={handlePostUpdate}
            onFollowUpdate={handleFollowUpdate}
          />
        ))
      )}
    </div>
  );
};