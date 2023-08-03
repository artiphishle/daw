import Transport from "./Transport";
import PolySynth from "../instruments/PolySynth";
import { MenuIcon } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="flex flex-row mb-2 w-full bg-white items-center justify-between">
      <div className="px-4 py-2">
        <MenuIcon />
      </div>
      <Transport />
    </div>
  );
}
