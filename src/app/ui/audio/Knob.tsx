import { ESize, EVariant } from "../element/button/Button";
import Circle, { ICircle } from "../shape/Circle";

interface IKnob extends ICircle {
  className?: string;
  max?: number;
  min?: number;
  value?: number;
}

export default function Knob({
  className = "",
  min = 0,
  max = 1,
  value = 0.8,
}: IKnob) {
  console.info("[Knob] min/max", min, max);
  return (
    <Circle color={EVariant.Primary} size={ESize.Sm} className={className}>
      {value}
    </Circle>
  );
}
