import { useTranslation } from 'react-i18next';
import '../styles/MatchDisplay.css';

export default function MatchDisplay({ transcript, mentor }) {
  const { t } = useTranslation();

  return (
    <div className="match-display">
      <h2 className="section-header">📝 {t('transcript_match_heading')}</h2>
      <p><strong>{t('what_you_said')}</strong> {transcript}</p>
      {mentor && (
        <div className="mentor-card">
          <h3>✅ {t('mentor_matched')} {mentor.mentor_name}</h3>
          <p>{mentor.bio}</p>
        </div>
      )}
    </div>
  );
}