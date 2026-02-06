# ================================
# Instrument Classification
# ================================

from transformers.pipelines import pipeline

# Load pipeline once
instrument_classifier = pipeline(
    "audio-classification",
    model="MIT/ast-finetuned-audioset-10-10-0.4593"
)


def classify_instrument(file_path):

    result = instrument_classifier(file_path)

    # Top prediction
    label = result[0].get("label")
    confidence = result[0].get("score")

    return label, confidence


# -------------------------------
# Example usage
# -------------------------------
if __name__ == "__main__":

    test_file = r"C:\Users\palya\Desktop\ChordSenseAI\backend\input.wav"

    print("Running instrument detection...")

    label, score = classify_instrument(test_file)

    print(f"\nInstrument: {label}")
    print(f"Confidence: {score:.2f}")
