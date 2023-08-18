import t from "../i18n";

import { ETrackType } from "@/app/components/tracks/types";
import {
  EMidiPluginType,
  type IMidiPlugin,
  type IMidiTrackConfig,
} from "@/app/components/tracks/midi/types";
import type { IAudioTrackConfig } from "@/app/components/tracks/audio/types";
import type { IMixerConfig } from "@/app/components/Mixer";
import midiChannels from "@/app/components/tracks/midi/constants/channels.midi.constants";

const DEFAULT_BPM = 120;
const DEFAULT_CLEF = "C";
const DEFAULT_MEASURE_COUNT = 8;
const DEFAULT_MIXER: IMixerConfig = {
  visibility: {
    [ETrackType.Audio]: true,
    [ETrackType.Midi]: true,
  },
};

const DEFAULT_AUDIO_TRACK: IAudioTrackConfig = {
  name: t("untitled"),
  type: ETrackType.Audio,
};

const DEFAULT_MIDI_DRUM_PLUGIN: IMidiPlugin = {
  type: EMidiPluginType.Drums,
  channels: [
    {
      id: 36,
      notes: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60].map(
        (time) => ({ key: midiChannels[36].key, duration: "8n", time: time })
      ),
    },
    {
      id: 38,
      notes: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54, 58, 62].map(
        (time) => ({ key: midiChannels[38].key, duration: "8n", time: time })
      ),
    },
  ],
};
const DEFAULT_MIDI_TRACK: IMidiTrackConfig = {
  name: t("untitled"),
  type: ETrackType.Midi,
};
const DEFAULT_MIDI_DRUM_TRACK: IMidiTrackConfig = {
  ...DEFAULT_MIDI_TRACK,
  name: "Drums",
  plugins: [DEFAULT_MIDI_DRUM_PLUGIN],
};

export {
  DEFAULT_AUDIO_TRACK,
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_MIDI_TRACK,
  DEFAULT_MIDI_DRUM_TRACK,
  DEFAULT_MIXER,
};
