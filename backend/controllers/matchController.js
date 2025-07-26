const { exec } = require("child_process");

exports.matchMentor = (req, res) => {
  const { transcript } = req.body;
  const command = `python matchMentor.py "${transcript}"`;

  exec(command, (err, stdout) => {
    if (err) return res.status(500).send({ error: err.message });
    res.json(JSON.parse(stdout));
  });
};
