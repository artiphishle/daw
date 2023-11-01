'use server';
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
} from '@/common/constants';

/*** @channels */
const channelDrums = DEFAULT_CHANNEL_DRUMS;
const channelMaster = DEFAULT_CHANNEL_MASTER;
export async function fetchChannels(/* TODO choose which */) {
  const channels = await [channelDrums, channelMaster];
  return channels;
}

/*** @tracks */
const trackAudioHalloween = DEFAULT_TRACK_AUDIO;
const tracksamplerDrums = DEFAULT_TRACK_SAMPLER;
export async function fetchTracks(/* TODO choose which */) {
  return [trackAudioHalloween, tracksamplerDrums];
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
export async function fetchProject() {
  return {
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
