# 🚀 AI Caption Generator

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-DEPLOY-ID/deploy-status)](https://app.netlify.com/sites/gencaption/deploys) 
![GitHub last commit](https://img.shields.io/github/last-commit/Trisha4041/caption-generator)

Generate creative social media captions powered by Google's Gemini AI. Perfect for Instagram, Twitter, LinkedIn, and more!

🔗 **Live Demo:** [gencaption.netlify.app](https://gencaption.netlify.app)


## ✨ Features
- Platform-specific captions (Instagram, Twitter, etc.)
- Custom tone selection (Professional, Witty, etc.)
- Context-aware generation
- One-click copy to clipboard
- Responsive design

## 🛠 Tech Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **AI API**: Google Gemini
- **Hosting**: Netlify (CI/CD)
- **Version Control**: GitHub

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Gemini API key ([Get one here](https://ai.google.dev/))

### Local Setup
```bash
# 1. Clone the repo
git clone https://github.com/Trisha4041/caption-generator.git
cd caption-generator

# 2. Install dependencies
npm install

# 3. Add your API key
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

# 4. Run locally
npm run dev