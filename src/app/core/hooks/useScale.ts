import { useState } from "react";
import { Scale } from "tonal";

export default function useScale() {
  const [scale, setScale] = useState(Scale.get("C4 minor"));

  const detect = (notes: string[]) => Scale.detect(notes);
  const get = (term: string) => Scale.get(term).notes;

  return { scale, detect, get };
}
