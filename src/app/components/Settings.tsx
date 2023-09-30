import useMidiDevice from "@/app/core/hooks/useMidiDevice";

export default function Settings() {
  // Enable MIDI Device (WebMidi)
  useMidiDevice({ sysex: false });

  /*
   * TODO: Move to better place
   * TODO: Go over code again
   */
  /*
   *Const initializeDevice = (device: MIDIInput) => {
   *  device.onmidimessage = (ev: Event) => {
   *    const message = ev as MIDIMessageEvent;
   *    const command = message.data[0];
   *    const note = message.data[1];
   *    const velocity = message.data.length > 2 ? message.data[2] : 0;
   *    console.log(command, note, velocity);
   *  };
   *};
   *const initialize = (access: MIDIAccess) => {
   *  const devices = Array.from(access.inputs.values());
   *  for (let device of devices) {
   *    initializeDevice(device);
   *  }
   *};
   *const requestAccess = (): Promise<MIDIAccess> => {
   *  return new Promise((resolve, reject) => {
   *    if (navigator.requestMIDIAccess)
   *      navigator.requestMIDIAccess().then(resolve).catch(reject);
   *    else reject();
   *  });
   *};
   *const enableMidi = async () => {
   *  try {
   *    const access = await requestAccess();
   *    initialize(access);
   *  } catch (error) {
   *    console.error(error);
   *  }
   *};
   */
  return (
    <section className="bg-white p-4">
      <p>TODO</p>
      {/* <button
        onClick={enableMidi}
        className="inline-flex items-center justify-center px-8 py-4 bg-slate-300"
      >
        Enable Midi Device (Native)
      </button>*/}
    </section>
  );
}
