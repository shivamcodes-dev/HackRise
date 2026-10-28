const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const languages = ["javascript", "java", "cpp"];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang}
          className={`btn btn-sm ${
            selectedLanguage === lang ? "btn-primary" : "btn-ghost"
          }`}
          onClick={() => onLanguageChange(lang)}
        >
          {lang === "cpp"
            ? "C++"
            : lang === "javascript"
              ? "JavaScript"
              : "Java"}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
