import { Note, WebMidi } from "webmidi";

interface IUseMidiDevice {
  sysex?: boolean;
}

export default async function useMidiDevice({ sysex = false }: IUseMidiDevice) {
  try {
    await WebMidi.enable({ sysex });
    console.info("WebMidi enabled!");

    /**
     * MIDI Inputs
     * (receiving messages from devices)
     *
     * - There are 16 channels available, listen to all by listening directly to input
     * - Listeners: https://webmidijs.org/api/classes/Input#addListener
     */
    WebMidi.inputs.forEach(({ id, manufacturer, name }) => {
      console.info("Input: id/Manufacturer/Name", id, manufacturer, name);

      const myInput = WebMidi.getInputByName(name);
      // const myInput = WebMidi.getOutputById(id);
      // const myInput = WebMidi.outputs[0];
      if (!myInput) throw new Error("No input found");

      // Example: Listen to all channels
      myInput.addListener("noteon", (event) =>
        console.info("Channel[all]: Event 'noteon'", event.note.identifier)
      );

      // Example: Listen to channel 10
      const mySynth = myInput.channels[10];
      mySynth.addListener("noteon", (event) =>
        console.info("Channel[10]: Event 'noteon'", event.note.identifier)
      );
    });

    /**
     * MIDI Outputs
     * (sending messages to devices)
     *
     * - CC Messages: https://webmidijs.org/api/classes/OutputChannel#sendControlChange
     */
    WebMidi.outputs.forEach(({ id, manufacturer, name }) => {
      console.info("Output: id/Manufacturer/Name", id, manufacturer, name);

      const myOutput = WebMidi.getOutputByName(name);
      // const myOutput = WebMidi.getOutputById(id);
      // const myOutput = WebMidi.outputs[0];

      // Example: Turn off all sounds
      myOutput.sendAllSoundOff();
      // Example: Play a note on channel 1
      myOutput.channels[1].playNote("C4");
      // Example: Play a note on multiple channels
      myOutput.playNote("G4", { channels: [1, 2, 3] });
      // Example: Create a note
      myOutput.playNote(new Note("A4"));
      // Example: Play notes on channel 1
      myOutput.channels[1].playNote(["C3", "D#3", "G3"]);
      // Example: (Raw-) Attack & Release
      myOutput.channels[1].playNote("C3", { attack: 0.5 });
      myOutput.channels[1].playNote("C3", { rawAttack: 123 }); // 0-127
      // Example: Note duration (1000ms, ergo: 1s)
      myOutput.channels[1].playNote("C3", { duration: 1000 });
      // Example: Schedule notes
      myOutput.channels[1].playNote("C3", { time: WebMidi.time + 3000 });
      myOutput.channels[1].playNote("D3", { time: "+2000" });
      // Example: Manually stopping playback immediately or 2.5s later
      myOutput.channels[1].stopNote("C3");
      myOutput.channels[1].stopNote("C3", { time: "+2500" });
      // Example: Sending a control change (a.k.a. "CC") message
      myOutput.channels[1].sendControlChange(72, 64);
      myOutput.channels[1].sendControlChange("volumecoarse", 123);
    });
  } catch (error) {
    throw error;
  }
  return {};
}
