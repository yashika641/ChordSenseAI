from fastapi import APIRouter, UploadFile, File
import requests
import shutil
import os

from ingestion import save_audio_file
from instrument_classifier import classify_instrument as detect_instrument

router = APIRouter()

CHORD_API_URL = "https://chordmini-backend-191567167632.us-central1.run.app/api/recognize-chords"


@router.post("/detect-chord")
async def detect_chord_api(file: UploadFile = File(...)):

    # -----------------------------
    # Save uploaded file
    # -----------------------------
    path = save_audio_file(file)
    print(f"Saved uploaded file to: {path}")

    # -----------------------------
    # Instrument detection (local)
    # -----------------------------
    instrument = detect_instrument(path)
    print(f"Detected instrument: {instrument}")

    # -----------------------------
    # Chord detection (API)
    # -----------------------------
    with open(path, "rb") as f:
        files = {"file": f}
        response = requests.post(CHORD_API_URL, files=files)

    chord_data = response.json()

    # Extract chord timeline
    chords = chord_data.get("chords", [])

    return {
        "instrument_detected": instrument,
        "chord_timeline": chords,
        "processing_time": chord_data.get("total_processing_time")
    }
@router.get("/health")
async def health_check():
    return {"status": "ok"}