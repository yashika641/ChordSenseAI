import React, { JSX } from 'react';
import { Music2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface ChordSegment {
  chord: string;
  confidence: number;
  start: number;
  end: number;
}

interface DetectionResultProps {
  instrument_detected: [string, number] | null;
  chord_timeline: ChordSegment[];
  processing_time: number | null;
}

export function DetectionResult({
  instrument_detected,
  chord_timeline,
  processing_time,
}: DetectionResultProps): JSX.Element {

  if (!instrument_detected) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 text-center"
          style={{ background: 'rgba(255, 255, 255, 0.3)' }}
        >
          <p style={{ color: '#8B5A3C' }}>
            Play or upload audio to see results
          </p>
        </div>
      </div>
    );
  }

  const [instrument, confidence] = instrument_detected;

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30"
        style={{ background: 'rgba(255,255,255,0.4)' }}
      >

        {/* 🎸 Instrument */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Music2 className="w-10 h-10 text-orange-500" />
          <h2 className="text-2xl font-semibold text-[#3D2817]">
            {instrument}
          </h2>
        </div>

        <p className="text-center mb-6 text-[#8B5A3C]">
          Confidence: {(confidence * 100).toFixed(1)}%
        </p>

        {/* 🎵 Chord Timeline */}
        <div className="mb-6">
          <h3 className="text-lg mb-3 text-[#3D2817] text-center">
            Detected Chords
          </h3>

          <div className="flex flex-col gap-2">

            {chord_timeline.map((seg, index) => (
              <motion.div
                key={index}
                className="flex justify-between px-4 py-2 rounded-xl shadow"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  color: '#3D2817',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span>
                  {seg.start.toFixed(2)}s → {seg.end.toFixed(2)}s
                </span>

                <span className="font-semibold">
                  {seg.chord}
                </span>
              </motion.div>
            ))}

          </div>
        </div>

        {/* ⏱ Processing Time */}
        {processing_time && (
          <div className="flex items-center justify-center gap-2 text-[#8B5A3C]">
            <Clock className="w-5 h-5" />
            <span>
              Processed in {processing_time.toFixed(2)} sec
            </span>
          </div>
        )}

      </div>
    </motion.div>
  );
}
