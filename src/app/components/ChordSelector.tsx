import { useState } from 'react';
import { motion } from 'motion/react';

const CHORDS = ['C Major', 'G Major', 'D Major', 'A Minor', 'E Minor', 'F Major'];

interface ChordSelectorProps {
  selectedChord: string;
  onSelectChord: (chord: string) => void;
}

export function ChordSelector({ selectedChord, onSelectChord }: ChordSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className="backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30"
        style={{ 
          background: 'rgba(255, 255, 255, 0.3)',
        }}
      >
        <p className="text-center mb-4" style={{ color: '#8B5A3C' }}>
          Select Target Chord
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          {CHORDS.map((chord) => (
            <motion.button
              key={chord}
              onClick={() => onSelectChord(chord)}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedChord === chord
                  ? 'shadow-lg'
                  : 'shadow-md hover:shadow-lg'
              }`}
              style={{
                background: selectedChord === chord
                  ? 'linear-gradient(135deg, #FF8C42, #FFAD60)'
                  : 'rgba(255, 255, 255, 0.6)',
                color: selectedChord === chord ? '#FFFFFF' : '#3D2817',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {chord}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
