import { ESize, EVariant } from '../constants';
import { Button, EButtonType } from './Button';

export function SoloButton() {
  return (
    <Button
      size={ESize.Sm}
      title="Solo"
      type={EButtonType.Button}
      variant={EVariant.Primary}
      value="S"
    />
  );
}
