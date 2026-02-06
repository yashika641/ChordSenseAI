import { useState, useRef } from 'react';
import { Mic, Upload } from 'lucide-react';
import { motion } from 'motion/react';

interface RecordingCardProps {
  onResult?: (result: any) => void;
}

export function RecordingCard({ onResult }: RecordingCardProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ----------------------------
  // MIC RECORDING
  // ----------------------------
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.start();
    setIsRecording(true);
    setTimer(0);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          stopRecording();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    setIsRecording(false);

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: 'audio/wav',
      });

      await sendToBackend(audioBlob);
    };
  };

  // ----------------------------
  // FILE UPLOAD
  // ----------------------------
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Uploaded file:', file.name);

    await sendToBackend(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // ----------------------------
  // API CALL
  // ----------------------------
  const sendToBackend = async (audioBlob: Blob | File) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.wav');

  console.log("Sending request to backend..."); // 👈 ADD

  try {
    const response = await fetch(
      'http://localhost:8000/detect-chord',
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    console.log('Detection Result:', result);

    if (onResult) onResult(result);

  } catch (error) {
    console.error('Backend error:', error);
  }
};


  // ----------------------------
  // UI
  // ----------------------------
  const toggleRecording = () => {
    if (!isRecording) startRecording();
  };

  const formatTimer = (seconds: number) => `00:0${seconds}`;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className="backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/30"
        style={{ background: 'rgba(255, 255, 255, 0.4)' }}
      >
        <div className="flex flex-col items-center gap-6">

          {/* 🎤 MIC BUTTON */}
          <motion.button
            onClick={toggleRecording}
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFAD60] shadow-xl flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <Mic className="w-12 h-12 text-white" />
          </motion.button>

          {/* 📂 UPLOAD BUTTON */}
          <motion.button
            onClick={triggerFileSelect}
            className="flex items-center gap-2 px-6 py-3 rounded-full shadow-md"
            style={{
              background: 'rgba(255,255,255,0.7)',
              color: '#3D2817',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="w-5 h-5" />
            Upload Audio
          </motion.button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />

          {/* Recording status */}
          <div className="text-center">
            <p className="mb-2" style={{ color: '#3D2817' }}>
              {isRecording
                ? 'Recording...'
                : 'Record or upload a chord'}
            </p>

            {isRecording && (
              <motion.p
                className="text-3xl"
                style={{ color: '#FF8C42' }}
              >
                {formatTimer(timer)}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
