interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006';
  }

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        credentials: 'include',
        ...options,
      };

      // Remove Content-Type for FormData requests
      if (options.body instanceof FormData) {
        delete (config.headers as any)['Content-Type'];
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (response.ok) {
        const data = await response.json();
        
        // Store token if it's in the response
        if (data.token && typeof window !== 'undefined') {
          localStorage.setItem('token', data.token);
        }
        
        return { data };
      } else {
        const errorData = await response.json();
        return { error: errorData.message || 'Request failed' };
      }
    } catch (error) {
      console.error('API request failed:', error);
      return { error: 'Network error occurred' };
    }
  }

  // Auth endpoints
  async login(data: { email: string; password: string }) {
    return this.makeRequest('/api/auth/login', {
      method: 'POST',
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
    return this.makeRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    const response = await this.makeRequest('/api/auth/logout', {
      method: 'POST',
    });
    
    // Always clear local token regardless of response
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    
    return response;
  }

  async getProfile() {
    return this.makeRequest('/api/auth/profile');
  }

  async updateProfile(data: { firstName?: string; lastName?: string; username?: string }) {
    return this.makeRequest('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async verifyEmail(token: string) {
    return this.makeRequest(`/api/auth/verify-email?token=${token}`);
  }

  async resendVerification(email: string) {
    return this.makeRequest('/api/auth/resend-verification', {
      method: 'POST',
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
    return this.makeRequest('/api/posts', {
      method: 'POST',
      body: formData,
    });
  }

  async deletePost(id: string) {
    return this.makeRequest(`/api/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Comment endpoints
  async getComments(postId: string) {
    return this.makeRequest(`/api/comments/post/${postId}`);
  }

  async createComment(postId: string, text: string) {
    return this.makeRequest(`/api/comments/post/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  async deleteComment(id: string) {
    return this.makeRequest(`/api/comments/${id}`, {
      method: 'DELETE',
    });
  }

  // Like endpoints
  async toggleLike(postId: string) {
    return this.makeRequest(`/api/likes/post/${postId}`, {
      method: 'POST',
    });
  }

  async getLikeStatus(postId: string) {
    return this.makeRequest(`/api/likes/post/${postId}`);
  }

  // Upload endpoints
  async uploadFile(formData: FormData, type: 'profile' | 'post' | 'general' = 'general') {
    formData.append('type', type);
    return this.makeRequest('/api/upload', {
      method: 'POST',
      body: formData,
    });
  }
}

export const apiClient = new ApiClient();