import cn from "classnames";
import { ListMusic } from "lucide-react";

export default function MidiTrack() {
  function onClick(event: any) {
    console.log(event.target);
    event.target.classList.toggle("bg-[#ffffff50]");
    event.target.classList.toggle("bg-orange-400");
  }

  return (
    <div className={cn("flex w-full bg-orange-100 mb-2 items-center")}>
      <div className="px-4 py-1 border-r border-r-orange-200">
        <ListMusic className="fill-orange-400" />
      </div>
      <div className="w-full flex">
        {new Array(8).fill("").map((_, j) => (
          <div
            key={j}
            className="p-1 flex flex-1 w-full border-r border-orange-200"
          >
            {new Array(8).fill("").map((_, k) => (
              <div
                className="flex-1 bg-[#ffffff50] mr-1"
                onClick={onClick}
                key={`sub-${k}}`}
              >
                &nbsp;
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
