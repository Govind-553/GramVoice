const express = require('express');
const { matchMentor } = require('../controllers/matchController');

const router = express.Router();
router.post('/', matchMentor);

module.exports = router;
