import { Button } from '@/pfui';
import { EButtonType, ESize, EVariant } from '@/pfui/constants';

export function MuteButton() {
  return (
    <Button
      size={ESize.Sm}
      title="Mute"
      type={EButtonType.Button}
      variant={EVariant.Error}
      value="M"
    />
  );
}
