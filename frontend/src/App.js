import { useState } from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import MatchDisplay from './components/MatchDisplay';
import VoicePlayer from './components/VoicePlayer';
import LanguageSelector from './components/LanguageSelector';
import axios from 'axios';

import { db, ref, push } from './firebase/firebaseConfig';

function App() {
  const [transcript, setTranscript] = useState('');
  const [mentor, setMentor] = useState(null);
  const [language, setLanguage] = useState('hi');

  const handleTranscript = async (text) => {
    try {
      setTranscript(text);

      // Match mentor via backend
      const res = await axios.post('http://localhost:5000/match', {
        transcript: text,
        language: language
      });

      setMentor(res.data);

      // Store session in Firebase
      const sessionRef = ref(db, 'sessions/');
      push(sessionRef, {
        transcript: text,
        mentor: res.data.mentor_name,
        language: language,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error processing transcript:', error);
      setMentor(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎓 GramVoice: Voice Mentorship for Rural Youth</h1>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <VoiceRecorder language={language} setLanguage={setLanguage} onTranscript={handleTranscript} />
      <MatchDisplay transcript={transcript} mentor={mentor} />
      {mentor?.bio && <VoicePlayer text={mentor.bio} language={language} />}
    </div>
  );
}

export default App;         
