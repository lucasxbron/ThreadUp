export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  followersCount?: number;
  followingCount?: number;
  pendingEmail?: string;
  emailChangeToken?: string;
  emailChangeTokenExpiry?: string;
  avatarUrl?: string;
  avatarPublicId?: string;
}

// Helper function to check admin status
export const isAdmin = (user: User | null): boolean => {
  return user?.roles?.includes('ADMIN') ?? false;
};

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
