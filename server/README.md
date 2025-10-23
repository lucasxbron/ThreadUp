# ThreadUp Backend Server

![Node.js](https://img.shields.io/badge/Node.js-18+-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.15-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-2.7-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

A robust, production-ready social media platform backend featuring authentication, real-time interactions, media management, and comprehensive admin tools.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [API Architecture](#api-architecture)
- [Environment Configuration](#environment-configuration)
- [Authentication & Security](#authentication--security)
- [Admin Management](#admin-management)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Media Upload System](#media-upload-system)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Testing](#testing)

## Features

### Core Functionality

- **JWT-based Authentication** - Secure user authentication with HTTP-only cookies
- **User Management** - Registration, email verification, password reset, profile updates
- **Post System** - Create, read, delete posts with optional image attachments
- **Comments & Replies** - Nested comment threads with full CRUD operations
- **Like System** - Like/unlike posts and comments with real-time count tracking
- **Follow System** - Follow/unfollow users with follower/following lists
- **Smart Suggestions** - Intelligent user suggestions based on follow graph

### Advanced Features

- **Media Management** - Cloudinary integration with automatic optimization
- **Email System** - Resend integration for transactional emails
- **Admin Tools** - Content moderation, audit logging
- **Advanced Filtering** - Post feed with multiple filter options (latest, following, popular)
- **Analytics** - User statistics, admin dashboards, engagement metrics
- **Security** - Input validation, XSS protection, rate limiting ready
- **CORS Configured** - Cross-origin resource sharing for frontend integration

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ThreadUp/server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Configure your environment variables

# Start MongoDB service (if local)
sudo systemctl start mongod

# Create temp directory
mkdir -p temp/uploads

# Start development server
npm run dev
```

## API Architecture

### Technology Stack

| Component          | Technology     | Purpose                         |
| ------------------ | -------------- | ------------------------------- |
| **Runtime**        | Node.js 18+    | JavaScript runtime environment  |
| **Framework**      | Express 5.1    | Web application framework       |
| **Language**       | TypeScript 5.8 | Type-safe JavaScript superset   |
| **Database**       | MongoDB 8.15   | NoSQL document database         |
| **ODM**            | Mongoose       | MongoDB object modeling         |
| **Authentication** | JWT + bcrypt   | Secure token-based auth         |
| **Email Service**  | Resend         | Transactional email delivery    |
| **File Storage**   | Cloudinary     | Cloud-based media management    |
| **Validation**     | Validator.js   | Input validation & sanitization |

### Project Structure

```
server/
├── src/
│   ├── index.ts                 # Application entry point
│   ├── config/
│   │   └── config.ts            # Environment configuration
│   ├── controllers/             # Request handlers
│   │   ├── adminController.ts
│   │   ├── authController.ts
│   │   ├── commentController.ts
│   │   ├── commentLikeController.ts
│   │   ├── contactController.ts
│   │   ├── followController.ts
│   │   ├── likeController.ts
│   │   ├── postController.ts
│   │   └── uploadController.ts
│   ├── middleware/              # Custom middleware
│   │   ├── errorHandling.ts     # Global error handler
│   │   ├── multer.ts            # File upload config
│   │   └── verifyToken.ts       # JWT authentication
│   ├── models/                  # Mongoose schemas
│   │   ├── adminLog.ts
│   │   ├── comment.ts
│   │   ├── commentLike.ts
│   │   ├── follow.ts
│   │   ├── like.ts
│   │   ├── post.ts
│   │   └── user.ts
│   ├── routes/                  # API route definitions
│   │   ├── adminRouter.ts
│   │   ├── authRouter.ts
│   │   ├── commentLikeRouter.ts
│   │   ├── commentRouter.ts
│   │   ├── contactRouter.ts
│   │   ├── followRouter.ts
│   │   ├── likeRouter.ts
│   │   ├── postRouter.ts
│   │   └── uploadRouter.ts
│   ├── types/                   # TypeScript type definitions
│   │   ├── index.d.ts
│   │   └── jwt.ts
│   └── utils/                   # Helper functions
│       ├── cloudinary.ts        # Cloud storage utilities
│       ├── constants.ts         # App constants
│       ├── db.ts                # Database connection
│       ├── jwt.ts               # JWT utilities
│       └── emails/              # Email templates
│           ├── contactEmail.ts
│           ├── emailChange.ts
│           ├── emailVerification.ts
│           └── passwordReset.ts
├── temp/
│   └── uploads/                 # Temporary file storage (auto-cleanup)
├── public/
│   └── uploads/                 # Static file serving
├── docs/
│   └── API_REFERENCE.md       # API testing guide
├── dist/                        # Compiled JavaScript output (generated)
├── node_modules/                # Dependencies (generated)
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Environment Configuration

Create a `.env` file in the server root with:

```env
PORT=3005
MONGODB_URL=mongodb://localhost:27017/threadup
JWT_SECRET=your-super-secret-jwt-key-here
RESEND_API_KEY=your-resend-api-key
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Configuration Details

| Variable                | Required | Default               | Description                               |
| ----------------------- | -------- | --------------------- | ----------------------------------------- |
| `PORT`                  | No       | 3005                  | Server port number                        |
| `MONGODB_URL`           | Yes      | -                     | MongoDB connection string                 |
| `JWT_SECRET`            | Yes      | -                     | Secret key for JWT signing (min 32 chars) |
| `RESEND_API_KEY`        | Yes      | -                     | Resend API key for emails                 |
| `FRONTEND_URL`          | No       | http://localhost:3000 | Frontend URL for CORS & email links       |
| `CLOUDINARY_CLOUD_NAME` | Yes      | -                     | Cloudinary cloud name                     |
| `CLOUDINARY_API_KEY`    | Yes      | -                     | Cloudinary API key                        |
| `CLOUDINARY_API_SECRET` | Yes      | -                     | Cloudinary API secret                     |

## Authentication & Security

### JWT Token System

- **Token Type**: HTTP-only cookies (secure, not accessible via JavaScript)
- **Expiration**: 7 days
- **Storage**: Cookies with `sameSite: "none"` and `secure: true` for production
- **Refresh**: Automatic via cookie renewal on authenticated requests

### Password Security

- **Hashing**: bcrypt with salt rounds (cost factor 10)
- **Requirements**: Enforced on registration and password change
- **Reset Flow**: Secure token-based password reset via email

### Protected Routes

Protected routes require a valid JWT token in cookies or `Authorization: Bearer <token>` header.

```typescript
// Example: Protected route middleware
router.get("/profile", verifyToken, authController.getOwnProfile);
```

### Email Verification

- **Registration**: Users receive verification email
- **Email Change**: Requires verification of new email address
- **Resend**: Available if verification email is lost

## Admin Management

### Understanding Admin Roles

ThreadUp uses a role-based access control (RBAC) system:

- **USER** (default): Standard user capabilities
- **ADMIN**: Elevated privileges for content moderation

### Admin Capabilities

Admins can:

- Delete any post or comment (with audit logging)
- View all admin logs and statistics
- Access `/api/admin/*` endpoints
- Moderate content across the platform

### How to Grant Admin Privileges

To give a user admin privileges manually, you need to update their roles in the MongoDB database. Here are the different ways to do this:

#### Method 1: MongoDB Compass (GUI)

1. **Open MongoDB Compass** and connect to your database
2. **Navigate to your database** → `users` collection
3. **Find the user** you want to make admin (search by email or username)
4. **Click the edit button** (pencil icon) on the user document
5. **Update the roles field** from:
   ```json
   "roles": ["USER"]
   ```
   to:
   ```json
   "roles": ["USER", "ADMIN"]
   ```
6. **Update the permissions field** from:
   ```json
   "permissions": ["VIEWER_USER", "UPDATE_USER"]
   ```
   to:
   ```json
   "permissions": [
     "VIEWER_USER",
     "UPDATE_USER",
     "DELETE_ANY_POST",
     "DELETE_ANY_COMMENT",
     "MODERATE_CONTENT"
   ]
   ```
7. **Click "Update"** to save the changes

#### Method 2: MongoDB Shell

```javascript
// Connect to your MongoDB instance
mongo

// Switch to your database (replace 'threadup' with your actual database name)
use threadup

// Update user by email
db.users.updateOne(
  { email: "admin@example.com" }, // Replace with the admin user's email
  {
    $set: {
      roles: ["USER", "ADMIN"],
      permissions: [
        "VIEWER_USER",
        "UPDATE_USER",
        "DELETE_ANY_POST",
        "DELETE_ANY_COMMENT",
        "MODERATE_CONTENT"
      ]
    }
  }
)

// Or update by username
db.users.updateOne(
  { username: "adminuser" }, // Replace with the admin user's username
  {
    $set: {
      roles: ["USER", "ADMIN"],
      permissions: [
        "VIEWER_USER",
        "UPDATE_USER",
        "DELETE_ANY_POST",
        "DELETE_ANY_COMMENT",
        "MODERATE_CONTENT"
      ]
    }
  }
)
```

#### Method 3: Node.js Script

Create a script file (`make-admin.js`) in your server directory:

```javascript
import mongoose from "mongoose";
import User from "./src/models/user.js";
import config from "./src/config/config.js";

const makeUserAdmin = async (identifier, isEmail = true) => {
  try {
    // Connect to database
    await mongoose.connect(config.MONGODB_URL);
    console.log("Connected to MongoDB");

    // Find user by email or username
    const query = isEmail ? { email: identifier } : { username: identifier };
    const user = await User.findOne(query);

    if (!user) {
      console.log("User not found");
      return;
    }

    // Update user roles and permissions
    user.roles = ["USER", "ADMIN"];
    user.permissions = [
      "VIEWER_USER",
      "UPDATE_USER",
      "DELETE_ANY_POST",
      "DELETE_ANY_COMMENT",
      "MODERATE_CONTENT",
    ];

    await user.save();

    console.log(`✅ User ${user.email} (${user.username}) is now an admin!`);
    console.log("Updated roles:", user.roles);
    console.log("Updated permissions:", user.permissions);
  } catch (error) {
    console.error("Error making user admin:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Usage examples:
// Make user admin by email
makeUserAdmin("admin@example.com", true);

// Make user admin by username
// makeUserAdmin('adminusername', false);
```

Then run the script:

```bash
node make-admin.js
```

#### Method 4: MongoDB Atlas (Cloud)

If you're using MongoDB Atlas:

1. **Go to MongoDB Atlas** dashboard
2. **Click on "Browse Collections"** for your cluster
3. **Navigate to your database** → `users` collection
4. **Find the user** and click the edit button
5. **Update the roles and permissions** as shown in method 1
6. **Click "Update"**

### Verification

After making the changes, you can verify the admin privileges work by:

1. **Login as the admin user** in your frontend
2. **Check that admin badges appear** next to the user's name
3. **Verify delete buttons appear** on all posts and comments (not just their own)
4. **Test deleting** someone else's post or comment

### Admin Features

Users with admin privileges will see:

- **Purple admin badge** next to their name in posts and comments
- **Delete buttons** on all posts and comments throughout the platform
- **"Delete (Admin)" text** on delete buttons for content they don't own
- **Logging indicators** for admin actions

### Important Notes

**Security Warning**: Only give admin privileges to trusted users, as they can delete any content on your platform.

**No Restart Required**: Changes take effect immediately - the user just needs to refresh their browser or log out and back in.

**Verify Success**: You can check if it worked by looking for the purple admin badge next to the user's name in the UI.

---

## How to Remove Admin Privileges

### Method 1: MongoDB Compass (GUI)

1. **Open MongoDB Compass** and connect to your database
2. **Navigate to your database** → `users` collection
3. **Find the user** you want to demote
4. **Click the edit button** (pencil icon)
5. **Update the roles field** to:
   ```json
   "roles": ["USER"]
   ```
6. **Update the permissions field** to:
   ```json
   "permissions": ["VIEWER_USER", "UPDATE_USER"]
   ```
7. **Click "Update"** to save

### Method 2: MongoDB Shell

```javascript
// Connect to MongoDB
mongo

// Switch to database
use threadup

// Remove admin privileges by email
db.users.updateOne(
  { email: "user@example.com" },
  {
    $set: {
      roles: ["USER"],
      permissions: ["VIEWER_USER", "UPDATE_USER"]
    }
  }
);

// Or by username
db.users.updateOne(
  { username: "username" },
  {
    $set: {
      roles: ["USER"],
      permissions: ["VIEWER_USER", "UPDATE_USER"]
    }
  }
);
```

### Method 3: Node.js Script

Create `remove-admin.js`:

```javascript
import mongoose from "mongoose";
import User from "./src/models/user.js";
import config from "./src/config/config.js";

const removeAdminPrivileges = async (identifier, isEmail = true) => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Connected to MongoDB");

    const query = isEmail ? { email: identifier } : { username: identifier };
    const user = await User.findOne(query);

    if (!user) {
      console.log("❌ User not found");
      return;
    }

    // Remove admin privileges
    user.roles = ["USER"];
    user.permissions = ["VIEWER_USER", "UPDATE_USER"];
    await user.save();

    console.log(`✅ Admin privileges removed from ${user.username}`);
    console.log(`Email: ${user.email}`);
    console.log(`Roles: ${user.roles.join(", ")}`);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

// Usage: node remove-admin.js
removeAdminPrivileges("admin@example.com", true);
```

Run with:

```bash
node remove-admin.js
```

### Method 4: MongoDB Atlas

1. **Log in to MongoDB Atlas**
2. **Browse Collections** → Select cluster
3. **Find user** in `users` collection
4. **Edit document**
5. **Update fields**:
   ```json
   {
     "roles": ["USER"],
     "permissions": ["VIEWER_USER", "UPDATE_USER"]
   }
   ```
6. **Save changes**

### Verification

```bash
# Check user's current roles
db.users.findOne(
  { email: "user@example.com" },
  { email: 1, roles: 1, permissions: 1 }
);

# Expected output:
{
  email: "user@example.com",
  roles: ["USER"],
  permissions: ["VIEWER_USER", "UPDATE_USER"]
}
```

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint                | Auth | Description            |
| ------ | ----------------------- | ---- | ---------------------- |
| POST   | `/register`             | ❌   | Register new user      |
| POST   | `/login`                | ❌   | Login with credentials |
| POST   | `/logout`               | ❌   | Clear auth cookie      |
| GET    | `/verify-email`         | ❌   | Verify email token     |
| POST   | `/resend-verification`  | ❌   | Resend verification    |
| POST   | `/forgot-password`      | ❌   | Request password reset |
| POST   | `/reset-password`       | ❌   | Reset with token       |
| GET    | `/profile`              | ✅   | Get own profile        |
| PUT    | `/profile`              | ✅   | Update profile         |
| PUT    | `/change-password`      | ✅   | Change password        |
| DELETE | `/delete-account`       | ✅   | Delete account         |
| POST   | `/request-email-change` | ✅   | Request email change   |
| GET    | `/verify-email-change`  | ❌   | Verify new email       |
| POST   | `/cancel-email-change`  | ✅   | Cancel change request  |

### Posts (`/api/posts`)

| Method | Endpoint        | Auth     | Description             |
| ------ | --------------- | -------- | ----------------------- |
| GET    | `/feed`         | Optional | Get filtered feed       |
| GET    | `/`             | Optional | Get all posts           |
| GET    | `/:id`          | Optional | Get single post         |
| GET    | `/user/:userId` | Optional | Get user's posts        |
| POST   | `/`             | ✅       | Create post             |
| DELETE | `/:id`          | ✅       | Delete post (own/admin) |
| GET    | `/:id/likes`    | ❌       | Get post likes          |

### Comments (`/api/comments`)

| Method | Endpoint        | Auth     | Description                |
| ------ | --------------- | -------- | -------------------------- |
| GET    | `/post/:postId` | Optional | Get comments               |
| POST   | `/post/:postId` | ✅       | Create comment             |
| PUT    | `/:id`          | ✅       | Update comment             |
| DELETE | `/:id`          | ✅       | Delete comment (own/admin) |

### Likes (`/api/likes`)

| Method | Endpoint              | Auth | Description     |
| ------ | --------------------- | ---- | --------------- |
| POST   | `/post/:postId`       | ✅   | Toggle like     |
| GET    | `/post/:postId`       | ✅   | Get like status |
| GET    | `/post/:postId/users` | ❌   | Get likers      |

### Comment Likes (`/api/comment-likes`)

| Method | Endpoint                    | Auth | Description |
| ------ | --------------------------- | ---- | ----------- |
| POST   | `/comment/:commentId`       | ✅   | Toggle like |
| GET    | `/comment/:commentId`       | ✅   | Get status  |
| GET    | `/comment/:commentId/users` | ❌   | Get likers  |

### Follow (`/api/follow`)

| Method | Endpoint                  | Auth     | Description       |
| ------ | ------------------------- | -------- | ----------------- |
| POST   | `/user/:userId`           | ✅       | Toggle follow     |
| GET    | `/user/:userId/status`    | Optional | Get follow status |
| GET    | `/user/:userId/followers` | ❌       | Get followers     |
| GET    | `/user/:userId/following` | ❌       | Get following     |
| GET    | `/suggestions`            | ✅       | Get suggestions   |

### Upload (`/api/upload`)

| Method | Endpoint    | Auth | Description             |
| ------ | ----------- | ---- | ----------------------- |
| POST   | `/`         | ✅   | Upload single file      |
| POST   | `/multiple` | ✅   | Upload multiple (max 5) |
| POST   | `/profile`  | ✅   | Upload avatar           |
| POST   | `/post`     | ✅   | Upload post image       |

### Admin (`/api/admin`)

| Method | Endpoint | Auth  | Description    |
| ------ | -------- | ----- | -------------- |
| GET    | `/logs`  | Admin | Get admin logs |
| GET    | `/stats` | Admin | Get statistics |

### Contact (`/api/contact`)

| Method | Endpoint | Auth | Description         |
| ------ | -------- | ---- | ------------------- |
| POST   | `/`      | ❌   | Submit contact form |

---

## Database Schema

### User Model

```typescript
{
  firstName: string;              // Max 50 chars
  lastName: string;               // Max 50 chars
  username: string;               // Unique, 3-30 chars, alphanumeric + underscore
  email: string;                  // Unique, lowercase, validated
  password: string;               // Bcrypt hashed (min 8 chars, strong password)
  avatarUrl?: string;
  avatarPublicId?: string;
  roles: string[];                // ["USER"] or ["USER", "ADMIN"]
  permissions: string[];
  verified: boolean;              // Email verification status
  verificationToken?: string;
  passwordResetToken?: string;
  passwordResetTokenExpiry?: Date;
  pendingEmail?: string;
  emailChangeToken?: string;
  emailChangeTokenExpiry?: Date;
  followersCount: number;         // Default 0
  followingCount: number;         // Default 0
  createdAt: Date;
  updatedAt: Date;
}
```

### Post Model

```typescript
{
  text: string;            // Max 500 chars
  authorId: ObjectId;      // Ref: User
  imageUrl?: string;
  imagePublicId?: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Comment Model

```typescript
{
  postId: ObjectId;
  authorId: ObjectId;
  text: string;            // Max 200 chars
  parentCommentId?: ObjectId;
  likeCount: number;
  edited: boolean;
  editedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Follow Model

```typescript
{
  followerId: ObjectId; // User following
  followingId: ObjectId; // User being followed
  createdAt: Date;
  updatedAt: Date;
}
```

### Like Model

```typescript
{
  postId: ObjectId;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

### AdminLog Model

```typescript
{
  adminId: ObjectId;
  action: string;
  targetType: string;
  targetId: string;
  targetAuthorId: ObjectId;
  details: {
    postText?: string;
    commentText?: string;
    imageUrl?: string;
  };
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
```

---

## Media Upload System

### Cloudinary Integration

**Folder Structure:**

```
threadup/
├── profile-images/    # User avatars (optimized)
├── posts/             # Post images
└── general/           # Other uploads
```

**Features:**

- Auto format conversion (WebP)
- Quality optimization
- Temporary file cleanup
- Public ID management

**Limits:**

- Single file: 10MB max
- Multiple: 5 files max
- Formats: JPG, PNG, GIF, WebP

**Example:**

```bash
curl -X POST http://localhost:3005/api/upload/profile \
  -H "Authorization: Bearer TOKEN" \
  -F "file=@avatar.jpg"
```

---

## Development

### Scripts

```bash
npm run dev      # Development with hot reload (concurrently runs watch + start)
npm run build    # Compile TypeScript to dist/
npm run watch    # TypeScript watch mode
npm start        # Run compiled code from dist/
```

### Workflow

1. Edit files in `src/`
2. Auto-compile & restart (with `npm run dev`)
3. Test with Postman/curl
4. Commit changes

---

## Testing

See [API_REFERENCE.md](./docs/API_REFERENCE.md) for complete testing guide.

**Quick Test:**

1. Register → Verify → Login
2. Create post → Like → Comment
3. Follow user → View feed
4. Upload image → Update profile

---

## Documentation

- [API Testing Guide](./docs/API_REFERENCE.md) - Complete API testing instructions

---

## Development

### Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm test           # Run tests
npm run lint       # Run linter
```

## Deployment

### Pre-Deployment Checklist

- [ ] Generate strong `JWT_SECRET` (min 32 chars)
- [ ] Configure production MongoDB URL
- [ ] Set correct `FRONTEND_URL` for CORS
- [ ] Enable HTTPS for secure cookies
- [ ] Set up Cloudinary production account
- [ ] Configure Resend with production domain
- [ ] Set `NODE_ENV=production`
- [ ] Enable MongoDB Atlas IP whitelist
- [ ] Set up error monitoring

### Production Environment Variables

```env
NODE_ENV=production
PORT=3005
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/threadup
JWT_SECRET=<64-char-random-string>
FRONTEND_URL=https://yourdomain.com
RESEND_API_KEY=xxxxx
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
```

### Deployment Steps

1. **Build:**

   ```bash
   npm run build
   ```

2. **Set environment variables** on hosting platform

3. **Start server:**

   ```bash
   npm start
   ```

4. **Verify:**
   ```bash
   curl https://your-api.com/
   ```

---

## License

This project is part of the ThreadUp social media platform.

---

**Built with ❤️ using Node.js, TypeScript, Express, and MongoDB**
