import cn from "classNames";
import midiChannels from "./midi/constants/midiChannels.constants";
import { styles } from "./MidiTrack";

interface IMidiPluginDrumsProps {
  channels: any[];
}

export default function MidiPluginDrums({ channels }: IMidiPluginDrumsProps) {
  return (
    <ul className="flex flex-col">
      {channels.map(({ id, events }, channelIndex) => (
        <li className={cn(styles.track)} key={`channel-${channelIndex}-${id}`}>
          <div className={styles.trackCol1}>
            <div key={`channel-${id}`}>
              {id} {Object.values(midiChannels[id])[0]}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
