"use client";
import { useState } from "react";

import { App, StartDialog } from "./components";

export default function Home() {
  const [toneReady, setToneReady] = useState(false);

  if (toneReady) return <App />;
  return <StartDialog toneReady={toneReady} setToneReady={setToneReady} />;
}
