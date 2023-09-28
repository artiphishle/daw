import classNames from "classnames";

import { DEFAULT_OFFSET_LEFT } from "@/app/core/config/constants";

import styles from "@/app/core/config/styles";
import useTrackConfig from "@/app/components/track/useTrackConfig";
import useProjectContext from "@/app/core/hooks/useProjectContext";
import { SortableItem } from "@/app/components";

import { useWindowWidth } from "@react-hook/window-size";
import { ETrackType, type ITrack } from "@/app/types/daw";

function Track<O, I>(track: ITrack<O, I>) {
  const { id, name, type, routing, className = "" } = track;
  const { Icon, draw } = useTrackConfig(type);

  const windowWidth = useWindowWidth();
  const { projectContext, updateProjectContext } = useProjectContext();
  if (!projectContext) return null;
  const { measureCount, quantization } = projectContext;

  const UNSORTABLE_TRACK_TYPES = [ETrackType.Group];
  const isSortable = !UNSORTABLE_TRACK_TYPES.includes(type);

  const css = styles.track;
  const cssLi = classNames(css.row(type), className);
  const params = {
    options: routing.input.options,
    instrument: routing.input.instrument,
  };

  const Tpl = ({ options, instrument }: { options: O; instrument: I }) => (
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
          windowWidth: windowWidth - DEFAULT_OFFSET_LEFT,
          updateProjectContext,
          ...options,
          instrument,
        })}
      </div>
    </>
  );

  return isSortable ? (
    <SortableItem className={cssLi} id={id}>
      <Tpl options={params.options} instrument={params.instrument} />
    </SortableItem>
  ) : (
    <li id={id as string} className={cssLi}>
      <Tpl options={params.options} instrument={params.instrument} />
    </li>
  );
}

export default Track;
