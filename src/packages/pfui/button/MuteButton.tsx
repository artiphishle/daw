import styles from '@/common/styles';
import { Button } from '@/pfui';
import { EButtonType, EVariant } from '@/pfui/constants';

export function MuteButton() {
  return (
    <Button
      className={styles.icon.md}
      title="Mute"
      type={EButtonType.Button}
      variant={EVariant.Error}
      value="M"
    />
  );
}
