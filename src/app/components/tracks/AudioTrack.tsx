import { ActivityIcon } from "lucide-react";
import { Sampler } from "tone";

export default function AudioTrack() {
  function onClick(event: any) {
    event.target.classList.toggle("bg-purple-100");
  }

  return (
    <div className="flex w-full bg-purple-100 mb-2 items-center">
      <div className="px-4 py-1 border-r border-r-purple-200">
        <ActivityIcon className="fill-purple-400" />
      </div>
      <div className="p-1">&nbsp;</div>
    </div>
  );
}
