import { usedMidiChannels } from "./midi/constants/midiChannels.constants";

export default function MidiPluginDrums() {
  const tmpVisibleChannelNumbers = [36, 38, 42];
  const tmpVisibleChannels = usedMidiChannels.filter((channel, channelIndex) =>
    tmpVisibleChannelNumbers.includes(channelIndex + 35)
  );
  return (
    <ul className="flex flex-col">
      {tmpVisibleChannels.map((usedMidiChannel, channelIndex) => (
        <li key={`midi-channel-${channelIndex + 35}`}>
          {channelIndex + 35}: {Object.values(usedMidiChannel)}
        </li>
      ))}
    </ul>
  );
}
