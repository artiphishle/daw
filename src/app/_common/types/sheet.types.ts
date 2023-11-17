export enum ESheetNoteStyle {
  Rhythm = 'rhythm',
  Harmonic = 'harmonic',
  X = 'x',
  Normal = 'normal',
  Triangle = 'triangle',
}

export interface ISheet {
  markdown: string;
  noteStyle?: ESheetNoteStyle;
}
