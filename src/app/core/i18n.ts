enum ELanguage {
  De = "de",
  En = "en",
  Fr = "fr",
  It = "it",
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
  de: {
    all: "Alle",
    "dialog.allowAudio": "Web Audio API erlauben, Sound abzuspielen?",
    ok: "OK",
    stereoOut: "Stereo out",
    untitled: "Unbenannt",
    volume: "Lautstärke",
  },
  en: {
    all: "All",
    "dialog.allowAudio": "Allow Web Audio API to play audio?",
    ok: "OK",
    stereoOut: "Stereo out",
    untitled: "Untitled",
    volume: "Volume",
  },
  fr: {
    all: "Tous",
    "dialog.allowAudio": "",
    ok: "OK",
    stereoOut: "Stereo out",
    untitled: "Sans titre",
    volume: "Volume",
  },
  it: {
    all: "Tutti",
    "dialog.allowAudio": "",
    ok: "OK",
    stereoOut: "Stereo out",
    untitled: "Senza titolo",
    volume: "Volume",
  },
};

/**
 * Returns the translated term
 * TODO migrate to any official i18n library
 */
export default function t(term: string) {
  const translation = i18n[l][term];

  // Requested translation is missing (return {term} as placeholder to avoid emptiness in app
  if (!translation) {
    console.warn(`No term or translation: Term: '${term}', Language: ${l}`);
    return `{${term}}`;
  }
  return translation;
}
