import PropTypes from "prop-types";
import { Grid } from "../ui";

interface IQGrid {
  quantization?: number;
  height?: number;
  trackCount?: number;
}

function QGrid({ quantization = 128, height = 80, trackCount = 8 }: IQGrid) {
  return <Grid cols={quantization} />;
}

QGrid.propTypes = {
  quantization: PropTypes.number,
  height: PropTypes.number,
  trackCount: PropTypes.number,
};

export default QGrid;
