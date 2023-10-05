import Circle, { EColor, ESize, ICircle } from "../shape/Circle";

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
  return (
    <Circle color={EColor.Primary} size={ESize.Xs} className={className}>
      {value}
    </Circle>
  );
}
