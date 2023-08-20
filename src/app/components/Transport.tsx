import { Loop, Time, Transport } from "tone";
import type { Time as TTime } from "tone/build/esm/core/type/Units";

import { ChangeEvent, useEffect, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import useConfig from "@/app/core/config/useConfig";
import t from "@/app/core/i18n";

export default function Transporter() {
  const { config } = useConfig();
  const [bpm, setBpm] = useState(config?.transport.bpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(
    Time(Transport.position).toBarsBeatsSixteenths()
  );
  const [timeSignature] = useState(Transport.timeSignature);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  Transport.loop = true;
  Transport.loopStart = 0;
  Transport.loopEnd = `${config?.transport.measureCount}m`;

  const loop = new Loop((time: number) => {
    setPosition(Time(Transport.position).toBarsBeatsSixteenths());
  }, "8n");
  loop.start(0);
  loop.stop(`${config?.transport.measureCount}m`);

  // BPM change
  useEffect(() => {
    if (!bpm) return;
    Transport.bpm.value = bpm;
    console.info("Change", "bpm:", Transport.bpm.value);
  }, [bpm]);

  const interval = {
    start: () =>
      setTimer(
        setInterval(() => {
          setPosition(Time(Transport.position).toBarsBeatsSixteenths());
        }, config?.transport.measureCount)
      ),
    stop: (timer: NodeJS.Timer) => {
      clearInterval(timer);
      setTimer(undefined);
    },
  };

  const events = {
    changeBpm: (event: ChangeEvent<HTMLInputElement>) =>
      setBpm(parseInt(event.target.value)),
    // TODO 'pause' not supported, only 'play' and 'stop'
    togglePlay: (time: TTime = Transport.now()) => {
      const bbs = Time(time).toBarsBeatsSixteenths();
      console.info(`[Transporter] togglePlay("${bbs}")`);

      isPlaying ? Transport.stop(time) : Transport.start(time);
      Transport.position = Time(0).toBarsBeatsSixteenths();
      setIsPlaying((isPlaying) => !isPlaying);
    },
  };

  const PlayOrPauseIcon = () =>
    isPlaying ? (
      <PauseIcon onClick={() => events.togglePlay()} />
    ) : (
      <PlayIcon onClick={() => events.togglePlay()} />
    );

  return (
    <div className="flex py-1 px-4">
      <div className="flex gap-2">
        <div>{position}</div>
        <div className="flex items-center text-white px-4 mx-2 border-r border-r-[#555]">
          <PlayOrPauseIcon />
        </div>
        <div>
          <label className="text-xs" htmlFor="bpm">
            {t("bpm")}:
          </label>
          <input
            className="w-8 ml-2 bg-transparent"
            id="bpm"
            onChange={events.changeBpm}
            value={bpm}
          />
        </div>
        <div className="flex items-center">
          <div className="text-xs mr-2">{t("beat")}:</div>
          <div>{timeSignature}/4</div>
        </div>
      </div>
    </div>
  );
}
