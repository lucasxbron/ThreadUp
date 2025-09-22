'use client';

import React from 'react';

export type FeedFilterType = 'recent' | 'trending' | 'following';

interface FeedFilterProps {
  activeFilter: FeedFilterType;
  onFilterChange: (filter: FeedFilterType) => void;
}

export const FeedFilter: React.FC<FeedFilterProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: 'recent' as FeedFilterType, label: 'Recent', icon: 'clock' },
    { key: 'trending' as FeedFilterType, label: 'Trending', icon: 'trending' },
    { key: 'following' as FeedFilterType, label: 'Following', icon: 'users' }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'clock':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'trending':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'users':
        return (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 9v6M23 12h-6" />
            </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="rounded-xl shadow-sm border p-4 mb-4 sm:mb-6"
      style={{
        backgroundColor: 'var(--color-card, #ffffff)',
        borderColor: 'var(--color-border, #e2e8f0)'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 
          className="font-semibold text-lg"
          style={{ color: 'var(--color-card-foreground, #0f172a)' }}
        >
          Feed
        </h3>
        <div className="flex items-center space-x-1">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`flex items-center sm:space-x-2 px-6 sm:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                activeFilter === filter.key
                  ? 'shadow-sm'
                  : 'hover:shadow-sm'
              }`}
              style={{
                backgroundColor: activeFilter === filter.key 
                  ? 'var(--color-primary, #3b82f6)' 
                  : 'var(--color-secondary, #f1f5f9)',
                color: activeFilter === filter.key 
                  ? 'white' 
                  : 'var(--color-secondary-foreground, #1f2937)',
                border: activeFilter === filter.key 
                  ? 'none' 
                  : '1px solid var(--color-border, #e2e8f0)'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter.key) {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary-400, #e2e8f0)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== filter.key) {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                }
              }}
            >
              {getIcon(filter.icon)}
              <span className="hidden sm:inline">{filter.label}</span>
              {/* <span className="sm:hidden">{filter.label.charAt(0)}</span> */}
            </button>
          ))}
        </div>
      </div>
      
      {/* Filter description */}
      <p 
        className="text-xs sm:text-sm"
        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
      >
        {activeFilter === 'recent' && 'Showing the most recent posts from all users'}
        {activeFilter === 'trending' && 'Showing the most liked and commented posts'}
        {activeFilter === 'following' && 'Showing posts from users you follow'}
      </p>
    </div>
  );
};