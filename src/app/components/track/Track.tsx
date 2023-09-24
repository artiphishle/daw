import { createContext, useEffect, useState } from "react";
import propTypes from "prop-types";
import classNames from "classnames";

import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";
import useTrackConfig from "@/app/components/track/useTrackConfig";
import useProjectContext from "@/app/core/hooks/useProjectContext";
import { SortableItem } from "@/app/components";

import { ETrackType, ITrackRouting } from "@/app/components/track/types";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";
import { useWindowWidth } from "@react-hook/window-size";

// TODO not every 'input' has notes, instrument, etc.
export interface ITrack {
  className?: string;
  id: UniqueIdentifier;
  routing: ITrackRouting;
  name: string;
  type: ETrackType;
  url?: string;
}
function Track(track: ITrack) {
  const { id, url, className = "", name, type } = track;
  const { Icon, draw } = useTrackConfig(type)!;
  const windowWidth = useWindowWidth();
  const { projectContext, updateProjectContext } = useProjectContext();
  if (!projectContext) return null;

  const { measureCount, quantization } = projectContext;
  const css = styles.track;
  const cssLi = classNames(css.row(type), className);
  const isSortable = ![ETrackType.Time, ETrackType.Group].includes(type);
  const Tpl = () => (
    <>
      <div className={classNames(css.col1.main(type), className)}>
        <Icon className={css.icon(type)} />
        <div className={css.col1.name}>{name}</div>
      </div>
      <div className={css.col2.main}>
        {draw({
          measureCount,
          quantization,
          projectContext,
          id,
          url,
          windowWidth: windowWidth - DEFAULT_OFFSET_LEFT,
          updateProjectContext,
        })}
      </div>
    </>
  );
  return isSortable ? (
    <SortableItem className={cssLi} id={id}>
      <Tpl />
    </SortableItem>
  ) : (
    <li id={id as string} className={cssLi}>
      <Tpl />
    </li>
  );
}

Track.propTypes = {
  id: propTypes.string,
  input: propTypes.object,
  name: propTypes.string,
  type: propTypes.oneOf(Object.values(ETrackType)),
};
Track.propDefaults = {
  name: t("untitled"),
};

export default Track;
