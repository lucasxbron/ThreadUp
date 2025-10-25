# ThreadUp Client Application

![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, responsive social media platform frontend built with Next.js 15, featuring user interactions, dynamic theming, and user management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
- [Components Overview](#components-overview)
- [Context Providers](#context-providers)
- [Routing & Pages](#routing--pages)
- [Styling & Theming](#styling--theming)
- [API Integration](#api-integration)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Environment Variables](#environment-variables)

---

## Features

### User Experience

- **Dynamic Theme System** - Light/Dark mode with system preference detection
- **Fully Responsive** - Mobile-first design optimized for all devices
- **Real-time Updates** - Instant UI updates for likes, comments, and follows
- **Image Management** - Advanced cropping, preview, and upload system
- **Toast Notifications** - Non-intrusive success/error feedback
- **Modal System** - Accessible, keyboard-navigable modals
- **Emoji Support** - Built-in emoji picker for posts and comments

### Authentication & Security

- **JWT Authentication** - Secure HTTP-only cookie-based sessions
- **Email Verification** - Complete email verification workflow
- **Password Management** - Forgot/reset/change password flows
- **Email Change** - Secure email change with verification
- **Role-Based Access** - Admin privileges and permissions system
- **Protected Routes** - Client-side route protection

### Social Features

- **Post Management** - Create, view, delete posts with images
- **Comment System** - Nested comments with replies and editing
- **Like System** - Like posts and comments with real-time counts
- **Follow System** - Follow/unfollow users with suggestions
- **User Profiles** - Comprehensive profile pages with statistics
- **Feed Filtering** - View recent, trending, or following posts
- **Smart Suggestions** - Dynamic user recommendations

### Content Management

- **File Upload** - Cloudinary integration for image hosting
- **Image Cropping** - Advanced drag-and-resize cropping tool
- **Image Modal** - Full-screen image viewing
- **Content Deletion** - Admin content moderation tools
- **Edit Comments** - Edit and update comment text
- **Deep Linking** - Direct links to posts and profiles

### Admin Features

- **Admin Dashboard** - Platform statistics and analytics
- **Activity Logs** - Comprehensive audit trail of admin actions
- **Admin Badge** - Visual indicator for admin users
- **Bulk Actions** - Efficient content moderation tools

---

## Tech Stack

### Core Framework

- **Next.js 15.5** - React framework with App Router
- **React 19.1** - Latest React with Server Components
- **TypeScript 5.0** - Type-safe development

### Styling & UI

- **Tailwind CSS 4.1** - Utility-first CSS framework
- **CSS Variables** - Dynamic theming support
- **PostCSS** - CSS processing and optimization

### State Management

- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic patterns

### API & Data

- **Fetch API** - RESTful API communication
- **JWT Tokens** - Secure authentication
- **Cloudinary** - Image hosting and optimization

### Development Tools

- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **Next.js Dev Server** - Hot module replacement

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend server running (see `../server/README.md`)

### Installation

1. **Clone the repository:**

   ```bash
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.local.example .env.local
   ```

4. **Edit `.env.local`:**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3005
   ```

5. **Configure API endpoint:**

   The client automatically connects to `http://localhost:3005` by default.

   To override, set in `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3005
   ```

   **For production deployment:**
   Set the environment variable in your hosting platform:

   ```env
   NEXT_PUBLIC_API_URL=https://your-production-api.com
   ```

   The fallback in `src/utils/api.ts` ensures local development works without configuration.

6. **Start development server:**

   ```bash
   npm run dev
   ```

7. **Open browser:**
   ```
   http://localhost:3000
   ```

**Note:** Make sure your backend server is running on `http://localhost:3005` before starting the frontend. See `../server/README.md` for backend setup instructions.

---

## Project Structure

```
client/
├── public/                                 # Static assets
│   ├── manifest.json                       # PWA manifest
│   ├── threadup_icon_black.svg             # Logo (black)
│   ├── threadup_icon_gradient.svg          # Logo (gradient)
│   ├── threadup_icon_gradient_16x16.ico    # Favicon (16x16)
│   ├── threadup_icon_gradient_32x32.ico    # Favicon (32x32)
│   └── avatars/                            # Avatar images
│       └── developers/                     # Team member avatars
│           ├── lucas_bron_avatar.png
│           ├── lucas_bron_avatar_512x512.webp
│           ├── marcus_stoeppler_avatar.png
│           ├── marcus_stoeppler_avatar_512x512.webp
│           ├── sophie_kock_avatar.png
│           └── sophie_kock_avatar_512x512.webp
├── src/
│   ├── app/                                # Next.js App Router
│   │   ├── (auth)/                         # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   ├── verify-email/
│   │   │   │   └── page.tsx
│   │   │   └── verify-email-change/
│   │   │       └── page.tsx
│   │   ├── (community)/                    # Community route group
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── guidelines/
│   │   │   │   └── page.tsx
│   │   │   ├── help/
│   │   │   │   └── page.tsx
│   │   │   └── safety/
│   │   │       └── page.tsx
│   │   ├── (company)/                      # Company route group
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── developers/
│   │   │   │   └── page.tsx
│   │   │   ├── team/
│   │   │   │   └── page.tsx
│   │   │   └── updates/
│   │   │       └── page.tsx
│   │   ├── (legal)/                        # Legal route group
│   │   │   ├── terms/
│   │   │   │   └── page.tsx
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx
│   │   │   ├── cookies/
│   │   │   │   └── page.tsx
│   │   │   └── dmca/
│   │   │       └── page.tsx
│   │   ├── admin/                          # Admin dashboard
│   │   │   └── page.tsx
│   │   ├── coming-soon/                    # Coming soon page
│   │   │   └── page.tsx
│   │   ├── profile/                        # User profile
│   │   │   └── page.tsx
│   │   ├── post/                           # Individual post
│   │   │   └── page.tsx
│   │   ├── layout.tsx                      # Root layout
│   │   ├── page.tsx                        # Home (feed)
│   │   └── globals.css                     # Global styles
│   ├── components/                         # React components
│   │   ├── admin/                          # Admin components
│   │   │   ├── AdminLogs.tsx
│   │   │   └── AdminStats.tsx
│   │   ├── auth/                           # Auth components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── layout/                         # Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── posts/                          # Post components
│   │   │   ├── CommentSection.tsx
│   │   │   ├── CreatePost.tsx
│   │   │   ├── CreatePostModal.tsx
│   │   │   ├── FeedFilter.tsx
│   │   │   ├── PostCard.tsx
│   │   │   └── PostFeed.tsx
│   │   ├── profile/                        # Profile components
│   │   │   ├── AllFollowsModal.tsx
│   │   │   ├── AllSuggestionsModal.tsx
│   │   │   ├── AvatarUploadCard.tsx
│   │   │   ├── DeleteAccountCard.tsx
│   │   │   ├── EmailChangeCard.tsx
│   │   │   ├── FollowersCard.tsx
│   │   │   ├── PasswordChangeCard.tsx
│   │   │   ├── ProfileCard.tsx
│   │   │   └── SuggestionsCard.tsx
│   │   └── ui/                             # UI components
│   │       ├── AdminBadge.tsx
│   │       ├── Avatar.tsx
│   │       ├── Button.tsx
│   │       ├── ConfirmationModal.tsx
│   │       ├── EmojiPicker.tsx
│   │       ├── ImageCropper.tsx
│   │       ├── ImageModal.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── NoSSR.tsx
│   │       ├── PasswordInput.tsx
│   │       ├── Textarea.tsx
│   │       └── Toast.tsx
│   ├── contexts/                           # Context providers
│   │   ├── AuthContext.tsx                 # Authentication state
│   │   ├── FollowContext.tsx               # Follow/unfollow state
│   │   ├── ThemeContext.tsx                # Dark/light theme
│   │   └── ToastContext.tsx                # Toast notifications
│   ├── types/                              # TypeScript types
│   │   ├── user.types.ts                   # User interfaces
│   │   └── post.types.ts                   # Post interfaces
│   ├── utils/                              # Utilities
│   │   └── api.ts                          # API client (Fetch)
│   └── data/                               # Static data
│       └── emojiData.ts                    # Emoji picker data
├── package.json                            # Dependencies
├── tsconfig.json                           # TypeScript config
├── next.config.ts                          # Next.js config
├── tailwind.config.js                      # Tailwind config
├── postcss.config.mjs                      # PostCSS config
├── eslint.config.mjs                       # ESLint config
└── README.md                               # Documentation
```

---

## Core Features

### 1. Authentication System

#### Registration Flow

```typescript
// User registers with email verification
POST /api/auth/register
{
  firstName, lastName, username, email, password
}
→ Email sent with verification token
→ User verifies via link
→ Account activated
```

**Components:**

- `src/app/(auth)/register/page.tsx` - Registration form
- `src/app/(auth)/verify-email/page.tsx` - Email verification handler
- `src/app/(auth)/login/page.tsx` - Login form

**Features:**

- Real-time validation
- Password strength indicators
- Duplicate email/username detection
- Email verification required
- Secure password hashing (server-side)

#### Password Management

```typescript
// Forgot password flow
POST /api/auth/forgot-password
→ Email with reset token
→ User clicks link
→ Reset password page
POST /api/auth/reset-password
→ Password updated
```

**Pages:**

- `forgot-password/` - Request reset link
- `reset-password/` - Set new password
- `profile/` - Change password (authenticated)

#### Email Change Flow

```typescript
// Authenticated email change
POST /api/auth/request-email-change
{ newEmail, password }
→ Verification email sent to new address
→ User clicks verification link
GET /api/auth/verify-email-change?token=xxx
→ Email updated
→ Profile refreshed
```

**Components:**

- `EmailChangeCard.tsx` - Request email change
- `verify-email-change/page.tsx` - Verification handler

---

### 2. Post System

#### Creating Posts

```typescript
// Text-only post
POST /api/posts
{ text: "Hello World!" }

// Post with image
POST /api/posts (multipart/form-data)
{ text: "Check this out!", image: File }
```

**Components:**

- `CreatePost.tsx` - Main feed post creator
- `CreatePostModal.tsx` - Header modal post creator
- `PostCard.tsx` - Individual post display
- `PostFeed.tsx` - Feed with pagination

**Features:**

- 500 character limit
- Image upload with preview
- Emoji picker integration
- Image cropping before upload
- Real-time character count
- Rich text display with hashtags

#### Viewing Posts

```typescript
// Get filtered feed
GET /api/posts/feed?filter=recent&page=1&limit=15

Filters:
- recent: Latest posts from all users
- trending: Most liked and commented posts
- following: Posts from followed users only
```

**Components:**

- `FeedFilter.tsx` - Filter selector
- `PostFeed.tsx` - Main feed component

**Features:**

- Infinite scroll pagination
- Pull-to-refresh
- Deep linking to posts
- View counts
- Like/comment counts

#### Post Interactions

```typescript
// Like post
POST /api/likes/post/:postId
→ Toggles like (add/remove)
→ Updates count

// View likes
GET /api/likes/post/:postId/users
→ Returns array of users who liked
```

**Features:**

- Instant UI feedback
- Real-time count updates
- View who liked
- Optimistic updates

---

### 3. Comment System

#### Comment Structure

```typescript
interface Comment {
  _id: string;
  postId: string;
  authorId: User;
  text: string;
  parentCommentId?: string; // For replies
  likeCount: number;
  liked?: boolean;
  edited: boolean;
  editedAt?: Date;
  createdAt: Date;
}
```

#### Creating Comments

```typescript
// Top-level comment
POST /api/comments/post/:postId
{ text: "Great post!" }

// Reply to comment
POST /api/comments/post/:postId
{
  text: "Thanks!",
  parentCommentId: "comment_id"
}
```

**Components:**

- `CommentSection.tsx` - Complete comment system
  - Comment list with replies
  - Reply input per comment
  - Edit functionality
  - Like system
  - Delete options

**Features:**

- Nested replies (1 level deep)
- Edit comments (shows edited badge)
- Like comments
- Delete own comments
- Admin delete any comment
- Emoji picker for comments
- 200 character limit

#### Comment Likes

```typescript
// Toggle comment like
POST /api/comment-likes/comment/:commentId
→ Add/remove like
→ Update count

// Get like status
GET /api/comment-likes/comment/:commentId
→ Returns { liked: boolean, likeCount: number }
```

---

### 4. Follow System

#### Following Users

```typescript
// Toggle follow
POST /api/follow/user/:userId
→ Returns new follow state and counts

// Get follow status
GET /api/follow/user/:userId/status
→ { isFollowing: boolean, followersCount, followingCount }

// Get followers/following lists
GET /api/follow/user/:userId/followers
GET /api/follow/user/:userId/following
→ Paginated lists with user details
```

**Components:**

- `FollowersCard.tsx` - Display followers/following
- `AllFollowsModal.tsx` - Full list modal with pagination
- `SuggestionsCard.tsx` - User suggestions
- `AllSuggestionsModal.tsx` - All suggestions modal

**Features:**

- Real-time follower counts
- Global follow state management
- Smart user suggestions
- Mutual followers display
- Instant UI updates

#### Follow Suggestions

```typescript
// Get personalized suggestions
GET /api/follow/suggestions
→ Returns users based on:
  - Mutual followers
  - Interaction score
  - Recent activity
```

**Algorithm Factors:**

- Common followers
- Post interactions
- Comment activity
- User engagement level

---

### 5. Profile Management

#### Profile Data

```typescript
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  roles: string[];
  permissions: string[];
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
}
```

#### Profile Features

```typescript
// Get own profile
GET / api / auth / profile;

// Update profile
PUT / api / auth / profile;
{
  firstName, lastName, username, bio;
}

// Upload avatar
POST / api / upload / profile(multipart / form - data);
{
  file: ImageFile;
}
```

**Components:**

- `ProfileCard.tsx` - Profile information display
- `profile/page.tsx` - Settings and management
- `EmailChangeCard.tsx` - Email change interface

**Features:**

- Avatar upload with cropping
- Edit profile information
- Change password
- Change email
- Delete account
- View statistics
- Admin badge display

---

### 6. Image Management

#### Image Cropper

Advanced image cropping tool with drag-and-resize functionality.

**Features:**

- Drag-and-drop crop area
- Resize handles (8 directions)
- Maintains aspect ratio
- Real-time preview
- Canvas-based rendering
- Export to File object

**Usage:**

```typescript
<ImageCropper
  isOpen={true}
  onClose={() => setOpen(false)}
  imageFile={selectedFile}
  onCropComplete={(croppedFile) => {
    // Upload croppedFile
  }}
/>
```

**Technical Details:**

- Uses HTML5 Canvas API
- Supports all aspect ratios
- Precise boundary detection
- Dynamic container sizing
- Memory-efficient processing

#### Image Modal

Full-screen image viewer.

**Features:**

- Full-screen display
- Keyboard navigation (ESC to close)
- Click outside to close
- Touch-friendly
- Smooth transitions

---

### 7. Admin Dashboard

Protected dashboard for users with admin privileges.

#### Access Control

```typescript
// Check admin status
const isAdmin = (user?: User | null): boolean => {
  return user?.roles?.includes("ADMIN") || false;
};
```

**Route Protection:**

- Client-side redirect for non-admins
- Admin badge display
- Permission-based UI rendering

#### Admin Features

**Activity Logs:**

```typescript
GET /api/admin/logs?page=1&limit=50
→ Returns:
  - Admin action type (DELETE_POST, DELETE_COMMENT)
  - Target content details
  - Timestamp and admin user
  - IP address and user agent

Filters:
- action: DELETE_POST, DELETE_COMMENT
- adminId: Specific admin user
- targetType: POST, COMMENT
```

**Platform Statistics:**

```typescript
GET /api/admin/stats
→ Returns:
  {
    totalUsers: number,
    verifiedUsers: number,
    totalPosts: number,
    totalComments: number,
    totalLikes: number,
    totalFollows: number,
    admins: number
  }
```

**Components:**

- `AdminLogs.tsx` - Activity log viewer
- `AdminStats.tsx` - Platform statistics
- `admin/page.tsx` - Dashboard layout
- `AdminBadge.tsx` - Visual admin indicator

---

## Components Overview

### UI Components (`src/components/ui/`)

#### Toast

Non-intrusive notification system.

```typescript
const { showToast } = useToast();

showToast("Success message", "success");
showToast("Error occurred", "error");
showToast("Information", "info");
```

**Features:**

- Auto-dismiss (3s default)
- Success/Error/Info variants
- Smooth animations
- Queue management
- Fixed positioning

#### ImageModal

Full-screen image viewer.

```typescript
<ImageModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  imageUrl="https://..."
  alt="Description"
/>
```

#### ImageCropper

Advanced image cropping tool.

```typescript
<ImageCropper
  isOpen={showCropper}
  onClose={() => setShowCropper(false)}
  imageFile={file}
  onCropComplete={(cropped) => uploadImage(cropped)}
/>
```

#### AdminBadge

Visual indicator for admin users.

```typescript
<AdminBadge className="ml-2" />
```

#### NoSSR

Prevents server-side rendering for client-only components.

```typescript
<NoSSR>
  <ClientOnlyComponent />
</NoSSR>
```

---

### Post Components (`src/components/posts/`)

#### PostCard

Individual post display with all interactions.

**Props:**

```typescript
interface PostCardProps {
  post: Post;
  onPostUpdate: () => void;
  onFollowUpdate?: (userId, following, count) => void;
}
```

**Features:**

- Like/unlike button
- Comment count and toggle
- Follow/unfollow author
- Delete (own posts or admin)
- Image preview with modal
- Timestamp display
- Author information
- Admin badge for admins

#### PostFeed

Main feed with filtering and pagination.

**Features:**

- Filter by recent/trending/following
- Infinite scroll pagination
- Loading skeletons
- Empty state handling
- Real-time updates

#### CreatePost

Post creation form in main feed.

**Features:**

- Text input with character limit
- Image upload with preview
- Emoji picker
- Real-time validation
- Loading states
- Error handling

#### CreatePostModal

Post creation modal in header.

**Features:**

- Modal overlay
- Same features as CreatePost
- Click outside to close
- Form reset on close

#### CommentSection

Complete comment system for posts.

**Features:**

- Display all comments
- Create top-level comments
- Reply to comments
- Edit comments
- Delete comments
- Like comments
- Emoji picker
- Character limits
- Loading states

---

### Profile Components (`src/components/profile/`)

#### ProfileCard

User profile information display.

**Features:**

- Avatar with modal view
- Full name and username
- Bio text
- Join date
- Post/follower/following counts
- Formatted numbers (1.2k format)

#### FollowersCard

Followers and following lists.

**Features:**

- Display top 5 followers/following
- "See All" buttons
- Follow/unfollow buttons
- Real-time count updates
- Loading states
- Empty states

#### AllFollowsModal

Full followers/following list modal.

**Features:**

- Tabbed interface (followers/following)
- Pagination controls
- Follow/unfollow actions
- Search/filter
- Loading states
- Responsive design

#### SuggestionsCard

User suggestions widget.

**Features:**

- Top 3 suggestions
- Suggestion reasons
- Follow buttons
- "See All" modal
- Interaction scores
- Loading states

#### EmailChangeCard

Email change interface.

**Features:**

- Request email change
- Password confirmation
- Pending change status
- Cancel change option
- Verification instructions
- Error handling

---

### Admin Components (`src/components/admin/`)

#### AdminLogs

Activity log viewer for administrators.

**Features:**

- Paginated log entries
- Filter by action type
- Filter by admin user
- Filter by target type
- Timestamp display
- Content preview
- User information
- Admin IP address display

#### AdminStats

Platform statistics dashboard.

**Features:**

- Total users count
- Verified users count
- Total posts count
- Total comments count
- Total likes count
- Total follows count
- Admin count
- Visual card layout

---

## Context Providers

### AuthContext

Manages authentication state and user data.

**Exports:**

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (data: RegisterData) => Promise<any>;
  logout: () => void;
  updateProfile: (data: UpdateData) => Promise<void>;
  refreshProfile: () => Promise<void>;
}
```

**Usage:**

```typescript
const { user, isAuthenticated, login, logout } = useAuth();

if (user?.roles?.includes("ADMIN")) {
  // Show admin features
}
```

### ThemeContext

Manages light/dark theme switching.

**Exports:**

```typescript
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
```

**Usage:**

```typescript
const { theme, toggleTheme } = useTheme();

<button onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>;
```

**Features:**

- LocalStorage persistence
- CSS variable updates
- Smooth transitions

### ToastContext

Global toast notification system.

**Exports:**

```typescript
interface ToastContextType {
  showToast: (
    message: string,
    type?: "success" | "error" | "info",
    duration?: number
  ) => void;
}
```

**Usage:**

```typescript
const { showToast } = useToast();

try {
  await saveData();
  showToast("Saved successfully!", "success");
} catch (error) {
  showToast("Failed to save", "error");
}
```

### FollowContext

Global follow state management for consistent UI.

**Exports:**

```typescript
interface FollowContextType {
  getFollowState: (userId: string) => FollowState;
  updateFollowState: (
    userId: string,
    isFollowing: boolean,
    followersCount: number
  ) => void;
  toggleFollow: (userId: string) => Promise<void>;
}
```

**Purpose:**

- Prevent duplicate API calls
- Synchronize follow buttons across components
- Maintain consistent follower counts
- Handle loading states globally

---

## Routing & Pages

### Route Groups

Next.js route groups organize pages without affecting URL structure.

```
(auth)/       → Authentication pages
(community)/  → Community-related pages
(company)/    → Company information
(legal)/      → Legal documents
```

### Page Index

| Route                  | Description               | Protection |
| ---------------------- | ------------------------- | ---------- |
| `/`                    | Home feed                 | Public     |
| `/login`               | Login page                | Guest only |
| `/register`            | Registration              | Guest only |
| `/verify-email`        | Email verification        | Public     |
| `/forgot-password`     | Password reset request    | Public     |
| `/reset-password`      | Password reset form       | Public     |
| `/verify-email-change` | Email change verification | Public     |
| `/profile`             | User profile & settings   | Protected  |
| `/post?id=xxx`         | Single post view          | Public     |
| `/admin`               | Admin dashboard           | Admin only |
| `/about`               | About page                | Public     |
| `/team`                | Team page                 | Public     |
| `/developers`          | Developer info            | Public     |
| `/updates`             | Platform updates          | Public     |
| `/contact`             | Contact form              | Public     |
| `/guidelines`          | Community guidelines      | Public     |
| `/help`                | Help center               | Public     |
| `/safety`              | Safety information        | Public     |
| `/privacy`             | Privacy policy            | Public     |
| `/terms`               | Terms of service          | Public     |
| `/cookies`             | Cookie policy             | Public     |
| `/dmca`                | DMCA policy               | Public     |
| `/coming-soon`         | Coming soon page          | Public     |

---

## API Integration

### API Client (`src/utils/api.ts`)

Centralized API client with TypeScript type safety.

#### Configuration

```typescript
class ApiClient {
  private baseUrl: string;

  constructor() {
    // Defaults to localhost for development
    // Override with NEXT_PUBLIC_API_URL environment variable
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";
  }
}
```

**Environment Configuration:**

- **Development**: Automatically uses `http://localhost:3005`
- **Production**: Set `NEXT_PUBLIC_API_URL` in your hosting platform
- **No hardcoded URLs**: All API endpoints configured via environment

**Example:**

```env
# Development (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3005

# Production (hosting platform)
NEXT_PUBLIC_API_URL=https://your-production-api.com
```

#### Authentication

```typescript
// Automatic credential inclusion for cookies
const response = await fetch(url, {
  credentials: "include", // Include HTTP-only cookies
  headers: {
    "Content-Type": "application/json",
  },
});
```

#### Error Handling

```typescript
private async handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
}
```

#### Available Methods

**Authentication:**

```typescript
apiClient.login({ email, password });
apiClient.register({ firstName, lastName, username, email, password });
apiClient.logout();
apiClient.getProfile();
apiClient.updateProfile({ firstName, lastName, username });
apiClient.verifyEmail(token);
apiClient.resendVerification(email);
apiClient.forgotPassword({ email });
apiClient.resetPassword({ token, newPassword });
apiClient.changePassword({ currentPassword, newPassword });
apiClient.requestEmailChange({ newEmail, password });
apiClient.verifyEmailChange(token);
apiClient.cancelEmailChange();
apiClient.deleteAccount({ password });
```

**Posts:**

```typescript
apiClient.getPosts({ page, limit });
apiClient.getFilteredPosts({ filter, page, limit });
apiClient.getPostById(id);
apiClient.getUserPosts({ userId, page, limit });
apiClient.createPost({ text, image });
apiClient.deletePost(id);
apiClient.getPostLikes(id);
```

**Comments:**

```typescript
apiClient.getComments(postId);
apiClient.createComment({ postId, text, parentCommentId });
apiClient.updateComment({ commentId, text });
apiClient.deleteComment(commentId);
```

**Likes:**

```typescript
apiClient.toggleLike(postId);
apiClient.getLikeStatus(postId);
apiClient.toggleCommentLike(commentId);
apiClient.getCommentLikeStatus(commentId);
```

**Follow:**

```typescript
apiClient.toggleFollow(userId);
apiClient.getFollowStatus(userId);
apiClient.getFollowers({ userId, page, limit });
apiClient.getFollowing({ userId, page, limit });
apiClient.getSuggestions();
```

**Upload:**

```typescript
apiClient.uploadProfileImage(file);
apiClient.uploadPostImage(file);
apiClient.uploadSingleFile(file, type);
apiClient.uploadMultipleFiles(files);
```

**Admin:**

```typescript
apiClient.getAdminLogs({ page, limit, filters });
apiClient.getAdminStats();
```

**Contact:**

```typescript
apiClient.submitContact({ name, email, subject, message });
```

---

## Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Development Workflow

1. **Start backend server first:**

   ```bash
   cd ../server
   npm run dev
   ```

2. **Start frontend dev server:**

   ```bash
   cd client
   npm run dev
   ```

3. **Access application:**
   ```
   http://localhost:3000
   ```

### Code Quality

**TypeScript:**

- Strict mode enabled
- Type checking on build
- Interface definitions for all data structures

**ESLint:**

- Next.js recommended rules
- React hooks rules
- TypeScript support

**Best Practices:**

- Use TypeScript interfaces
- Implement error boundaries
- Handle loading states
- Provide fallback UI
- Optimize images
- Use Next.js Image component
- Implement proper SEO

### Performance Optimization

**Next.js Features:**

- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting
- Route prefetching

**React Optimization:**

- React.memo for expensive components
- useCallback for event handlers
- useMemo for computed values
- Lazy loading for modals
- Virtual scrolling for long lists

**Network Optimization:**

- API response caching
- Optimistic UI updates
- Debounced API calls
- Request deduplication

---

## Build & Deployment

### Production Build

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Test production build locally:**

   ```bash
   npm start
   ```

3. **Verify build:**
   - Check for build errors
   - Test all routes
   - Verify API connections
   - Test responsive design

### Environment Variables

Create `.env.local` for development and `.env.production` for production:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-url.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Environment Variables

### Required Variables

| Variable              | Description          | Example                 |
| --------------------- | -------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3005` |

### Environment Files

- `.env.local` - Local development (gitignored)
- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.local.example` - Template for required variables

### Usage in Code

```typescript
// Public variables only (client-side)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side only
// const secret = process.env.SECRET_KEY;
```

**Important:**

- Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Never commit `.env.local` to version control
- Use environment-specific files for different deployments

---

## Type Definitions

### User Types (`src/types/user.types.ts`)

```typescript
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

// Helper function to check admin status
export const isAdmin = (user: User | null): boolean => {
  return user?.roles?.includes("ADMIN") ?? false;
};
```

### Post Types (`src/types/post.types.ts`)

```typescript
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  followersCount?: number;
  followingCount?: number;
  avatarUrl?: string;
  avatarPublicId?: string;
  roles?: string[];
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
```

---

## Testing Checklist

- User registration flow
- Email verification
- Login/logout
- Password reset
- Email change
- Profile updates
- Avatar upload and cropping
- Post creation (text + image)
- Post deletion
- Like/unlike posts
- Comment CRUD operations
- Comment likes
- Reply to comments
- Follow/unfollow users
- View followers/following
- User suggestions
- Feed filtering
- Pagination
- Admin dashboard access
- Admin logs viewing
- Platform statistics
- Dark/light theme toggle
- Responsive design on mobile
- Image modal functionality
- Toast notifications
- Error handling
- Loading states
- Empty states

---

## Troubleshooting

### Common Issues

| Issue                      | Solution                                                   |
| -------------------------- | ---------------------------------------------------------- |
| **API connection failed**  | Verify `NEXT_PUBLIC_API_URL` and backend server is running |
| **Auth not persisting**    | Check browser allows cookies, verify cookie settings       |
| **Images not uploading**   | Verify backend Cloudinary configuration                    |
| **Theme not switching**    | Clear browser cache and localStorage                       |
| **Build errors**           | Delete `.next/` folder and `node_modules/`, reinstall      |
| **TypeScript errors**      | Run `npm install` to update type definitions               |
| **Hot reload not working** | Restart dev server, check file watchers limit              |

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Backend API Documentation](../server/README.md)
- [API Testing Guide](../server/docs/API_REFERENCE.md)

---

## License

This project is part of the ThreadUp social media platform.

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**
