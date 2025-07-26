const { exec } = require("child_process");
const path = require("path");

exports.generateTTS = (req, res) => {
  const { responseText, language } = req.body;

  // Handle empty input
  if (!responseText || !language) {
    return res.status(400).send({ error: "Text and language are required." });
  }

  const command = `python services/ttsGenerator.py "${responseText}" ${language}`;
  
  exec(command, (err) => {
    if (err) {
      console.error("TTS Generation Error:", err.message);
      return res.status(500).send({ error: "TTS generation failed." });
    }

    const audioPath = path.join(__dirname, "../output/mentor_audio.mp3");
    res.download(audioPath); 
  });
};
