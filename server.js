const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
    }
  }
});

// Simulate AI analysis (replace with actual xAI API call)
function simulateAnalysis() {
  const probability = Math.floor(Math.random() * 86) + 15; // 15-100%
  
  let stage, reasoning;
  
  if (probability < 30) {
    stage = "No Visible Signs";
    reasoning = "Clear skin appearance with normal venous patterns. No visible spider veins, reticular veins, or varicose veins detected. Skin coloration appears normal without signs of chronic venous insufficiency.";
  } else if (probability < 50) {
    stage = "Stage 1 – Spider Veins";
    reasoning = "Small, thin web-like veins visible on skin surface. These telangiectasias appear as red or blue thread-like patterns. Primarily cosmetic concern with minimal clinical significance.";
  } else if (probability < 70) {
    stage = "Stage 2 – Reticular Veins";
    reasoning = "Blue-green veins 1-3mm in diameter visible beneath skin. May indicate early venous insufficiency. Patient might experience mild leg heaviness or aching symptoms.";
  } else {
    stage = "Stage 3 – Varicose Veins";
    reasoning = "Prominent bulging, rope-like veins ≥3mm diameter clearly visible. These tortuous veins indicate significant venous insufficiency and may cause pain, swelling, and leg heaviness.";
  }
  
  return {
    probability,
    stage,
    reasoning,
    timestamp: new Date().toISOString()
  };
}

// API endpoint for image analysis
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get analysis result
    const analysis = simulateAnalysis();
    
    res.json({
      success: true,
      analysis: analysis
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`VenoScan server running on port ${PORT}`);
});