import sys
from gtts import gTTS

# Get input from Node.js
text = sys.argv[1]
lang = sys.argv[2]  # 'hi', 'mr', 'bn', etc.

# Generate speech using gTTS
tts = gTTS(text=text, lang=lang)
tts.save("output/mentor_audio.mp3")
