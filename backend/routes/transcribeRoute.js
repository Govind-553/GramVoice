const express = require('express');
const multer = require('multer');
const { transcribeAudio } = require('../controllers/transcribeController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', upload.single('audio'), transcribeAudio);

module.exports = router;
