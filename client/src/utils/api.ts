interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    // this.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL || "https://threadup-server.onrender.com";
  }

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        credentials: "include",
        ...options,
      };

      // Remove Content-Type for FormData requests
      if (options.body instanceof FormData) {
        const { "Content-Type": _, ...headersWithoutContentType } =
          config.headers as Record<string, string>;
        config.headers = headersWithoutContentType;
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      if (response.ok) {
        const data = await response.json();
        return { data };
      } else {
        const errorData = await response.json().catch(() => ({}));
        return {
          error:
            errorData.message ||
            `Request failed with status ${response.status}`,
        };
      }
    } catch (error) {
      console.error("API request failed:", error);
      return { error: "Network error occurred" };
    }
  }

  // Auth endpoints
  async login(data: { email: string; password: string }) {
    return this.makeRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async register(data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }) {
    return this.makeRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout() {
    const response = await this.makeRequest("/api/auth/logout", {
      method: "POST",
    });

    // Always clear local token regardless of response
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    return response;
  }

  async getProfile() {
    return this.makeRequest("/api/auth/profile");
  }

  async updateProfile(data: {
    firstName?: string;
    lastName?: string;
    username?: string;
  }) {
    return this.makeRequest("/api/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async verifyEmail(token: string) {
    return this.makeRequest(`/api/auth/verify-email?token=${token}`);
  }

  async resendVerification(email: string) {
    return this.makeRequest("/api/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  // Post endpoints
  async getPosts(page: number = 1, limit: number = 20) {
    return this.makeRequest(`/api/posts?page=${page}&limit=${limit}`);
  }

  async getPostById(id: string) {
    return this.makeRequest(`/api/posts/${id}`);
  }

  async createPost(formData: FormData) {
    return this.makeRequest("/api/posts", {
      method: "POST",
      body: formData,
    });
  }

  async deletePost(id: string) {
    return this.makeRequest(`/api/posts/${id}`, {
      method: "DELETE",
    });
  }

  // Get post likes with user details
  async getPostLikes(postId: string) {
    return this.makeRequest(`/api/posts/${postId}/likes`);
  }

  // Comment endpoints
  async getComments(postId: string) {
    return this.makeRequest(`/api/comments/post/${postId}`);
  }

  async createComment(postId: string, text: string, parentCommentId?: string) {
    const body: any = { text };
    if (parentCommentId) {
      body.parentCommentId = parentCommentId;
    }

    return this.makeRequest(`/api/comments/post/${postId}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async updateComment(commentId: string, text: string) {
    return this.makeRequest(`/api/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }

  async deleteComment(id: string) {
    return this.makeRequest(`/api/comments/${id}`, {
      method: "DELETE",
    });
  }

  // Post like endpoints
  async toggleLike(postId: string) {
    return this.makeRequest(`/api/likes/post/${postId}`, {
      method: "POST",
    });
  }

  async getLikeStatus(postId: string) {
    return this.makeRequest(`/api/likes/post/${postId}`);
  }

  // Get users who liked a post
  async getPostLikers(postId: string) {
    return this.makeRequest(`/api/likes/post/${postId}/users`);
  }

  // Comment like endpoints
  async toggleCommentLike(commentId: string) {
    return this.makeRequest(`/api/comment-likes/comment/${commentId}`, {
      method: "POST",
    });
  }

  async getCommentLikeStatus(commentId: string) {
    return this.makeRequest(`/api/comment-likes/comment/${commentId}`);
  }

  // Get users who liked a comment
  async getCommentLikers(commentId: string) {
    return this.makeRequest(`/api/comment-likes/comment/${commentId}/users`);
  }

  // Follow endpoints
  async toggleFollow(userId: string) {
    return this.makeRequest(`/api/follows/user/${userId}`, {
      method: "POST",
    });
  }

  async getFollowStatus(userId: string) {
    return this.makeRequest(`/api/follows/user/${userId}/status`);
  }

  async getFollowers(userId: string, page: number = 1, limit: number = 20) {
    return this.makeRequest(
      `/api/follows/user/${userId}/followers?page=${page}&limit=${limit}`
    );
  }

  async getFollowing(userId: string, page: number = 1, limit: number = 20) {
    return this.makeRequest(
      `/api/follows/user/${userId}/following?page=${page}&limit=${limit}`
    );
  }

  async getUserPosts(userId: string, page: number = 1, limit: number = 20) {
    return this.makeRequest(
      `/api/posts/user/${userId}?page=${page}&limit=${limit}`
    );
  }

  async getSuggestions(limit: number = 5) {
    return this.makeRequest(`/api/follows/suggestions?limit=${limit}`);
  }

  async getFilteredPosts(
    filter: string = "recent",
    page: number = 1,
    limit: number = 20
  ) {
    return this.makeRequest(
      `/api/posts/feed?filter=${filter}&page=${page}&limit=${limit}`
    );
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.makeRequest("/api/auth/change-password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteAccount(password: string) {
    const response = await this.makeRequest("/api/auth/delete-account", {
      method: "DELETE",
      body: JSON.stringify({ password }),
    });

    // Always clear local token after delete attempt
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    return response;
  }

  async requestEmailChange(data: { newEmail: string; password: string }) {
    return this.makeRequest("/api/auth/request-email-change", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async verifyEmailChange(token: string) {
    return this.makeRequest(`/api/auth/verify-email-change?token=${token}`);
  }

  async cancelEmailChange() {
    return this.makeRequest("/api/auth/cancel-email-change", {
      method: "POST",
    });
  }

  async forgotPassword(data: { email: string }) {
    return this.makeRequest("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: { token: string; newPassword: string }) {
    return this.makeRequest("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Upload endpoints
  async uploadFile(
    formData: FormData,
    type: "profile" | "post" | "general" = "general"
  ) {
    formData.append("type", type);
    return this.makeRequest("/api/upload", {
      method: "POST",
      body: formData,
    });
  }

  async uploadAvatar(formData: FormData) {
    formData.append("type", "profile");
    return this.makeRequest("/api/upload", {
      method: "POST",
      body: formData,
    });
  }

  async updateUserAvatar(avatarUrl: string, avatarPublicId: string) {
    return this.makeRequest("/api/auth/profile", {
      method: "PUT",
      body: JSON.stringify({
        avatarUrl,
        avatarPublicId,
      }),
    });
  }

  async deleteAvatar() {
    return this.makeRequest("/api/auth/profile", {
      method: "PUT",
      body: JSON.stringify({
        avatarUrl: null,
        avatarPublicId: null,
      }),
    });
  }

  async submitContactForm(data: {
    name: string;
    email: string;
    subject: string;
    customSubject?: string;
    message: string;
  }) {
    return this.makeRequest("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Admin endpoints
  async getAdminLogs(
    page: number = 1,
    limit: number = 50,
    filters?: {
      action?: string;
      adminId?: string;
      targetType?: string;
    }
  ) {
    let url = `/api/admin/logs?page=${page}&limit=${limit}`;

    if (filters?.action) url += `&action=${filters.action}`;
    if (filters?.adminId) url += `&adminId=${filters.adminId}`;
    if (filters?.targetType) url += `&targetType=${filters.targetType}`;

    return this.makeRequest(url);
  }

  async getAdminStats() {
    return this.makeRequest("/api/admin/stats");
  }
}

export const apiClient = new ApiClient();
