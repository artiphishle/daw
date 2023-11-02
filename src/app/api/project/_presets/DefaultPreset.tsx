import {
  DEFAULT_ACTIVE_TRACK_ID,
  DEFAULT_STATES,
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_NAME,
  DEFAULT_POSITION,
  DEFAULT_QUANTIZATION,
  DEFAULT_SCALE,
  DEFAULT_SWING,
  DEFAULT_SWING_SUBDIVISION,
  //
  DEFAULT_CHANNEL_DRUMS,
  DEFAULT_CHANNEL_MASTER,
  //
  DEFAULT_TRACK_AUDIO,
  DEFAULT_TRACK_SAMPLER,
  DEFAULT_OFFSET_LEFT,
  DEFAULT_TRACK_PIANO,
} from '@/common/constants';
import type { IChannel } from '@/common/types/channel.types';
import type { IProject } from '@/common/types/project.types';
import type { ITrack } from '@/common/types/track.types';
import _ from 'lodash/fp';

/*** @channels */
const channelDrums = DEFAULT_CHANNEL_DRUMS;
const channelMaster = DEFAULT_CHANNEL_MASTER;
const channels = [channelDrums, channelMaster];
export const fetchChannels = () => channels;
export async function patchChannel(patch: Partial<IChannel>) {
  const channelIndex = channels.findIndex(({ id }) => id === patch.id);
  channels[channelIndex] = _.merge(patch)(channels[channelIndex]);
}

/*** @tracks */
const trackAudioHalloween = DEFAULT_TRACK_AUDIO;
const tracksamplerDrums = DEFAULT_TRACK_SAMPLER;
const trackSamplerPiano = DEFAULT_TRACK_PIANO;
let tracks = [trackAudioHalloween, tracksamplerDrums, trackSamplerPiano];
export const fetchTracks = async () => tracks;
export const patchTracks = async (patch: ITrack[]) => {
  tracks = patch;
};
export async function patchTrack(patch: Partial<ITrack>) {
  const trackIndex = tracks.findIndex(({ id }) => id === patch.id);
  tracks[trackIndex] = _.merge(patch)(tracks[trackIndex]);
}

/*** @project */
const activeTrackId = DEFAULT_ACTIVE_TRACK_ID;
const bpm = DEFAULT_BPM;
const clef = DEFAULT_CLEF;
const measureCount = DEFAULT_MEASURE_COUNT;
const name = DEFAULT_NAME;
const offsetLeft = DEFAULT_OFFSET_LEFT;
const position = DEFAULT_POSITION;
const quantization = DEFAULT_QUANTIZATION;
const scale = DEFAULT_SCALE;
const swing = DEFAULT_SWING;
const swingSubdivision = DEFAULT_SWING_SUBDIVISION;
let project: IProject = {
  activeTrackId,
  bpm,
  clef,
  measureCount,
  name,
  offsetLeft,
  position,
  quantization,
  scale,
  swing,
  swingSubdivision,
};
export async function fetchProject() {
  return project;
}
export async function patchProject(patch: Partial<IProject>) {
  project = { ...project, ...patch };
  return project;
}

/*** @states => active tabs */
export async function fetchStates() {
  const states = await DEFAULT_STATES;
  return states;
}

// DEFAULT_TRACK_INSTRUMENT_BASS,
// DEFAULT_TRACK_OH,
// DEFAULT_TRACK_PLAYERS,
// DEFAULT_TRACK_HI_TOM,
// DEFAULT_TRACK_MI_TOM,
// DEFAULT_TRACK_LO_TOM,
