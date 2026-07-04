const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const leadRoutes = require('../../backend/src/routes/leads');
const healthRoutes = require('../../backend/src/routes/health');
const errorHandler = require('../../backend/src/middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoutes);
app.use('/api/leads', leadRoutes);

app.use(errorHandler);

module.exports.handler = serverless(app);