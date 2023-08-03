import Base from "./base/Base";
import HiHat from "./hiHat/HiHat";
import Snare from "./snare/Snare";
import Tom, { ETom } from "./tom/Tom";

export default function Drums() {
  return (
    <section>
      <Base />
      <Snare />
      <HiHat />
      <Tom kind={ETom.Hi} />
      <Tom kind={ETom.Mid} />
      <Tom kind={ETom.Lo} />
    </section>
  );
}
