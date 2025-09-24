'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/contexts/AuthContext';
import { useFollow } from '@/contexts/FollowContext';
import { apiClient } from '@/utils/api';
import { User } from '@/types/user.types';
import { Avatar } from '@/components/ui/Avatar';

interface SuggestedUser extends User {
  interactionScore: number;
  mutualFollowers?: number;
  isFollowing: boolean;
}

interface SuggestionsResponse {
  suggestions: SuggestedUser[];
}

interface AllSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AllSuggestionsModal: React.FC<AllSuggestionsModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, isAuthenticated } = useAuth();
  const { getFollowState, toggleFollow, updateFollowState } = useFollow();

  useEffect(() => {
    if (isOpen && isAuthenticated && user) {
      loadAllSuggestions();
    }
  }, [isOpen, isAuthenticated, user]);

  const loadAllSuggestions = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load more suggestions (higher limit)
      const response = await apiClient.getSuggestions(20);

      if (response.data) {
        const suggestionsData = response.data as SuggestionsResponse;
        
        // Initialize global follow states for all suggestions
        suggestionsData.suggestions?.forEach((suggestion) => {
          updateFollowState(
            suggestion._id,
            suggestion.isFollowing,
            suggestion.followersCount || 0
          );
        });

        setSuggestions(suggestionsData.suggestions || []);
      } else {
        setError('Failed to load suggestions');
      }
    } catch (error) {
      console.error('Error loading all suggestions:', error);
      setError('Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    if (!isAuthenticated || !user) {
      return;
    }

    // Get current follower count from global state or fallback to suggestion data
    const globalState = getFollowState(userId);
    const suggestion = suggestions.find((s) => s._id === userId);
    const currentFollowerCount =
      globalState?.followersCount ?? suggestion?.followersCount ?? 0;

    const success = await toggleFollow(userId, currentFollowerCount);

    if (success) {
      // Update local suggestions state to reflect new follow status
      const updatedState = getFollowState(userId);
      if (updatedState) {
        setSuggestions((prevSuggestions) =>
          prevSuggestions.map((suggestion) =>
            suggestion._id === userId
              ? { ...suggestion, isFollowing: updatedState.isFollowing }
              : suggestion
          )
        );
      }
    }
  };

  // Get full name
  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  // Get suggestion reason based on interaction score
  const getSuggestionReason = (interactionScore: number) => {
    if (interactionScore >= 10) {
      return { text: "Follows you", color: "var(--color-success, #22c55e)" };
    } else if (interactionScore >= 5) {
      return {
        text: "Often likes your posts",
        color: "var(--color-primary, #3b82f6)",
      };
    } else if (interactionScore > 0) {
      return {
        text: "Liked your posts",
        color: "var(--color-primary, #3b82f6)",
      };
    } else {
      return {
        text: "Suggested for you",
        color: "var(--color-muted-foreground, #64748b)",
      };
    }
  };

  const handleClose = () => {
    setSuggestions([]);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Suggestions for you" size="lg">
      <div className="space-y-4">
        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 rounded-lg animate-pulse">
                <div 
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
                <div className="flex-1 space-y-2">
                  <div 
                    className="h-4 w-32 rounded"
                    style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                  ></div>
                  <div 
                    className="h-3 w-24 rounded"
                    style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                  ></div>
                </div>
                <div 
                  className="w-20 h-8 rounded"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                ></div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" 
                 style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--color-destructive, #ef4444)' }} 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 
              className="text-lg font-medium mb-2"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Failed to load suggestions
            </h3>
            <p 
              className="text-sm mb-4"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              {error}
            </p>
            <button
              onClick={loadAllSuggestions}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--color-primary, #3b82f6)',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-600, #2563eb)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary, #3b82f6)';
              }}
            >
              Try Again
            </button>
          </div>
        ) : suggestions.length === 0 ? (
          /* Empty State */
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" 
                 style={{ backgroundColor: 'var(--color-secondary, #f1f5f9)' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--color-muted-foreground, #64748b)' }} 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 
              className="text-lg font-medium mb-2"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              No suggestions available
            </h3>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              We couldn't find any suggestions for you right now. Try posting more content or following some users!
            </p>
          </div>
        ) : (
          /* Suggestions List */
          <div className="max-h-96 overflow-y-auto space-y-3">
            {suggestions.map((suggestion) => {
              const globalState = getFollowState(suggestion._id);
              const isFollowing = globalState?.isFollowing ?? suggestion.isFollowing;
              const isLoading = globalState?.isLoading ?? false;
              const reason = getSuggestionReason(suggestion.interactionScore);

              return (
                <div key={suggestion._id} className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200"
                     style={{ backgroundColor: 'var(--color-secondary, #f1f5f9)' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = 'var(--color-secondary-400, #e2e8f0)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                     }}>
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar 
                      user={{
                        firstName: suggestion.firstName,
                        lastName: suggestion.lastName,
                        avatarUrl: suggestion.avatarUrl,
                      }} 
                      size="lg"
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4
                        className="font-medium text-sm truncate"
                        style={{ color: "var(--color-card-foreground, #0f172a)" }}
                      >
                        {getFullName(suggestion.firstName, suggestion.lastName)}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-muted-foreground, #64748b)" }}
                      >
                        @{suggestion.username}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-muted-foreground, #64748b)" }}
                      >
                        •
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: reason.color }}
                      >
                        {reason.text}
                      </span>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleFollow(suggestion._id)}
                      disabled={isLoading}
                      className="px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
                      style={{
                        backgroundColor: isFollowing
                          ? "var(--color-secondary, #f1f5f9)"
                          : "var(--color-primary, #3b82f6)",
                        color: isFollowing
                          ? "var(--color-secondary-foreground, #1f2937)"
                          : "white",
                        border: isFollowing
                          ? "1px solid var(--color-border, #e2e8f0)"
                          : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading) {
                          if (isFollowing) {
                            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                            e.currentTarget.style.color = "var(--color-destructive, #ef4444)";
                            e.currentTarget.style.borderColor = "var(--color-destructive, #ef4444)";
                            e.currentTarget.textContent = "Unfollow";
                          } else {
                            e.currentTarget.style.backgroundColor = "var(--color-primary-600, #2563eb)";
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading) {
                          if (isFollowing) {
                            e.currentTarget.style.backgroundColor = "var(--color-secondary, #f1f5f9)";
                            e.currentTarget.style.color = "var(--color-secondary-foreground, #1f2937)";
                            e.currentTarget.style.borderColor = "var(--color-border, #e2e8f0)";
                            e.currentTarget.textContent = "Following";
                          } else {
                            e.currentTarget.style.backgroundColor = "var(--color-primary, #3b82f6)";
                          }
                        }
                      }}
                    >
                      {isLoading ? (
                        <div
                          className="w-4 h-4 animate-spin rounded-full border border-t-transparent"
                          style={{
                            borderColor: isFollowing
                              ? "var(--color-muted-foreground, #64748b)"
                              : "white",
                          }}
                        ></div>
                      ) : isFollowing ? (
                        "Following"
                      ) : (
                        "Follow"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};