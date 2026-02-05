import { CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface DetectionResultProps {
  isCorrect: boolean | null;
  detectedNotes: string[];
}

export function DetectionResult({ isCorrect, detectedNotes }: DetectionResultProps) {
  if (isCorrect === null) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div 
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 text-center"
          style={{ 
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <p style={{ color: '#8B5A3C' }}>
            Play a chord to see the results
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="backdrop-blur-lg rounded-2xl p-8 shadow-2xl border-2"
        style={{ 
          background: isCorrect 
            ? 'rgba(74, 222, 128, 0.15)'
            : 'rgba(239, 68, 68, 0.15)',
          borderColor: isCorrect ? '#4ADE80' : '#EF4444',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          {isCorrect ? (
            <>
              <CheckCircle2 className="w-12 h-12" style={{ color: '#4ADE80' }} />
              <h2 className="text-3xl" style={{ color: '#4ADE80' }}>
                Perfect!
              </h2>
            </>
          ) : (
            <>
              <XCircle className="w-12 h-12" style={{ color: '#EF4444' }} />
              <h2 className="text-3xl" style={{ color: '#EF4444' }}>
                Try Again
              </h2>
            </>
          )}
        </div>

        <div className="text-center">
          <p className="mb-4" style={{ color: '#8B5A3C' }}>
            Detected Notes:
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            {detectedNotes.map((note, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 rounded-full shadow-md"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  color: '#3D2817',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {note}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
