import { RangeInput } from "@/ui";

export default function Fader() {
  const props = {
    id: "fader",
    min: -60,
    max: 6,
    initialValue: 0,
    vertical: true,
  };

  return <RangeInput {...props} />;
}
