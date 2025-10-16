"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/utils/api";
import { Comment } from "@/types/post.types";
import { isAdmin } from "@/types/user.types";
import { EmojiPicker } from "@/components/ui/EmojiPicker";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Avatar } from "@/components/ui/Avatar";
import { AdminBadge } from "@/components/ui/AdminBadge";

interface CommentSectionProps {
  postId: string;
  onCommentUpdate?: () => void;
}

interface CommentsResponse {
  comments: Comment[];
}

interface CommentLikeResponse {
  liked: boolean;
  likeCount: number;
  likedAt?: string;
  unlikedAt?: string;
}

interface ReplyState {
  commentId: string;
  replyToUsername: string;
  text: string;
  submitting: boolean;
}

interface EditState {
  commentId: string;
  text: string;
  submitting: boolean;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  onCommentUpdate,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [likingComments, setLikingComments] = useState<Set<string>>(new Set());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyStates, setReplyStates] = useState<{ [key: string]: ReplyState }>(
    {}
  );
  const [replyEmojiPickers, setReplyEmojiPickers] = useState<{
    [key: string]: boolean;
  }>({});
  const [editStates, setEditStates] = useState<{ [key: string]: EditState }>(
    {}
  );
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const replyEmojiButtonRefs = useRef<{
    [key: string]: HTMLButtonElement | null;
  }>({});
  const commentInputRef = useRef<HTMLInputElement>(null);

  const { user, isAuthenticated } = useAuth();

  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    commentId: string | null;
    isReply: boolean;
  }>({
    isOpen: false,
    commentId: null,
    isReply: false,
  });
  const [deletingComments, setDeletingComments] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    setLoading(true);
    const response = await apiClient.getComments(postId);

    if (response.data) {
      const commentsData = response.data as CommentsResponse;
      const organizedComments = organizeComments(commentsData.comments || []);
      setComments(organizedComments);
    }

    setLoading(false);
  };

  const organizeComments = (flatComments: Comment[]): Comment[] => {
    const commentMap = new Map<string, Comment>();
    const topLevelComments: Comment[] = [];

    flatComments.forEach((comment) => {
      commentMap.set(comment._id, { ...comment, replies: [] });
    });

    // Separate top-level comments and replies
    flatComments.forEach((comment) => {
      if (!comment.parentCommentId) {
        topLevelComments.push(commentMap.get(comment._id)!);
      }
    });

    // For each top-level comment, collect ALL replies
    topLevelComments.forEach((topLevelComment) => {
      const allReplies: Comment[] = [];

      // Find all comments that are replies to this top-level comment or its replies
      const findAllReplies = (parentId: string) => {
        flatComments.forEach((comment) => {
          if (comment.parentCommentId === parentId) {
            const reply = commentMap.get(comment._id)!;
            allReplies.push(reply);
            // Recursively find replies to this reply
            findAllReplies(comment._id);
          }
        });
      };

      // Start the recursive search from the top-level comment
      findAllReplies(topLevelComment._id);

      // Sort all replies chronologically (oldest first)
      allReplies.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      // Assign the flattened, sorted replies to the top-level comment
      topLevelComment.replies = allReplies;
    });

    // Sort top-level comments chronologically (oldest first)
    topLevelComments.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return topLevelComments;
  };

  const handleEmojiSelect = (emoji: string) => {
    const input = commentInputRef.current;
    if (input) {
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const newText =
        newComment.slice(0, start) + emoji + newComment.slice(end);
      setNewComment(newText);

      setTimeout(() => {
        input.selectionStart = input.selectionEnd = start + emoji.length;
        input.focus();
      }, 0);
    } else {
      setNewComment((prev) => prev + emoji);
    }
  };

  const handleReplyEmojiSelect = (emoji: string, commentId: string) => {
    setReplyStates((prev) => {
      const currentReply = prev[commentId];
      if (!currentReply) return prev;

      return {
        ...prev,
        [commentId]: {
          ...currentReply,
          text: currentReply.text + emoji,
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setSubmitting(true);

    const response = await apiClient.createComment(postId, newComment.trim());

    if (response.data) {
      await loadComments();
      setNewComment("");
      onCommentUpdate?.();
    }

    setSubmitting(false);
  };

  const handleReplySubmit = async (commentId: string) => {
    const replyState = replyStates[commentId];
    if (!replyState || !replyState.text.trim()) return;

    setReplyStates((prev) => ({
      ...prev,
      [commentId]: { ...prev[commentId], submitting: true },
    }));

    let commentText = replyState.text.trim();

    if (!commentText.startsWith(`@${replyState.replyToUsername}`)) {
      commentText = `@${replyState.replyToUsername} ${commentText}`;
    }

    const response = await apiClient.createComment(
      postId,
      commentText,
      commentId
    );

    if (response.data) {
      await loadComments();
      onCommentUpdate?.();
      setReplyStates((prev) => {
        const newState = { ...prev };
        delete newState[commentId];
        return newState;
      });
      setReplyEmojiPickers((prev) => {
        const newState = { ...prev };
        delete newState[commentId];
        return newState;
      });
    } else {
      setReplyStates((prev) => ({
        ...prev,
        [commentId]: { ...prev[commentId], submitting: false },
      }));
    }
  };

  const handleEditSubmit = async (commentId: string) => {
    const editState = editStates[commentId];
    if (!editState || !editState.text.trim()) return;

    setEditStates((prev) => ({
      ...prev,
      [commentId]: { ...prev[commentId], submitting: true },
    }));

    const response = await apiClient.updateComment(
      commentId,
      editState.text.trim()
    );

    if (response.data) {
      await loadComments();
      setEditStates((prev) => {
        const newState = { ...prev };
        delete newState[commentId];
        return newState;
      });
    } else {
      setEditStates((prev) => ({
        ...prev,
        [commentId]: { ...prev[commentId], submitting: false },
      }));
    }
  };

  const handleDeleteComment = async () => {
    if (!deleteModalState.commentId) return;

    const commentId = deleteModalState.commentId;
    setDeletingComments((prev) => new Set([...prev, commentId]));

    const response = await apiClient.deleteComment(commentId);

    if (response.data || response.message) {
      await loadComments();
      onCommentUpdate?.();
    }

    setDeletingComments((prev) => {
      const newSet = new Set(prev);
      newSet.delete(commentId);
      return newSet;
    });

    setDeleteModalState({
      isOpen: false,
      commentId: null,
      isReply: false,
    });
  };

  const handleDeleteClick = (commentId: string, isReply: boolean = false) => {
    setDeleteModalState({
      isOpen: true,
      commentId,
      isReply,
    });
  };

  const handleCommentLike = async (commentId: string) => {
    if (!isAuthenticated || !user || likingComments.has(commentId)) {
      return;
    }

    setLikingComments((prev) => new Set([...prev, commentId]));

    try {
      const response = await apiClient.toggleCommentLike(commentId);

      if (response.data) {
        const likeData = response.data as CommentLikeResponse;

        const updateCommentLikes = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            if (comment._id === commentId) {
              return {
                ...comment,
                liked: likeData.liked,
                likeCount: likeData.likeCount,
              };
            }
            if (comment.replies) {
              return {
                ...comment,
                replies: updateCommentLikes(comment.replies),
              };
            }
            return comment;
          });
        };

        setComments(updateCommentLikes);
      }
    } catch {
      // Silently handle errors
    } finally {
      setLikingComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  const handleReply = (commentId: string, username: string) => {
    setReplyStates((prev) => ({
      ...prev,
      [commentId]: {
        commentId,
        replyToUsername: username,
        text: `@${username} `,
        submitting: false,
      },
    }));
  };

  const handleEdit = (commentId: string, currentText: string) => {
    setEditStates((prev) => ({
      ...prev,
      [commentId]: {
        commentId,
        text: currentText,
        submitting: false,
      },
    }));
  };

  const cancelReply = (commentId: string) => {
    setReplyStates((prev) => {
      const newState = { ...prev };
      delete newState[commentId];
      return newState;
    });
    setReplyEmojiPickers((prev) => {
      const newState = { ...prev };
      delete newState[commentId];
      return newState;
    });
  };

  const cancelEdit = (commentId: string) => {
    setEditStates((prev) => {
      const newState = { ...prev };
      delete newState[commentId];
      return newState;
    });
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
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return "now";
    }
  };

  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  const renderComment = (comment: Comment, isReply: boolean = false) => {
    const isReplying = replyStates[comment._id];
    const isEditing = editStates[comment._id];
    const showReplyEmojiPicker = replyEmojiPickers[comment._id];
    const isDeleting = deletingComments.has(comment._id);
    const isCurrentUserAdmin = isAdmin(user);
    const isAuthorAdmin = (comment.authorId.roles || []).includes("ADMIN");

    // Admin delete logic
    const canDelete = user?._id === comment.authorId._id || isCurrentUserAdmin;
    const isOwnComment = user?._id === comment.authorId._id;
    const isAdminDelete = isCurrentUserAdmin && !isOwnComment;

    return (
      <div key={comment._id} className="space-y-3">
        <div
          className={`flex items-start space-x-2 sm:space-x-3 group ${
            isReply ? "ml-3 sm:ml-10 pl-3 sm:pl-4 border-l" : ""
          }`}
          style={
            isReply
              ? { borderColor: "var(--color-border, #e2e8f0)" }
              : undefined
          }
        >
          {/* Avatar */}
          <Avatar
            user={{
              firstName: comment.authorId.firstName,
              lastName: comment.authorId.lastName,
              avatarUrl: comment.authorId.avatarUrl,
            }}
            size="sm"
          />

          {/* Comment content */}
          <div className="flex-1 min-w-0">
            {/* Metadata - Name, Admin Badge, and Username on one line */}
            <div className="flex items-center gap-x-1 flex-wrap mb-1">
              <span
                className="font-medium text-xs sm:text-sm"
                style={{ color: "var(--color-card-foreground, #0f172a)" }}
              >
                {getFullName(
                  comment.authorId.firstName,
                  comment.authorId.lastName
                )}
              </span>
              {isAuthorAdmin && <AdminBadge className="flex-shrink-0" />}
              <span
                className="text-xs"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                @{comment.authorId.username}
              </span>
            </div>

            {/* Comment text or edit input */}
            {isEditing ? (
              <div className="mb-2">
                <input
                  type="text"
                  value={isEditing.text}
                  onChange={(e) =>
                    setEditStates((prev) => ({
                      ...prev,
                      [comment._id]: {
                        ...prev[comment._id],
                        text: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  style={{
                    backgroundColor: "var(--color-input, #ffffff)",
                    color: "var(--color-foreground, #0f172a)",
                    borderColor: "var(--color-border, #e2e8f0)",
                  }}
                  disabled={isEditing.submitting}
                  autoFocus
                />
                <div className="flex items-center justify-end space-x-2 mt-2">
                  <button
                    onClick={() => cancelEdit(comment._id)}
                    disabled={isEditing.submitting}
                    className="text-xs px-3 py-1 rounded transition-colors"
                    style={{
                      color: "var(--color-muted-foreground, #64748b)",
                      backgroundColor: "transparent",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditSubmit(comment._id)}
                    disabled={!isEditing.text.trim() || isEditing.submitting}
                    className="text-xs px-3 py-1 rounded transition-colors disabled:opacity-50"
                    style={{
                      backgroundColor: isEditing.text.trim()
                        ? "var(--color-primary, #3b82f6)"
                        : "var(--color-muted, #f1f5f9)",
                      color: isEditing.text.trim()
                        ? "white"
                        : "var(--color-muted-foreground, #64748b)",
                    }}
                  >
                    {isEditing.submitting ? "..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Comment text with edited status */}
                <div className="flex items-baseline gap-1 flex-wrap">
                  <p
                    className="text-xs sm:text-sm break-words whitespace-pre-wrap"
                    style={{
                      color: "var(--color-card-foreground, #0f172a)",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {comment.text}
                  </p>
                  {/* Edited status */}
                  {comment.edited && (
                    <span
                      className="text-xs italic flex-shrink-0"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      (edited)
                    </span>
                  )}
                </div>

                {/* Comment actions with date */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {/* Like button */}
                  <button
                    onClick={() => handleCommentLike(comment._id)}
                    disabled={
                      !isAuthenticated || likingComments.has(comment._id)
                    }
                    className="flex items-center space-x-1 transition-all duration-200 hover:scale-105"
                    style={{
                      color: comment.liked
                        ? "var(--color-destructive, #ef4444)"
                        : "var(--color-muted-foreground, #64748b)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!comment.liked) {
                        e.currentTarget.style.color =
                          "var(--color-destructive, #ef4444)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!comment.liked) {
                        e.currentTarget.style.color =
                          "var(--color-muted-foreground, #64748b)";
                      }
                    }}
                  >
                    <svg
                      className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
                        comment.liked ? "fill-current" : ""
                      }`}
                      fill={comment.liked ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="text-xs font-medium">
                      {comment.likeCount || 0}
                    </span>
                  </button>

                  {/* Date */}
                  <span
                    className="text-xs"
                    style={{
                      color: "var(--color-muted-foreground, #64748b)",
                    }}
                  >
                    {formatDate(comment.createdAt)}
                  </span>

                  {/* Reply button */}
                  {isAuthenticated && (
                    <button
                      onClick={() =>
                        handleReply(comment._id, comment.authorId.username)
                      }
                      className="text-xs transition-all duration-200 hover:scale-105"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          "var(--color-primary, #3b82f6)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          "var(--color-muted-foreground, #64748b)";
                      }}
                    >
                      Reply
                    </button>
                  )}

                  {/* Edit button - only for comment author */}
                  {isOwnComment && (
                    <button
                      onClick={() => handleEdit(comment._id, comment.text)}
                      className="text-xs transition-all duration-200 hover:scale-105"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          "var(--color-primary, #3b82f6)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          "var(--color-muted-foreground, #64748b)";
                      }}
                    >
                      Edit
                    </button>
                  )}

                  {/* Delete button - for comment author OR admin */}
                  {canDelete && (
                    <button
                      onClick={() => handleDeleteClick(comment._id, isReply)}
                      disabled={isDeleting}
                      className="text-xs transition-all duration-200 hover:scale-105 disabled:opacity-50"
                      style={{
                        color: "var(--color-destructive, #ef4444)",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isDeleting) {
                          e.currentTarget.style.color =
                            "var(--color-destructive-600, #dc2626)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isDeleting) {
                          e.currentTarget.style.color =
                            "var(--color-destructive, #ef4444)";
                        }
                      }}
                    >
                      {isDeleting
                        ? "Deleting..."
                        : isAdminDelete
                        ? "Delete (Admin)"
                        : "Delete"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Reply input with emoji picker */}
            {isReplying && (
              <div className="mt-3 space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 mt-2">
                    {user && (
                      <Avatar
                        user={{
                          firstName: user.firstName,
                          lastName: user.lastName,
                          avatarUrl: user.avatarUrl,
                        }}
                        size="xs"
                      />
                    )}
                  </div>

                  <div className="flex-1 relative">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder={`Reply to @${isReplying.replyToUsername}...`}
                        value={isReplying.text}
                        onChange={(e) =>
                          setReplyStates((prev) => ({
                            ...prev,
                            [comment._id]: {
                              ...prev[comment._id],
                              text: e.target.value,
                            },
                          }))
                        }
                        className="flex-1 px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary pr-10"
                        style={{
                          backgroundColor: "var(--color-input, #ffffff)",
                          color: "var(--color-foreground, #0f172a)",
                          borderColor: "var(--color-border, #e2e8f0)",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                        disabled={isReplying.submitting}
                        autoFocus
                      />

                      {/* Reply Emoji button */}
                      <button
                        ref={(el) => {
                          replyEmojiButtonRefs.current[comment._id] = el;
                        }}
                        type="button"
                        onClick={() =>
                          setReplyEmojiPickers((prev) => ({
                            ...prev,
                            [comment._id]: !prev[comment._id],
                          }))
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors duration-200 hover:scale-105"
                        style={{
                          color: "var(--color-muted-foreground, #64748b)",
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--color-secondary, #f1f5f9)";
                          e.currentTarget.style.color =
                            "var(--color-foreground, #0f172a)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color =
                            "var(--color-muted-foreground, #64748b)";
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => cancelReply(comment._id)}
                    disabled={isReplying.submitting}
                    className="text-xs px-3 py-1 rounded transition-colors"
                    style={{
                      color: "var(--color-muted-foreground, #64748b)",
                      backgroundColor: "transparent",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReplySubmit(comment._id)}
                    disabled={!isReplying.text.trim() || isReplying.submitting}
                    className="text-xs px-3 py-1 rounded transition-colors disabled:opacity-50"
                    style={{
                      backgroundColor: isReplying.text.trim()
                        ? "var(--color-primary, #3b82f6)"
                        : "var(--color-muted, #f1f5f9)",
                      color: isReplying.text.trim()
                        ? "white"
                        : "var(--color-muted-foreground, #64748b)",
                    }}
                  >
                    {isReplying.submitting ? "..." : "Reply"}
                  </button>
                </div>

                {/* Reply Emoji Picker */}
                {showReplyEmojiPicker && (
                  <EmojiPicker
                    isOpen={showReplyEmojiPicker}
                    onClose={() =>
                      setReplyEmojiPickers((prev) => ({
                        ...prev,
                        [comment._id]: false,
                      }))
                    }
                    onEmojiSelect={(emoji) =>
                      handleReplyEmojiSelect(emoji, comment._id)
                    }
                    triggerRef={
                      replyEmojiButtonRefs.current[comment._id]
                        ? { current: replyEmojiButtonRefs.current[comment._id] }
                        : undefined
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Render all replies with single level indentation */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-3">
            {comment.replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
      {/* Main comment form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 sm:space-x-3"
      >
        <div className="flex-shrink-0">
          {user && (
            <Avatar
              user={{
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl,
              }}
              size="sm"
            />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-1 relative">
            <input
              ref={commentInputRef}
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-xs sm:text-sm placeholder-gray-500 dark:placeholder-gray-400 py-2 sm:py-1 pr-16"
              style={{
                color: "var(--color-card-foreground, #0f172a)",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
              maxLength={200}
              disabled={submitting}
            />

            {/* Main Emoji button */}
            <button
              ref={emojiButtonRef}
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors duration-200 hover:scale-105"
              style={{
                color: "var(--color-muted-foreground, #64748b)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-secondary, #f1f5f9)";
                e.currentTarget.style.color =
                  "var(--color-foreground, #0f172a)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color =
                  "var(--color-muted-foreground, #64748b)";
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!newComment.trim() || submitting || !isAuthenticated}
              className="absolute right-0 text-xs font-medium px-2 py-1 rounded transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor:
                  newComment.trim() && isAuthenticated
                    ? "var(--color-primary, #3b82f6)"
                    : "var(--color-muted, #f1f5f9)",
                color:
                  newComment.trim() && isAuthenticated
                    ? "white"
                    : "var(--color-muted-foreground, #64748b)",
              }}
            >
              {submitting ? "..." : "Post"}
            </button>
          </div>
        </div>
      </form>

      {/* Main Emoji Picker */}
      <EmojiPicker
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onEmojiSelect={handleEmojiSelect}
        triggerRef={emojiButtonRef}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalState.isOpen}
        onClose={() =>
          setDeleteModalState({
            isOpen: false,
            commentId: null,
            isReply: false,
          })
        }
        onConfirm={handleDeleteComment}
        title={`Delete ${deleteModalState.isReply ? "Reply" : "Comment"}`}
        message={(() => {
          if (!deleteModalState.commentId) return "";

          const comment = comments
            .flatMap((c) => [c, ...(c.replies || [])])
            .find((c) => c._id === deleteModalState.commentId);

          const isOwnComment = user?._id === comment?.authorId._id;
          const isAdminDelete = isAdmin(user) && !isOwnComment;

          if (isAdminDelete) {
            return `Are you sure you want to delete this ${
              deleteModalState.isReply ? "reply" : "comment"
            } as an admin? This action cannot be undone and will be logged.`;
          }

          return `Are you sure you want to delete this ${
            deleteModalState.isReply ? "reply" : "comment"
          }? This action cannot be undone.`;
        })()}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={
          deleteModalState.commentId
            ? deletingComments.has(deleteModalState.commentId)
            : false
        }
      />

      {/* Comments list */}
      {loading ? (
        <div className="flex justify-center py-4 sm:py-6">
          <div
            className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-t-transparent"
            style={{ borderColor: "var(--color-muted-foreground, #64748b)" }}
          ></div>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {comments.map((comment) => renderComment(comment, false))}

          {comments.length === 0 && (
            <div className="text-center py-6 sm:py-8">
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                No comments yet. Be the first to comment!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
