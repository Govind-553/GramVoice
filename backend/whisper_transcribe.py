import sys
import whisper
from deep_translator import GoogleTranslator

file_path = sys.argv[1]
target_language = sys.argv[2] if len(sys.argv) > 2 else 'hi'

model = whisper.load_model("base")
result = model.transcribe(file_path, language=target_language)

transcript = result["text"]

# Optional: Translate only if transcript is not already in target language
# Whisper doesn't return source language, so we'll assume translation is needed
try:
    translated_text = GoogleTranslator(source='auto', target=target_language).translate(transcript)
except Exception as e:
    translated_text = transcript  # fallback if API fails

sys.stdout.buffer.write(translated_text.encode('utf-8'))
