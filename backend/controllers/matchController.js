const { exec } = require("child_process");
const path = require("path");

exports.matchMentor = (req, res) => {
  const { transcript, language } = req.body;

  // Escaping transcript safely
  const sanitizedTranscript = transcript.replace(/"/g, '\\"');

  //path to matchMentor.py inside services folder
  const scriptPath = path.join(__dirname, '..', 'services', 'matchMentor.py');
  const command = `python "${scriptPath}" "${sanitizedTranscript}" "${language}"`;

  exec(command, (err, stdout) => {
    if (err) {
      console.error("Match Error:", err);
      return res.status(500).send({ error: err.message });
    }

    try {
      const parsed = JSON.parse(stdout);
      res.json(parsed);
    } catch (parseErr) {
      console.error("JSON Parse Error:", parseErr);
      res.status(500).send({ error: 'Invalid JSON from Python script' });
    }
  });
};
