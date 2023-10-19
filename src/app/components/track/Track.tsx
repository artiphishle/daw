"use client";
import _ from "lodash/fp";
import { useEffect } from "react";
import classNames from "classnames";
import { useWindowWidth } from "@react-hook/window-size";
import * as Tone from "tone";

import { getIconByType } from "config/icons";
import styles from "app/common/styles";
import { SortableItem } from "@/components";
import useScheduler from "@/core/hooks/audio/useAudioScheduler";

import { DEFAULT_OFFSET_LEFT } from "app/common/constants";
import Note from "../Note";
import type { IMidiPart } from "app/common/types/midi.types";
import { ETrackType, type ITrack } from "app/common/types/track.types";

function Track({
  id,
  measureCount,
  name,
  type,
  routing,
  className = "",
}: ITrack & { measureCount: number; quantization: number }) {
  const windowWidth = useWindowWidth() - DEFAULT_OFFSET_LEFT;
  const { setupPlayer } = useScheduler();
  const { id: inputId, instrument, parts = [] } = routing.input;
  const $ = styles.track;
  const $li = classNames($.row, className);

  const drawPart = (part: IMidiPart, partIndex: number) => {
    const h = 100;
    const { events } = part;
    const numEvents = events.length;

    return events.map(({ note }, eventIndex) => {
      const measureWidth = windowWidth / measureCount;
      const w = measureWidth / numEvents;
      const l = eventIndex * w + partIndex * measureWidth;

      return (
        note && (
          <Note
            key={`note-${eventIndex}`}
            note={note}
            style={{
              left: l,
              top: 0,
              width: w,
              height: "100%",
              borderRight: "1px solid #fff",
            }}
          />
        )
      );
    });
  };

  useEffect(() => {
    if (!(instrument?.options as Tone.PlayerOptions).url) return;

    setupPlayer({
      player: instrument?.instrument as Tone.Player,
      id: inputId,
      parts,
      measureCount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instrument]);

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
        {parts.map((part, partIndex) => drawPart(part, partIndex))}
      </div>
    </SortableItem>
  );
}
export default Track;
