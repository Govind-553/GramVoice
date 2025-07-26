export default function LanguageSelector({ language, setLanguage }) {
  const options = [
    { code: "hi", label: "Hindi" },
    { code: "mr", label: "Marathi" },
    { code: "bn", label: "Bengali" }
  ];

  return (
    <select value={language} onChange={e => setLanguage(e.target.value)}>
      {options.map(opt => (
        <option key={opt.code} value={opt.code}>{opt.label}</option>
      ))}
    </select>
  );
}
