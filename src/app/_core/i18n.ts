// Set english as the default language
const l = 'en';

const i18n = {
  de: {
    all: 'Alle',
    allowSound:
      'Bitte bestätige die Berechtigung zum Abspielen von Musik (erforderlich)',
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': 'Web Audio API erlauben, Sound abzuspielen?',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: 'Römische Zahlen',
    sheets: 'Notenblätter',
    tonic: 'Tonika',
    untitled: 'Unbenannt',
    volume: 'Lautstärke',
  },
  en: {
    all: 'All',
    allowSound: 'Please confirm permission to play sound (required)',
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': 'Allow Web Audio API to play audio?',
    empty: 'Empty',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: 'Roman numerals',
    sheets: 'Sheets',
    tonic: 'Tonic',
    untitled: 'Untitled',
    volume: 'Volume',
  },
  fr: {
    all: 'Tous',
    allowSound: "Veuillez confirmer l'autorisation de jouer du son (requis)",
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': '',
    empty: 'Empty',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: 'Nombres romains',
    sheets: 'Partitions',
    tonic: 'Tonique',
    untitled: 'Sans titre',
    volume: 'Volume',
  },
  it: {
    all: 'Tutti',
    allowSound: "Conferma l'autorizzazione a riprodurre il suono (richiesto)",
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': '',
    empty: 'Empty',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: 'Numeri romani',
    sheets: 'Spartiti',
    tonic: 'Tonica',
    untitled: 'Senza titolo',
    volume: 'Volume',
  },
  nl: {
    all: 'Alle',
    allowSound: 'Bevestig toestemming om geluid af te spelen (vereist)',
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': '',
    empty: 'Empty',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: 'Romeinse cijfers',
    sheets: 'Bladmuziek',
    tonic: 'Tonic',
    untitled: 'Untitled',
    volume: 'Volume',
  },
  no: {
    all: 'Alle',
    allowSound: 'Bekreft tillatelse til å spille lyd (obligatorisk)',
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': 'Web Audio API erlauben, Sound abzuspielen?',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: '',
    sheets: 'Music sheets',
    tonic: 'Tonika',
    untitled: 'Unbenannt',
    volume: 'Lautstärke',
  },
  pt: {
    all: 'Todos',
    allowSound: 'Confirme a permissão para reproduzir som (obrigatório)',
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': '',
    empty: 'Empty',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: 'Números romanos',
    sheets: 'Partituras',
    untitled: 'Untitled',
    volume: 'Volume',
  },
  ru: {
    all: 'Все',
    allowSound:
      'Пожалуйста, подтвердите разрешение на воспроизведение звука (обязательно)',
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': '',
    empty: 'Empty',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: 'Римские цифры',
    sheets: 'Ноты',
    untitled: 'Untitled',
    volume: 'Volume',
  },
  es: {
    all: 'Todos',
    allowSound: 'Confirme el permiso para reproducir sonido (obligatorio)',
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': '',
    empty: 'Empty',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: 'Números romanos',
    sheets: 'Partituras',
    untitled: 'Untitled',
    volume: 'Volume',
  },
  sv: {
    all: 'Alla',
    allowSound: 'Bekräfta tillstånd att spela ljud (obligatoriskt)',
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': '',
    empty: 'Empty',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: 'Romerska siffror',
    sheets: 'Noter',
    untitled: 'Untitled',
    volume: 'Volume',
  },
  zh: {
    all: '所有',
    allowSound: '请确认播放声音的权限（必填）',
    beat: 'Beat',
    bpm: 'BPM',
    chordProgression: 'Chord progression',
    daw: 'DAW',
    'dialog.allowAudio': '',
    empty: 'Empty',
    error: 'Error',
    errorUseConfig: 'ERROR: useConfig',
    master: 'Master',
    ok: 'OK',
    progression: 'progression',
    romanNumerals: '罗马数字',
    sheets: '乐谱',
    untitled: 'Untitled',
    volume: 'Volume',
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
