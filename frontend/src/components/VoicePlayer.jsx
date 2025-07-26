import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../styles/VoicePlayer.css';

export default function VoicePlayer({ text, language }) {
  const { t } = useTranslation();

  const handleGenerate = () => {
    axios.post('http://localhost:5000/gtts', { responseText: text, language }, { responseType: 'blob' })
      .then(res => {
        const url = URL.createObjectURL(res.data);
        const audio = new Audio(url);
        audio.play();
      });
  };

  return <button className="play-btn" onClick={handleGenerate}>🔊 {t('play_mentor_response')}</button>;
}