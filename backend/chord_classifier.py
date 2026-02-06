# ================================
# Chord Classification (API)
# ================================

import requests

def classify_chords(file_path):

    url = "https://chordmini-backend-191567167632.us-central1.run.app/api/recognize-chords"

    files = {
        "file": open(file_path, "rb")
    }

    response = requests.post(url, files=files)

    data = response.json()

    return data["chords"] if data.get("success") else "Chord detection failed"


# -------------------------------
# Example usage
# -------------------------------
if __name__ == "__main__":

    test_file = "input.wav"

    print("Running chord detection...")

    chords = classify_chords(test_file)

    print("\nDetected Chords Timeline:\n")

    if isinstance(chords, list):
        for c in chords:
            print(
                f"{c['start']:.2f}s → {c['end']:.2f}s : {c['chord']}"
            )
    else:
        print(chords)
