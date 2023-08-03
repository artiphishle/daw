export default function Mixer() {
  function Db() {
    return (
      <div className="py-2">
        <div className="text-xs border-b-4 border-b-yellow-400 h-2 w-full">
          &nbsp;
        </div>
        <div className="text-xs border-b-4 border-b-yellow-300 h-2 w-full">
          &nbsp;
        </div>
        <div className="text-xs border-b-4 border-b-yellow-200 h-2 w-full">
          &nbsp;
        </div>
        <div className="text-xs border-b-4 border-b-green-300 h-2 w-full">
          &nbsp;
        </div>
        <div className="text-xs border-b-4 border-b-green-400 h-2 w-full">
          &nbsp;
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 bg-gray-100 flex w-full self-end">
      {new Array(4).fill("").map((midiTrackMixer, i) => (
        <div className="p-4 bg-orange-100 text-xs" key={`midi-${i}`}>
          <div className="px-2 bg-orange-100">0.00</div>
          <Db />
          <div>Midi</div>
        </div>
      ))}
      {new Array(2).fill("").map((audioTrackMixer, i) => (
        <div className="p-4 bg-purple-100 text-xs" key={`audio-${i}`}>
          <div className="px-2 bg-purple-100">-1.00</div>
          <Db />
          <div>Audio</div>
        </div>
      ))}
      <div>
        <div className="p-4 m-1 text-xs justify-self-end bg-white ">
          <div>-0.01</div>
          <Db />
          <div>Main</div>
        </div>
      </div>
    </div>
  );
}
