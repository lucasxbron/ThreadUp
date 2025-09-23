'use client';

import React from 'react';
import { Modal } from './Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return (
          <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" 
               style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
            <svg className="w-6 h-6" style={{ color: 'var(--color-destructive, #ef4444)' }} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" 
               style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
            <svg className="w-6 h-6" style={{ color: 'var(--color-warning, #f59e0b)' }} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" 
               style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <svg className="w-6 h-6" style={{ color: 'var(--color-info, #3b82f6)' }} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        {getIcon()}
        
        <h3 
          className="text-lg font-semibold mb-2"
          style={{ color: 'var(--color-foreground, #0f172a)' }}
        >
          {title}
        </h3>
        
        <p 
          className="text-sm mb-6"
          style={{ color: 'var(--color-muted-foreground, #64748b)' }}
        >
          {message}
        </p>
        
        <div className="flex space-x-3 justify-center">
          {/* Cancel Button - Using Button component like DeleteAccountCard */}
          <button
            onClick={onClose}
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-w-[80px]"
            style={{
              backgroundColor: 'var(--color-secondary, #f1f5f9)',
              color: 'var(--color-secondary-foreground, #1f2937)',
              border: '1px solid var(--color-border, #e2e8f0)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'var(--color-secondary-400, #e2e8f0)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
              }
            }}
          >
            {cancelText}
          </button>

          {/* Confirm Button - Following the pattern from DeleteAccountCard */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-w-[80px]"
            style={{
              backgroundColor: variant === 'danger' ? 'var(--color-destructive, #ef4444)' : 'var(--color-primary, #3b82f6)',
              color: 'white',
              border: `1px solid ${variant === 'danger' ? 'var(--color-destructive, #ef4444)' : 'var(--color-primary, #3b82f6)'}`
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                const hoverColor = variant === 'danger' 
                  ? 'var(--color-destructive-600, #dc2626)' 
                  : 'var(--color-primary-600, #2563eb)';
                e.currentTarget.style.backgroundColor = hoverColor;
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                const normalColor = variant === 'danger' 
                  ? 'var(--color-destructive, #ef4444)' 
                  : 'var(--color-primary, #3b82f6)';
                e.currentTarget.style.backgroundColor = normalColor;
              }
            }}
            onMouseDown={(e) => {
              if (!loading) {
                const activeColor = variant === 'danger' 
                  ? 'var(--color-destructive-700, #b91c1c)' 
                  : 'var(--color-primary-700, #1d4ed8)';
                e.currentTarget.style.backgroundColor = activeColor;
              }
            }}
            onMouseUp={(e) => {
              if (!loading) {
                const hoverColor = variant === 'danger' 
                  ? 'var(--color-destructive-600, #dc2626)' 
                  : 'var(--color-primary-600, #2563eb)';
                e.currentTarget.style.backgroundColor = hoverColor;
              }
            }}
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};