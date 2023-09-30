import BaseDrum from "./baseDrum/BaseDrum";
import SnareDrum from "./snareDrum/SnareDrum";
import HiHat from "./cymbal/HiHat";

export default function Drums() {
  return (
    <section>
      <BaseDrum />
      <SnareDrum />
      <HiHat />
    </section>
  );
}
