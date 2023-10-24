import { ESize, EVariant } from '../constants';
import { Button, EButtonType } from './Button';

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
