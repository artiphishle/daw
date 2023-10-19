"use client";
import { DefaultPreset } from "@/api/project/presets/DefaultPreset";
import styles from "@/common/styles";
import { useWindowWidth } from "@react-hook/window-size";
import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

export default function Dsp() {
  const windowWidth = useWindowWidth();
  const { channels, tracks } = DefaultPreset;

  const channelNodes = channels.map(({ id, label }, channelIndex) => {
    const channelNode = {
      id: id as string,
      position: {
        x: Math.floor(windowWidth / channels.length),
        y: 100 * channelIndex,
      },
      data: { id, label },
    };
    return channelNode;
  });
  const trackNodes = tracks.map(({ id, name }, trackIndex) => {
    const trackNode = {
      id: id as string,
      position: {
        x: Math.floor(windowWidth / tracks.length),
        y: 50 * trackIndex + 1,
      },
      data: { id, label: name },
    };
    return trackNode;
  });

  // TODO routing table
  const initialEdges = [
    { id: "edge-1", source: "track-bd", target: "ch-drums" },
    { id: "edge-2", source: "track-sd", target: "ch-drums" },
    { id: "edge-3", source: "track-oh", target: "ch-drums" },
    { id: "edge-4", source: "track-hi-tom", target: "ch-drums" },
    { id: "edge-5", source: "track-mi-tom", target: "ch-drums" },
    { id: "edge-6", source: "track-lo-tom", target: "ch-drums" },
    {
      id: "edge-150",
      className: "bg-red-500",
      source: "ch-drums",
      target: "master",
    },
  ];

  console.log(channelNodes, trackNodes);
  return (
    <center>
      <section>
        <h1 className={styles.headings.h1}>Projekt</h1>
        <h2 className={styles.headings.h2}>General info</h2>
        <p>Bpm: {DefaultPreset.bpm}</p>

        <div style={{ marginTop: "10vh", width: "100vw", height: "80vh" }}>
          <ReactFlow
            nodes={[...channelNodes, ...trackNodes]}
            edges={initialEdges}
          />
        </div>
      </section>
    </center>
  );
}
