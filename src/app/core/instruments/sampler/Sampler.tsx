import { type MouseEvent, useState } from "react";
import { GripIcon, KeySquareIcon, Loader2Icon } from "lucide-react";
import { Sampler, Transport } from "tone";
import { Scale } from "tonal";

import { Grid } from "@/app/ui";
import useProjectContext from "../../hooks/useProjectContext";
import { Draggable } from "@/app/components";

export default function SamPlay() {
  const [loaded, setLoaded] = useState(false);

  const sampler = new Sampler({
    urls: {
      D3: "MT0D3.WAV",
    },
    onload: () => {
      setLoaded(true);
    },
    baseUrl: "./samples/Roland_TR-909/",
  }).toDestination();
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
          sampler.triggerAttackRelease(
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
    <Draggable id="samplay_alpha">
      <div className="w-96 flex flex-col p-4 pb-8 bg-lime-950 text-white">
        <header>
          <h2 className="font-bold text-xl">SamPlay_alpha</h2>
          <GripIcon className="absolute top-1 right-1" />
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
            <option selected={true} value="major">
              Major
            </option>
            <option selected value="minor">
              minor
            </option>
          </select>
        </header>
        <main className="mt-12 mb-2 flex-1">
          {/* Wave Editor */}
          <section></section>

          {/* 16 Pads */}
          <section>
            {loaded ? (
              <Grid cols={7} className="gap-1">
                {scale.map((note) => (
                  <Pad label={note} key={`samplay-pad-${note}`} />
                ))}
              </Grid>
            ) : (
              <div className="text-center">
                <Loader2Icon className="w-8 h-8" />
              </div>
            )}
          </section>
        </main>
        <footer>
          <small className="text-xs">
            SamPlay alpha. Enjoy! It&apos;s open-source.
          </small>
        </footer>
      </div>
    </Draggable>
  );
}
