import styles from '@/common/styles';
import { Button } from '@/pfui';
import { EButtonType, EVariant } from '@/pfui/constants';

export function SoloButton() {
  return (
    <Button
      className={styles.icon.md}
      title="Solo"
      type={EButtonType.Button}
      variant={EVariant.Primary}
      value="S"
    />
  );
}
