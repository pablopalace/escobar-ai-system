const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/database');
const mailchimp = require('../services/mailchimp');
const whatsapp = require('../services/whatsapp');
const { validateLead } = require('../middleware/validation');

exports.createLead = async (req, res, next) => {
  try {
    const { error, value } = validateLead(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        error: error.details[0].message 
      });
    }

    const { name, email, phone, source = 'landing_page' } = value;
    const leadId = uuidv4();

    // Check if email already exists
    const existingLead = await query(
      'SELECT id FROM leads WHERE email = $1',
      [email]
    );

    if (existingLead.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered',
        leadId: existingLead.rows[0].id
      });
    }

    // Add to Mailchimp
    const mailchimpId = await mailchimp.addContact(email, name);
    if (mailchimpId) {
      await mailchimp.addTag(email, source);
    }

    // Send WhatsApp message if phone provided
    let whatsappId = null;
    if (phone) {
      whatsappId = await whatsapp.sendMessage(phone, `Hi ${name}! 👋 Welcome to Escobar AI System. We'll be in touch soon!`, name);
    }

    // Save to database
    const result = await query(
      `INSERT INTO leads (id, name, email, phone, source, status, mailchimp_id, whatsapp_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [leadId, name, email, phone || null, source, 'new', mailchimpId || null, whatsappId || null]
    );

    console.log(`✅ Lead created: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      leadId: result.rows[0].id,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Lead creation error:', error);
    next(error);
  }
};

exports.getLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM leads WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllLeads = async (req, res, next) => {
  try {
    const { status, source, limit = 50, offset = 0 } = req.query;

    let whereClause = 'WHERE 1=1';
    const params = [];

    if (status) {
      whereClause += ` AND status = $${params.length + 1}`;
      params.push(status);
    }

    if (source) {
      whereClause += ` AND source = $${params.length + 1}`;
      params.push(source);
    }

    const result = await query(
      `SELECT * FROM leads ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset]
    );

    const countResult = await query(
      `SELECT COUNT(*) FROM leads ${whereClause}`,
      params
    );

    res.json({
      success: true,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset),
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, status, notes } = req.body;

    const result = await query(
      `UPDATE leads 
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           phone = COALESCE($3, phone),
           status = COALESCE($4, status),
           notes = COALESCE($5, notes),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [name, email, phone, status, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM leads WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};