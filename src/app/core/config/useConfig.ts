import useSWR from "swr";

import t from "../i18n";

import AudioTrack from "@/app/components/tracks/AudioTrack";
import MidiTrack from "@/app/components/tracks/MidiTrack";
import TimeTrack from "@/app/components/tracks/TimeTrack";

import {
  ETrackType,
  type TTrackConfig,
  type IAudioTrackConfig,
  type IMidiTrackConfig,
  type ITrack,
} from "@/app/components/tracks/types";

import type { IConfig } from "./types";
import type { IMixerConfig } from "@/app/components/Mixer";

export default function useConfig(config?: IConfig) {
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
  const DEFAULT_MIDI_TRACK: IMidiTrackConfig = {
    name: t("untitled"),
    type: ETrackType.Midi,
  };
  /*
  const DEFAULT_INACTIVE_STEP = { key: "C1", active: false };
  const DEFAULT_STEP_SEQUENCER: ITrack<IStepSequencerTrackConfig> = {
    type: ETrackType.StepSequencer,
    config: {
      tracks: [
        {
          instrument: useBaseDrum(),
          name: "Kick",
          steps: [
            { key: "C1", active: true },
            { ...DEFAULT_INACTIVE_STEP },
            { ...DEFAULT_INACTIVE_STEP },
            { ...DEFAULT_INACTIVE_STEP },

            { key: "C1", active: true },
            { ...DEFAULT_INACTIVE_STEP },
            { ...DEFAULT_INACTIVE_STEP },
            { ...DEFAULT_INACTIVE_STEP },

            { key: "C1", active: true },
            { ...DEFAULT_INACTIVE_STEP },
            { ...DEFAULT_INACTIVE_STEP },
            { ...DEFAULT_INACTIVE_STEP },

            { key: "C1", active: true },
            { ...DEFAULT_INACTIVE_STEP },
            { ...DEFAULT_INACTIVE_STEP },
            { ...DEFAULT_INACTIVE_STEP },
          ],
        },
        {
          instrument: useSnareDrum(),
          name: "Snare",
          steps: [
            { active: false },
            { active: false },
            { active: true },
            { active: false },

            { active: false },
            { active: false },
            { active: true },
            { active: false },

            { active: false },
            { active: false },
            { active: true },
            { active: false },

            { active: false },
            { active: false },
            { active: true },
            { active: false },
          ],
        },
        {
          instrument: useHiHat({ open: true }),
          name: "HiHat O",
          steps: [
            { active: true },
            { active: true },
            { active: true },
            { active: true },

            { active: true },
            { active: true },
            { active: true },
            { active: true },

            { active: true },
            { active: true },
            { active: true },
            { active: true },

            { active: true },
            { active: true },
            { active: true },
            { active: true },
          ],
        },
        {
          instrument: useCymbal(),
          name: "Cymbal",
          steps: [
            { active: false },
            { active: false },
            { active: false },
            { active: false },

            { active: false },
            { active: false },
            { active: false },
            { active: false },

            { active: false },
            { active: false },
            { active: false },
            { active: false },

            { active: false },
            { active: false },
            { active: false },
            { active: false },
          ],
        },
      ],
    },
  };
  */

  enum EMidiPlugin {
    Drums,
  }

  const DEFAULT: IConfig = {
    mixer: { ...DEFAULT_MIXER },
    name: t("untitled"),
    /**
     * Default Track Config
     * TODO config track routing (to default stereo out ATM)
     */
    tracks: [
      // Time Indicator for tracks below
      { name: "", type: ETrackType.Time },

      // Midi tracks
      {
        ...DEFAULT_MIDI_TRACK,
        name: "Drums",
        plugins: [
          {
            name: EMidiPlugin.Drums,
            channels: [
              {
                id: 36,
                events: [{ time: 1 }, { time: 9 }],
              },
              {
                id: 38,
                events: [{ time: 5 }, { time: 13 }],
              },
            ],
          },
        ],
      },

      // Audio tracks
      { ...DEFAULT_AUDIO_TRACK },
    ],
    transport: { bpm: 90, clef: "C", measureCount: 8 },
  };

  const getConfig = () => config || DEFAULT;
  const { data, error, isLoading } = useSWR("Config", getConfig);

  return { data, error, isLoading };
}
