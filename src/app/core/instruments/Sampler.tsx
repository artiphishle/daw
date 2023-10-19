import { FC, type CSSProperties, type MouseEvent } from "react";
import { GripIcon, KeySquareIcon, XIcon } from "lucide-react";
import classNames from "classnames";
import { useDraggable } from "@dnd-kit/core";
import { Sampler as ToneSampler, SamplerOptions } from "tone";
import { Scale } from "tonal";

import { ButtonGroup, Grid } from "packages/ui";
import useProjectContext from "@/core/hooks/api/useProjectContext";

interface IPad {
  instrument: ToneSampler;
  label: string;
}

const color = "bg-lime-950 text-white";
const position = "fixed z-50 top-[calc(50%-172px)] left-[calc(50%-204px)]";
const spacing = "p-4 pb-8";
const className = classNames(color, position, spacing, "w-96 flex flex-col");

const getScale = (clef: string) => [
  ...Scale.get(`${clef}7 major`).notes,
  ...Scale.get(`${clef}6 major`).notes,
  ...Scale.get(`${clef}5 major`).notes,
  ...Scale.get(`${clef}4 major`).notes,
  ...Scale.get(`${clef}3 major`).notes,
  ...Scale.get(`${clef}2 major`).notes,
];

const Pad = ({ instrument, label }: IPad) => (
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

interface ISampler extends Partial<SamplerOptions> {
  instrument: any;
  onClose: any;
}

const Sampler: FC<ISampler> = ({ instrument, onClose }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "sampler",
  });

  const { projectContext, patchProjectContext } = useProjectContext();
  if (!projectContext) return null;
  const { clef } = projectContext;

  // Maybe: position: "relative", left: "30%", top: "30%",
  const style: CSSProperties = transform
    ? { transform: `translate3d(${transform.x}px ${transform.y}px, 0)` }
    : {};

  const scale = getScale(clef);

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={className}>
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
            patchProjectContext({ clef: event.target.value })
          }
          title="Clef"
          value={clef}
        >
          {scale.map((note) => (
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
              <Pad
                instrument={instrument}
                label={note}
                key={`samplay-pad-${note}`}
              />
            ))}
          </Grid>
        </section>
      </main>
      <footer>
        <small className="text-xs">Enjoy! It&apos;s open-source.</small>
      </footer>
    </div>
  );
};

export default Sampler;
