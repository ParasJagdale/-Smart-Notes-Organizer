# 🎓 Smart Notes Organizer

> **Transform your handwritten notes, PDFs, and audio recordings into organized, searchable digital notes with AI-powered subject classification and summarization.**



## ✨ Features

### 📄 Multi-Format Support
- **Images** (JPG, PNG, GIF, WebP) - Handwritten & printed notes
- **PDFs** - Multi-page document processing
- **Audio** (WAV, MP3, M4A) - Voice recordings & lectures
- **Batch Processing** - Handle multiple files simultaneously

### 🔍 Intelligent Processing
- **OCR Technology** - Extract text from handwritten/printed notes using Tesseract.js
- **PDF Text Extraction** - Complete multi-page PDF processing with PDF.js
- **Speech-to-Text** - Convert audio recordings to text (Web Audio API)
- **Smart Text Cleaning** - Automatic noise reduction and error correction

### 🧠 AI-Powered Organization
- **Subject Classification** - Automatic categorization into 9+ subjects
- **Content Summarization** - Extract key points and main ideas
- **Smart Tagging** - Generate relevant keywords automatically
- **Metadata Generation** - Create titles, dates, and structured data

### 🎨 Modern Interface
- **Dark Theme** - Professional, eye-friendly design
- **Responsive Layout** - Works on desktop and mobile devices
- **Drag & Drop** - Intuitive file upload experience
- **Real-time Processing** - Live feedback and progress indicators

## 🚀 Quick Start

### Option 1: Direct Download
1. Download the HTML file from this repository
2. Open `smart-notes-organizer.html` in any modern web browser
3. Start uploading your notes immediately!

### Option 2: Clone Repository
```bash
git clone https://github.com/yourusername/smart-notes-organizer.git
cd smart-notes-organizer
```

**That's it!** No installation, no dependencies, no server setup required.

## 📖 How to Use

### 1. Upload Your Content
- **Click "Choose Files"** to select images, PDFs, or audio files
- **Drag & Drop** files directly onto the upload area
- **Record Audio** using the built-in microphone feature

### 2. Processing Magic ✨
The app automatically:
- Detects file type (image/PDF/audio)
- Extracts text using OCR or PDF parsing
- Converts speech to text for audio files
- Cleans and structures the content

### 3. Get Organized Results
Receive structured JSON output with:
```json
{
  "title": "Generated title from content",
  "date": "2025-07-26",
  "subject": "Math/Physics/Chemistry/etc.",
  "summary_points": ["Key point 1", "Key point 2"],
  "full_text": "Complete extracted text",
  "tags": ["relevant", "keywords"]
}
```

## 🎯 Supported Subjects

| Subject | Keywords Detected |
|---------|------------------|
| **Math** | equation, formula, theorem, algebra, calculus |
| **Physics** | force, energy, momentum, quantum, wave |
| **Chemistry** | molecule, atom, reaction, bond, catalyst |
| **Biology** | cell, DNA, evolution, genetics, organism |
| **History** | war, empire, civilization, revolution |
| **Literature** | character, plot, theme, metaphor, narrative |
| **Computer Science** | algorithm, programming, data structure |
| **Economics** | market, supply, demand, GDP, inflation |
| **Psychology** | behavior, cognitive, memory, therapy |

## 🔧 Technical Architecture

### Frontend Technologies
- **Pure HTML/CSS/JavaScript** - No frameworks required
- **Tesseract.js** - Client-side OCR processing
- **PDF.js** - Browser-based PDF text extraction
- **Web Audio API** - Real-time audio recording

### Key Features
- **100% Client-Side** - No server required, complete privacy
- **Offline Capable** - Works without internet after initial load
- **Zero Dependencies** - Self-contained HTML file
- **Cross-Platform** - Runs on any modern browser

## 🏗️ Project Structure

```
smart-notes-organizer/
├── smart-notes-organizer.html    # Main application file
├── README.md                     # This file
├── LICENSE                       # MIT License
├── CONTRIBUTING.md              # Contribution guidelines
├── screenshots/                 # Demo images
│   ├── upload-interface.png
│   ├── processing-demo.png
│   └── results-display.png
└── docs/                       # Additional documentation
    ├── API.md                  # Technical documentation
    ├── CHANGELOG.md           # Version history
    └── DEPLOYMENT.md          # Deployment guide
```

## 📸 Screenshots

### Upload Interface
![Upload Interface](screenshots/upload-interface.png)

### Processing Demo
![Processing Demo](screenshots/processing-demo.png)

### Results Display
![Results Display](screenshots/results-display.png)

## 🔒 Privacy & Security

- **Complete Privacy** - Files never leave your device
- **No Data Collection** - Zero tracking or analytics
- **Local Processing** - All AI processing happens in your browser
- **No Account Required** - Use immediately without registration

## 🌟 Use Cases

### For Students
- Digitize handwritten lecture notes
- Extract text from photographed textbook pages
- Convert recorded lectures to searchable text
- Organize study materials by subject

### For Researchers
- Process scanned academic papers
- Extract quotes and references
- Organize research notes systematically
- Create searchable knowledge bases

### For Professionals
- Digitize meeting notes and whiteboards
- Process PDF reports and documents
- Convert audio meetings to text summaries
- Organize project documentation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make changes to the HTML file
4. Test in multiple browsers
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## 🐛 Known Limitations

- **No Persistence** - Notes are lost on page refresh (by design for privacy)
- **Speech-to-Text** - Currently simulated (requires external API integration)
- **Subject Detection** - Basic keyword matching (can be enhanced with ML)
- **Large Files** - Browser memory limitations for very large files

## 🔮 Future Enhancements

- [ ] Real speech-to-text integration (Google/Azure APIs)
- [ ] Advanced ML-based subject classification
- [ ] Export functionality (PDF, Word, Markdown)
- [ ] Local storage option with encryption
- [ ] Multi-language OCR support
- [ ] Handwriting recognition improvements
- [ ] Note linking and cross-referencing
- [ ] Search functionality across notes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tesseract.js** - Amazing OCR capabilities
- **PDF.js** - Reliable PDF processing
- **Web APIs** - Modern browser capabilities
- **Open Source Community** - Inspiration and support

## 📞 Support

- 🐛 **Bug Reports**: [Create an Issue](https://github.com/yourusername/smart-notes-organizer/issues)
- 💡 **Feature Requests**: [Start a Discussion](https://github.com/yourusername/smart-notes-organizer/discussions)
- 📧 **Email**: your.email@example.com

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ star on GitHub!

---

**Made with ❤️ for students worldwide**