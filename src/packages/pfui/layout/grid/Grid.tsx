import { IGrid } from "packages/pfui/types";
import classNames from "classnames";

const Grid = ({
  children,
  className,
  classNameItem = "",
  cols = 4,
  rows = 4,
}: IGrid) => {
  const props = {
    className: classNames(className, `grid grid-cols-[${cols}]`),
  };
  const items =
    children ||
    new Array(cols * rows).fill(" ").map((_, itemIndex) => (
      <div key={`grid-item-${itemIndex}`} className={classNameItem}>
        &nbsp;
      </div>
    ));

  return (
    <div {...props} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {items}
    </div>
  );
};
export { Grid };
