export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Post {
  _id: string;
  text: string;
  imageUrl?: string;
  authorId: User; // ← This should be a User object, not just string
  createdAt: string;
  updatedAt: string;
  liked?: boolean;
  likeCount: number;
}

export interface Comment {
  _id: string;
  text: string;
  authorId: User; // ← This should be a User object, not just string
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  text: string;
  image?: File;
}