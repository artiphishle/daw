"use client";
import { useEffect } from "react";
import classNames from "classnames";
import { useWindowWidth } from "@react-hook/window-size";

import { getIconByType } from "config/icons";
import styles from "config/styles";
import { SortableItem } from "@/components";
import useScheduler from "@/core/hooks/audio/useAudioScheduler";

import { DEFAULT_OFFSET_LEFT, isPlayableTrackType } from "app/common/constants";
import Note from "../Note";
import type { Note as TNote } from "tone/build/esm/core/type/NoteUnits";
import type { IMidiEvent, TMidiPart } from "app/common/types/midi.types";
import { type ITrack } from "app/common/types/track.types";
import _ from "lodash/fp";

function Track({
  id,
  measureCount,
  name,
  type,
  routing,
  className = "",
}: ITrack & { measureCount: number; quantization: number }) {
  const duration = 16;

  const windowWidth = useWindowWidth() - DEFAULT_OFFSET_LEFT;
  // const measureWidth = windowWidth / measureCount;
  const { setup } = useScheduler();
  const { id: inputId, instrument, parts = [] } = routing.input;
  const $ = styles.track;
  const $li = classNames($.row(type), className);

  const drawPart = (part: TMidiPart) => {
    const numSequences = part.sequences.length;
    const h = 100 / numSequences;
    return (
      <>
        {part.sequences.map((sequence, sequenceIndex) => {
          const numNotes = sequence.events.length;
          const t = sequenceIndex * h;
          return sequence.events.map(
            (event: IMidiEvent | IMidiEvent[], eventIndex) => {
              const w = windowWidth / numNotes / measureCount; // TODO ratio is hardcoded
              const l =
                (eventIndex * windowWidth) /
                sequence.events.length /
                measureCount; // quantization;

              if (_.isArray(event)) {
                return (event as IMidiEvent[]).map(({ n, v }, evIndex) => {
                  const subL = l + windowWidth / sequence.events.length;
                  const subW = w / 2;
                  return (
                    n && (
                      <Note
                        key={`note-${n}-${evIndex}`}
                        note={n}
                        style={{
                          left: subL,
                          top: `${t}%`,
                          width: w,
                          height: `${h}%`,
                          borderRight: "1px solid #fff",
                          borderBottom: "1px solid #fff",
                        }}
                      />
                    )
                  );
                });
              }

              try {
                const { n, v } = event as unknown as {
                  n: TNote;
                  v: number;
                };

                return (
                  n && (
                    <Note
                      key={`note-${n}-${eventIndex}`}
                      note={n}
                      style={{
                        left: l,
                        top: `${t}%`,
                        width: w,
                        height: `${h}%`,
                        borderRight: "1px solid #fff",
                      }}
                    />
                  )
                );
              } catch (error) {
                throw new Error("handle subdivision");
              }
            }
          );
        })}
      </>
    );
  };

  useEffect(() => {
    if (!isPlayableTrackType(type) || !instrument?.instrument) return;

    setup({
      instrument: instrument.instrument,
      id: inputId,
      parts,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const props = {
    main: { id, className: $li },
    inner: { className: classNames($.col1.main, className) },
  };
  const TypeIcon = getIconByType(type);

  return (
    <SortableItem {...props.main}>
      <div {...props.inner} style={{ height: 40 }}>
        <TypeIcon />
        <div className={$.col1.name}>{name}</div>
      </div>
      <div className={$.col2.main}>
        {isPlayableTrackType(type) && drawPart(parts[0])}
      </div>
    </SortableItem>
  );
}
export default Track;
