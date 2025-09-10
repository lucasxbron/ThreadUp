'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
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
        className="fixed inset-0 transition-opacity"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
        onClick={onClose}
      />

      {/* Modal container with consistent positioning */}
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
        {/* Modal panel with theme-aware styling */}
        <div
          className={`w-full ${sizeClasses[size]} relative z-10 transform transition-all`}
          style={{
            marginTop: '4rem', // Account for header height (64px)
            marginBottom: '4rem',
            maxHeight: 'calc(100vh - 8rem)', // Ensure modal doesn't exceed viewport
            overflow: 'auto'
          }}
        >
          <div
            className="bg-white rounded-xl shadow-xl border overflow-hidden"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              borderColor: 'var(--color-border, #e2e8f0)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            {title && (
              <div 
                className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: 'var(--color-border, #e2e8f0)' }}
              >
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: 'var(--color-foreground, #0f172a)' }}
                >
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg transition-colors duration-200 hover:scale-105"
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
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};