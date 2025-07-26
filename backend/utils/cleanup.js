const fs = require('fs');

exports.cleanUpFile = (filePath) => {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};
