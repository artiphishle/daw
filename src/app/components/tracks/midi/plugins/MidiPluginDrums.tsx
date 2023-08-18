import cn from "classnames";

import { styles } from "@/app/components/tracks/styles";
import midiChannels from "@/app/components/tracks/midi/constants/channels.midi.constants";

import { ETrackType } from "@/app/components/tracks/types";
import type { IMidiChannel } from "@/app/components/tracks/midi/types";

interface IMidiPluginDrumsProps {
  channels: IMidiChannel[];
}

export default function MidiPluginDrums({ channels }: IMidiPluginDrumsProps) {
  return (
    <ul className="flex flex-col">
      {channels.map(({ id }, channelIndex) => (
        <li key={`channel-${channelIndex}-${id}`}>
          <div className={cn(styles.track.row(ETrackType.Midi))}>
            <div className={styles.track.column1(ETrackType.Midi)}>
              <div key={`channel-${id}`}>
                {id} {Object.values(midiChannels[id])[0]}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
