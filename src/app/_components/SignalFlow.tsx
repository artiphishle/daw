'use client';
import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

import { useWindowWidth } from '@react-hook/window-size';

import type { IData } from '@/common/types/project.types';

import styles from 'app/_common/styles';

export default function Dsp({ channels, project, tracks }: IData) {
  const { bpm } = project;
  const windowWidth = useWindowWidth();
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
    { id: 'edge-1', source: 'track-bd', target: 'ch-drums' },
    { id: 'edge-2', source: 'track-sd', target: 'ch-drums' },
    { id: 'edge-3', source: 'track-oh', target: 'ch-drums' },
    { id: 'edge-4', source: 'track-hi-tom', target: 'ch-drums' },
    { id: 'edge-5', source: 'track-mi-tom', target: 'ch-drums' },
    { id: 'edge-6', source: 'track-lo-tom', target: 'ch-drums' },
    {
      id: 'edge-150',
      className: 'bg-red-500',
      source: 'ch-drums',
      target: 'master',
    },
  ];

  return (
    <center>
      <section>
        <h1 className={styles.headings.h1}>Projekt</h1>
        <h2 className={styles.headings.h2}>General info</h2>
        <p>Bpm: {bpm}</p>

        <div style={{ marginTop: '10vh', width: '100vw', height: '80vh' }}>
          <ReactFlow
            nodes={[...channelNodes, ...trackNodes]}
            edges={initialEdges}
          />
        </div>
      </section>
    </center>
  );
}
