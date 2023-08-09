enum ELanguage {
  De = "de",
  En = "en",
}

interface II18n {
  [term: string]: {
    [language: string]: string;
  };
}

// Set english as the default language
const l = ELanguage.En;

// Define translations
const i18n: II18n = {
  // project name
  untitled: {
    de: "Unbenannt",
    en: "Untitled",
  },
};

/**
 * Returns the translated term
 * TODO migrate to any official i18n library
 */
export default function t(term: string) {
  const translation = i18n[term]?.[l];

  // Requested translation is missing (return {term} as placeholder to avoid emptiness in app
  if (!translation) {
    console.warn(`No term or translation: Term: '${term}', Language: ${l}`);
    return `{${term}}`;
  }
  return translation;
}
