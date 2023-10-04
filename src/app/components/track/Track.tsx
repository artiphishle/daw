"use client";
import classNames from "classnames";

import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

import styles from "@/app/core/config/styles";
import useProjectContext from "@/app/core/hooks/api/useProjectContext";
import useTrackConfig from "@/app/components/track/useTrackConfig";
import { SortableItem } from "@/app/components";

import { useWindowWidth } from "@react-hook/window-size";
import {
  ETrackType,
  type ITrack,
  TInputOptions,
  IInstrument,
} from "@/app/types/daw";
import useScheduler from "@/app/core/hooks/useScheduler";
import { useEffect } from "react";

function Track(track: ITrack) {
  const { id, name, type, routing, className = "" } = track;
  const { notes, id: inputId, instrument } = routing.input;

  const { Icon, draw } = useTrackConfig(type);
  const { setup, dispose } = useScheduler();
  const windowWidth = useWindowWidth();

  const { projectContext, patchProjectContext } = useProjectContext();
  const measureCount = projectContext?.measureCount;
  const quantization = projectContext?.quantization;

  useEffect(() => {
    console.log("init");

    return () => dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!projectContext) return;
    if (instrument?.instrument && notes?.length) {
      setup(instrument.instrument, inputId, measureCount!, notes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectContext]);

  const UNSORTABLE_TRACK_TYPES = [ETrackType.Group];
  const isSortable = !UNSORTABLE_TRACK_TYPES.includes(type);

  const css = styles.track;
  const cssLi = classNames(css.row(type), className);
  const params = {
    options: routing.input.options,
    instrument: routing.input.instrument,
  };

  interface ITpl {
    options: TInputOptions;
    instrument: IInstrument;
  }

  const Tpl = ({ options, instrument }: ITpl) => (
    <>
      <div className={classNames(css.col1.main, className)}>
        <Icon className={css.icon(type)} />
        <div className={css.col1.name}>{name}</div>
      </div>
      <div className={css.col2.main}>
        {draw({
          measureCount,
          quantization,
          projectContext,
          id,
          windowWidth: windowWidth - DEFAULT_OFFSET_LEFT,
          patchProjectContext,
          ...options,
          instrument,
        })}
      </div>
    </>
  );

  return isSortable ? (
    <SortableItem className={cssLi} id={id}>
      <Tpl options={params.options} instrument={params.instrument!} />
    </SortableItem>
  ) : (
    <li id={id as string} className={cssLi}>
      <Tpl options={params.options} instrument={params.instrument!} />
    </li>
  );
}

export default Track;
