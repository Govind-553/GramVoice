import axios from 'axios';

export default function VoicePlayer({ text, language }) {
  const handleGenerate = () => {
    axios.post('http://localhost:5000/tts', { responseText: text, language }, { responseType: 'blob' })
      .then(res => {
        const url = URL.createObjectURL(res.data);
        const audio = new Audio(url);
        audio.play();
      });
  };

  return <button onClick={handleGenerate}>🔊 Play Mentor Voice</button>;
}
