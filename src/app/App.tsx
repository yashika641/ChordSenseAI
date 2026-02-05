import { useState } from 'react';
import { Header } from './components/Header';
import { RecordingCard } from './components/RecordingCard';
import { FrequencyVisualizer } from './components/FrequencyVisualizer';
import { ChordSelector } from './components/ChordSelector';
import { DetectionResult } from './components/DetectionResult';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedChord, setSelectedChord] = useState('C Major');
  const [detectionResult, setDetectionResult] = useState<boolean | null>(null);
  const [detectedNotes, setDetectedNotes] = useState<string[]>([]);

  // Simulate detection results for demo purposes
  const simulateDetection = () => {
    const isCorrect = Math.random() > 0.5;
    setDetectionResult(isCorrect);
    
    // Mock detected notes based on the selected chord
    const chordNotes: Record<string, string[]> = {
      'C Major': ['C', 'E', 'G'],
      'G Major': ['G', 'B', 'D'],
      'D Major': ['D', 'F♯', 'A'],
      'A Minor': ['A', 'C', 'E'],
      'E Minor': ['E', 'G', 'B'],
      'F Major': ['F', 'A', 'C'],
    };
    
    if (isCorrect) {
      setDetectedNotes(chordNotes[selectedChord] || ['C', 'E', 'G']);
    } else {
      // Return slightly wrong notes
      setDetectedNotes(['C', 'E♭', 'G']);
    }
    
    // Auto-reset after 4 seconds
    setTimeout(() => {
      setDetectionResult(null);
      setDetectedNotes([]);
    }, 4000);
  };

  return (
    <div 
      className="min-h-screen w-full overflow-auto"
      style={{
        background: 'linear-gradient(135deg, #FF8C42 0%, #FFAD60 40%, #FFF4E6 100%)',
      }}
    >
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 px-4 py-8 pb-16">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section - Recording Card */}
            <div className="flex justify-center">
              <RecordingCard />
            </div>

            {/* Frequency Visualization */}
            <FrequencyVisualizer />

            {/* Chord Selector */}
            <ChordSelector 
              selectedChord={selectedChord} 
              onSelectChord={setSelectedChord} 
            />

            {/* Test Detection Button (for demo) */}
            <div className="flex justify-center">
              <button
                onClick={simulateDetection}
                className="px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, #8B5A3C, #FF8C42)',
                  color: '#FFFFFF',
                }}
              >
                Test Detection
              </button>
            </div>

            {/* Detection Result */}
            <DetectionResult 
              isCorrect={detectionResult} 
              detectedNotes={detectedNotes} 
            />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
