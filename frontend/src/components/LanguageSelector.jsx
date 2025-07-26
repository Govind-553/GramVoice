import { useTranslation } from 'react-i18next';
import '../styles/LanguageSelector.css';

export default function LanguageSelector({ language, setLanguage }) {
  const { i18n, t } = useTranslation();

  const options = [
    { code: "hi", label: "Hindi" },
    { code: "mr", label: "Marathi" },
    { code: "bn", label: "Bengali" },
    { code: "en", label: "English" }
  ];

  const handleChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-selector">
      <label>
        🌐 
        {t('language_label')}
        <select value={language} onChange={handleChange}>
          {options.map(opt => (
            <option key={opt.code} value={opt.code}>{opt.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
