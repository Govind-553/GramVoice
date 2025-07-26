import sys
from TTS.api import TTS

# Inputs
text = sys.argv[1]
language = sys.argv[2]  # e.g., hi, mr, bn

# Choose a pre-trained multilingual model
model_name = "tts_models/multilingual/multi-dataset/your_tts"

tts = TTS(model_name=model_name, progress_bar=False)

# Synthesize audio
tts.tts_to_file(
    text=text,
    file_path="output/mentor_audio.wav",
    speaker_wav=None,  # You can customize voice here
    language=language
)
