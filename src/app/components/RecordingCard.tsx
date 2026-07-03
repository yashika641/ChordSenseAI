import { useState, useRef } from 'react';
import { Mic, Upload, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface RecordingCardProps {
  onResult?: (result: any) => void;
}

export function RecordingCard({ onResult }: RecordingCardProps) {

  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🔥 Store result locally (so UI always shows)
  const [result, setResult] = useState<any>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ----------------------------
  // MIC RECORDING
  // ----------------------------
  const startRecording = async () => {

    console.log("Starting recording...");

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

      console.log("Recording stopped");

      const audioBlob = new Blob(audioChunksRef.current, {
        type: 'audio/webm',
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

    console.log("Sending request to backend...");
    setLoading(true);

    const formData = new FormData();
    formData.append('file', audioBlob);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/detect-chord',
        {
          method: 'POST',
          body: formData,
        }
      );

      console.log("Response status:", response.status);

      const data = await response.json();

      console.log('Detection Result:', data);

      // 🔥 Store locally
      setResult(data);

      // 🔥 Send to parent if exists
      if (onResult) onResult(data);

    } catch (error) {
      console.error('Backend error:', error);
    }

    setLoading(false);
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

      {/* ================= CARD ================= */}
      <div
        className="backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/30"
        style={{ background: 'rgba(255, 255, 255, 0.4)' }}
      >
        <div className="flex flex-col items-center gap-6">

          {/* 🎤 MIC */}
          <motion.button
            onClick={toggleRecording}
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFAD60] shadow-xl flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </motion.button>

          {/* 📂 UPLOAD */}
          <motion.button
            onClick={triggerFileSelect}
            className="flex items-center gap-2 px-6 py-3 rounded-full shadow-md"
            style={{
              background: 'rgba(255,255,255,0.7)',
              color: '#3D2817',
            }}
          >
            <Upload className="w-5 h-5" />
            Upload Audio
          </motion.button>

          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />

          {/* Status */}
          <div className="text-center">
            <p style={{ color: '#3D2817' }}>
              {isRecording
                ? 'Recording...'
                : loading
                ? 'Processing...'
                : 'Record or upload a chord'}
            </p>

            {isRecording && (
              <motion.p className="text-3xl text-orange-500">
                {formatTimer(timer)}
              </motion.p>
            )}
          </div>

        </div>
      </div>

      {/* ================= RESULT PREVIEW ================= */}
      {result && (
        <div className="mt-6 p-4 bg-white/70 rounded-xl text-[#3D2817] text-sm shadow">

          <p className="font-semibold mb-2">
            Instrument: {result.instrument_detected?.[0]}
          </p>

          <p className="mb-2">
            Confidence: {(result.instrument_detected?.[1] * 100).toFixed(1)}%
          </p>

          <p className="font-semibold mb-1">Chords:</p>

          {result.chord_timeline?.map((c: any, i: number) => (
            <div key={i}>
              {c.start.toFixed(2)}s → {c.chord}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
