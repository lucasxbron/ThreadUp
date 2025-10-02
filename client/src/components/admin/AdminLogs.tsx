'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/utils/api';
import { AdminBadge } from '@/components/ui/AdminBadge';

interface AdminLog {
  _id: string;
  adminId: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
  action: 'DELETE_POST' | 'DELETE_COMMENT' | 'MODERATE_CONTENT';
  targetType: 'POST' | 'COMMENT';
  targetId: string;
  targetAuthorId: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
  details: {
    postText?: string;
    commentText?: string;
    imageUrl?: string;
  };
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminLogsResponse {
  logs: AdminLog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalLogs: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    action?: string;
    adminId?: string;
    targetType?: string;
  };
}

export const AdminLogs: React.FC = () => {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    action: '',
    targetType: '',
  });

  const LOGS_PER_PAGE = 20;

  useEffect(() => {
    loadLogs();
  }, [currentPage, filters]);

  const loadLogs = async () => {
    setLoading(true);
    setError('');

    try {
      const filterParams = {
        ...(filters.action && { action: filters.action }),
        ...(filters.targetType && { targetType: filters.targetType }),
      };

      const response = await apiClient.getAdminLogs(currentPage, LOGS_PER_PAGE, filterParams);

      if (response.data) {
        const logsData = response.data as AdminLogsResponse;
        setLogs(logsData.logs);
        setTotalPages(logsData.pagination.totalPages);
        setTotalLogs(logsData.pagination.totalLogs);
        setHasNext(logsData.pagination.hasNext);
        setHasPrev(logsData.pagination.hasPrev);
      } else {
        setError(response.error || 'Failed to load admin logs');
      }
    } catch (err) {
      setError('Failed to load admin logs');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({ action: '', targetType: '' });
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'DELETE_POST':
        return 'var(--color-destructive, #ef4444)';
      case 'DELETE_COMMENT':
        return 'var(--color-orange, #f97316)';
      case 'MODERATE_CONTENT':
        return 'var(--color-yellow, #eab308)';
      default:
        return 'var(--color-muted-foreground, #64748b)';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'DELETE_POST':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      case 'DELETE_COMMENT':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'MODERATE_CONTENT':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading && logs.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="rounded-lg border p-4 animate-pulse"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              borderColor: 'var(--color-border, #e2e8f0)'
            }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded bg-gray-300"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div 
        className="rounded-lg border p-4"
        style={{
          backgroundColor: 'var(--color-card, #ffffff)',
          borderColor: 'var(--color-border, #e2e8f0)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 
              className="text-lg font-semibold"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Admin Activity Logs
            </h2>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Track all administrative actions and content moderation
            </p>
          </div>
          <div className="text-right">
            <div 
              className="text-2xl font-bold"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              {totalLogs.toLocaleString()}
            </div>
            <div 
              className="text-xs"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              Total Actions
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div 
        className="rounded-lg border p-4"
        style={{
          backgroundColor: 'var(--color-card, #ffffff)',
          borderColor: 'var(--color-border, #e2e8f0)'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Action Filter */}
            <div>
              <label 
                className="block text-xs font-medium mb-1"
                style={{ color: 'var(--color-foreground, #0f172a)' }}
              >
                Action
              </label>
              <select
                value={filters.action}
                onChange={(e) => handleFilterChange('action', e.target.value)}
                className="px-3 py-2 rounded border text-sm"
                style={{
                  backgroundColor: 'var(--color-card, #ffffff)',
                  borderColor: 'var(--color-border, #e2e8f0)',
                  color: 'var(--color-foreground, #0f172a)'
                }}
              >
                <option value="">All Actions</option>
                <option value="DELETE_POST">Delete Post</option>
                <option value="DELETE_COMMENT">Delete Comment</option>
                <option value="MODERATE_CONTENT">Moderate Content</option>
              </select>
            </div>

            {/* Target Type Filter */}
            <div>
              <label 
                className="block text-xs font-medium mb-1"
                style={{ color: 'var(--color-foreground, #0f172a)' }}
              >
                Target Type
              </label>
              <select
                value={filters.targetType}
                onChange={(e) => handleFilterChange('targetType', e.target.value)}
                className="px-3 py-2 rounded border text-sm"
                style={{
                  backgroundColor: 'var(--color-card, #ffffff)',
                  borderColor: 'var(--color-border, #e2e8f0)',
                  color: 'var(--color-foreground, #0f172a)'
                }}
              >
                <option value="">All Types</option>
                <option value="POST">Posts</option>
                <option value="COMMENT">Comments</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(filters.action || filters.targetType) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm rounded border transition-colors"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'var(--color-border, #e2e8f0)',
                color: 'var(--color-muted-foreground, #64748b)'
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div 
          className="rounded-lg border p-4 text-center"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
            color: 'var(--color-destructive, #ef4444)'
          }}
        >
          <p className="text-sm font-medium">{error}</p>
          <button
            onClick={loadLogs}
            className="mt-2 px-4 py-2 text-sm rounded transition-colors"
            style={{
              backgroundColor: 'var(--color-destructive, #ef4444)',
              color: 'white'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Logs List */}
      {logs.length === 0 && !loading ? (
        <div 
          className="rounded-lg border p-8 text-center"
          style={{
            backgroundColor: 'var(--color-card, #ffffff)',
            borderColor: 'var(--color-border, #e2e8f0)'
          }}
        >
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               style={{ color: 'var(--color-muted-foreground, #64748b)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 
            className="text-lg font-medium mb-2"
            style={{ color: 'var(--color-foreground, #0f172a)' }}
          >
            No logs found
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
          >
            {(filters.action || filters.targetType) 
              ? 'No admin actions match your current filters.'
              : 'No admin actions have been logged yet.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div 
              key={log._id}
              className="rounded-lg border p-4 hover:shadow-sm transition-shadow"
              style={{
                backgroundColor: 'var(--color-card, #ffffff)',
                borderColor: 'var(--color-border, #e2e8f0)'
              }}
            >
              <div className="flex items-start space-x-4">
                {/* Action Icon */}
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: `${getActionColor(log.action)}20`,
                    color: getActionColor(log.action)
                  }}
                >
                  {getActionIcon(log.action)}
                </div>

                {/* Log Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span 
                      className="font-medium"
                      style={{ color: 'var(--color-foreground, #0f172a)' }}
                    >
                      {getFullName(log.adminId.firstName, log.adminId.lastName)}
                    </span>
                    <AdminBadge className="scale-75" />
                    <span 
                      className="text-sm"
                      style={{ color: getActionColor(log.action) }}
                    >
                      {log.action.replace('_', ' ').toLowerCase()}
                    </span>
                  </div>

                  <div 
                    className="text-sm mb-2"
                    style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                  >
                    {log.targetType === 'POST' ? 'post' : 'comment'} by{' '}
                    <span className="font-medium">
                      {getFullName(log.targetAuthorId.firstName, log.targetAuthorId.lastName)}
                    </span>
                    {' '}(@{log.targetAuthorId.username})
                  </div>

                  {/* Content Preview */}
                  {(log.details.postText || log.details.commentText) && (
                    <div 
                      className="text-sm p-2 rounded border-l-4 mb-2"
                      style={{
                        backgroundColor: 'var(--color-muted, #f1f5f9)',
                        borderLeftColor: getActionColor(log.action)
                      }}
                    >
                      <p 
                        className="truncate"
                        style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                      >
                        "{log.details.postText || log.details.commentText}"
                      </p>
                    </div>
                  )}

                  <div 
                    className="text-xs flex items-center space-x-4"
                    style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                  >
                    <span>{formatDate(log.createdAt)}</span>
                    {log.ipAddress && (
                      <span>IP: {log.ipAddress}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div 
            className="text-sm"
            style={{ color: 'var(--color-muted-foreground, #64748b)' }}
          >
            Showing {((currentPage - 1) * LOGS_PER_PAGE) + 1} to {Math.min(currentPage * LOGS_PER_PAGE, totalLogs)} of {totalLogs} logs
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!hasPrev || loading}
              className="px-3 py-2 text-sm rounded border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--color-card, #ffffff)',
                borderColor: 'var(--color-border, #e2e8f0)',
                color: 'var(--color-foreground, #0f172a)'
              }}
            >
              Previous
            </button>

            <span 
              className="px-3 py-2 text-sm"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={!hasNext || loading}
              className="px-3 py-2 text-sm rounded border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--color-card, #ffffff)',
                borderColor: 'var(--color-border, #e2e8f0)',
                color: 'var(--color-foreground, #0f172a)'
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};