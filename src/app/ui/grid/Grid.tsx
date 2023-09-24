import propTypes from "prop-types";
import classNames from "classnames";

interface IGrid {
  className?: string;
  cols: number;
  data: string[];
  style?: any;
}

function Grid({ className = "", style = {}, cols, data }: IGrid) {
  return (
    <div
      className={classNames(`bg-white grid grid-cols-${cols}`, className)}
      style={style}
    >
      {data.map((cell, cellIndex) => (
        <div
          key={`grid-cell-${cellIndex}`}
          className="p-1 border-r border-b border-gray-300"
        >
          {cell}
        </div>
      ))}
    </div>
  );
}

Grid.propTypes = {
  className: propTypes.string,
  cols: propTypes.number.isRequired,
  data: propTypes.array.isRequired,
};

export default Grid;
