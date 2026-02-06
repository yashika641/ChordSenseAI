import numpy as np

# Local note definition (self-contained)
NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F',
         'F#', 'G', 'G#', 'A', 'A#', 'B']

def freq_to_note(freq):
    """
    Convert frequency (Hz) to musical note name.
    """
    note_num = 12 * np.log2(freq / 440.0) + 69
    return NOTES[int(round(note_num)) % 12]

def extract_notes(frequency, confidence, threshold=0.6):
    """
    Extract dominant musical notes from CREPE output.
    """
    valid_freqs = frequency[confidence > threshold]
    valid_freqs = valid_freqs[valid_freqs > 0]

    return list({freq_to_note(f) for f in valid_freqs})
