# ThreadUp Backend Server

A modern social media platform backend built with Node.js, Express, MongoDB, and TypeScript.

## 🚀 Quick Start

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

## 🔧 Environment Variables

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

## 🛡️ Admin Privileges Management

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
import mongoose from 'mongoose';
import User from './src/models/user.js';
import config from './src/config/config.js';

const makeUserAdmin = async (identifier, isEmail = true) => {
  try {
    // Connect to database
    await mongoose.connect(config.MONGODB_URL);
    console.log('Connected to MongoDB');

    // Find user by email or username
    const query = isEmail ? { email: identifier } : { username: identifier };
    const user = await User.findOne(query);

    if (!user) {
      console.log('User not found');
      return;
    }

    // Update user roles and permissions
    user.roles = ["USER", "ADMIN"];
    user.permissions = [
      "VIEWER_USER", 
      "UPDATE_USER", 
      "DELETE_ANY_POST", 
      "DELETE_ANY_COMMENT", 
      "MODERATE_CONTENT"
    ];

    await user.save();

    console.log(`✅ User ${user.email} (${user.username}) is now an admin!`);
    console.log('Updated roles:', user.roles);
    console.log('Updated permissions:', user.permissions);

  } catch (error) {
    console.error('Error making user admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Usage examples:
// Make user admin by email
makeUserAdmin('admin@example.com', true);

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
5. **Check the confirmation modals** show admin-specific messaging

### Admin Features

Users with admin privileges will see:

- **Purple admin badge** next to their name in posts and comments
- **Delete buttons** on all posts and comments throughout the platform
- **"Delete (Admin)" text** on delete buttons for content they don't own
- **Admin-specific confirmation messages** when deleting content
- **Logging indicators** for admin actions

### Important Notes

⚠️ **Security Warning**: Only give admin privileges to trusted users, as they can delete any content on your platform.

✅ **No Restart Required**: Changes take effect immediately - the user just needs to refresh their browser or log out and back in.

🔍 **Verify Success**: You can check if it worked by looking for the purple admin badge next to the user's name in the UI.

## 📚 Documentation

- [API Testing Guide](./POSTMAN_TESTING.md) - Complete Postman testing instructions
- [API Reference](./docs/API.md) - Detailed API documentation (if you have this)
- [Database Schema](./docs/SCHEMA.md) - Database models and relationships (if you have this)

## 🏗️ Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── temp/                # Temporary file storage
├── public/              # Static files
└── docs/                # Additional documentation
```

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm test           # Run tests
npm run lint       # Run linter
```

## 🚀 Deployment

### Production Setup

1. Set production environment variables
2. Build the application: `npm run build`
3. Start the server: `npm start`

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3005
MONGODB_URL=your-production-mongodb-url
JWT_SECRET=your-secure-jwt-secret
RESEND_API_KEY=your-resend-api-key
FRONTEND_URL=your-frontend-domain
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📞 Support

For issues and questions:
- Check the [API Testing Guide](./POSTMAN_TESTING.md)
- Review server logs for error details
- Ensure all environment variables are properly configured