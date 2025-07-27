import { useTranslation } from 'react-i18next';
import '../styles/MatchDisplay.css';

export default function MatchDisplay({ transcript, mentor }) {
  const { t } = useTranslation();

  return (
    <div className="match-display-container">
      <h2 className="section-title">📝 {t('transcript_match_heading')}</h2>

      <div className="transcript-block">
        <label>{t('what_you_said')}:</label>
        <p className="transcript-text">"{transcript}"</p>
      </div>

      {mentor && mentor.mentor_name ? (
        <div className="mentor-card">
          <div className="mentor-header">
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${mentor.mentor_name}`} alt="Mentor Avatar" />
            <h3>✅ {t('mentor_matched')} <span>{mentor.mentor_name}</span></h3>
          </div>
          <p className="mentor-bio">{mentor.bio}</p>
        </div>
      ) : (
        <div className="no-mentor-card">
          <p>🚫 {t('no_mentor_found') || "No mentor found for the selected language."}</p>
        </div>
      )}
    </div>
  );
}
