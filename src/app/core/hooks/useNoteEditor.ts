import { EEndpoint } from '@/common/types/api.types';
import { IMidiPart } from '@/common/types/midi.types';
import { ITrack } from '@/common/types/track.types';

interface IUseNoteEditor {
  parts: IMidiPart[];
  tracks: ITrack[];
  patchProjectContext: (patch: Record<string, any>) => void;
  mutate: (endpoint: EEndpoint) => void;
}
export default function useNoteEditor({
  parts,
  tracks,
  patchProjectContext,
  mutate,
}: IUseNoteEditor) {
  interface IAddNote {
    qIndex: number;
    partIndex: number;
    track: ITrack;
  }
  const addNote = ({ track, qIndex, partIndex }: IAddNote) => {
    const trackIndex = tracks.findIndex((t) => t.id === track.id);
    const patchTracks = [...tracks.filter((t) => t.id !== track.id)];
    track.routing.input.parts[partIndex].events.push({
      note: 'C4',
      duration: '16n',
      x: qIndex,
    });
    patchTracks.splice(trackIndex, 0, track);
    patchProjectContext({ tracks: patchTracks });
    mutate(EEndpoint.ProjectSettings);
  };

  interface IDeleteNote {
    track: ITrack;
    noteIndex: number;
    partIndex: number;
  }
  const deleteNote = ({ noteIndex, partIndex, track }: IDeleteNote) => {
    const trackIndex = tracks.findIndex((t) => t.id === track.id);
    const patchTracks = [...tracks.filter((t) => t.id !== track.id)];
    const newEvents = track.routing.input.parts[partIndex].events;
    newEvents.splice(noteIndex, 1);
    const newInput = { ...track.routing.input };
    newInput.parts[partIndex] = {
      label: track.routing.input.parts[partIndex].label,
      events: newEvents,
    };
    const newTrack = { ...track };
    newTrack.routing.input = newInput;
    patchTracks.splice(trackIndex, 0, newTrack);
    patchProjectContext({ tracks: patchTracks });
    mutate(EEndpoint.ProjectSettings);
  };

  return { addNote, deleteNote };
}
