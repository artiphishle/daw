"use client";

import Transport from "./Transport";
import { MenuIcon } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="flex flex-row mb-2 w-full bg-black text-white items-center justify-between">
      <div className="flex px-4 py-2">
        <MenuIcon className="w-8 h-8 mr-2" />
        <h1 className=" text-3xl font-black">DAW</h1>
      </div>
      <Transport />
    </div>
  );
}
