const { exec } = require("child_process");
const path = require("path");

exports.generateTTS = (req, res) => {
  const { responseText, language } = req.body;

  const sanitizedText = responseText.replace(/"/g, '\\"');
  const command = `python services/ttsGenerator.py "${sanitizedText}" "${language}"`;

  exec(command, { encoding: 'buffer', maxBuffer: 1024 * 1024 * 5 }, (err, stdout) => {
    if (err) {
      console.error("TTS Error:", err);
      return res.status(500).json({ error: 'TTS failed' });
    }

    res.setHeader('Content-Type', 'audio/mp3');
    res.send(stdout); 
  });
};
