import { Grid } from "../ui";

interface IQGrid {
  quantization?: number;
  height?: number;
  trackCount?: number;
}

function QGrid({ quantization = 128, height = 80, trackCount = 8 }: IQGrid) {
  return <Grid cols={quantization} />;
}

export default QGrid;
