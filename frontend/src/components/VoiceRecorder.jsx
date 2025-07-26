import { useState } from 'react';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';
import '../styles/VoiceRecorder.css';

const recorder = new MicRecorder({ bitRate: 128 });

const LANGUAGES = {
  hi: 'Hindi',
  mr: 'Marathi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  en: 'English'
};

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [language, setLanguage] = useState('hi');

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        recorder.start().then(() => setIsRecording(true));
      })
      .catch((err) => console.error('Microphone access denied:', err));
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setIsRecording(false);

        const formData = new FormData();
        formData.append('audio', blob, 'audio.mp3');
        formData.append('language', language);

        axios.post('http://localhost:5000/transcribe', formData)
        .then((res) => {
        console.log("✅ Response from server:", res.data);
        setTranscript(res.data.text);
  })
  .catch((err) => {
    if (err.response) {
      console.error('Backend error:', err.response.data);
    } else {
      console.error('Axios error:', err.message);
    }
  });
})
    .catch((err) => console.error('Stop recording failed:', err));
  };

  return (
    <div className="container">
      <label>
        Select Language:&nbsp;
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={startRecording} disabled={isRecording}>
          🎙 Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          ⏹ Stop Recording
        </button>
      </div>

      {audioURL && (
        <div>
          <audio src={audioURL} controls />
        </div>
      )}

      <p><strong>Transcript:</strong> {transcript}</p>
    </div>
  );
}
