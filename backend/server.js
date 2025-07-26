require('dotenv').config();

const express = require('express');
const cors = require('cors');
const transcribeRoutes = require('./routes/transcribeRoute');
const matchRoutes = require('./routes/matchRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/transcribe', transcribeRoutes);
app.use('/match', matchRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
