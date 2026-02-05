import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FrequencyVisualizer() {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    // Generate random bar heights for demo
    const interval = setInterval(() => {
      setBars(Array.from({ length: 20 }, () => Math.random() * 100 + 20));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30"
        style={{ 
          background: 'rgba(255, 255, 255, 0.3)',
        }}
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
                background: `linear-gradient(to top, #FF8C42, #FFAD60)`,
              }}
              initial={{ height: 20 }}
              animate={{ height: `${height}%` }}
              transition={{
                duration: 0.1,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
