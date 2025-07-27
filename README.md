# 🎓 GramVoice: Voice Mentorship Platform for Rural Youth

**GramVoice** is a multilingual voice-based mentorship matching web platform built to connect rural students with suitable mentors using voice queries. It transcribes spoken input, detects language, and intelligently recommends mentors based on the query using AI-powered backend logic.

---

## 🌟 Features

- 🎤 Voice input recording and transcription  
- 🧠 AI-powered mentor matching based on spoken queries  
- 🗣️ Mentor response audio generation via TTS  
- 🌐 Language selector with multilingual support (English, Hindi, Marathi, Bengali, Tamil, Telugu, Kannada)  
- 💬 Translated UI text using i18next (`react-i18next`)  
- 🔁 Real-time Firebase database logging for sessions  

---

## 🧰 Tech Stack

| Layer      | Technology                         |
|------------|-------------------------------------|
| Frontend   | React.js                            |
| Backend    | Node.js, Express.js                 |
| AI         | Python (NLP via SentenceTransformer)|
| TTS        | Google Text-to-Speech (`gTTS`)      |
| STT        | Whisper (for voice transcription)   |
| Realtime DB| Firebase                            |
| i18n       | react-i18next                       |

---

## 🔊 Voice Support Notes

| Function       | Tool/Technology        |
|----------------|------------------------|
| Recording      | MicRecorder (Frontend) |
| Transcription  | Whisper (Python)       |
| TTS            | gTTS (Python backend)  |

---

## 🔐 Firebase Setup (Optional)

- Enable **Firebase Realtime Database**
- Enable **Email/Phone Authentication**
- Use Firebase to **store session logs and feedback**

---

## 📦 API Endpoints

| Endpoint       | Method | Description                    |
|----------------|--------|--------------------------------|
| `/transcribe`  | POST   | Transcribes uploaded audio     |
| `/match`       | POST   | Returns matched mentor         |
| `/tts`         | POST   | Generates mentor voice response |

---
