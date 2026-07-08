const getLanguageById = (lang) => {
  const language = {
    "c++": 54,
    java: 62,
    javascript: 102,
  };
  return language[lang.toLowerCase()];
};

module.exports = getLanguageById;
