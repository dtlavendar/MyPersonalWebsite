import React, { useMemo } from 'react';

type NoteSpec = {
  leftPercent: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
  emoji: string;
  opacity: number;
};

const EMOJIS = ['♪', '♫', '🎵'];

export default function BackgroundNotes() {
  const notes = useMemo<NoteSpec[]>(() => {
    const rng = (min: number, max: number) => Math.random() * (max - min) + min;
    return Array.from({ length: 20 }).map(() => ({
      leftPercent: rng(0, 100),
      sizePx: rng(12, 28),
      durationSec: rng(14, 28),
      delaySec: rng(0, 12),
      emoji: EMOJIS[Math.floor(rng(0, EMOJIS.length))],
      opacity: rng(0.05, 0.18),
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {notes.map((n, i) => (
        <span
          key={i}
          className="music-note absolute will-change-transform"
          style={{
            left: `${n.leftPercent}%`,
            bottom: '-10vh',
            fontSize: `${n.sizePx}px`,
            opacity: n.opacity,
            animation: `floatUp ${n.durationSec}s linear ${n.delaySec}s infinite`,
          }}
        >
          {n.emoji}
        </span>
      ))}
    </div>
  );
}