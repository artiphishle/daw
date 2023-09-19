import propTypes from "prop-types";

import t from "@/app/core/i18n";
import styles from "@/app/core/config/styles";
import useTrackConfig from "@/app/core/tracks/useTrackConfig";
import useProjectSettings from "@/app/core/hooks/useProjectSettings";
import { SortableItem } from "@/app/components";

import { ETrackType, ITrackRouting } from "@/app/core/tracks/types";
import type { UniqueIdentifier } from "@dnd-kit/core";

// TODO not every 'input' has notes, instrument, etc.
export interface ITrack {
  id: UniqueIdentifier;
  routing: ITrackRouting;
  name: string;
  type: ETrackType;
  url?: string;
}

function Track({
  id,
  url,
  routing: { input },
  name = t("untitled"),
  type,
}: ITrack) {
  const { Icon, draw, play } = useTrackConfig(type)!;
  const { projectSettings } = useProjectSettings();
  if (!projectSettings) return null;

  const { measureCount } = projectSettings;
  const { instrument, label, notes } = input;
  const css = styles.track;
  const cssLi = css.row(type);
  const isSortable = ![ETrackType.Time, ETrackType.Group].includes(type);

  play && play({ instrument, label, notes });

  const Tpl = () => (
    <>
      <div className={css.col1.main(type)}>
        <Icon className={css.icon(type)} />
        <div className={css.col1.name}>{name}</div>
      </div>
      <div className={css.col2.main}>{draw({ measureCount, notes, url })}</div>
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
