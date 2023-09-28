import { type MouseEvent, useState, type CSSProperties } from "react";
import { GripIcon, KeySquareIcon, XIcon } from "lucide-react";
import classNames from "classnames";
import { useDraggable } from "@dnd-kit/core";
import { Sampler as ToneSampler, SamplerOptions, Transport } from "tone";
import { Scale } from "tonal";

import useProjectContext from "@/app/core/hooks/useProjectContext";
import { ButtonGroup, Grid } from "@/ui";

interface ISampler extends Partial<SamplerOptions> {
  instrument: ToneSampler;
  onClose: () => void;
}

export default function Sampler({ instrument, onClose }: ISampler) {
  const [error, setError] = useState<Error | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "sampler",
  });

  const { projectContext, updateProjectContext } = useProjectContext();
  if (!projectContext) return null;
  const { clef } = projectContext;
  // const [absolute, setAbsolute] = useState({ left: 0, top: 0 });
  const style: CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: "relative",
        left: "30%",
        top: "30%",
      }
    : {};

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
          const note = (event.target as HTMLButtonElement).value;
          instrument.triggerAttackRelease(note, "16n");
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
      style={style}
      {...attributes}
      className={classNames(
        "fixed top-[calc(50%-172px)] left-[calc(50%-204px)] z-50 w-96 flex flex-col p-4 pb-8 bg-lime-950 text-white"
      )}
    >
      <header>
        <h2 className="font-bold text-xl">Sample Ralph A</h2>
        <ButtonGroup className="absolute top-1 right-1">
          <button {...listeners}>
            <GripIcon />
          </button>
          <button onClick={onClose} title="Close">
            <XIcon />
          </button>
        </ButtonGroup>
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
        <small className="text-xs">Enjoy! It&apos;s open-source.</small>
      </footer>
    </div>
  );
}
