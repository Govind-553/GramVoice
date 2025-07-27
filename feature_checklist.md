---

## ✅ Feature Checklist – GramVoice

Below is the implementation checklist for the GramVoice platform.

---

### 🎤 Voice Recording & Transcription

- Voice recording using `mic-recorder-to-mp3`
- Send audio blob to backend
- Convert to `.wav` via **FFmpeg**
- Transcribe with **Whisper** (multilingual support)
- Display transcribed text on frontend

---

### 🤝 Mentor Matching Logic

- Match mentor using **SentenceTransformer** vector similarity
- Pass language and transcript to `matchMentor.py`
- Match only mentors with the same language
- Return mentor **name, bio, and similarity score**

---

### 🗣️ Mentor Voice Playback

- Use **gTTS** to convert matched mentor bio to speech
- Serve MP3 blob from backend
- Stream mentor response on frontend via `<audio>` tag

---

### 🌐 Language Translation (i18next)

- Integrate `react-i18next`
- Locale files for:
  - English (`en`)
  - Hindi (`hi`)
  - Marathi (`mr`)
  - Bengali (`bn`)
- Dynamic translation of all UI text
- Language dropdown selector

---

### 📁 Firebase Integration

- Setup **Firebase Realtime Database**
- Log each session:
  - Transcript
  - Mentor details
  - Timestamp
  - Language used

---

### 💄 UI Enhancements

- Section headers and usage instructions
- Button styles: **Start**, **Stop**, **Play**
- Mentor card with **name**, **bio**, and **match confirmation**
- Audio player preview for recorded input

---

### 🧪 Deployment (Optional)

- Deploy **backend** (e.g., Render, Railway)
- Deploy **frontend** (e.g., Netlify, Vercel)

---
