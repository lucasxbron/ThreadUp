# ThreadUp Social Media API - Postman Testing Manual

## Prerequisites

### Backend Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with:
```
PORT=3005
MONGODB_URL=mongodb://localhost:27017/threadup
JWT_SECRET=your-super-secret-jwt-key-here
RESEND_API_KEY=your-resend-api-key
FRONTEND_URL=http://localhost:3005
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```
4. Start MongoDB service
5. Create temp directory: `mkdir -p temp/uploads`
6. Start server: `npm run dev`

### Postman Environment Setup
Create a new Postman environment called **"ThreadUp Social Media"** with these variables:
- `baseUrl`: `http://localhost:3005`
- `token`: (leave empty - will be set automatically)
- `postId`: (leave empty - will be set automatically)
- `commentId`: (leave empty - will be set automatically)

---

## API Endpoints

### AUTH:
- `POST /api/auth/register` ← Create account (requires email verification)
- `GET /api/auth/verify-email` ← Verify email address
- `POST /api/auth/resend-verification` ← Resend verification email
- `POST /api/auth/login` ← Login (sets JWT)
- `POST /api/auth/logout` ← Logout
- `GET /api/auth/profile` ← Get own profile (protected)
- `PUT /api/auth/profile` ← Update profile (protected)

### POSTS:
- `GET /api/posts` ← Get feed (public)
- `GET /api/posts/:id` ← Get specific post (public)
- `POST /api/posts` ← Create post with optional image (protected)
- `DELETE /api/posts/:id` ← Delete own post (protected)

### COMMENTS:
- `GET /api/comments/post/:postId` ← Get comments (public)
- `POST /api/comments/post/:postId` ← Add comment (protected)
- `DELETE /api/comments/:id` ← Delete own comment (protected)

### LIKES:
- `GET /api/likes/post/:postId` ← Get like status (public)
- `POST /api/likes/post/:postId` ← Toggle like (protected)

### UPLOAD:
- `POST /api/upload/profile` ← Upload profile image (protected)
- `POST /api/upload/post` ← Upload post image (protected)
- `POST /api/upload` ← General file upload (protected)
- `POST /api/upload/multiple` ← Upload multiple files (protected)

---

## Complete Test Collection (50 Tests)

### 1. Register First User
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/register`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "TestUser123!"
}
```
**Expected:** Status 201 - User registered, verification email sent
**Note:** Check your email for verification link (including spam folder)

### 2. Register Second User
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/register`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "username": "testuser2",
  "email": "test2@example.com",
  "password": "TestUser123!"
}
```
**Expected:** Status 201 - User successfully registered

### 3. Test Registration with Invalid Data
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/register`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "username": "test",
  "email": "invalid-email",
  "password": "weak"
}
```
**Expected:** Status 400 - Validation error

### 4. Test Duplicate Registration
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/register`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "TestUser123!"
}
```
**Expected:** Status 409 - Email already registered

### 5. Verify Email Address  
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/auth/verify-email?token=YOUR_VERIFICATION_TOKEN`  
**Expected:** Status 200 - Email verified successfully
**Note:** Get the token from the verification email

### 6. Resend Verification Email
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/resend-verification`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "email": "test@example.com"
}
```
**Expected:** Status 200 - Verification email resent

### 7. Try Login Before Email Verification
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/login`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "email": "test2@example.com",
  "password": "TestUser123!"
}
```
**Expected:** Status 401 - Please verify your email before logging in

### 8. Login First User (After Verification)
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/login`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "email": "test@example.com",
  "password": "TestUser123!"
}
```
**Expected:** Status 200 - Login successful with token
**Note:** This should automatically set the `token` environment variable

### 9. Test Login with Invalid Credentials
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/login`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "email": "test@example.com",
  "password": "wrongpassword"
}
```
**Expected:** Status 401 - Invalid credentials

### 10. Get Own Profile
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/auth/profile`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - User profile returned (without password)

### 11. Update Profile
**Method:** `PUT`  
**URL:** `{{baseUrl}}/api/auth/profile`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "username": "UpdatedUsername"
}
```
**Expected:** Status 200 - Profile updated successfully

### 12. Test Unauthorized Profile Access
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/auth/profile`  
**Headers:** (No Authorization header)  
**Expected:** Status 401 - Token missing

### 13. Create Post (Text Only)
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/posts`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "text": "This is my first post! 🚀 #ThreadUp"
}
```
**Expected:** Status 201 - Post created successfully
**Note:** This should automatically set the `postId` environment variable

### 14. Create Post with Image (Integrated Upload)
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/posts`  
**Headers:** `Authorization: Bearer {{token}}`  
**Body:** `form-data`
- `text`: "Check out this amazing photo! 📸"
- `image`: [Select image file]
**Expected:** Status 201 - Post with image created successfully  
**Note:** Image automatically uploaded to Cloudinary in 'post-images' folder

### 15. Create Additional Posts for Feed
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/posts`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "text": "Second post for more content! 📝 What do you think about social media?"
}
```
**Expected:** Status 201 - Post created

### 16. Test Empty Post Creation
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/posts`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "text": ""
}
```
**Expected:** Status 400 - Text is required

### 17. Test Unauthorized Post Creation
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/posts`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "text": "This should fail - no authentication token provided"
}
```
**Expected:** Status 401 - Token missing

### 18. Test Invalid Token Post Creation
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/posts`  
**Headers:** 
- `Content-Type: application/json`
- `Authorization: Bearer invalid_fake_token_12345`  
**Body:**
```json
{
  "text": "This should fail - invalid token"
}
```
**Expected:** Status 401 - Token invalid

### 19. Get All Posts (Feed)
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts`  
**Expected:** Status 200 - Array of posts with pagination info

### 20. Get Posts with Pagination
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts?page=1&limit=2`  
**Expected:** Status 200 - Maximum 2 posts returned

### 21. Get Specific Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts/{{postId}}`  
**Expected:** Status 200 - Single post details

### 22. Get Non-existent Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts/507f1f77bcf86cd799439011`  
**Expected:** Status 404 - Post not found

### 23. Like a Post
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Post liked

### 24. Get Like Status
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Expected:** Status 200 - Like status and count

### 25. Unlike Post (Toggle)
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Post unliked

### 26. Like Post Again
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Post liked again

### 27. Test Unauthorized Like
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Headers:** (No Authorization header)  
**Expected:** Status 401 - Token missing

### 28. Like Non-existent Post
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/507f1f77bcf86cd799439011`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 404 - Post not found

### 29. Add First Comment
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/comments/post/{{postId}}`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "text": "This is a great post! 👍 Very interesting!"
}
```
**Expected:** Status 201 - Comment created
**Note:** This should automatically set the `commentId` environment variable

### 30. Add Second Comment
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/comments/post/{{postId}}`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "text": "I agree! 🤔 What do you think about the future?"
}
```
**Expected:** Status 201 - Comment created

### 31. Add Third Comment
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/comments/post/{{postId}}`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "text": "Great discussion here! 💬"
}
```
**Expected:** Status 201 - Comment created

### 32. Test Empty Comment
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/comments/post/{{postId}}`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "text": ""
}
```
**Expected:** Status 400 - Comment text is required

### 33. Test Unauthorized Comment
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/comments/post/{{postId}}`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "text": "This should fail"
}
```
**Expected:** Status 401 - Token missing

### 34. Comment on Non-existent Post
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/comments/post/507f1f77bcf86cd799439011`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "text": "This should fail"
}
```
**Expected:** Status 404 - Post not found

### 35. Get Comments for Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/comments/post/{{postId}}`  
**Expected:** Status 200 - Array of comments

### 36. Get Comments for Non-existent Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/comments/post/507f1f77bcf86cd799439011`  
**Expected:** Status 404 - Post not found

### 37. Upload Profile Image
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/upload/profile`  
**Headers:** `Authorization: Bearer {{token}}`  
**Body (form-data):**
- `profileImage`: [Select an image file]  
**Expected:** Status 200 - Profile image uploaded to Cloudinary
**Note:** Image uploaded to 'profile-images' folder

### 38. Upload Post Image (Separate Upload)
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/upload/post`  
**Headers:** `Authorization: Bearer {{token}}`  
**Body (form-data):**
- `postImage`: [Select an image file]  
**Expected:** Status 200 - Post image uploaded to Cloudinary
**Note:** Image uploaded to 'post-images' folder

### 39. Upload Invalid File Type
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/upload/profile`  
**Headers:** `Authorization: Bearer {{token}}`  
**Body (form-data):**
- `profileImage`: [Select a non-image file like .txt or .pdf]  
**Expected:** Status 400 - Only image files allowed

### 40. Upload Without File
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/upload/profile`  
**Headers:** `Authorization: Bearer {{token}}`  
**Body (form-data):** (empty)  
**Expected:** Status 400 - No file uploaded

### 41. Get Updated Feed
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts`  
**Expected:** Status 200 - Updated feed with all posts

### 42. Delete Comment
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/comments/{{commentId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Comment deleted

### 43. Delete Non-existent Comment
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/comments/507f1f77bcf86cd799439011`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 404 - Comment not found

### 44. Test Unauthorized Comment Deletion
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/comments/{{commentId}}`  
**Headers:** (No Authorization header)  
**Expected:** Status 401 - Token missing

### 45. Delete Post
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/posts/{{postId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Post deleted

### 46. Delete Non-existent Post
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/posts/507f1f77bcf86cd799439011`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 404 - Post not found

### 47. Test Unauthorized Post Deletion
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/posts/{{postId}}`  
**Headers:** (No Authorization header)  
**Expected:** Status 401 - Token missing

### 48. Try to Access Deleted Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts/{{postId}}`  
**Expected:** Status 404 - Post not found

### 49. Logout
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/logout`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Successfully logged out

### 50. Test Access After Logout
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/auth/profile`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 401 - Token invalid (if using cookie-based auth)

---

## Test Execution Order

For best results, run tests in this sequence:

### Phase 1: Authentication & User Management (Tests 1-12)
1. Register users with email verification
2. Verify emails and login
3. Profile management and unauthorized access tests

### Phase 2: Post Management (Tests 13-22)
1. Create posts with different content types (text-only and with images)
2. Test validation and authorization
3. Retrieve posts and pagination

### Phase 3: Social Interactions (Tests 23-41)
1. Like/unlike functionality
2. Comment system
3. File upload functionality

### Phase 4: Content Management & Cleanup (Tests 42-50)
1. Delete comments and posts
2. Test access to deleted content
3. Logout and session management

---

## Expected Response Examples

### Successful Registration
```json
{
  "message": "User registered successfully! Please check your email to verify your account.",
  "user": {
    "_id": "66c123456789abcdef123456",
    "username": "testuser",
    "email": "test@example.com",
    "verified": false
  }
}
```

### Successful Login
```json
{
  "message": "Successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "66c123456789abcdef123456",
    "username": "testuser",
    "email": "test@example.com",
    "roles": ["USER"],
    "permissions": ["VIEWER_USER", "UPDATE_USER"],
    "verified": true
  }
}
```

### Post Creation Response
```json
{
  "message": "Post successfully created",
  "post": {
    "_id": "66c123456789abcdef123457",
    "authorId": {
      "_id": "66c123456789abcdef123456",
      "username": "testuser"
    },
    "text": "This is my first post! 🚀 #ThreadUp",
    "imageUrl": null,
    "likeCount": 0,
    "createdAt": "2025-08-18T10:30:00.000Z",
    "updatedAt": "2025-08-18T10:30:00.000Z"
  }
}
```

### Post with Image Response
```json
{
  "message": "Post successfully created",
  "post": {
    "_id": "66c123456789abcdef123457",
    "authorId": {
      "_id": "66c123456789abcdef123456",
      "username": "testuser"
    },
    "text": "Check out this amazing photo! 📸",
    "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/threadup/post-images/abc123.jpg",
    "imagePublicId": "threadup/post-images/abc123",
    "likeCount": 0,
    "createdAt": "2025-08-18T10:30:00.000Z",
    "updatedAt": "2025-08-18T10:30:00.000Z"
  }
}
```

### Upload Response
```json
{
  "message": "Profile image uploaded successfully",
  "profileImage": {
    "public_id": "threadup/profile-images/def456",
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/threadup/profile-images/def456.jpg",
    "original_name": "my-avatar.jpg",
    "size": 245760,
    "format": "jpg"
  }
}
```

### Feed Response
```json
{
  "posts": [
    {
      "_id": "66c123456789abcdef123457",
      "authorId": {
        "_id": "66c123456789abcdef123456",
        "username": "testuser"
      },
      "text": "This is my first post! 🚀",
      "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/threadup/post-images/abc123.jpg",
      "likeCount": 1,
      "commentsCount": 2,
      "isLiked": true,
      "createdAt": "2025-08-18T10:30:00.000Z",
      "updatedAt": "2025-08-18T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalPosts": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### Common Error Responses

#### Unauthorized (401)
```json
{
  "message": "Token missing",
  "statusCode": 401
}
```

#### Validation Error (400)
```json
{
  "message": "Text is required",
  "statusCode": 400
}
```

#### Not Found (404)
```json
{
  "message": "Post not found",
  "statusCode": 404
}
```

#### Conflict (409)
```json
{
  "message": "This email is already registered",
  "statusCode": 409
}
```

---

## Technical Notes

- **Email Verification:** Required for new user registration using Resend.com
- **Token Expiry:** JWT tokens expire after 15 minutes (900 seconds)
- **File Uploads:** Maximum 10MB per file, images only (JPEG, PNG, GIF, WEBP)
- **Cloud Storage:** Cloudinary integration with organized folders:
  - `profile-images/` - User profile pictures
  - `post-images/` - Post attachments
  - `general/` - Other uploads
- **Integrated Upload:** POST /api/posts supports both text and image in single request
- **Separate Upload Endpoints:** Available for specific use cases (profile images, etc.)
- **Text Limits:** Posts max 500 characters, comments max 200 characters
- **Pagination:** Default 20 posts per page
- **Security:** All write operations require valid JWT authentication
- **Database:** MongoDB with proper indexing for performance
- **Email Templates:** HTML email templates for verification
- **File Cleanup:** Temporary files automatically deleted after Cloudinary upload

---

## Troubleshooting

### Common Issues:
1. **401 Errors**: Check if token is properly set in environment variables
2. **404 Errors**: Verify the correct base URL and port (3005)
3. **Email Verification**: Check spam folder for verification emails
4. **File Upload Fails**: Ensure Cloudinary credentials are configured properly
5. **MongoDB Connection**: Verify MongoDB is running locally
6. **Server Won't Start**: Check all required environment variables are set
7. **Image Upload Errors**: Verify file is an image and under 10MB limit

### Required Environment Variables:
```
PORT=3005
MONGODB_URL=mongodb://localhost:27017/threadup
JWT_SECRET=your-super-secret-jwt-key-here
RESEND_API_KEY=your-resend-api-key
FRONTEND_URL=http://localhost:3005
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Debug Tips:
1. Check server console for detailed error logs
2. Verify MongoDB connection status
3. Test with curl commands if Postman issues persist
4. Ensure `temp/uploads/` directory exists
5. Verify Cloudinary credentials with a simple test upload
6. Clear cookies if authentication behaves unexpectedly