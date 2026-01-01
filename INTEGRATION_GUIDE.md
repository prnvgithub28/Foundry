# Complete Integration Setup Guide

## 🚀 Quick Start

### 1. Setup MongoDB (Choose one option)

#### Option A: Docker (Recommended)
```bash
docker run --name foundry-mongodb -p 27017:27017 -d mongo:latest
```

#### Option B: Local Installation
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service: `net start MongoDB`

#### Option C: MongoDB Atlas (Cloud)
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Update .env with your connection string

### 2. Start All Services

#### Terminal 1: Start Node.js Backend
```bash
cd server
npm start
```

#### Terminal 2: Start FastAPI AI Service
```bash
python -m uvicorn app.main:app --reload --port 8000
```

#### Terminal 3: Start React Frontend
```bash
npm start
```

## 📊 Architecture Flow

```
Frontend (React) → Node.js Backend → MongoDB Database
                     ↓
              FastAPI AI Service
                     ↓
              CLIP Model + FAISS
```

## 🔧 How It Works

### Lost Item Report Flow:
1. User submits lost item form with image
2. Node.js saves to MongoDB database
3. Node.js sends data to FastAPI AI service
4. FastAPI generates embeddings (image + text)
5. FastAPI stores in FAISS vector index
6. Returns success response

### Found Item Report Flow:
1. User submits found item form with image
2. Node.js saves to MongoDB database
3. Node.js sends data to FastAPI AI service
4. FastAPI generates embeddings
5. FastAPI finds top 5 similar lost items
6. Returns matches to frontend
7. Frontend displays potential matches

## 🗄️ Database Schema

### Items Collection
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

## 🤖 AI Features

- **CLIP Model**: Encodes images and text into same embedding space
- **FAISS Index**: Fast similarity search
- **Adaptive Fusion**: Combines image and text embeddings intelligently
- **Top-K Matching**: Returns 5 most similar items

## 📱 Frontend Integration

### Lost Item Page
- Upload image → Cloudinary
- Fill form details
- Submit → Backend → AI Service
- Shows success message

### Found Item Page
- Upload image → Cloudinary  
- Fill form details
- Submit → Backend → AI Service
- Shows potential matches with similarity scores

### Discover Page
- Displays all items from database
- Filterable by type, location, date

## 🔍 API Endpoints

### Node.js Backend (Port 5000)
- `POST /api/items/lost` - Create lost item
- `POST /api/items/found` - Create found item  
- `GET /api/items/discover` - Get all items
- `GET /api/items/lost` - Get lost items
- `GET /api/items/found` - Get found items
- `POST /api/upload/upload` - Upload image
- `DELETE /api/upload/delete/:id` - Delete image

### FastAPI AI Service (Port 8000)
- `POST /report` - Process item with AI
- `GET /` - Health check

## 🛠️ Environment Variables

Update `server/.env`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/foundry

# FastAPI  
FASTAPI_URL=http://localhost:8000

# Cloudinary
CLOUDINARY_CLOUD_NAME=dpwoayuwx
CLOUDINARY_API_KEY=246775176695339
CLOUDINARY_API_SECRET=jIE1FlkQfAA6KXwZI8t3sNXyG3Q
```

## 🧪 Testing

1. **Test Image Upload**: Try uploading an image on Lost/Found pages
2. **Test AI Matching**: Submit a found item and see matches
3. **Test Database**: Check MongoDB for stored items
4. **Test API**: Use Postman/curl to test endpoints

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running on port 27017
- Check connection string in .env
- Try `mongosh` to connect directly

### FastAPI Service Issues  
- Ensure running on port 8000
- Check Python dependencies: `pip install -r requirements.txt`
- Verify CLIP model downloads

### Image Upload Issues
- Check Cloudinary credentials
- Verify image size < 5MB
- Check CORS settings

### AI Matching Issues
- Ensure FAISS index is populated
- Check embeddings generation
- Verify similarity threshold

## 📈 Performance Tips

- Use Redis for caching frequent queries
- Implement pagination for large datasets
- Optimize image sizes before upload
- Use CDN for static assets

## 🔒 Security Considerations

- Validate all user inputs
- Sanitize file uploads
- Rate limit API endpoints
- Use HTTPS in production
- Secure MongoDB with authentication

## 🚀 Deployment

### Docker Compose (Production)
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
  
  backend:
    build: ./server
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
  
  ai-service:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - mongodb
  
  frontend:
    build: .
    ports:
      - "3000:3000"
```

## 📞 Support

If you encounter issues:
1. Check logs in all terminals
2. Verify environment variables
3. Test each service individually
4. Check network connectivity between services
