'use client';

import React, { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  alt = 'Full size image'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] overflow-hidden">
      {/* Background overlay */}
      <div
        className="fixed inset-0 transition-opacity cursor-zoom-out"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)'
        }}
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[310] p-2 rounded-full transition-all duration-200 hover:scale-110"
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
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
          <img
            src={imageUrl}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-zoom-out"
            onClick={onClose}
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh'
            }}
          />
        </div>
      </div>

      {/* Instructions text */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[310]">
        <div 
          className="px-4 py-2 rounded-full text-white text-sm"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }}
        >
          Click anywhere or press ESC to close
        </div>
      </div>
    </div>
  );
};