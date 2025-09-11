export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface Post {
  _id: string;
  text: string;
  imageUrl?: string;
  authorId: User;
  createdAt: string;
  updatedAt: string;
  liked?: boolean;
  likeCount: number;
}

export interface Comment {
  _id: string;
  text: string;
  authorId: User;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  text: string;
  image?: File;
}