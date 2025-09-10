'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/api';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ 
  isOpen, 
  onClose, 
  onPostCreated 
}) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image must be less than 10MB');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Post text is required');
      return;
    }

    if (text.length > 500) {
      setError('Post text must be less than 500 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('text', text.trim());
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await apiClient.createPost(formData);
      
      if (response.error) {
        setError(response.error);
      } else {
        // Reset form
        setText('');
        removeImage();
        setError('');
        onPostCreated();
      }
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setText('');
    removeImage();
    setError('');
    setIsFocused(false);
    onClose();
  };

  return (
    <>
      {/* Global CSS for placeholder styling */}
      <style jsx global>{`
        .create-post-modal-textarea {
          background-color: transparent !important;
          color: var(--color-foreground, #0f172a) !important;
          border: none !important;
          outline: none !important;
          resize: none !important;
        }
        
        .create-post-modal-textarea::placeholder {
          color: var(--color-muted-foreground, #64748b) !important;
          opacity: 0.7 !important;
        }
        
        .dark .create-post-modal-textarea {
          color: var(--color-foreground, #f8fafc) !important;
        }
        
        .dark .create-post-modal-textarea::placeholder {
          color: var(--color-muted-foreground, #94a3b8) !important;
          opacity: 0.8 !important;
        }
      `}</style>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Create new post"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full p-0.5">
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-card, #ffffff)' }}
                >
                  <span 
                    className="text-sm sm:text-base font-semibold"
                    style={{ color: 'var(--color-card-foreground, #0f172a)' }}
                  >
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p 
                className="font-semibold text-base"
                style={{ color: 'var(--color-foreground, #0f172a)' }}
              >
                {user?.username}
              </p>
              <p 
                className="text-sm"
                style={{ color: 'var(--color-muted-foreground, #64748b)' }}
              >
                Sharing to your timeline
              </p>
            </div>
          </div>

          {/* Textarea Container */}
          <div 
            className={`rounded-lg p-3 sm:p-4 transition-all duration-200 border ${
              isFocused ? 'ring-2 ring-opacity-20' : ''
            }`}
            style={{ 
              backgroundColor: 'var(--color-muted, #f1f5f9)',
              borderColor: isFocused ? 'var(--color-primary, #3b82f6)' : 'var(--color-border, #e2e8f0)',
              '--tw-ring-color': 'var(--color-primary, #3b82f6)'
            } as React.CSSProperties}
          >
            <textarea
              placeholder={`What's on your mind, ${user?.username}?`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={4}
              maxLength={500}
              className="create-post-modal-textarea w-full p-0 text-base"
              autoFocus
            />
          </div>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-80 object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Error Message */}
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
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Actions Bar */}
          <div 
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t space-y-4 sm:space-y-0"
            style={{ borderColor: 'var(--color-border, #e2e8f0)' }}
          >
            <div className="flex items-center justify-between sm:justify-start sm:space-x-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              
              {/* Photo Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{ 
                  color: 'var(--color-muted-foreground, #64748b)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                  e.currentTarget.style.color = 'var(--color-foreground, #0f172a)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-muted-foreground, #64748b)';
                }}
                disabled={loading}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium">Add Photo</span>
              </button>
              
              {/* Character Counter */}
              <div 
                className="flex items-center space-x-2"
                style={{ color: 'var(--color-muted-foreground, #64748b)' }}
              >
                <span className="text-sm">
                  {text.length}/500
                </span>
                <div 
                  className="w-8 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--color-muted, #f1f5f9)' }}
                >
                  <div 
                    className={`h-full transition-all duration-300 ${
                      text.length > 450 ? 'bg-red-500' : 
                      text.length > 350 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(text.length / 500) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!text.trim() || loading}
                loading={loading}
                className="w-full sm:w-auto px-6 py-2.5"
              >
                {loading ? 'Sharing...' : 'Share'}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};