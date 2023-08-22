import { useEffect } from "react";
import abcjs, { type TuneObjectArray } from "abcjs";
import "abcjs/abcjs-audio.css";

export default function Sheet() {
  const examples = [
    "X:1\nK:D\nDD AA|BBA2|\n",
    "X:1\nT:The Sheet\nM:4/4\nC:Trad.\nK:G\n|:Gccc dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|",
  ];

  useEffect(() => {
    const sheet: TuneObjectArray = abcjs.renderAbc("paper", examples[1]);

    console.info("[Sheet] rendered:", sheet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="bg-white" id="paper" />;
}
