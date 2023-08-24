import BaseDrum from "./baseDrum/BaseDrum";
import SnareDrum from "./snareDrum/SnareDrum";
import HiHat from "./hiHat/HiHat";
import Tom, { ETom } from "./tom/Tom";

export default function Drums() {
  return (
    <section>
      <BaseDrum />
      <SnareDrum />
      <HiHat />
      <Tom kind={ETom.Hi} />
      <Tom kind={ETom.Mid} />
      <Tom kind={ETom.Lo} />
    </section>
  );
}
