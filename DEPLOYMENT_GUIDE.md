# Deployment Guide - Render

This guide provides step-by-step instructions for deploying the Smart Complaint Management System backend and frontend separately on Render.

## Prerequisites

1. **GitHub Account**: Your code must be pushed to GitHub (already done: https://github.com/kush1246/ese.git)
2. **MongoDB Atlas Account**: Free MongoDB database for production
3. **Render Account**: Free account at https://render.com

## Step 1: Setup MongoDB Atlas (Required for Backend)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or login
3. Click "Build a Database"
4. Choose "Free" plan and click "Create"
5. Select a cloud provider (AWS) and region (closest to you)
6. Set cluster name (e.g., "smart-complaint-cluster")
7. Click "Create Cluster"
8. Wait for cluster to be created (2-5 minutes)
9. Click "Connect" → "Connect your application"
10. Copy the connection string (format: `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`)
11. Replace `<username>` and `<password>` with your actual credentials
12. Note this connection string - you'll need it for Render

## Step 2: Deploy Backend on Render

### 2.1 Create Backend Service

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub account if not already connected
4. Select the repository: `kush1246/ese`
5. **Important**: Set the root directory to `backend`
   - Click "Advanced" → "Root Directory"
   - Enter: `backend`
6. Configure the service:
   - **Name**: `smart-complaint-backend`
   - **Region**: Select region closest to you
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### 2.2 Add Environment Variables

Scroll down to "Environment Variables" and add:

1. **PORT**: `5000`
2. **MONGODB_URI**: Paste your MongoDB Atlas connection string
   - Example: `mongodb+srv://myuser:mypassword@cluster.mongodb.net/smart-complaint-db?retryWrites=true&w=majority`
3. **JWT_SECRET**: Generate a secure random string
   - You can use: https://www.random.org/strings/
   - Example: `your_secure_jwt_secret_key_1234567890`
4. **AI_API_KEY**: Your AI API key (if using external AI service)
   - For now, you can use: `dummy_key` (the AI is simulated in the backend)

### 2.3 Deploy Backend

1. Click "Create Web Service"
2. Wait for deployment (2-5 minutes)
3. Once deployed, you'll see a live URL like: `https://smart-complaint-backend.onrender.com`
4. **Copy this URL** - you'll need it for frontend configuration

### 2.4 Test Backend

1. Click the URL to open your backend
2. You should see: `{"message": "Smart Complaint Management System API is running"}`
3. Test API endpoint: `https://smart-complaint-backend.onrender.com/api/complaints`
   - Should return: `{"success": false, "message": "Not authorized, no token"}` (this is expected)

## Step 3: Deploy Frontend on Render (Static Site)

### 3.1 Create Frontend Static Site

1. Go back to Render Dashboard: https://dashboard.render.com
2. Click "New +" → "Static Site"
3. Select the same repository: `kush1246/ese`
4. **Important**: Set the root directory to `frontend`
   - Click "Advanced" → "Root Directory"
   - Enter: `frontend`
5. Configure the static site:
   - **Name**: `smart-complaint-frontend`
   - **Region**: Same region as backend
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **No Start Command needed** (static sites don't need a start command)

### 3.2 Add Environment Variables

Scroll down to "Environment Variables" and add:

1. **VITE_API_URL**: Your backend URL from Step 2.4
   - Example: `https://smart-complaint-backend.onrender.com/api`
   - **Important**: Include `/api` at the end

### 3.3 Deploy Frontend

1. Click "Create Static Site"
2. Wait for deployment (2-3 minutes) - faster than web service
3. Once deployed, you'll see a live URL like: `https://smart-complaint-frontend.onrender.com`

### 3.4 Test Frontend

1. Click the URL to open your frontend
2. You should see the login page
3. Try to register a new account
4. Login and test the complaint system

## Step 4: Update Frontend API Configuration (If Needed)

If the frontend can't connect to the backend, you may need to update the API configuration:

### Option 1: Update Environment Variable

1. Go to Render Dashboard
2. Click on your frontend service
3. Scroll to "Environment Variables"
4. Update `VITE_API_URL` to your backend URL
5. Click "Save Changes"
6. Wait for redeployment

### Option 2: Update vite.config.js (If proxy issues)

The frontend already has a proxy configuration in `vite.config.js`. For production on Render, the environment variable should handle this.

## Step 5: Verify Deployment

### Test Complete Flow:

1. **Open Frontend**: `https://smart-complaint-frontend.onrender.com`
2. **Register**: Create a new account
3. **Login**: Login with your credentials
4. **Submit Complaint**: Fill out complaint form
5. **Test AI Analysis**: Click "Analyze with AI" button
6. **View Complaints**: Check the dashboard
7. **Update Status**: Click on a complaint to update status

### Test API Endpoints:

Use Postman or curl to test backend endpoints:

```bash
# Health Check
curl https://smart-complaint-backend.onrender.com/

# Register User
curl -X POST https://smart-complaint-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'

# Login
curl -X POST https://smart-complaint-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## Troubleshooting

### Backend Issues:

**Problem**: Backend won't start
- **Solution**: Check logs in Render Dashboard
- **Common causes**: 
  - Wrong MongoDB connection string
  - Missing environment variables
  - Port conflicts

**Problem**: MongoDB connection error
- **Solution**: 
  - Check MongoDB Atlas whitelist (allow all IP: 0.0.0.0/0)
  - Verify username/password in connection string
  - Ensure cluster is active in MongoDB Atlas

### Frontend Issues:

**Problem**: Frontend can't connect to backend
- **Solution**:
  - Check `VITE_API_URL` environment variable
  - Ensure backend is running
  - Check CORS configuration in backend (already configured)

**Problem**: Build fails
- **Solution**: 
  - Check build logs in Render Dashboard
  - Ensure all dependencies are in package.json

### Common Issues:

**Problem**: 503 Service Unavailable
- **Solution**: Render free tier spins down services after inactivity. Wait 30-60 seconds for it to wake up.

**Problem**: 404 Not Found
- **Solution**: Check if the correct root directory is set (backend or frontend)

## Render Free Tier Limitations

- **Backend**: Spins down after 15 minutes of inactivity (takes ~30 seconds to wake up)
- **Frontend**: Always available
- **Database**: MongoDB Atlas free tier (512MB storage)
- **Bandwidth**: 100GB/month per service

## Production Recommendations

For production deployment, consider:

1. **Upgrade to paid Render plan** for always-on backend
2. **Use environment-specific configuration** (development vs production)
3. **Add monitoring** (Render provides basic logs)
4. **Set up custom domains** (Render supports custom domains)
5. **Enable SSL** (Render provides free SSL certificates)
6. **Add rate limiting** to prevent API abuse
7. **Implement proper error logging**
8. **Set up automated backups** for MongoDB

## URLs After Deployment

After successful deployment, you will have:

- **Backend URL**: `https://smart-complaint-backend.onrender.com`
- **Frontend URL**: `https://smart-complaint-frontend.onrender.com`
- **MongoDB Atlas**: Your cluster URL from MongoDB Atlas dashboard

## Next Steps

1. Share the frontend URL with users
2. Monitor Render Dashboard for any issues
3. Check MongoDB Atlas for database usage
4. Update README.md with live URLs
5. Document any custom configurations

## Support

- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com
- **GitHub Repository**: https://github.com/kush1246/ese.git

---

**Note**: This deployment uses Render's free tier. For production use with high traffic, consider upgrading to paid plans for better performance and reliability.
