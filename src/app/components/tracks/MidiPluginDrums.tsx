import { usedMidiChannels } from "./midi/constants/midiChannels.constants";

export default function MidiPluginDrums() {
  return (
    <ul className="flex flex-col">
      {usedMidiChannels.map((usedMidiChannel, channelIndex) => (
        <li key={`midi-channel-${channelIndex + 1}`}>
          {channelIndex + 35}: {Object.values(usedMidiChannel)}
        </li>
      ))}
    </ul>
  );
}
