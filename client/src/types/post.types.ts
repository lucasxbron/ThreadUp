export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  followersCount?: number;
  followingCount?: number;
}

export interface Post {
  _id: string;
  text: string;
  imageUrl?: string;
  authorId: User;
  createdAt: string;
  updatedAt: string;
  liked: boolean;
  likeCount: number;
  following?: boolean;
  commentsCount?: number;
}

export interface Comment {
  _id: string;
  text: string;
  authorId: User;
  postId: string;
  parentCommentId?: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
  liked: boolean;
  likeCount: number;
  edited?: boolean;
  editedAt?: string;
}

export interface CreatePostData {
  text: string;
  image?: File;
}

export interface FollowStatus {
  following: boolean;
  followersCount: number;
  followingCount: number;
  followedAt?: string;
}