'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Comment } from '@/types/post.types';

interface CommentSectionProps {
  postId: string;
}

interface CommentsResponse {
  comments: Comment[];
}

interface CommentResponse {
  comment: Comment;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    setLoading(true);
    const response = await apiClient.getComments(postId);
    
    if (response.data) {
      const commentsData = response.data as CommentsResponse;
      setComments(commentsData.comments || []);
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    const response = await apiClient.createComment(postId, newComment.trim());
    
    if (response.data) {
      const commentData = response.data as CommentResponse;
      setComments(prev => [commentData.comment, ...prev]);
      setNewComment('');
    }
    
    setSubmitting(false);
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    const response = await apiClient.deleteComment(commentId);
    
    if (response.data || response.message) {
      setComments(prev => prev.filter(comment => comment._id !== commentId));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Comment form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={2}
              className="text-sm"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            size="sm"
            disabled={!newComment.trim() || submitting}
            loading={submitting}
          >
            Comment
          </Button>
        </div>
      </form>

      {/* Comments list */}
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="flex space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-semibold">
                  {comment.authorId.username.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="bg-secondary rounded-lg px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">
                      {comment.authorId.username}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </span>
                      {user?._id === comment.authorId._id && (
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-foreground">
                    {comment.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {comments.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-4">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}
    </div>
  );
};