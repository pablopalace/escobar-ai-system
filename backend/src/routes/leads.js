const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// POST - Create new lead
router.post('/', leadController.createLead);

// GET - Retrieve all leads with filtering
router.get('/', leadController.getAllLeads);

// GET - Retrieve specific lead
router.get('/:id', leadController.getLead);

// PUT - Update lead
router.put('/:id', leadController.updateLead);

// DELETE - Delete lead
router.delete('/:id', leadController.deleteLead);

module.exports = router;