import sys
import whisper

file_path = sys.argv[1]
language = sys.argv[2] if len(sys.argv) > 2 else 'hi'

model = whisper.load_model("base")
result = model.transcribe(file_path, language=language)

print(result["text"])       
