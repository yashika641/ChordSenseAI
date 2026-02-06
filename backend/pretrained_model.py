import crepe

def run_crepe(audio, sr):
    time, frequency, confidence, _ = crepe.predict(
        audio,
        sr,
        viterbi=True
    )
    return frequency, confidence
