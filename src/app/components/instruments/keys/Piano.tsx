import { KeyboardIcon } from "lucide-react";
import usePiano from "./hooks/usePiano";

export default function Piano() {
  usePiano();

  return (
    <div className="bg-purple-300 p-4 flex gap-4">
      <KeyboardIcon />
      <span>TRY YOUR KEYBOARD. PIANO LOADED</span>
    </div>
  );
}
