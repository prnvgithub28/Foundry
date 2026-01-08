# 🔍 FOUNDRY - AI-Powered Lost & Found Platform

> **Smart matching for lost items on campus. Built with React, Node.js, and Python AI services.**

---

## ✨ Features

- **🤖 AI-Powered Smart Matching** - Upload a photo and let our CLIP model find similar items instantly
- **📱 Mobile-Responsive Design** - Works seamlessly on desktop and mobile devices
- **🔍 Advanced Search & Filtering** - Browse items by type, location, and date
- **👥 User Authentication** - Secure login with Firebase
- **☁️ Cloud Storage** - Image hosting via Cloudinary CDN
- **⚡ Real-Time Updates** - Instant notifications for matches

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI components [1](#0-0) 
- **Tailwind CSS** - Utility-first styling [2](#0-1) 
- **React Router v7** - Client-side routing [3](#0-2) 
- **Firebase Auth** - User authentication [4](#0-3) 

### Backend
- **Express.js** - Node.js web framework [5](#0-4) 
- **MongoDB** - Document database [6](#0-5) 
- **Cloudinary** - Image storage & CDN [7](#0-6) 
- **Firebase Admin SDK** - Server-side auth [8](#0-7) 

### AI Services
- **FastAPI** - Python web framework [9](#0-8) 
- **CLIP Model** - Image-text embeddings [10](#0-9) 
- **FAISS** - Vector similarity search [11](#0-10) 

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ [12](#0-11) 
- Python 3.8+ [13](#0-12) 
- MongoDB [14](#0-13) 
- Firebase Project [15](#0-14) 

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prnvgithub28/Foundry.git
   cd Foundry
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Install AI service dependencies**
   ```bash
   cd ../
   pip install -r requirements.txt
   ```

### MongoDB Setup

Choose one of three options:

**Option A: Docker (Recommended)**
```bash
docker run --name foundry-mongodb -p 27017:27017 -d mongo:latest
```

**Option B: Local Installation**
Download from [mongodb.com](https://www.mongodb.com/try/download/community) and start service.

**Option C: MongoDB Atlas**
Create free cluster and update connection string in `.env`.

### Environment Configuration

Create `server/.env` with:
```env
MONGODB_URI=mongodb://localhost:27017/foundry
FASTAPI_URL=http://localhost:8000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Application

Open 4 terminals:

1. **Start MongoDB** (if using Docker)
   ```bash
   docker start foundry-mongodb
   ```

2. **Start Express Backend** (Port 5000)
   ```bash
   cd server
   npm start
   ```

3. **Start FastAPI AI Service** (Port 8000)
   ```bash
   python -m uvicorn app.main:app --reload --port 8000
   ```

4. **Start React Frontend** (Port 3000)
   ```bash
   npm start
   ```

Visit `http://localhost:3000` to use the application.

---

## 📊 Architecture

```mermaid
graph TB
    subgraph "Frontend (React)"
        ReactApp["React Components"]
        Auth["Firebase Auth"]
    end
    
    subgraph "Backend (Express)"
        API["REST API"]
        DB["MongoDB"]
        Cloudinary["Cloudinary"]
    end
    
    subgraph "AI Service (FastAPI)"
        CLIP["CLIP Model"]
        FAISS["FAISS Index"]
    end
    
    ReactApp --> API
    Auth --> API
    API --> DB
    API --> Cloudinary
    API --> CLIP
    CLIP --> FAISS
```

---

## 🔧 API Endpoints

### Backend (Port 5000)
- `POST /api/items/lost` - Report lost item
- `POST /api/items/found` - Report found item
- `GET /api/items/discover` - Browse all items
- `POST /api/upload/upload` - Upload image

### AI Service (Port 8000)
- `POST /report` - Process item with AI
- `GET /` - Health check

---

## 🗄️ Database Schema

Items stored in MongoDB with structure:
```javascript
{
  "_id": ObjectId,
  "itemType": "Phone|Wallet|Keys|...",
  "description": "Item description",
  "location": "Where it was lost/found",
  "imageUrl": "Cloudinary URL",
  "reportType": "lost|found",
  "status": "active|resolved",
  "itemId": "AI-generated ID",
  "embedding": [512-dimensional vector],
  "createdAt": Date,
  "updatedAt": Date
}
```

---

## 🤖 AI Matching Process

1. **Image Upload** - User uploads photo via Cloudinary
2. **Embedding Generation** - CLIP model creates 512-dim vector
3. **Vector Search** - FAISS finds similar items in index
4. **Match Results** - Returns top 5 matches with scores

The FAISS index stores vectors for similarity search and syncs with MongoDB [16](#0-15) .

---

## 🧪 Testing

1. **Test Image Upload**: Try uploading on Lost/Found pages
2. **Test AI Matching**: Submit found item and check matches
3. **Test Database**: Verify items in MongoDB
4. **Test API**: Use Postman/curl for endpoints

---

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Pranav Sanas** 
- **Kartik Kumar** 
- **Naman Khanduja** 
- **Nishant Jaiswal** 

---

## 🙏 Acknowledgments

- **CLIP** by OpenAI for image-text embeddings
- **FAISS** by Facebook for similarity search
- **React** and **Node.js** communities
- Campus community for feedback and testing

---

## Notes

This README is based on the existing documentation in the repository, including the main README.md [17](#0-16) , MongoDB setup guide [18](#0-17) , and integration guide [19](#0-18) . The AI service implementation uses FastAPI with CLIP model integration [20](#0-19)  and FAISS vector indexing [21](#0-20) .

Wiki pages you might want to explore:
- [Getting Started (prnvgithub28/Foundry)](/wiki/prnvgithub28/Foundry#2)
- [Data Storage and Persistence (prnvgithub28/Foundry)](/wiki/prnvgithub28/Foundry#3.4)

### Citations

**File:** README.md (L1-74)
```markdown
# 🔍 **FOUNDRY** — Find What's Lost, Reclaim What's Yours

> **Lost something on campus? Found something you can't identify? ** Foundry is your AI-powered lifeline.  Smart matching.  Zero hassle. 100% campus community-driven.

---

## ✨ **Why Foundry?**

Lost items are a **billion-dollar campus problem**. Students lose textbooks, wallets, phones, and irreplaceable items every single day. Traditional lost & found systems are broken—items get buried, forgotten, or never matched with their owners.

**Foundry changes that.**

With AI-powered image recognition and intelligent matching algorithms, Foundry connects lost items with their owners in **minutes, not months**. Whether you're searching manually or letting our AI do the heavy lifting, we've got your back.

---

## 🎯 **Core Features**

✅ **AI-Powered Smart Matching** — Upload a photo of what you lost, and our AI instantly searches for matches across all found items  
✅ **Manual Discovery** — Browse all lost and found items on campus with real-time filtering  
✅ **Quick Post Creation** — Report a lost or found item in under 30 seconds  
✅ **Real-Time Updates** — Get instant notifications when matches are found  
✅ **User Trust & Safety** — Verified campus accounts, item confirmation, and secure messaging  
✅ **Campus-First Design** — Built specifically for student communities, dormitories, and campus facilities  

---

## 🛠️ **Tech Stack**

### **Frontend**
- React 19 — Modern, responsive UI components
- Tailwind CSS — Beautiful, utility-first styling
- React Router v7 — Seamless navigation
- Axios — API communication
- Firebase Authentication — Secure user login

### **Backend**
- Express.js — Fast, minimalist Node.js framework
- Firebase Admin SDK — Scalable authentication & data management
- MongoDB — Flexible document storage for lost/found items
- Cloudinary — AI-enhanced image uploads & optimization
- CORS & Multer — Cross-origin requests & file uploads

### **AI Services**
- Python-based AI inference engine
- Image classification & matching
- Intelligent item recommendation

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v18 or higher)
- Python 3.8+
- MongoDB (for local development)
- Firebase Project

### **1. Clone & Install**

```bash
git clone https://github.com/prnvgithub28/Foundry.git
cd Foundry

# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install

# Install AI service dependencies
cd ../
```

**File:** app/main.py (L1-87)
```python
from fastapi import FastAPI, Form
from app.utils.id_generator import generate_item_id

from app.ai.clip_model import encode_image_url, encode_text
from app.ai.fusion import fuse_embeddings
from app.ai.faiss_index import add_vector
from app.ai.matcher import find_matches, store_embedding
from app.db.fake_db import insert_item
from app.config import TOP_K

app = FastAPI(title="Lost & Found AI System")


@app.post("/report")
def report_item(
    image_url: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    category: str = Form("general"),
    report_type: str = Form(...)
):
    # Auto-generate item ID
    item_id = generate_item_id(report_type, category)

    try:
        img_emb = encode_image_url(image_url)
    except ValueError as e:
        return {"error": str(e)}

    text_input = f"a photo of {description} at {location}"
    txt_emb = encode_text(text_input)

    # Adaptive fusion
    if len(description.strip()) < 5:
        final_emb = img_emb
    else:
        final_emb = fuse_embeddings(img_emb, txt_emb)

    if report_type == "lost":
        # For lost items, find similar found items to help user find their lost item
        matches = find_matches(final_emb, TOP_K, report_type="found")
        
        # Store the lost item in database with embedding
        insert_item({
            "item_id": item_id,
            "category": category,
            "location": location,
            "reportType": report_type,
            "imageUrl": image_url,
            "description": description,
            "embedding": final_emb.tolist() if hasattr(final_emb, 'tolist') else final_emb
        })

        # Store embedding in FAISS
        add_vector(final_emb, item_id)

        return {
            "status": "success",
            "message": "Lost item reported successfully",
            "item_id": item_id,
            "matches": matches
        }

    elif report_type == "found":
        # For found items, just store them to help others find their lost items
        # Store the found item in database with embedding
        insert_item({
            "item_id": item_id,
            "category": category,
            "location": location,
            "reportType": report_type,
            "imageUrl": image_url,
            "description": description,
            "embedding": final_emb.tolist() if hasattr(final_emb, 'tolist') else final_emb
        })

        # Store embedding in FAISS
        add_vector(final_emb, item_id)

        return {
            "status": "success",
            "message": "Found item reported successfully",
            "item_id": item_id
        }

    return {"error": "Invalid report_type (use 'lost' or 'found')"}
```

**File:** app/ai/faiss_index.py (L1-152)
```python
import faiss
import numpy as np
import os
import json
from app.db.fake_db import get_all_items

DIM = 512
INDEX_PATH = "./data/faiss_index.index"
ID_MAP_PATH = "./data/id_map.json"

# Ensure data directory exists
os.makedirs("./data", exist_ok=True)

# Initialize or load FAISS index
def get_index():
    if os.path.exists(INDEX_PATH):
        print(f"Loading FAISS index from {INDEX_PATH}")
        index = faiss.read_index(INDEX_PATH)
    else:
        print(f"Creating new FAISS index")
        index = faiss.IndexFlatIP(DIM)
    return index

# Initialize or load ID map
def get_id_map():
    if os.path.exists(ID_MAP_PATH):
        print(f"Loading ID map from {ID_MAP_PATH}")
        with open(ID_MAP_PATH, 'r') as f:
            return json.load(f)
    else:
        print(f"Creating new ID map")
        return []

# Global variables
index = get_index()
id_map = get_id_map()

def save_index():
    """Save FAISS index and ID map to disk"""
    print(f"Saving FAISS index to {INDEX_PATH}")
    faiss.write_index(index, INDEX_PATH)
    
    print(f"Saving ID map to {ID_MAP_PATH}")
    with open(ID_MAP_PATH, 'w') as f:
        json.dump(id_map, f, indent=2)

def sync_with_database():
    """Sync FAISS index with database items"""
    print("Syncing FAISS index with database...")
    
    try:
        # Get all items from database
        db_items = get_all_items()
        print(f"Found {len(db_items)} items in database")
        
        # Load existing index and ID map first
        global index, id_map
        current_index = get_index()
        current_id_map = get_id_map()
        
        print(f"Current index has {current_index.ntotal} items")
        print(f"Current ID map has {len(current_id_map)} items")
        
        # Check if we need to rebuild index
        db_item_ids = {item['item_id'] for item in db_items if 'item_id' in item}
        indexed_item_ids = set(current_id_map)
        
        # Find items that are in database but not in index
        missing_items = []
        for item in db_items:
            if item.get('item_id') not in indexed_item_ids and 'embedding' in item and item['embedding']:
                missing_items.append(item)
        
        print(f"Found {len(missing_items)} items not in index")
        
        # Only rebuild if there are missing items or index is empty
        if missing_items or current_index.ntotal == 0:
            if current_index.ntotal == 0:
                print("Index is empty, creating new index...")
                new_index = faiss.IndexFlatIP(DIM)
                new_id_map = []
            else:
                print("Adding missing items to existing index...")
                new_index = current_index
                new_id_map = current_id_map.copy()
            
            # Add missing items to index
            for item in missing_items:
                try:
                    vector = np.array(item['embedding']).astype("float32")
                    new_index.add(vector)
                    new_id_map.append(item['item_id'])
                    print(f"Added item {item['item_id']} to index")
                except Exception as e:
                    print(f"Error adding item {item['item_id']}: {e}")
            
            # Replace global variables
            index = new_index
            id_map = new_id_map
            
            # Save to disk
            save_index()
            print(f"Sync complete: {len(new_id_map)} items in index")
        else:
            print("Index is already up to date")
        
    except Exception as e:
        print(f"Error syncing with database: {e}")

def add_vector(vector, item_id):
    """Add vector to FAISS index and save to disk"""
    global index, id_map
    
    vector = np.array([vector]).astype("float32")
    index.add(vector)
    id_map.append(item_id)
    
    # Save after each addition
    save_index()
    print(f"Added vector for {item_id}, total items: {len(id_map)}")

def search_vectors(query_vector, top_k):
    """Search vectors in FAISS index"""
    if index.ntotal == 0:
        print("FAISS index is empty")
        return []
    
    query_vector = np.array([query_vector]).astype("float32")
    scores, indices = index.search(query_vector, top_k)
    
    results = []
    # Handle different FAISS return formats
    if len(indices.shape) == 1:
        # Single query results
        for idx, score in zip(indices, scores):
            if idx < len(id_map):
                results.append({
                    "item_id": id_map[idx],
                    "score": float(score)
                })
    else:
        # Multiple query results (shouldn't happen with single query)
        for idx, score in zip(indices[0], scores[0]):
            if idx < len(id_map):
                results.append({
                    "item_id": id_map[idx],
                    "score": float(score)
                })
    
    print(f"FAISS search returned {len(results)} results")
    return results

```

**File:** MONGODB_SETUP.md (L1-68)
```markdown
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

**File:** INTEGRATION_GUIDE.md (L1-150)
```markdown
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
```
