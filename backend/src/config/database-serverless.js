const { Pool } = require('pg');

// For serverless environments (Vercel, Netlify)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Serverless-optimized settings
  max: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: true
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    
    // Create leads table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        source VARCHAR(100) DEFAULT 'landing_page',
        status VARCHAR(50) DEFAULT 'new',
        mailchimp_id VARCHAR(255),
        whatsapp_id VARCHAR(255),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Database tables initialized');
    client.release();
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    // Don't throw in serverless - graceful degradation
  }
};

module.exports = {
  pool,
  initializeDatabase,
  query: (text, params) => pool.query(text, params)
};