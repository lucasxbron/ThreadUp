"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "@/utils/api";
import { User, AuthState } from "@/types/user.types";

interface AuthContextType extends AuthState {
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (
    username: string
  ) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface ProfileResponse {
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const initAuth = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        const response = await apiClient.getProfile();
        if (response.data) {
          const profileData = response.data as ProfileResponse;
          if (profileData.user) {
            setAuthState({
              user: profileData.user,
              token,
              isLoading: false,
              isAuthenticated: true,
            });
          } else {
            localStorage.removeItem("token");
            setAuthState({
              user: null,
              token: null,
              isLoading: false,
              isAuthenticated: false,
            });
          }
        } else {
          localStorage.removeItem("token");
          setAuthState({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiClient.login({ email, password });
    if (response.data) {
      const loginData = response.data as LoginResponse;
      setAuthState({
        user: loginData.user,
        token: loginData.token,
        isLoading: false,
        isAuthenticated: true,
      });
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const response = await apiClient.register({ username, email, password });
    if (response.data || response.message) {
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  const logout = async () => {
    await apiClient.logout();
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateProfile = async (username: string) => {
    const response = await apiClient.updateProfile({ username });
    if (response.data) {
      const profileData = response.data as ProfileResponse;
      setAuthState((prev) => ({
        ...prev,
        user: profileData.user,
      }));
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  const refreshProfile = async () => {
    if (authState.isAuthenticated) {
      const response = await apiClient.getProfile();
      if (response.data) {
        const profileData = response.data as ProfileResponse;
        setAuthState((prev) => ({
          ...prev,
          user: profileData.user,
        }));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};