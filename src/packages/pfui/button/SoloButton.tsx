import { Button } from '@/pfui';
import { EButtonType, ESize, EVariant } from '@/pfui/constants';

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
