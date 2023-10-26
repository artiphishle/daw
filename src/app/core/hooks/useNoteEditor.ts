import { EEndpoint } from '@/common/types/api.types';
import type { IMidiPart } from '@/common/types/midi.types';
import type { ITrack } from '@/common/types/track.types';

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
interface IUseNoteEditor {
  tracks: ITrack[];
  patchProjectContext: (patch: Record<string, any>) => void;
  mutate: (endpoint: EEndpoint) => void;
}
export default function useNoteEditor({
  tracks,
  patchProjectContext,
  mutate,
}: IUseNoteEditor) {
  const addNote = ({ track, qIndex, partIndex }: IAddNote) => {
    const trackIndex = tracks.findIndex((t) => t.id === track.id);
    const patchTracks = [...tracks.filter((t) => t.id !== track.id)];

    track.routing.input.parts[partIndex].times.push(qIndex);
    patchTracks.splice(trackIndex, 0, track);

    patchProjectContext({ tracks: patchTracks });
    mutate(EEndpoint.ProjectSettings);
  };

  const deleteNote = ({ noteIndex, partIndex, track }: IDeleteNote) => {
    const trackIndex = tracks.findIndex((t) => t.id === track.id);
    const patchTracks = [...tracks.filter((t) => t.id !== track.id)];
    const newTimes = track.routing.input.parts[partIndex].times;
    newTimes.splice(noteIndex, 1);
    const newInput = { ...track.routing.input };
    newInput.parts[partIndex] = {
      label: track.routing.input.parts[partIndex].label,
      times: newTimes,
    };
    const newTrack = { ...track };
    newTrack.routing.input = newInput;
    patchTracks.splice(trackIndex, 0, newTrack);
    patchProjectContext({ tracks: patchTracks });
    mutate(EEndpoint.ProjectSettings);
  };

  return { addNote, deleteNote };
}
