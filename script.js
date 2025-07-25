class SmartNotesOrganizer {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isRecording = false;
        this.initializeEventListeners();
        this.subjectKeywords = {
            'Math': ['equation', 'formula', 'theorem', 'calculate', 'algebra', 'geometry', 'calculus', 'derivative', 'integral', 'logarithm', 'trigonometry', 'matrix', 'vector', 'polynomial', 'function'],
            'Physics': ['force', 'energy', 'momentum', 'velocity', 'acceleration', 'gravity', 'quantum', 'wave', 'frequency', 'amplitude', 'electromagnetic', 'thermodynamics', 'mechanics', 'optics'],
            'Chemistry': ['molecule', 'atom', 'element', 'compound', 'reaction', 'bond', 'periodic', 'acid', 'base', 'oxidation', 'reduction', 'catalyst', 'solution', 'concentration'],
            'Biology': ['cell', 'organism', 'evolution', 'genetics', 'DNA', 'protein', 'enzyme', 'metabolism', 'photosynthesis', 'ecosystem', 'species', 'anatomy', 'physiology'],
            'History': ['war', 'revolution', 'empire', 'civilization', 'century', 'ancient', 'medieval', 'renaissance', 'industrial', 'democracy', 'treaty', 'colonialism'],
            'Literature': ['character', 'plot', 'theme', 'metaphor', 'symbolism', 'narrative', 'author', 'novel', 'poetry', 'drama', 'literary', 'analysis'],
            'Computer Science': ['algorithm', 'data structure', 'programming', 'software', 'hardware', 'database', 'network', 'binary', 'recursion', 'complexity', 'debugging', 'API'],
            'Economics': ['market', 'supply', 'demand', 'inflation', 'GDP', 'recession', 'investment', 'profit', 'revenue', 'competition', 'monopoly', 'fiscal'],
            'Psychology': ['behavior', 'cognitive', 'learning', 'memory', 'perception', 'personality', 'therapy', 'mental health', 'development', 'social psychology']
        };
    }

    initializeEventListeners() {
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileUpload(e));
        document.getElementById('recordBtn').addEventListener('click', () => this.toggleRecording());
    }

    async handleFileUpload(event) {
        const files = Array.from(event.target.files);
        this.showProcessingIndicator();

        for (const file of files) {
            try {
                const result = await this.processFile(file);
                this.displayResult(result);
            } catch (error) {
                this.showError(`Error processing ${file.name}: ${error.message}`);
            }
        }

        this.hideProcessingIndicator();
    }

    async processFile(file) {
        const fileType = this.detectFileType(file);
        let extractedText = '';

        switch (fileType) {
            case 'image':
                extractedText = await this.performOCR(file);
                break;
            case 'pdf':
                extractedText = await this.extractPDFText(file);
                break;
            case 'audio':
                extractedText = await this.performSpeechToText(file);
                break;
            default:
                throw new Error('Unsupported file type');
        }

        return this.organizeContent(extractedText, file);
    }

    detectFileType(file) {
        const mimeType = file.type;
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType === 'application/pdf') return 'pdf';
        if (mimeType.startsWith('audio/')) return 'audio';
        return 'unknown';
    }

    async performOCR(file) {
        try {
            const { data: { text } } = await Tesseract.recognize(file, 'eng', {
                logger: m => console.log(m)
            });
            return this.cleanExtractedText(text);
        } catch (error) {
            throw new Error('OCR processing failed');
        }
    }

    async extractPDFText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const pdf = await pdfjsLib.getDocument({ data: e.target.result }).promise;
                    let fullText = '';
                    
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += pageText + '\n';
                    }
                    
                    resolve(this.cleanExtractedText(fullText));
                } catch (error) {
                    reject(new Error('PDF text extraction failed'));
                }
            };
            reader.readAsArrayBuffer(file);
        });
    }

    async performSpeechToText(file) {
        // Simulated speech-to-text (in real implementation, you'd use Web Speech API or external service)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("This is simulated speech-to-text output. In a real implementation, this would use the Web Speech API or an external service like Google Speech-to-Text.");
            }, 2000);
        });
    }

    cleanExtractedText(text) {
        return text
            .replace(/\s+/g, ' ')
            .replace(/[^\w\s.,!?;:()\-]/g, '')
            .trim();
    }

    organizeContent(text, file) {
        const subject = this.detectSubject(text);
        const summaryPoints = this.generateSummaryPoints(text);
        const title = this.generateTitle(text, file.name);
        const date = this.estimateDate(file);
        const tags = this.generateTags(text, subject);

        return {
            title,
            date,
            subject,
            summary_points: summaryPoints,
            full_text: text,
            tags
        };
    }

    detectSubject(text) {
        const textLower = text.toLowerCase();
        let maxScore = 0;
        let detectedSubject = 'General';

        for (const [subject, keywords] of Object.entries(this.subjectKeywords)) {
            const score = keywords.reduce((acc, keyword) => {
                const matches = (textLower.match(new RegExp(keyword, 'g')) || []).length;
                return acc + matches;
            }, 0);

            if (score > maxScore) {
                maxScore = score;
                detectedSubject = subject;
            }
        }

        return detectedSubject;
    }

    generateSummaryPoints(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
        const points = [];

        // Simple extractive summarization
        for (let i = 0; i < Math.min(5, sentences.length); i++) {
            const sentence = sentences[i].trim();
            if (sentence.length > 30) {
                points.push(sentence);
            }
        }

        return points.length > 0 ? points : ['Content extracted successfully'];
    }

    generateTitle(text, filename) {
        const words = text.split(' ').slice(0, 8);
        let title = words.join(' ');
        
        if (title.length > 50) {
            title = title.substring(0, 47) + '...';
        }
        
        return title || filename.split('.')[0];
    }

    estimateDate(file) {
        if (file.lastModified) {
            return new Date(file.lastModified).toISOString().split('T')[0];
        }
        return new Date().toISOString().split('T')[0];
    }

    generateTags(text, subject) {
        const textLower = text.toLowerCase();
        const tags = new Set([subject.toLowerCase()]);
        
        // Add relevant keywords as tags
        const keywords = this.subjectKeywords[subject] || [];
        keywords.forEach(keyword => {
            if (textLower.includes(keyword)) {
                tags.add(keyword);
            }
        });

        return Array.from(tags).slice(0, 6);
    }

    displayResult(result) {
        const resultsContainer = document.getElementById('results');
        
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        
        noteCard.innerHTML = `
            <div class="note-title">${result.title}</div>
            <div class="note-meta">
                <span>📚 ${result.subject}</span>
                <span>📅 ${result.date}</span>
            </div>
            <div class="summary-section">
                <h4>Key Points:</h4>
                <ul class="summary-points">
                    ${result.summary_points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
            <div class="tags">
                ${result.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
        `;

        resultsContainer.appendChild(noteCard);

        // Also display JSON output
        const jsonDiv = document.createElement('div');
        jsonDiv.innerHTML = `
            <h4 style="margin: 20px 0 10px 0;">JSON Output:</h4>
            <div class="json-output">${JSON.stringify(result, null, 2)}</div>
        `;
        resultsContainer.appendChild(jsonDiv);
    }

    async toggleRecording() {
        const recordBtn = document.getElementById('recordBtn');
        const recordingStatus = document.getElementById('recordingStatus');

        if (!this.isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                this.audioChunks = [];

                this.mediaRecorder.ondataavailable = (event) => {
                    this.audioChunks.push(event.data);
                };

                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                    const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
                    this.processFile(audioFile).then(result => this.displayResult(result));
                };

                this.mediaRecorder.start();
                this.isRecording = true;
                recordBtn.textContent = '⏹️ Stop Recording';
                recordBtn.classList.add('recording');
                recordingStatus.textContent = 'Recording in progress...';
            } catch (error) {
                this.showError('Microphone access denied or not available');
            }
        } else {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
            this.isRecording = false;
            recordBtn.textContent = '🎤 Start Recording';
            recordBtn.classList.remove('recording');
            recordingStatus.textContent = 'Processing recording...';
        }
    }

    showProcessingIndicator() {
        document.getElementById('processingIndicator').style.display = 'block';
    }

    hideProcessingIndicator() {
        document.getElementById('processingIndicator').style.display = 'none';
    }

    showError(message) {
        const resultsContainer = document.getElementById('results');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        resultsContainer.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new SmartNotesOrganizer();
});
