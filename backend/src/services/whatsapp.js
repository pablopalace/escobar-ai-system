const axios = require('axios');

class WhatsAppService {
  constructor() {
    this.phoneId = process.env.WHATSAPP_BUSINESS_PHONE_ID;
    this.token = process.env.WHATSAPP_BUSINESS_TOKEN;
    this.baseUrl = `https://graph.instagram.com/v18.0/${this.phoneId}`;
  }

  async sendMessage(phoneNumber, message, leadName = '') {
    try {
      if (!this.phoneId || !this.token) {
        console.warn('⚠️ WhatsApp credentials not configured');
        return null;
      }

      // Clean phone number (remove non-digits, add country code if needed)
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const formattedPhone = cleanPhone.startsWith('1') ? cleanPhone : `1${cleanPhone}`;

      const response = await axios.post(
        `${this.baseUrl}/messages`,
        {
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: {
            body: message
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(`✅ WhatsApp message sent to ${phoneNumber}`);
      return response.data.messages[0].id;
    } catch (error) {
      console.error('❌ WhatsApp error:', error.response?.data || error.message);
      return null;
    }
  }

  async sendCustomMessage(phoneNumber, message) {
    try {
      if (!this.phoneId || !this.token) return null;

      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const formattedPhone = cleanPhone.startsWith('1') ? cleanPhone : `1${cleanPhone}`;

      const response = await axios.post(
        `${this.baseUrl}/messages`,
        {
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: {
            body: message
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(`✅ Custom WhatsApp message sent to ${phoneNumber}`);
      return response.data.messages[0].id;
    } catch (error) {
      console.error('❌ Custom WhatsApp error:', error.response?.data || error.message);
      return null;
    }
  }
}

module.exports = new WhatsAppService();