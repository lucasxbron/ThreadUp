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
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (
    updateData: { firstName?: string; lastName?: string; username?: string }
  ) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

interface LoginResponse {
  token: string;
  user: User;
  message?: string;
}

interface ProfileResponse {
  user: User;
}

interface RegisterResponse {
  message: string;
  user?: User;
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

  // Initialize authentication on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        
        if (token) {
          // ✅ Validate token by checking profile
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
              return; // ✅ Early return on success
            }
          }
          
          // ✅ If profile fetch fails, token is invalid
          console.log("Token validation failed, clearing stored token");
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
          }
        }
        
        // ✅ No token or invalid token
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        });
        
      } catch (error) {
        console.error("Auth initialization error:", error);
        
        // ✅ Clear invalid token on any error
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        
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
    try {
      const response = await apiClient.login({ email, password });
      
      if (response.data) {
        const loginData = response.data as LoginResponse;
        
        // ✅ Store token immediately in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("token", loginData.token);
        }
        
        setAuthState({
          user: loginData.user,
          token: loginData.token,
          isLoading: false,
          isAuthenticated: true,
        });
        
        return { success: true };
      }
      
      return { 
        success: false, 
        error: response.error || "Login failed" 
      };
      
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: "Network error occurred during login" 
      };
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await apiClient.register({ 
        firstName, 
        lastName, 
        username, 
        email, 
        password 
      });
      
      if (response.data || response.message) {
        return { success: true };
      }
      
      return { 
        success: false, 
        error: response.error || "Registration failed" 
      };
      
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        error: "Network error occurred during registration" 
      };
    }
  };

  const logout = async () => {
    try {
      // ✅ Call logout API to clear server-side session/cookies
      await apiClient.logout();
    } catch (error) {
      console.error("Logout API error:", error);
      // ✅ Continue with logout even if API call fails
    } finally {
      // ✅ Always clear local state regardless of API response
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const updateProfile = async (updateData: { 
    firstName?: string; 
    lastName?: string; 
    username?: string 
  }) => {
    try {
      const response = await apiClient.updateProfile(updateData);
      
      if (response.data) {
        const profileData = response.data as ProfileResponse;
        
        setAuthState((prev) => ({
          ...prev,
          user: profileData.user,
        }));
        
        return { success: true };
      }
      
      return { 
        success: false, 
        error: response.error || "Profile update failed" 
      };
      
    } catch (error) {
      console.error("Profile update error:", error);
      return { 
        success: false, 
        error: "Network error occurred during profile update" 
      };
    }
  };

  const refreshProfile = async () => {
    try {
      if (authState.isAuthenticated && authState.token) {
        const response = await apiClient.getProfile();
        
        if (response.data) {
          const profileData = response.data as ProfileResponse;
          
          setAuthState((prev) => ({
            ...prev,
            user: profileData.user,
          }));
        } else {
          // ✅ If profile refresh fails, token might be invalid
          console.log("Profile refresh failed, token might be invalid");
          
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
          }
          
          setAuthState({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      }
    } catch (error) {
      console.error("Profile refresh error:", error);
      
      // ✅ On error, check if it's an auth error (401)
      if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        });
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