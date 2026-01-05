# Spell Finder - YouTube Context Extension

Chrome extension for finding word pronunciation examples in real YouTube videos using YouGlish.

## 🌐 Links

- **Blog Article**: [https://eugene.web-atelier.ru/education/spell-finder.html](https://eugene.web-atelier.ru/education/spell-finder.html)
- **Chrome Web Store**: *(coming soon)*

## ✨ Features

- Context menu integration for quick word lookup
- Side panel interface with YouTube video examples
- Support for English and Russian languages
- Dark theme with modern UI
- Powered by YouGlish API

## 🛠️ Development

### Local Installation

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable **Developer Mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `spell-finder-extension` folder

### Tech Stack

- **Manifest V3** - Latest Chrome extension standard
- **YouGlish API** - Real pronunciation examples from YouTube
- **Vanilla JavaScript** - No frameworks, pure JS
- **CSS3** - Modern styling with dark theme

## 📁 Project Structure

```
spell-finder-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for context menu
├── sidepanel.html         # Side panel UI
├── sidepanel.js           # Side panel logic
├── youglish-widget.js     # YouGlish widget integration
├── assets/                # Icons (16, 32, 48, 96, 128, 256)
└── README.md              # This file
```

## 🚀 Usage

1. Select any word on a webpage
2. Right-click and choose **"Spell Finder: примеры '[word]' на YouTube"**
3. Side panel opens with video examples
4. Or click the extension icon to search manually

## 📝 License

Open Source

---

**Made with ❤️ for language learners**
