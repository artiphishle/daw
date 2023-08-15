interface IMidiChannel {
  [key: string]: string;
}

const midiChannels: IMidiChannel[] = [];

midiChannels[35] = { B0: "Accoustic Bass Drum" };

midiChannels[36] = { C1: "Bass Drum 1" };
midiChannels[37] = { "C#1": "Side Stick" };
midiChannels[38] = { D1: "Accoustic Snare" };
midiChannels[39] = { "D#1": "Hand Clap" };
midiChannels[40] = { E1: "Electric Snare" };
midiChannels[41] = { F1: "Low Floor Tom" };
midiChannels[42] = { "F#1": "Closed Hihat" };
midiChannels[43] = { G1: "High Floor Tom" };
midiChannels[44] = { "G#1": "Pedal Hihat" };
midiChannels[45] = { A1: "Low Tom" };
midiChannels[46] = { "A#1": "Open Hihat" };
midiChannels[47] = { B1: "Low-Mid Tom" };

midiChannels[48] = { C2: "Hi-Mid Tom" };
midiChannels[49] = { "C#2": "Crash Cymbal 1" };
midiChannels[50] = { D2: "Hi Tom" };
midiChannels[51] = { "D#2": "Ride Cymbal 1" };
midiChannels[52] = { E2: "Chinese Cymbal" };
midiChannels[53] = { F2: "Ride Bell" };
midiChannels[54] = { "F#2": "Tambourine" };
midiChannels[55] = { G2: "Splash Cymbal" };
midiChannels[56] = { "G#2": "Cowbell" };
midiChannels[57] = { A2: "Crash Cymbal 2" };
midiChannels[58] = { "A#2": "Vibraslap" };
midiChannels[59] = { B2: "Ride Cymbal 2" };

midiChannels[60] = { C3: "Hi Bongo" };
midiChannels[61] = { "C#3": "Low Bongo" };
midiChannels[62] = { D3: "Mute Hi Conga" };
midiChannels[63] = { "D#3": "Open Hi Conga" };
midiChannels[64] = { E3: "Low Conga" };
midiChannels[65] = { F3: "High Timbale" };
midiChannels[66] = { "F#3": "Low Timbale" };
midiChannels[67] = { G3: "High Agogo" };
midiChannels[68] = { "G#3": "Low Agogo" };
midiChannels[69] = { A3: "Cabasa" };
midiChannels[70] = { "A#3": "Maracas" };
midiChannels[71] = { B3: "Short Whistle" };

midiChannels[72] = { C4: "Long Whistle" };
midiChannels[73] = { "C#4": "Short Guiro" };
midiChannels[74] = { D4: "Long Guiro" };
midiChannels[75] = { "D#4": "Claves" };
midiChannels[76] = { E4: "Hi Wood Block" };
midiChannels[77] = { F4: "Low Wood Block" };
midiChannels[78] = { "F#4": "Mute Cuica" };
midiChannels[79] = { G4: "Open Cuica" };
midiChannels[80] = { "G#4": "Mute Triangle" };
midiChannels[81] = { A4: "Open Triangle" };

const usedMidiChannels = midiChannels.filter((midiChannel) => !!midiChannel);

export { usedMidiChannels };
export default midiChannels;
