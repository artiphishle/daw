import { ESize, EVariant } from '../../constants';
import Circle, { ICircle } from '../../shape/Circle';

interface IKnob extends ICircle {
  className?: string;
  max?: number;
  min?: number;
  value?: number;
}

function Knob({ className = '', min = 0, max = 1, value = 0.8 }: IKnob) {
  return (
    <Circle color={EVariant.Primary} size={ESize.Sm} className={className}>
      {value}
    </Circle>
  );
}

export { Knob };
