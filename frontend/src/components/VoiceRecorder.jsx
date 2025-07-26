import { useState } from 'react';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';
import { useTranslation } from 'react-i18next';
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

export default function VoiceRecorder({ onTranscript, language, setLanguage }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
        setLoading(true);

        const formData = new FormData();
        formData.append('audio', blob, 'audio.mp3');
        formData.append('language', language);

        axios.post('http://localhost:5000/transcribe', formData)
          .then((res) => {
            onTranscript(res.data.text);
            setLoading(false);
          })
          .catch((err) => {
            console.error('Transcription error:', err);
            setLoading(false);
          });
      })
      .catch((err) => console.error('Stop recording failed:', err));
  };

  return (
    <div className="recorder-container">
      <div className="section-header">
        <h2>{t('record_section_heading')}</h2>
        <p>{t('record_section_instruction')}</p>
      </div>

      <label className="lang-label">
        🌐 {t('language_label')}
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </label>

      <div className="button-group">
        <button className="record-btn" onClick={startRecording} disabled={isRecording}>🎤 {t('start')}</button>
        <button className="stop-btn" onClick={stopRecording} disabled={!isRecording}>⏹ {t('stop')}</button>
      </div>

      {isRecording && <p className="recording-text">● {t('recording_in_progress')}</p>}
      {loading && <p className="loading-text">⌛ {t('transcribing')}</p>}

      {audioURL && (
        <div className="audio-preview">
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  );
}