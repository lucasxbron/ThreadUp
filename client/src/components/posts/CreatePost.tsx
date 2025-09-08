'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/api';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

interface CreatePostProps {
  onPostCreated: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
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
        setText('');
        removeImage();
        onPostCreated();
      }
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 mb-6 border"
      style={{
        backgroundColor: 'var(--color-card, #ffffff)',
        borderColor: 'var(--color-border, #e2e8f0)'
      }}
    >
      <div className="flex space-x-3">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full p-0.5">
            <div 
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-card, #ffffff)' }}
            >
              <span 
                className="text-sm font-semibold"
                style={{ color: 'var(--color-card-foreground, #0f172a)' }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder={`What's on your mind, ${user?.username}?`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="resize-none border-0 bg-transparent p-0 focus:ring-0 text-base placeholder-gray-500 dark:placeholder-gray-400"
              style={{ 
                color: 'var(--color-card-foreground, #0f172a)',
                backgroundColor: 'transparent'
              }}
            />
            
            {imagePreview && (
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-96 object-cover"
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

            {error && (
              <div 
                className="border rounded-lg p-3"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  color: 'var(--color-destructive, #ef4444)'
                }}
              >
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div 
              className="flex items-center justify-between pt-3 border-t"
              style={{ borderColor: 'var(--color-border, #e2e8f0)' }}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                  disabled={loading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Photo</span>
                </button>
                
                <div 
                  className="flex items-center space-x-2"
                  style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                >
                  <span className="text-sm">
                    {text.length}/500
                  </span>
                  <div 
                    className="w-6 h-1 rounded-full overflow-hidden"
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

              <Button
                type="submit"
                disabled={!text.trim() || loading}
                loading={loading}
                size="sm"
                className="px-6"
              >
                Share
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};