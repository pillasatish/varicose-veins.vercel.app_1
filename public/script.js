// Global variables
let currentImage = null;
let analysisInProgress = false;

// DOM elements
const uploadZone = document.getElementById('uploadZone');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsPlaceholder = document.getElementById('resultsPlaceholder');
const resultsContent = document.getElementById('resultsContent');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateNavigation();
});

// Event listeners
function initializeEventListeners() {
    // Upload zone events
    uploadZone.addEventListener('click', () => imageInput.click());
    uploadZone.addEventListener('dragover', handleDragOver);
    uploadZone.addEventListener('dragleave', handleDragLeave);
    uploadZone.addEventListener('drop', handleDrop);
    
    // File input change
    imageInput.addEventListener('change', handleFileSelect);
    
    // Navigation
    window.addEventListener('scroll', updateNavigation);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

// Navigation functions
function updateNavigation() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToAnalysis() {
    const analysisSection = document.getElementById('analysis');
    const offsetTop = analysisSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

function toggleMobileMenu() {
    // Mobile menu functionality (to be implemented if needed)
    console.log('Mobile menu toggle');
}

// File handling functions
function handleDragOver(e) {
    e.preventDefault();
    uploadZone.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        showError('Please select a valid image file (JPG, PNG, or WebP)');
        return;
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
        showError('File size must be less than 10MB');
        return;
    }
    
    // Store the file and show preview
    currentImage = file;
    showImagePreview(file);
    enableAnalyzeButton();
}

function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        previewImg.src = e.target.result;
        uploadZone.style.display = 'none';
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    currentImage = null;
    imagePreview.style.display = 'none';
    uploadZone.style.display = 'block';
    imageInput.value = '';
    disableAnalyzeButton();
    resetResults();
}

function enableAnalyzeButton() {
    analyzeBtn.disabled = false;
    analyzeBtn.style.opacity = '1';
}

function disableAnalyzeButton() {
    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = '0.6';
}

// Analysis functions
async function analyzeImage() {
    if (!currentImage || analysisInProgress) return;
    
    analysisInProgress = true;
    showAnalysisLoading();
    
    try {
        const formData = new FormData();
        formData.append('image', currentImage);
        
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            displayResults(result.analysis);
        } else {
            throw new Error(result.error || 'Analysis failed');
        }
        
    } catch (error) {
        console.error('Analysis error:', error);
        showError('Analysis failed. Please try again.');
    } finally {
        analysisInProgress = false;
        hideAnalysisLoading();
    }
}

function showAnalysisLoading() {
    const btnText = analyzeBtn.querySelector('.btn-text');
    const btnLoader = analyzeBtn.querySelector('.btn-loader');
    
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    analyzeBtn.disabled = true;
}

function hideAnalysisLoading() {
    const btnText = analyzeBtn.querySelector('.btn-text');
    const btnLoader = analyzeBtn.querySelector('.btn-loader');
    
    btnText.style.display = 'block';
    btnLoader.style.display = 'none';
    analyzeBtn.disabled = false;
}

function displayResults(analysis) {
    // Hide placeholder and show results
    resultsPlaceholder.style.display = 'none';
    resultsContent.style.display = 'block';
    
    // Update confidence badge
    const confidenceValue = document.getElementById('confidenceValue');
    confidenceValue.textContent = `${analysis.probability}%`;
    
    // Update probability circle
    updateProbabilityCircle(analysis.probability);
    
    // Update stage information
    const stageBadge = document.getElementById('stageBadge');
    const stageText = document.getElementById('stageText');
    const stageDescription = document.getElementById('stageDescription');
    
    stageText.textContent = analysis.stage;
    stageDescription.textContent = getStageDescription(analysis.stage);
    
    // Update stage badge color based on severity
    updateStageBadgeColor(stageBadge, analysis.stage);
    
    // Update medical reasoning
    const reasoningContent = document.getElementById('reasoningContent');
    reasoningContent.textContent = analysis.reasoning;
    
    // Add animation
    resultsContent.classList.add('fade-in-up');
    
    // Scroll to results
    setTimeout(() => {
        resultsContent.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 300);
}

function updateProbabilityCircle(probability) {
    const circle = document.getElementById('progressCircle');
    const probabilityText = document.getElementById('probabilityText');
    
    // Calculate stroke-dashoffset based on probability
    const circumference = 2 * Math.PI * 54; // radius = 54
    const offset = circumference - (probability / 100) * circumference;
    
    // Animate the circle
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
        circle.classList.add('active');
        probabilityText.textContent = `${probability}%`;
    }, 500);
}

function getStageDescription(stage) {
    const descriptions = {
        'No Visible Signs': 'No visible indicators of venous disease detected.',
        'Stage 1 – Spider Veins': 'Thin, web-like veins visible on skin surface. Primarily cosmetic concern.',
        'Stage 2 – Reticular Veins': 'Blue-green veins 1-3mm in diameter. May cause mild symptoms.',
        'Stage 3 – Varicose Veins': 'Bulging, rope-like veins ≥3mm. May cause pain and swelling.',
        'Stage 4 – Skin Changes': 'Pigmentation, eczema, or inflammation indicating chronic venous insufficiency.',
        'Stage 5 – Ulcers': 'Open, non-healing wounds requiring immediate medical attention.'
    };
    
    return descriptions[stage] || 'Stage analysis completed.';
}

function updateStageBadgeColor(badge, stage) {
    // Remove existing color classes
    badge.className = 'stage-badge';
    
    // Add appropriate color class based on stage severity
    if (stage.includes('No Visible Signs')) {
        badge.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (stage.includes('Stage 1')) {
        badge.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    } else if (stage.includes('Stage 2')) {
        badge.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    } else if (stage.includes('Stage 3')) {
        badge.style.background = 'linear-gradient(135deg, #f97316, #ea580c)';
    } else if (stage.includes('Stage 4')) {
        badge.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else if (stage.includes('Stage 5')) {
        badge.style.background = 'linear-gradient(135deg, #991b1b, #7f1d1d)';
    }
}

function resetResults() {
    resultsPlaceholder.style.display = 'block';
    resultsContent.style.display = 'none';
    
    // Reset probability circle
    const circle = document.getElementById('progressCircle');
    const probabilityText = document.getElementById('probabilityText');
    circle.style.strokeDashoffset = '339.292';
    circle.classList.remove('active');
    probabilityText.textContent = '---%';
}

// Utility functions
function showError(message) {
    // Create and show error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <span class="error-message">${message}</span>
            <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add error styles
    errorDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// Add CSS for error notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .error-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #991b1b;
    }
    
    .error-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: #991b1b;
        margin-left: auto;
    }
    
    .error-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// Health check function
async function checkServerHealth() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        console.log('Server health:', data);
    } catch (error) {
        console.error('Server health check failed:', error);
    }
}

// Initialize health check
checkServerHealth();