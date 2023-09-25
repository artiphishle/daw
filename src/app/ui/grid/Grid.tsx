import propTypes from "prop-types";
import classNames from "classnames";
import { type ReactNode } from "react";

interface IGrid {
  children?: ReactNode;
  className?: string;
  cols: number;
  data?: string[];
  style?: any;
}

function Grid({ children, className = "", style = {}, cols, data }: IGrid) {
  return (
    <div
      className={classNames(`grid grid-cols-${cols}`, className)}
      style={style}
    >
      {children && children}
      {data &&
        data.map((cell, cellIndex) => (
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
  children: propTypes.node,
  className: propTypes.string,
  cols: propTypes.number.isRequired,
  data: propTypes.arrayOf(propTypes.string),
};

export default Grid;
