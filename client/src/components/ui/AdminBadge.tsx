import React from 'react';

interface AdminBadgeProps {
  className?: string;
}

export const AdminBadge: React.FC<AdminBadgeProps> = ({ className = "" }) => {
  return (
    <span 
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}
      style={{
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        color: 'var(--color-purple, #a855f7)',
        border: '1px solid rgba(168, 85, 247, 0.3)'
      }}
    >
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Admin
    </span>
  );
};