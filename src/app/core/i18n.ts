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
    beat: "Beat",
    bpm: "BPM",
    chordProgression: "Chord progression",
    "dialog.allowAudio": "Web Audio API erlauben, Sound abzuspielen?",
    daw: "DAW",
    error: "Error",
    errorUseConfig: "ERROR: useConfig",
    master: "Master",
    ok: "OK",
    progression: "progression",
    untitled: "Unbenannt",
    visualization: "Visualisierung",
    volume: "Lautstärke",
  },
  en: {
    all: "All",
    beat: "Beat",
    bpm: "BPM",
    chordProgression: "Chord progression",
    daw: "DAW",
    "dialog.allowAudio": "Allow Web Audio API to play audio?",
    empty: "Empty",
    error: "Error",
    errorUseConfig: "ERROR: useConfig",
    master: "Master",
    ok: "OK",
    progression: "progression",
    untitled: "Untitled",
    visualization: "Visualization",
    volume: "Volume",
  },
  fr: {
    all: "Tous",
    beat: "Beat",
    bpm: "BPM",
    chordProgression: "Chord progression",
    daw: "DAW",
    "dialog.allowAudio": "",
    empty: "Empty",
    error: "Error",
    errorUseConfig: "ERROR: useConfig",
    master: "Master",
    ok: "OK",
    progression: "progression",
    untitled: "Sans titre",
    visualization: "Visualization",
    volume: "Volume",
  },
  it: {
    all: "Tutti",
    beat: "Beat",
    bpm: "BPM",
    chordProgression: "Chord progression",
    daw: "DAW",
    "dialog.allowAudio": "",
    empty: "Empty",
    error: "Error",
    errorUseConfig: "ERROR: useConfig",
    master: "Master",
    ok: "OK",
    progression: "progression",
    untitled: "Senza titolo",
    visualization: "Visualization",
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
