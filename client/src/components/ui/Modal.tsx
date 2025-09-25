'use client';

import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small delay to allow content to render before showing
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
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

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg sm:max-w-xl',
    xl: 'max-w-xl sm:max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto">
      {/* Background overlay */}
      <div
        className={`fixed inset-0 transition-opacity duration-200 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
        onClick={onClose}
      />

      {/* Modal container with consistent positioning */}
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
        {/* Modal panel with theme-aware styling */}
        <div
          className={`w-full ${sizeClasses[size]} relative z-10 transform transition-all duration-200 ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          style={{
            marginTop: '4rem',
            marginBottom: '4rem',
            maxHeight: 'calc(100vh - 8rem)',
            overflow: 'visible' // Changed from 'auto' to 'visible'
          }}
        >
          <div
            className="bg-white rounded-xl shadow-xl border"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              borderColor: 'var(--color-border, #e2e8f0)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              maxHeight: 'calc(100vh - 8rem)', // Constrain the inner content
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Only render header if title is provided */}
            {title && (
              <div 
                className="flex items-center justify-between p-6 border-b flex-shrink-0"
                style={{ borderColor: 'var(--color-border, #e2e8f0)' }}
              >
                <div className="flex-1">
                  {typeof title === 'string' ? (
                    <h3 
                      className="text-lg font-semibold"
                      style={{ color: 'var(--color-foreground, #0f172a)' }}
                    >
                      {title}
                    </h3>
                  ) : (
                    <div className="flex items-center">
                      {title}
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 p-1 rounded-lg transition-colors duration-200 hover:scale-105 flex-shrink-0"
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
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {/* Content area that can scroll if needed */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};