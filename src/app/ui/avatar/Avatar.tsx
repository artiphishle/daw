import { UserIcon } from "lucide-react";

export default function Avatar() {
  return (
    <div className="cursor-pointer border border-cyan-400 w-12 h-12 flex justify-center items-center bg-cyan-700 text-white rounded-full hover:rotate-180">
      <UserIcon className="w-8 h-8" />
    </div>
  );
}
