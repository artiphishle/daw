import { type ChangeEvent, type MouseEvent, useEffect, useState } from "react";
import { Loop, Time, Transport } from "tone";

import t from "@/app/core/i18n";

import {
  DEFAULT_BPM,
  DEFAULT_CLEF,
  DEFAULT_MEASURE_COUNT,
  DEFAULT_QUANTIZATION,
  DEFAULT_MIXER,
  DEFAULT_TRACKS,
} from "@/app/core/config/constants";

import type { IArranger } from "@/app/components/Arranger";
import type { IMixer } from "@/app/components/Mixer";
import type { Time as TTime } from "tone/build/esm/core/type/Units";
import { ITransport } from "@/app/components";

interface IConfig {
  arranger: IArranger;
  mixer: IMixer;
  name: string;
  transport: ITransport;
}

export default function useConfig(loadProjectOrPreset?: IConfig) {
  // Transport position
  const getPosition = (time: TTime = Transport.position) =>
    Time(time).toBarsBeatsSixteenths();

  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [tracks, setTracks] = useState(DEFAULT_TRACKS);
  const [measureCount, setMeasureCount] = useState(DEFAULT_MEASURE_COUNT);
  const [quantization, setQuantization] = useState(DEFAULT_QUANTIZATION);
  const [clef, setClef] = useState(DEFAULT_CLEF);
  const [position, setPosition] = useState(getPosition());

  // Transport position init
  useEffect(() => {
    Transport.loop = true;
    Transport.loopStart = getPosition();
    Transport.loopEnd = `${measureCount}m`;

    new Loop((time) => setPosition(getPosition(Transport.position)), "16n")
      .start(0)
      .stop(`${measureCount}m`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  // BPM change
  useEffect(() => {
    if (!bpm) return;
    Transport.bpm.value = bpm;
    console.info("[Transport] onBpmChange:", Transport.bpm.value);
  }, [bpm]);

  const DEFAULT_CONFIG: IConfig = {
    arranger: { tracks, setTracks },
    mixer: { ...DEFAULT_MIXER },
    name: t("untitled"),
    transport: {
      bpm,
      setBpm,
      clef,
      setClef,
      measureCount,
      setMeasureCount,
      position,
      setPosition,
      quantization,
      setQuantization,
      events: {
        onBpmChange: (event: ChangeEvent<HTMLInputElement>) =>
          setBpm(parseInt(event.target.value)),
        onToggle: (_: MouseEvent<SVGSVGElement>) => {
          Transport.toggle();
        },
      },
    },
  };

  return loadProjectOrPreset || DEFAULT_CONFIG;
}
