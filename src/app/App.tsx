import { useState } from 'react';
import { Header } from './components/Header';
import { RecordingCard } from './components/RecordingCard';
import { FrequencyVisualizer } from './components/FrequencyVisualizer';
import { ChordSelector } from './components/ChordSelector';
import { DetectionResult } from './components/DetectionResult';
import { Footer } from './components/Footer';

export default function App() {
  // 🎯 Available chords
  const CHORDS = [
    'C Major',
    'G Major',
    'D Major',
    'A Minor',
    'E Minor',
    'F Major',
  ];

  const [selectedChord, setSelectedChord] = useState<string>('C Major');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [detectedNotes, setDetectedNotes] = useState<string[]>([]);

  return (
    <div
      className="min-h-screen w-full overflow-auto"
      style={{
        background:
          'linear-gradient(135deg, #FF8C42 0%, #FFAD60 40%, #FFF4E6 100%)',
      }}
    >
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 px-4 py-8 pb-16">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* 🎤 Recording Card */}
            <div className="flex justify-center">
              <RecordingCard
                onResult={(res) => {
                  // Notes from backend
                  setDetectedNotes(res.detected_notes || []);

                  // Correct / Incorrect logic
                  if (!res.predicted_chord) {
                    setIsCorrect(false);
                  } else {
                    setIsCorrect(res.predicted_chord === selectedChord);
                  }
                }}
              />
            </div>

            {/* 📊 Frequency Visualization */}
            <FrequencyVisualizer notes={detectedNotes} />

            {/* 🎯 Chord Selector */}
            <ChordSelector
              chords={CHORDS}
              selectedChord={selectedChord}
              onSelectChord={(chord) => {
                setSelectedChord(chord);
                setIsCorrect(null);     // reset result
                setDetectedNotes([]);   // reset notes
              }}
            />

            {/* ✅ Detection Result */}
            <DetectionResult
              isCorrect={isCorrect}
              detectedNotes={detectedNotes}
            />

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
