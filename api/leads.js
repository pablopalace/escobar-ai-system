const express = require('express');
const app = express();
const leadRouter = require('../backend/src/routes/leads');

app.use(express.json());
app.use('/api/leads', leadRouter);

module.exports = app;