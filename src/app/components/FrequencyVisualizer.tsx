import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const NOTE_TO_HEIGHT: Record<string, number> = {
  C: 90,
  'C#': 70,
  D: 80,
  'D#': 65,
  E: 85,
  F: 75,
  'F#': 60,
  G: 88,
  'G#': 60,
  A: 82,
  'A#': 65,
  B: 78
};

export function FrequencyVisualizer({ notes = [] }: { notes?: string[] }) {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    if (notes.length === 0) {
      setBars(Array(20).fill(20));
      return;
    }

    // Map notes to animated bar heights
    const mappedBars = Array.from({ length: 20 }, (_, i) => {
      const note = notes[i % notes.length];
      return NOTE_TO_HEIGHT[note] || 40;
    });

    setBars(mappedBars);
  }, [notes]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30"
        style={{ background: 'rgba(255, 255, 255, 0.3)' }}
      >
        <p className="text-center mb-6" style={{ color: '#8B5A3C' }}>
          Detected Frequencies
        </p>

        <div className="flex items-end justify-center gap-1 h-32">
          {bars.map((height, index) => (
            <motion.div
              key={index}
              className="w-full rounded-t-lg"
              style={{
                background: 'linear-gradient(to top, #FF8C42, #FFAD60)',
              }}
              initial={{ height: 20 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
