import sys
from gtts import gTTS

text = sys.argv[1]
lang = sys.argv[2]

tts = gTTS(text=text, lang=lang)
tts.save("output.mp3")

with open("output.mp3", "rb") as f:
    sys.stdout.buffer.write(f.read())
