# ThreadUp Social Media API - Postman Testing Manual

## Prerequisites

### Backend Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with:
```
PORT=3011
MONGODB_URL=mongodb://localhost:27017/threadup
JWT_SECRET=your-super-secret-jwt-key-here
RESEND_API_KEY=your-resend-api-key
FRONTEND_URL=http://localhost:3000
```
4. Start MongoDB service
5. Create uploads directory: `mkdir uploads`
6. Start server: `npm run dev`

### Postman Environment Setup
Create a new Postman environment called **"ThreadUp Social Media"** with these variables:
- `baseUrl`: `http://localhost:3011`
- `token`: (leave empty - will be set automatically)
- `postId`: (leave empty - will be set automatically)
- `commentId`: (leave empty - will be set automatically)

---

## API Endpoints

### AUTH:
- `POST /api/auth/register` ← Create account
- `POST /api/auth/login` ← Login (sets JWT)
- `POST /api/auth/logout` ← Logout
- `GET /api/auth/profile` ← Get own profile (protected)
- `PUT /api/auth/profile` ← Update profile (protected)

### POSTS:
- `GET /api/posts` ← Get feed (public)
- `GET /api/posts/:id` ← Get specific post (public)
- `POST /api/posts` ← Create post (protected)
- `DELETE /api/posts/:id` ← Delete own post (protected)

### COMMENTS:
- `GET /api/comments/post/:postId` ← Get comments (public)
- `POST /api/comments/post/:postId` ← Add comment (protected)
- `DELETE /api/comments/:id` ← Delete own comment (protected)

### LIKES:
- `GET /api/likes/post/:postId` ← Get like status (public)
- `POST /api/likes/post/:postId` ← Toggle like (protected)

### UPLOAD:
- `POST /api/upload` ← Upload files

---

## Complete Test Collection

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
**Expected:** Status 201 - User successfully registered

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

### 5. Login First User
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

### 6. Test Login with Invalid Credentials
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

### 7. Get Own Profile
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/auth/profile`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - User profile returned (without password)

### 8. Update Profile
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

### 9. Test Unauthorized Profile Access
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/auth/profile`  
**Headers:** (No Authorization header)  
**Expected:** Status 401 - Token missing

### 10. Create Post (Text Only)
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/posts`  
**Headers:** 
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`  
**Body:**
```json
{
  "text": "This is my first post! 🚀 #ThreadUpSocialMedia"
}
```
**Expected:** Status 201 - Post created successfully
**Note:** This should automatically set the `postId` environment variable

### 11. Create Post with Image
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/posts`  
**Headers:** `Authorization: Bearer {{token}}`  
**Body (form-data):**
- `text`: `Check out this amazing image! 📸`
- `image`: [Select an image file from your computer]  
**Expected:** Status 201 - Post with image created

### 12. Create Additional Posts for Feed
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

### 13. Test Empty Post Creation
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

### 14. Test Unauthorized Post Creation
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

### 15. Test Invalid Token Post Creation
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

### 16. Get All Posts (Feed)
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts`  
**Expected:** Status 200 - Array of posts with pagination info

### 17. Get Posts with Pagination
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts?page=1&limit=2`  
**Expected:** Status 200 - Maximum 2 posts returned

### 18. Get Specific Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts/{{postId}}`  
**Expected:** Status 200 - Single post details

### 19. Get Non-existent Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts/507f1f77bcf86cd799439011`  
**Expected:** Status 404 - Post not found

### 20. Like a Post
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Post liked

### 21. Get Like Status
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Expected:** Status 200 - Like status and count

### 22. Unlike Post (Toggle)
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Post unliked

### 23. Like Post Again
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Post liked again

### 24. Test Unauthorized Like
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Headers:** (No Authorization header)  
**Expected:** Status 401 - Token missing

### 25. Like Non-existent Post
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/507f1f77bcf86cd799439011`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 404 - Post not found

### 26. Add First Comment
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

### 27. Add Second Comment
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

### 28. Add Third Comment
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

### 29. Test Empty Comment
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

### 30. Test Unauthorized Comment
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

### 31. Comment on Non-existent Post
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

### 32. Get Comments for Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/comments/post/{{postId}}`  
**Expected:** Status 200 - Array of comments

### 33. Get Comments for Non-existent Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/comments/post/507f1f77bcf86cd799439011`  
**Expected:** Status 404 - Post not found

### 34. Upload File
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/upload`  
**Body (form-data):**
- `profileImage`: [Select an image file]  
**Expected:** Status 200 - File uploaded successfully

### 35. Upload Invalid File Type
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/upload`  
**Body (form-data):**
- `profileImage`: [Select a non-image file like .txt or .pdf]  
**Expected:** Status 400 - Only image files allowed

### 36. Upload Without File
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/upload`  
**Body (form-data):** (empty)  
**Expected:** Status 400 - No file uploaded

### 37. Get Updated Feed
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts`  
**Expected:** Status 200 - Updated feed with all posts

### 38. Delete Comment
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/comments/{{commentId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Comment deleted

### 39. Delete Non-existent Comment
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/comments/507f1f77bcf86cd799439011`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 404 - Comment not found

### 40. Test Unauthorized Comment Deletion
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/comments/{{commentId}}`  
**Headers:** (No Authorization header)  
**Expected:** Status 401 - Token missing

### 41. Delete Post
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/posts/{{postId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Post deleted

### 42. Delete Non-existent Post
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/posts/507f1f77bcf86cd799439011`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 404 - Post not found

### 43. Test Unauthorized Post Deletion
**Method:** `DELETE`  
**URL:** `{{baseUrl}}/api/posts/{{postId}}`  
**Headers:** (No Authorization header)  
**Expected:** Status 401 - Token missing

### 44. Try to Access Deleted Post
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/posts/{{postId}}`  
**Expected:** Status 404 - Post not found

### 45. Try to Comment on Deleted Post
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/comments/post/{{postId}}`  
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

### 46. Try to Like Deleted Post
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/likes/post/{{postId}}`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 404 - Post not found

### 47. Logout
**Method:** `POST`  
**URL:** `{{baseUrl}}/api/auth/logout`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 200 - Successfully logged out

### 48. Test Access After Logout
**Method:** `GET`  
**URL:** `{{baseUrl}}/api/auth/profile`  
**Headers:** `Authorization: Bearer {{token}}`  
**Expected:** Status 401 - Token invalid (if using cookie-based auth)

---

## Test Execution Order

For best results, run tests in this sequence:

### Phase 1: Authentication & User Management (Tests 1-9)
1. Register users and test validation
2. Login and profile management
3. Test unauthorized access

### Phase 2: Post Management (Tests 10-19)
1. Create posts with different content types
2. Test validation and authorization
3. Retrieve posts and pagination

### Phase 3: Social Interactions (Tests 20-37)
1. Like/unlike functionality
2. Comment system
3. File upload functionality

### Phase 4: Content Management (Tests 38-48)
1. Delete comments and posts
2. Test access to deleted content
3. Logout and session management

---

## Expected Response Examples

### Successful Registration
```json
{
  "message": "User successfully registered",
  "user": {
    "_id": "66c123456789abcdef123456",
    "username": "testuser",
    "email": "test@example.com",
    "roles": ["USER"],
    "permissions": ["VIEWER_USER", "UPDATE_USER"],
    "createdAt": "2025-08-18T10:00:00.000Z",
    "updatedAt": "2025-08-18T10:00:00.000Z"
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
    "permissions": ["VIEWER_USER", "UPDATE_USER"]
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
    "text": "This is my first post! 🚀 #ThreadUpSocialMedia",
    "imageUrl": null,
    "likeCount": 0,
    "createdAt": "2025-08-18T10:30:00.000Z",
    "updatedAt": "2025-08-18T10:30:00.000Z"
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
      "imageUrl": null,
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

- **Token Expiry:** JWT tokens expire after 15 minutes (900 seconds)
- **File Uploads:** Maximum 5MB, images only (JPEG, PNG, GIF)
- **Text Limits:** Posts max 500 characters, comments max 200 characters
- **Pagination:** Default 20 posts per page
- **Security:** All write operations require valid JWT authentication
- **Database:** MongoDB with proper indexing for performance
- **File Storage:** Local uploads directory (production should use cloud storage)

---

## Troubleshooting

### Common Issues:
1. **401 Errors**: Check if token is properly set in environment variables
2. **404 Errors**: Verify the correct base URL and port (3011)
3. **File Upload Fails**: Ensure uploads directory exists
4. **MongoDB Connection**: Verify MongoDB is running locally
5. **Environment Variables**: Check all required variables are set in `.env`

### Debug Tips:
1. Check server console for detailed error logs
2. Verify MongoDB connection status
3. Test with curl commands if Postman issues persist
4. Clear cookies if authentication behaves unexpectedly