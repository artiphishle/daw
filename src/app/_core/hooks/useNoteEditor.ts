import { fetchTracks } from '@/api/project/_presets/DefaultPreset';
import { UniqueIdentifier } from '@/common/types/utility.types';
import type { ITrack } from 'app/_common/types/track.types';

interface IAddNote {
  qIndex: number;
  partIndex: number;
  track: ITrack;
}
interface IDeleteNote {
  track: ITrack;
  noteIndex: number;
  partIndex: number;
}
export default function useNoteEditor(
  update: (patch: Record<string, any>) => void,
) {
  const tracks = fetchTracks();
  const getTrackIndex = (id: UniqueIdentifier) =>
    tracks.findIndex((t) => t.id === id);

  return {
    addNote: ({ track, qIndex, partIndex }: IAddNote) => {
      const patchTracks = [...tracks.filter((t) => t.id !== track.id)];

      track.routing.input.parts[partIndex].times?.push(qIndex);
      patchTracks.splice(getTrackIndex(track.id), 0, track);
      update({ tracks: patchTracks });
    },
    deleteNote: ({ noteIndex, partIndex, track }: IDeleteNote) => {
      const patchTracks = [...tracks.filter((t) => t.id !== track.id)];
      const newTimes = track.routing.input.parts[partIndex].times;
      newTimes?.splice(noteIndex, 1);
      const newInput = { ...track.routing.input };
      newInput.parts[partIndex] = {
        label: track.routing.input.parts[partIndex].label,
        times: newTimes,
      };
      const newTrack = { ...track };
      newTrack.routing.input = newInput;
      patchTracks.splice(getTrackIndex(track.id), 0, newTrack);
      update({ tracks: patchTracks });
    },
  };
}
