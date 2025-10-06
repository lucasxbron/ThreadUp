'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/types/user.types';
import { AdminBadge } from '@/components/ui/AdminBadge';
import { AdminLogs } from '@/components/admin/AdminLogs';
import { AdminStats } from '@/components/admin/AdminStats';
import { useRouter } from 'next/navigation';

type AdminTab = 'logs' | 'stats' | 'users' | 'settings';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('logs');
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && isAuthenticated && !isAdmin(user)) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main 
          className="flex-1 flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-background, #ffffff)' }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-transparent border-t-blue-600"></div>
        </main>
      </div>
    );
  }

  // Show unauthorized for non-admin users
  if (!isAdmin(user)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main 
          className="flex-1 flex items-center justify-center px-4"
          style={{ backgroundColor: 'var(--color-background, #ffffff)' }}
        >
          <div 
            className="max-w-md w-full text-center p-6 rounded-xl border"
            style={{
              backgroundColor: 'var(--color-card, #ffffff)',
              borderColor: 'var(--color-border, #e2e8f0)'
            }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                   style={{ color: 'var(--color-destructive, #ef4444)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 
              className="text-xl font-bold mb-2"
              style={{ color: 'var(--color-foreground, #0f172a)' }}
            >
              Access Denied
            </h2>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-muted-foreground, #64748b)' }}
            >
              You don't have permission to access the admin panel.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const tabs = [
    { 
      id: 'logs' as AdminTab, 
      label: 'Activity Logs', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'stats' as AdminTab, 
      label: 'Statistics', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    // Future tabs
    // { 
    //   id: 'users' as AdminTab, 
    //   label: 'User Management', 
    //   icon: (
    //     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    //     </svg>
    //   )
    // },
    // { 
    //   id: 'settings' as AdminTab, 
    //   label: 'Settings', 
    //   icon: (
    //     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    //     </svg>
    //   )
    // }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main 
          className="flex-1 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                     style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                       style={{ color: 'var(--color-purple, #a855f7)' }}>
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-foreground, #0f172a)' }}
                  >
                    Admin Panel
                  </h1>
                  <div className="flex items-center space-x-2">
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--color-muted-foreground, #64748b)' }}
                    >
                      Welcome back, {user?.firstName}
                    </p>
                    <AdminBadge />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div 
                className="border-b"
                style={{ borderColor: 'var(--color-border, #e2e8f0)' }}
              >
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id 
                          ? 'border-primary' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      style={{
                        color: activeTab === tab.id 
                          ? 'var(--color-primary, #3b82f6)' 
                          : 'var(--color-muted-foreground, #64748b)',
                        borderBottomColor: activeTab === tab.id 
                          ? 'var(--color-primary, #3b82f6)' 
                          : 'transparent'
                      }}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'logs' && <AdminLogs />}
              {activeTab === 'stats' && <AdminStats />}
              {/* Future tab content */}
              {/* {activeTab === 'users' && <UserManagement />} */}
              {/* {activeTab === 'settings' && <AdminSettings />} */}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}