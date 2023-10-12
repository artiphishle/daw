// Set english as the default language
const l = "en";

const i18n = {
  de: {
    all: "Alle",
    allowSound:
      "Bitte bestätige die Berechtigung zum Abspielen von Musik (erforderlich)",
    beat: "Beat",
    bpm: "BPM",
    chordProgression: "Chord progression",
    daw: "DAW",
    "dialog.allowAudio": "Web Audio API erlauben, Sound abzuspielen?",
    error: "Error",
    errorUseConfig: "ERROR: useConfig",
    master: "Master",
    ok: "OK",
    progression: "progression",
    untitled: "Unbenannt",
    volume: "Lautstärke",
  },
  en: {
    all: "All",
    allowSound: "Please confirm permission to play sound (required)",
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
    volume: "Volume",
  },
  fr: {
    all: "Tous",
    allowSound: "Veuillez confirmer l'autorisation de jouer du son (requis)",
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
    volume: "Volume",
  },
  it: {
    all: "Tutti",
    allowSound: "Conferma l'autorizzazione a riprodurre il suono (richiesto)",
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
    volume: "Volume",
  },
};

/**
 * Returns the translated term
 * TODO migrate to any official i18n library
 */
export default function t(term: string) {
  const translations: { [k: string]: string } = i18n[l];
  const translation = translations[term];

  // Requested translation is missing (return {term} as placeholder to avoid emptiness in app
  if (!translation) {
    console.warn(`No term or translation: Term: '${term}', Language: ${l}`);
    return `{${term}}`;
  }
  return translation;
}
