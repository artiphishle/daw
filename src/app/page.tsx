"use client";
import { useState } from "react";

import { StartDialog } from "./components/StartDialog";
import { App } from "./components/App";

export default function Home() {
  const [toneReady, setToneReady] = useState(false);

  if (toneReady) return <App />;
  return <StartDialog toneReady={toneReady} setToneReady={setToneReady} />;
}
