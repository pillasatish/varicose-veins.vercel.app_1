# VenoScan - AI Varicose Vein Analysis

A modern web application for AI-powered varicose vein detection and staging from leg images. Built with Node.js, Express, and vanilla JavaScript for optimal performance and compatibility.

## 🌟 Features

- 🖼️ **Drag & Drop Image Upload** - Easy-to-use interface with file validation
- 🤖 **AI-Powered Analysis** - Advanced computer vision for medical assessment
- 📊 **Detailed Results** - Probability assessment and stage classification
- 🩺 **Medical-Grade Reasoning** - Comprehensive diagnostic explanations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎭 **Demo Mode** - Fully functional without API keys
- 🔒 **Privacy First** - Images processed securely, never stored

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

The application runs in demo mode by default with simulated AI analysis results.

## 🔧 Configuration

### For Real AI Analysis (Optional)

To enable actual AI-powered analysis using xAI's Grok Vision API:

1. **Get an xAI API key:**
   - Visit [console.x.ai](https://console.x.ai)
   - Sign up or log in
   - Create a new API key

2. **Configure the API key:**
   ```bash
   # Option 1: Environment variable
   export XAI_API_KEY="your-xai-api-key-here"
   
   # Option 2: Update .env file
   echo "XAI_API_KEY=your-xai-api-key-here" >> .env
   ```

3. **Restart the server:**
   ```bash
   npm run dev
   ```

## 📋 Varicose Vein Stages

The application can detect and classify varicose veins across five stages:

- **Stage 1 - Spider Veins**: Thin, web-like veins on skin surface (cosmetic)
- **Stage 2 - Reticular Veins**: Blue-green veins 1-3mm in diameter
- **Stage 3 - Varicose Veins**: Bulging, rope-like veins ≥3mm diameter
- **Stage 4 - Skin Changes**: Pigmentation, eczema, chronic venous insufficiency
- **Stage 5 - Ulcers**: Open, non-healing wounds requiring immediate attention

## 🏗️ Project Structure

```
venoscan-ai/
├── public/
│   ├── index.html      # Main application interface
│   ├── styles.css      # Comprehensive styling
│   └── script.js       # Client-side functionality
├── server.js           # Express server and API endpoints
├── package.json        # Dependencies and scripts
├── .env               # Environment configuration
└── README.md          # Documentation
```

## 🌐 API Endpoints

- `GET /` - Main application interface
- `POST /api/analyze` - Image analysis endpoint
- `GET /api/health` - Server health check

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional medical interface
- **Gradient Animations** - Smooth visual feedback and transitions
- **Progress Indicators** - Real-time analysis progress display
- **Responsive Grid** - Optimized layouts for all screen sizes
- **Accessibility** - WCAG compliant with keyboard navigation
- **Dark Mode Ready** - Prepared for theme switching

## 🔒 Privacy & Security

- **No Data Storage** - Images are processed in memory only
- **Secure Upload** - File validation and size limits
- **CORS Protection** - Configured for secure cross-origin requests
- **Input Sanitization** - All user inputs are validated

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Set build command: `npm run build` (if you add a build script)
3. Set publish directory: `public`
4. Add environment variables in Netlify dashboard

### Other Platforms
- **Heroku**: Add `XAI_API_KEY` to config vars
- **Railway**: Set environment variables in dashboard
- **Render**: Configure environment variables

## 🧪 Demo Mode

When no API key is configured, the application runs in demo mode featuring:
- Realistic simulated analysis results
- Full UI/UX functionality
- Educational varicose vein staging information
- No external API dependencies

## ⚠️ Medical Disclaimer

This application is for educational and informational purposes only. It should not replace professional medical consultation. Always consult with qualified healthcare providers for proper diagnosis and treatment of medical conditions.

## 📄 License

MIT License - Feel free to use and modify for your projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Built with ❤️ for better healthcare accessibility**