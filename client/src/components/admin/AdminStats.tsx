"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/utils/api";

interface AdminStatsResponse {
  totalLogs: number;
  actionStats: Array<{
    _id: string;
    count: number;
  }>;
  adminStats: Array<{
    _id: string;
    count: number;
    admin: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
    };
  }>;
  recentActivity: Array<{
    _id: string;
    count: number;
  }>;
}

export const AdminStats: React.FC = () => {
  const [stats, setStats] = useState<AdminStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.getAdminStats();

      if (response.data) {
        setStats(response.data as AdminStatsResponse);
      } else {
        setError(response.error || "Failed to load admin statistics");
      }
    } catch {
      setError("Failed to load admin statistics");
    } finally {
      setLoading(false);
    }
  };

  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case "DELETE_POST":
        return "Posts Deleted";
      case "DELETE_COMMENT":
        return "Comments Deleted";
      case "MODERATE_CONTENT":
        return "Content Moderated";
      default:
        return action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "DELETE_POST":
        return "var(--color-destructive, #ef4444)";
      case "DELETE_COMMENT":
        return "var(--color-orange, #f97316)";
      case "MODERATE_CONTENT":
        return "var(--color-yellow, #eab308)";
      default:
        return "var(--color-primary, #3b82f6)";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border p-6 animate-pulse"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-lg border p-6 text-center"
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          borderColor: "rgba(239, 68, 68, 0.3)",
          color: "var(--color-destructive, #ef4444)",
        }}
      >
        <p className="text-sm font-medium mb-4">{error}</p>
        <button
          onClick={loadStats}
          className="px-4 py-2 text-sm rounded transition-colors"
          style={{
            backgroundColor: "var(--color-destructive, #ef4444)",
            color: "white",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div
        className="rounded-lg border p-6 text-center"
        style={{
          backgroundColor: "var(--color-card, #ffffff)",
          borderColor: "var(--color-border, #e2e8f0)",
        }}
      >
        <p
          className="text-sm"
          style={{ color: "var(--color-muted-foreground, #64748b)" }}
        >
          No statistics available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="rounded-lg border p-6 text-center"
          style={{
            backgroundColor: "var(--color-card, #ffffff)",
            borderColor: "var(--color-border, #e2e8f0)",
          }}
        >
          <div
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--color-foreground, #0f172a)" }}
          >
            {stats.totalLogs.toLocaleString()}
          </div>
          <div
            className="text-sm"
            style={{ color: "var(--color-muted-foreground, #64748b)" }}
          >
            Total Admin Actions
          </div>
        </div>

        {stats.actionStats.map((action) => (
          <div
            key={action._id}
            className="rounded-lg border p-6 text-center"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: getActionColor(action._id) }}
            >
              {action.count.toLocaleString()}
            </div>
            <div
              className="text-sm"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              {getActionLabel(action._id)}
            </div>
          </div>
        ))}
      </div>

      {/* Admin Activity */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: "var(--color-card, #ffffff)",
          borderColor: "var(--color-border, #e2e8f0)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--color-foreground, #0f172a)" }}
        >
          Admin Activity
        </h3>

        {stats.adminStats.length === 0 ? (
          <p
            className="text-sm text-center py-8"
            style={{ color: "var(--color-muted-foreground, #64748b)" }}
          >
            No admin activity recorded yet
          </p>
        ) : (
          <div className="space-y-4">
            {stats.adminStats.map((admin) => (
              <div
                key={admin._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{
                      backgroundColor: "rgba(168, 85, 247, 0.1)",
                      color: "var(--color-purple, #a855f7)",
                    }}
                  >
                    {admin.admin.firstName.charAt(0)}
                    {admin.admin.lastName.charAt(0)}
                  </div>
                  <div>
                    <div
                      className="font-medium"
                      style={{ color: "var(--color-foreground, #0f172a)" }}
                    >
                      {getFullName(admin.admin.firstName, admin.admin.lastName)}
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      @{admin.admin.username}
                    </div>
                  </div>
                </div>
                <div
                  className="font-semibold"
                  style={{ color: "var(--color-primary, #3b82f6)" }}
                >
                  {admin.count} actions
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity Chart */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: "var(--color-card, #ffffff)",
          borderColor: "var(--color-border, #e2e8f0)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--color-foreground, #0f172a)" }}
        >
          Recent Activity (Last 30 Days)
        </h3>

        {stats.recentActivity.length === 0 ? (
          <p
            className="text-sm text-center py-8"
            style={{ color: "var(--color-muted-foreground, #64748b)" }}
          >
            No recent activity
          </p>
        ) : (
          <div className="space-y-2">
            {stats.recentActivity.map((day) => {
              const maxCount = Math.max(
                ...stats.recentActivity.map((d) => d.count)
              );
              const percentage =
                maxCount > 0 ? (day.count / maxCount) * 100 : 0;

              return (
                <div key={day._id} className="flex items-center space-x-3">
                  <div
                    className="text-xs w-20 text-right"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    {new Date(day._id).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div
                    className="flex-1 h-6 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: "var(--color-primary, #3b82f6)",
                      }}
                    ></div>
                  </div>
                  <div
                    className="text-xs w-8 text-right font-medium"
                    style={{ color: "var(--color-foreground, #0f172a)" }}
                  >
                    {day.count}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
