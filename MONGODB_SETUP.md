# MongoDB Setup Instructions

## Option 1: Local MongoDB Installation (Windows)

1. **Download MongoDB Community Server**: https://www.mongodb.com/try/download/community
2. **Run the installer** and choose "Complete" installation
3. **Install MongoDB Compass** (GUI tool) - optional but recommended
4. **Start MongoDB service**:
   - Open Command Prompt as Administrator
   - Run: `net start MongoDB`

## Option 2: Docker (Recommended for Development)

1. **Install Docker Desktop** from https://www.docker.com/products/docker-desktop
2. **Run MongoDB container**:
   ```bash
   docker run --name foundry-mongodb -p 27017:27017 -d mongo:latest
   ```

## Option 3: MongoDB Atlas (Cloud Database)

1. **Sign up** at https://www.mongodb.com/cloud/atlas
2. **Create a free cluster**
3. **Get your connection string** and update the .env file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foundry
   ```

## Verificationn

After setup, verify MongoDB is running:

```bash
# If using local installation
mongosh

# If using Docker
docker exec -it foundry-mongodb mongosh

# If using Atlas
mongosh "your-connection-string"
```

## Database Schema

The application will automatically create the following collections:

- `items`: Stores lost and found item reports
- `users`: Stores user authentication data

Each item document will have:
```javascript
{
  "_id": ObjectId,
  "itemType": "Phone|Wallet|Keys|...",
  "description": "Item description",
  "location": "Where it was lost/found",
  "dateLost/dateFound": Date,
  "contactInfo": "Email/phone",
  "imageUrl": "Cloudinary URL",
  "reportType": "lost|found",
  "status": "active|resolved",
  "itemId": "AI-generated ID",
  "matches": [matched_items],
  "createdAt": Date,
  "updatedAt": Date
}
```
