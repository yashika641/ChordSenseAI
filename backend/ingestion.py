import shutil

def save_audio_file(upload_file, destination="input.wav"):
    with open(destination, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return destination

import librosa

def load_audio(file_path, sr=16000):
    audio, sr = librosa.load(file_path, sr=sr, mono=True)
    return audio, sr
