# ThreadUp Social Media API Reference

## Environment Setup

**Note:** This guide uses Postman as an example HTTP client.

Create a Postman environment: **"ThreadUp"**

| Variable    | Initial Value           | Description                  |
| ----------- | ----------------------- | ---------------------------- |
| `baseUrl`   | `http://localhost:3005` | API base URL                 |
| `token`     | _(empty)_               | Auto-set on login            |
| `userId`    | _(empty)_               | Auto-set on register         |
| `postId`    | _(empty)_               | Auto-set on post creation    |
| `commentId` | _(empty)_               | Auto-set on comment creation |

---

## API Endpoints Overview

### Authentication (`/api/auth`)

- `POST /register` - Register user
- `GET /verify-email?token=` - Verify email
- `POST /resend-verification` - Resend verification
- `POST /login` - Login (sets JWT)
- `POST /logout` - Logout
- `GET /profile` - Get own profile 🔒
- `PUT /profile` - Update profile 🔒
- `PUT /change-password` - Change password 🔒
- `DELETE /delete-account` - Delete account 🔒
- `POST /request-email-change` - Request email change 🔒
- `GET /verify-email-change?token=` - Verify new email
- `POST /cancel-email-change` - Cancel email change 🔒
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token

### Posts (`/api/posts`)

- `GET /feed` - Get filtered feed
- `GET /` - Get all posts
- `GET /:id` - Get single post
- `GET /user/:userId` - Get user's posts
- `POST /` - Create post (with image) 🔒
- `DELETE /:id` - Delete post 🔒
- `GET /:id/likes` - Get post likers

### Comments (`/api/comments`)

- `GET /post/:postId` - Get comments
- `POST /post/:postId` - Create comment 🔒
- `PUT /:id` - Update comment 🔒
- `DELETE /:id` - Delete comment 🔒

### Likes (`/api/likes`)

- `POST /post/:postId` - Toggle like 🔒
- `GET /post/:postId` - Get like status 🔒
- `GET /post/:postId/users` - Get likers

### Comment Likes (`/api/comment-likes`)

- `POST /comment/:commentId` - Toggle comment like 🔒
- `GET /comment/:commentId` - Get like status 🔒
- `GET /comment/:commentId/users` - Get likers

### Follow (`/api/follow`)

- `POST /user/:userId` - Toggle follow 🔒
- `GET /user/:userId/status` - Get follow status
- `GET /user/:userId/followers` - Get followers
- `GET /user/:userId/following` - Get following
- `GET /suggestions` - Get follow suggestions 🔒

### Upload (`/api/upload`)

- `POST /` - Upload single file 🔒
- `POST /multiple` - Upload multiple (max 5) 🔒
- `POST /profile` - Upload profile image 🔒
- `POST /post` - Upload post image 🔒

### Admin (`/api/admin`)

- `GET /logs` - Get admin logs
- `GET /stats` - Get platform stats

### Contact (`/api/contact`)

- `POST /` - Submit contact form

🔒 = Auth Required

---

## Essential Test Collection

### User Registration & Authentication

#### Register New User

```http
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**✓ Expected:** `201` - User registered, verification email sent

#### Verify Email

```http
GET {{baseUrl}}/api/auth/verify-email?token=YOUR_TOKEN_FROM_EMAIL
```

**✓ Expected:** `200` - Email verified

#### Login

```http
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**✓ Expected:** `200` - JWT token in cookie/response
**Script:** Auto-save token to environment

#### Get Profile

```http
GET {{baseUrl}}/api/auth/profile
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - User profile data

#### Update Profile

```http
PUT {{baseUrl}}/api/auth/profile
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "bio": "Full-stack developer 🚀",
  "username": "johndoe_dev"
}
```

**✓ Expected:** `200` - Profile updated

---

### Password Management

#### Request Password Reset

```http
POST {{baseUrl}}/api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**✓ Expected:** `200` - Reset email sent

#### Reset Password

```http
POST {{baseUrl}}/api/auth/reset-password
Content-Type: application/json

{
  "token": "RESET_TOKEN_FROM_EMAIL",
  "newPassword": "NewSecure123!"
}
```

**✓ Expected:** `200` - Password reset successful

#### Change Password (Authenticated)

```http
PUT {{baseUrl}}/api/auth/change-password
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "currentPassword": "SecurePass123!",
  "newPassword": "EvenMoreSecure456!"
}
```

**✓ Expected:** `200` - Password changed

---

### Email Management

#### Request Email Change

```http
POST {{baseUrl}}/api/auth/request-email-change
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "newEmail": "newemail@example.com",
  "password": "SecurePass123!"
}
```

**✓ Expected:** `200` - Verification sent to new email

#### Verify Email Change

```http
GET {{baseUrl}}/api/auth/verify-email-change?token=EMAIL_CHANGE_TOKEN
```

**✓ Expected:** `200` - Email updated

#### Cancel Email Change

```http
POST {{baseUrl}}/api/auth/cancel-email-change
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - Email change cancelled

---

### Posts & Feed

#### Create Text Post

```http
POST {{baseUrl}}/api/posts
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "text": "My first post on ThreadUp! 🚀 #socialmedia"
}
```

**✓ Expected:** `201` - Post created
**📝 Script:** Save `postId` to environment

#### Create Post with Image

```http
POST {{baseUrl}}/api/posts
Authorization: Bearer {{token}}
Content-Type: multipart/form-data

text: "Check out this photo! 📸"
image: [SELECT FILE]
```

**✓ Expected:** `201` - Post with image created

#### Get Filtered Feed

```http
GET {{baseUrl}}/api/posts/feed?filter=all&page=1&limit=10
```

**Filters:** `all`, `following`, `recent`
**✓ Expected:** `200` - Paginated posts

#### Get User's Posts

```http
GET {{baseUrl}}/api/posts/user/{{userId}}?page=1&limit=10
```

**✓ Expected:** `200` - User's posts

#### Get Single Post

```http
GET {{baseUrl}}/api/posts/{{postId}}
```

**✓ Expected:** `200` - Post details with author info

#### Delete Post

```http
DELETE {{baseUrl}}/api/posts/{{postId}}
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - Post deleted

---

### Likes & Engagement

#### Toggle Post Like

```http
POST {{baseUrl}}/api/likes/post/{{postId}}
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - Like toggled (added/removed)

#### Get Like Status

```http
GET {{baseUrl}}/api/likes/post/{{postId}}
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - `{ liked: true/false, likeCount: X }`

#### Get Post Likers

```http
GET {{baseUrl}}/api/likes/post/{{postId}}/users
```

**✓ Expected:** `200` - Array of users who liked

---

### Comments

#### Create Comment

```http
POST {{baseUrl}}/api/comments/post/{{postId}}
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "text": "Great post! 👍"
}
```

**✓ Expected:** `201` - Comment created
**Script:** Save `commentId` to environment

#### Create Reply to Comment

```http
POST {{baseUrl}}/api/comments/post/{{postId}}
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "text": "Thanks for the feedback!",
  "parentCommentId": "{{commentId}}"
}
```

**✓ Expected:** `201` - Reply created

#### Get Comments

```http
GET {{baseUrl}}/api/comments/post/{{postId}}
```

**✓ Expected:** `200` - Array of comments with author info

#### Update Comment

```http
PUT {{baseUrl}}/api/comments/{{commentId}}
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "text": "Updated comment text ✏️"
}
```

**✓ Expected:** `200` - Comment updated

#### Delete Comment

```http
DELETE {{baseUrl}}/api/comments/{{commentId}}
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - Comment deleted

---

### Comment Likes

#### Toggle Comment Like

```http
POST {{baseUrl}}/api/comment-likes/comment/{{commentId}}
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - Comment like toggled

#### Get Comment Like Status

```http
GET {{baseUrl}}/api/comment-likes/comment/{{commentId}}
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - Like status

#### Get Comment Likers

```http
GET {{baseUrl}}/api/comment-likes/comment/{{commentId}}/users
```

**✓ Expected:** `200` - Array of users

---

### Follow System

#### Toggle Follow User

```http
POST {{baseUrl}}/api/follow/user/{{userId}}
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - Follow toggled

#### Get Follow Status

```http
GET {{baseUrl}}/api/follow/user/{{userId}}/status
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - `{ isFollowing: true/false }`

#### Get Followers

```http
GET {{baseUrl}}/api/follow/user/{{userId}}/followers
```

**✓ Expected:** `200` - Array of followers with stats

#### Get Following

```http
GET {{baseUrl}}/api/follow/user/{{userId}}/following
```

**✓ Expected:** `200` - Array of users being followed

#### Get Follow Suggestions

```http
GET {{baseUrl}}/api/follow/suggestions
Authorization: Bearer {{token}}
```

**✓ Expected:** `200` - Suggested users to follow

---

### File Uploads

#### Upload Profile Image

```http
POST {{baseUrl}}/api/upload/profile
Authorization: Bearer {{token}}
Content-Type: multipart/form-data

file: [SELECT IMAGE]
```

**✓ Expected:** `200` - Image uploaded to Cloudinary
**Folder:** `threadup/profile-images/`

#### Upload Post Image

```http
POST {{baseUrl}}/api/upload/post
Authorization: Bearer {{token}}
Content-Type: multipart/form-data

postImage: [SELECT IMAGE]
```

**✓ Expected:** `200` - Image uploaded
**Folder:** `threadup/posts/`

#### Upload Multiple Files

```http
POST {{baseUrl}}/api/upload/multiple
Authorization: Bearer {{token}}
Content-Type: multipart/form-data

files: [SELECT UP TO 5 IMAGES]
```

**✓ Expected:** `200` - All files uploaded

---

### Admin Functions

#### Get Admin Logs

```http
GET {{baseUrl}}/api/admin/logs?page=1&limit=50
Authorization: Bearer {{token}}
```

**Requires:** Admin role
**✓ Expected:** `200` - Admin action logs
**Filters:** `?action=DELETE_POST&adminId=xxx&targetType=POST`

#### Get Platform Stats

```http
GET {{baseUrl}}/api/admin/stats
Authorization: Bearer {{token}}
```

**Requires:** Admin role
**✓ Expected:** `200` - Platform statistics

```json
{
  "totalUsers": 150,
  "verifiedUsers": 120,
  "totalPosts": 450,
  "totalComments": 890,
  "totalLikes": 1240,
  "totalFollows": 380,
  "admins": 2
}
```

---

### Contact Form

#### Submit Contact Form

```http
POST {{baseUrl}}/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "feature-request",
  "message": "I would love to see dark mode!"
}
```

**Subjects:** `general`, `bug-report`, `feature-request`, `account-issue`, `other`
**✓ Expected:** `200` - Contact form submitted

---

## Recommended Test Flow

### Phase 1: Setup

1. Register 2-3 test users
2. Verify emails
3. Login all users

### Phase 2: Content

4. Create posts (text & images)
5. Create comments
6. Upload profile images

### Phase 3: Interactions

7. Like posts and comments
8. Follow users
9. Test feed filtering

### Phase 4: Management

10. Update profiles
11. Change passwords
12. Delete posts/comments

### Phase 5: Admin

13. View admin logs
14. Check platform stats

---

## Common Issues & Solutions

| Issue                         | Solution                                  |
| ----------------------------- | ----------------------------------------- |
| **401 Unauthorized**          | Check token is set in environment         |
| **Email not verified**        | Check spam folder, use resend endpoint    |
| **MongoDB connection failed** | Verify MongoDB is running: `mongosh`      |
| **File upload fails**         | Check Cloudinary credentials in `.env`    |
| **CORS errors**               | Verify `FRONTEND_URL` matches your client |
| **Token expired**             | Login again to get fresh token            |

---

## Testing Checklist

- User registration with email verification
- Login/logout flow
- Password reset flow
- Email change flow
- Profile updates
- Post creation (text & image)
- Post feed filtering
- Like/unlike posts
- Comment CRUD operations
- Comment likes
- Reply to comments
- Follow/unfollow users
- Follow suggestions
- File uploads (profile, post, multiple)
- Admin logs access
- Platform statistics
- Contact form submission
- Unauthorized access attempts
- Validation error handling

---

**For detailed API documentation, see:** [README.md](../README.md)
