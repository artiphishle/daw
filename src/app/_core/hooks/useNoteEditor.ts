import _ from 'lodash/fp';

import type { ITrack } from '@/common/types/track.types';

interface IAddNote {
  qIndex: number;
  partIndex: number;
  track: ITrack;
}
interface IDeleteNote {
  noteIndex: number;
  partIndex: number;
  track: ITrack;
}
interface IUseNoteEditor {
  patchTrack: (patch: Partial<ITrack>) => Promise<void>;
}

export default function useNoteEditor({ patchTrack }: IUseNoteEditor) {
  return {
    /*** @todo Support part.notes */
    addNote: async ({ track, qIndex, partIndex }: IAddNote) => {
      const path = `routing.input.parts[${partIndex}].times`;
      return await patchTrack(_.set(path, qIndex)(track));
    },
    /*** @todo Support part.notes */
    deleteNote: async ({ noteIndex, partIndex, track }: IDeleteNote) => {
      const { times = [] } = track.routing.input.parts[partIndex];
      const newTimes = times.splice(noteIndex, 0, noteIndex);
      const path = `routing.input.parts[${partIndex}].times`;
      return await patchTrack(_.set(path, newTimes)(track));
    },
  };
}
