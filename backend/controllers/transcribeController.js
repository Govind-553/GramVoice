const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { cleanUpFile } = require("../utils/cleanup");

exports.transcribeAudio = (req, res) => {
  const mp3Path = req.file.path;
  const wavPath = mp3Path + '.wav'; // New file after conversion
  const language = req.body.language || 'hi';

  // Step 1: Convert mp3 to wav using ffmpeg
  const convertCmd = `ffmpeg -i ${mp3Path} -ar 16000 -ac 1 ${wavPath}`;

  exec(convertCmd, (convertErr) => {
    if (convertErr) {
      cleanUpFile(mp3Path);
      return res.status(500).json({ error: 'Audio conversion failed' });
    }

    // Step 2: Transcribe the wav file
    const whisperCmd = `python whisper_transcribe.py ${wavPath} ${language}`;
  exec(whisperCmd, (whisperErr, stdout, stderr) => {
  cleanUpFile(mp3Path);
  cleanUpFile(wavPath);

  if (whisperErr) {
    console.error("Whisper Error:", whisperErr.message);
    return res.status(500).json({ error: whisperErr.message });
  }

  console.log("✅ Whisper Output:", stdout); // Debug
  res.json({ text: stdout.trim() });
});

  });
};
