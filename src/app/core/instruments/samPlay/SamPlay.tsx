import { type MouseEvent, useState, CSSProperties } from "react";
import { GripIcon, KeySquareIcon } from "lucide-react";
import { Sampler, Transport } from "tone";
import { Scale } from "tonal";

import { Grid } from "@/app/ui";
import useProjectContext from "../../hooks/useProjectContext";
import { useDraggable } from "@dnd-kit/core";

interface ISamPlay {
  style?: { left: number; top: number };
}
export default function SamPlay({ style = {} }) {
  const [loaded, setLoaded] = useState(false);
  const [absolute, setAbsolute] = useState({ left: 0, top: 0 });
  const urls = { C3: "wa_808tape_kick_01_sat.wav" };
  const baseUrl = "./samples/WaveAlchemy/wa_808_tape/";
  const samplay = new Sampler({ urls, baseUrl, onload: () => setLoaded(true) });
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "samplay",
  });
  const style2 = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;
  const finalStyle = { ...style2, ...style };

  const { projectContext, updateProjectContext } = useProjectContext();
  if (!projectContext) return null;
  const { clef } = projectContext;

  const scale = [
    ...Scale.get(`${clef}7 major`).notes,
    ...Scale.get(`${clef}6 major`).notes,
    ...Scale.get(`${clef}5 major`).notes,
    ...Scale.get(`${clef}4 major`).notes,
    ...Scale.get(`${clef}3 major`).notes,
    ...Scale.get(`${clef}2 major`).notes,
  ];

  function Pad({ label }: { label: string }) {
    return (
      <button
        title={label}
        value={label}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          console.log((event.target as HTMLButtonElement).value);
          samplay.triggerAttackRelease(
            (event.target as HTMLButtonElement).value,
            "16n",
            Transport.now()
          );
        }}
        className="text-xs py-2 bg-lime-100 text-black"
      >
        {label}
      </button>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={finalStyle}
      {...attributes}
      className="absolute z-50 w-96 flex flex-col p-4 pb-8 bg-lime-950 text-white"
    >
      <header>
        <h2 className="font-bold text-xl">SamPlay_alpha</h2>
        <button {...listeners}>
          <GripIcon className="absolute top-1 right-1" />
        </button>
        <KeySquareIcon className="w-4 h-4" />
        <select
          id="samplay-clef"
          className="w-8 bg-transparent"
          onChange={(event) =>
            updateProjectContext({ clef: event.target.value })
          }
          title="Clef"
          value={clef}
        >
          {Scale.get(`${clef} major`).notes.map((note) => (
            <option key={`${clef}-${note}`} value={note}>
              {note}
            </option>
          ))}
        </select>
        <select
          title="Clef type"
          className="bg-transparent"
          name="select-scale-type"
          id="select-clef-type"
        >
          {Scale.names().map((name) => (
            <option key={`scale-${name}`} value={name}>
              {name}
            </option>
          ))}
        </select>
      </header>
      <main className="mt-12 mb-2 flex-1">
        {/* Wave Editor */}
        <section></section>

        {/* 16 Pads */}
        <section>
          <Grid cols={7} className="gap-1">
            {scale.map((note) => (
              <Pad label={note} key={`samplay-pad-${note}`} />
            ))}
          </Grid>
        </section>
      </main>
      <footer>
        <small className="text-xs">
          SamPlay alpha. Enjoy! It&apos;s open-source.
        </small>
      </footer>
    </div>
  );
}
