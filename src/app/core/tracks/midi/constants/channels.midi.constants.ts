export interface IMidiDrumMap {
  key: string;
  name: string;
}

const midiChannels: IMidiDrumMap[] = [];

midiChannels[35] = { key: "B0", name: "Accoustic Bass Drum" };
midiChannels[36] = { key: "C1", name: "Bass Drum 1" };
midiChannels[37] = { key: "C#1", name: "Side Stick" };
midiChannels[38] = { key: "D1", name: "Accoustic Snare" };
midiChannels[39] = { key: "D#1", name: "Hand Clap" };
midiChannels[40] = { key: "E1", name: "Electric Snare" };
midiChannels[41] = { key: "F1", name: "Low Floor Tom" };
midiChannels[42] = { key: "F#1", name: "Closed Hihat" };
midiChannels[43] = { key: "G1", name: "High Floor Tom" };
midiChannels[44] = { key: "G#1", name: "Pedal Hihat" };
midiChannels[45] = { key: "A1", name: "Low Tom" };
midiChannels[46] = { key: "A#1", name: "Open Hihat" };
midiChannels[47] = { key: "B1", name: "Low-Mid Tom" };

midiChannels[48] = { key: "C2", name: "Hi-Mid Tom" };
midiChannels[49] = { key: "C#2", name: "Crash Cymbal 1" };
midiChannels[50] = { key: "D2", name: "Hi Tom" };
midiChannels[51] = { key: "D#2", name: "Ride Cymbal 1" };
midiChannels[52] = { key: "E2", name: "Chinese Cymbal" };
midiChannels[53] = { key: "F2", name: "Ride Bell" };
midiChannels[54] = { key: "F#2", name: "Tambourine" };
midiChannels[55] = { key: "G2", name: "Splash Cymbal" };
midiChannels[56] = { key: "G#2", name: "Cowbell" };
midiChannels[57] = { key: "A2", name: "Crash Cymbal 2" };
midiChannels[58] = { key: "A#2", name: "Vibraslap" };
midiChannels[59] = { key: "B2", name: "Ride Cymbal 2" };

midiChannels[60] = { key: "C3", name: "Hi Bongo" };
midiChannels[61] = { key: "C#3", name: "Low Bongo" };
midiChannels[62] = { key: "D3", name: "Mute Hi Conga" };
midiChannels[63] = { key: "D#3", name: "Open Hi Conga" };
midiChannels[64] = { key: "E3", name: "Low Conga" };
midiChannels[65] = { key: "F3", name: "High Timbale" };
midiChannels[66] = { key: "F#3", name: "Low Timbale" };
midiChannels[67] = { key: "G3", name: "High Agogo" };
midiChannels[68] = { key: "G#3", name: "Low Agogo" };
midiChannels[69] = { key: "A3", name: "Cabasa" };
midiChannels[70] = { key: "A#3", name: "Maracas" };
midiChannels[71] = { key: "B3", name: "Short Whistle" };

midiChannels[72] = { key: "C4", name: "Long Whistle" };
midiChannels[73] = { key: "C#4", name: "Short Guiro" };
midiChannels[74] = { key: "D4", name: "Long Guiro" };
midiChannels[75] = { key: "D#4", name: "Claves" };
midiChannels[76] = { key: "E4", name: "Hi Wood Block" };
midiChannels[77] = { key: "F4", name: "Low Wood Block" };
midiChannels[78] = { key: "F#4", name: "Mute Cuica" };
midiChannels[79] = { key: "G4", name: "Open Cuica" };
midiChannels[80] = { key: "G#4", name: "Mute Triangle" };
midiChannels[81] = { key: "A4", name: "Open Triangle" };

export default midiChannels;
