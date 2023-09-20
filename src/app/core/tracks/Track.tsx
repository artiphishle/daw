import propTypes from "prop-types";

import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";
import useTrackConfig from "@/app/core/tracks/useTrackConfig";
import useProjectSettings from "@/app/core/hooks/useProjectSettings";
import { SortableItem } from "@/app/components";

import { ETrackType, ITrackRouting } from "@/app/core/tracks/types";
import type { UniqueIdentifier } from "@dnd-kit/core";
import classNames from "classnames";

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
  const { id, url, className = "", name = t("untitled"), type } = track;
  const { Icon, draw } = useTrackConfig(type)!;
  const { projectSettings, updateProjectSettings } = useProjectSettings();
  if (!projectSettings) return null;

  const { measureCount } = projectSettings;
  const css = styles.track;
  const cssLi = classNames(css.row(type), className);
  const isSortable = ![ETrackType.Time, ETrackType.Group].includes(type);
  const Tpl = () => (
    <>
      <div className={css.col1.main(type)}>
        <Icon className={css.icon(type)} />
        <div className={css.col1.name}>{name}</div>
      </div>
      <div className={css.col2.main}>
        {draw({
          measureCount,
          projectSettings,
          id,
          url,
          updateProjectSettings,
        })}
      </div>
    </>
  );
  return isSortable ? (
    <SortableItem className={cssLi} id={id}>
      <Tpl />
    </SortableItem>
  ) : (
    <li className={cssLi}>
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
