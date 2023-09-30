import { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";

export default function useRecorder() {
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: "#mic",
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
    });
    const record = waveSurfer.registerPlugin(RecordPlugin.create());

    record.on("record-end", (blob) => {
      const container = "#recordings";
      const recordedUrl = URL.createObjectURL(blob);
      const waveSurfer = WaveSurfer.create({
        container,
        waveColor: "rgb(200, 100, 0)",
        progressColor: "rgb(100, 50, 0)",
        url: recordedUrl,
      });
    });

    /*
     *Button.onclick = () => wavesurfer.playPause();
     *wavesurfer.on("pause", () => (button.textContent = "Play"));
     *wavesurfer.on("play", () => (button.textContent = "Pause"));
     *
     *Object.assign(link, {
     *  href: recordedUrl,
     *  download: "recording." + blob.type.split(";")[0].split("/")[1] || "webm",
     *  textContent: "Download recording",
     *});
     */
  }, []);
}
