import { useState } from 'react';
import { Mic } from 'lucide-react';
import { motion } from 'motion/react';

export function RecordingCard() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimer(0);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 3) {
            clearInterval(interval);
            setIsRecording(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTimer = (seconds: number) => {
    return `00:0${seconds}`;
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div 
        className="backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/30"
        style={{ 
          background: 'rgba(255, 255, 255, 0.4)',
        }}
      >
        <div className="flex flex-col items-center gap-6">
          <motion.button
            onClick={toggleRecording}
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFAD60] shadow-xl flex items-center justify-center group hover:shadow-2xl transition-shadow"
            whileTap={{ scale: 0.95 }}
            animate={isRecording ? {
              boxShadow: [
                '0 0 0 0 rgba(255, 140, 66, 0.7)',
                '0 0 0 20px rgba(255, 140, 66, 0)',
              ]
            } : {}}
            transition={isRecording ? {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut'
            } : {}}
          >
            <Mic className="w-12 h-12 text-white" />
            
            {isRecording && (
              <motion.div
                className="absolute inset-0 rounded-full bg-[#FF8C42]"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ 
                  scale: [1, 1.3, 1.3],
                  opacity: [0.5, 0, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            )}
          </motion.button>

          <div className="text-center">
            <p className="mb-2" style={{ color: '#3D2817' }}>
              {isRecording ? 'Recording...' : 'Play your chord'}
            </p>
            {isRecording && (
              <motion.p 
                className="text-3xl"
                style={{ color: '#FF8C42' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formatTimer(timer)}
              </motion.p>
            )}
          </div>
        </div>

        {isRecording && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 140, 66, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </div>
    </div>
  );
}
