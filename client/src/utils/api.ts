const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return { data, message: data.message };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Auth endpoints
  async register(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{ token: string; user: any }>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );

    if (response.data?.token && typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token);
    }

    return response;
  }

  async logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    return this.request("/api/auth/logout", { method: "POST" });
  }

  async getProfile() {
    return this.request("/api/auth/profile");
  }

  async updateProfile(data: { username: string }) {
    return this.request("/api/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async verifyEmail(token: string) {
    return this.request(`/api/auth/verify-email?token=${token}`);
  }

  async resendVerification(email: string) {
    return this.request("/api/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  // Posts endpoints
  async getPosts(page = 1, limit = 20) {
    return this.request(`/api/posts?page=${page}&limit=${limit}`);
  }

  async getPost(id: string) {
    return this.request(`/api/posts/${id}`);
  }

  async createPost(formData: FormData) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      const response = await fetch(`${this.baseURL}/api/posts`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      return { data, message: data.message };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async deletePost(id: string) {
    return this.request(`/api/posts/${id}`, { method: "DELETE" });
  }

  // Comments endpoints
  async getComments(postId: string) {
    return this.request(`/api/comments/post/${postId}`);
  }

  async createComment(postId: string, text: string) {
    return this.request(`/api/comments/post/${postId}`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  }

  async deleteComment(id: string) {
    return this.request(`/api/comments/${id}`, { method: "DELETE" });
  }

  // Likes endpoints
  async toggleLike(postId: string) {
    return this.request(`/api/likes/post/${postId}`, { method: "POST" });
  }

  async getLikeStatus(postId: string) {
    return this.request(`/api/likes/post/${postId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
