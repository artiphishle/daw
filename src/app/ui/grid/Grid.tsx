import propTypes from "prop-types";
import classNames from "classnames";

interface IGrid {
  className?: string;
  cols: number;
  data: string[];
}

const getTwHack = (num: number) => `grid-cols-${num}`;

function Grid({ className = "", cols, data }: IGrid) {
  return (
    <div className={classNames(`grid grid-cols-${cols}`, className)}>
      {data.map((cell, cellIndex) => (
        <div
          key={`grid-cell-${cellIndex}`}
          className="border border-gray-300 border-opacity-50"
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
