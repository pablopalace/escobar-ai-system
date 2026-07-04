require('dotenv').config();
const app = require('./src/app');
const { initializeDatabase } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Initialize database connection
    console.log('🔧 Initializing database...');
    await initializeDatabase();
    console.log('✅ Database connected successfully');

    // Start Express server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n🚀 Escobar AI System is LIVE!`);
      console.log(`📍 Server running on port ${PORT}`);
      console.log(`🌐 Frontend: ${process.env.FRONTEND_URL}`);
      console.log(`📧 Email Integration: ${process.env.MAILCHIMP_API_KEY ? 'Enabled' : 'Demo Mode'}`);
      console.log(`📱 WhatsApp Integration: ${process.env.WHATSAPP_BUSINESS_TOKEN ? 'Enabled' : 'Demo Mode'}`);
      console.log(`🗄️ Database: Connected to Neon PostgreSQL\n`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

startServer();