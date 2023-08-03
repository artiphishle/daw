import { TimerIcon } from "lucide-react";

export default function Time() {
  return (
    <div className="flex flex-1 bg-white items-center">
      <div className="py-1 px-4 border-r border-r-gray-200">
        <TimerIcon />
      </div>
      <div className="w-full flex flex-1">
        {new Array(8).fill("").map((_, i) => (
          <div className="flex flex-1 items-center" key={i}>
            <div className="text-gray-500 text-xs border-r border-r-gray-200 flex-1 p-1">
              {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
