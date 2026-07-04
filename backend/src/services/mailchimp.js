const axios = require('axios');

class MailchimpService {
  constructor() {
    this.apiKey = process.env.MAILCHIMP_API_KEY;
    this.listId = process.env.MAILCHIMP_LIST_ID;
    this.server = process.env.MAILCHIMP_SERVER || 'us1';
    this.baseUrl = `https://${this.server}.api.mailchimp.com/3.0`;
  }

  async addContact(email, name) {
    try {
      if (!this.apiKey || !this.listId) {
        console.warn('⚠️ Mailchimp credentials not configured');
        return null;
      }

      const response = await axios.post(
        `${this.baseUrl}/lists/${this.listId}/members`,
        {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: name.split(' ')[0],
            LNAME: name.split(' ').slice(1).join(' ')
          }
        },
        {
          auth: {
            username: 'apikey',
            password: this.apiKey
          }
        }
      );

      console.log(`✅ Added ${email} to Mailchimp`);
      return response.data.id;
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.title === 'Member Exists') {
        console.log(`ℹ️ ${email} already exists in Mailchimp`);
        return null;
      }
      console.error('❌ Mailchimp error:', error.response?.data || error.message);
      throw error;
    }
  }

  async addTag(email, tag) {
    try {
      if (!this.apiKey || !this.listId) return null;

      const memberId = this.getSubscriberHash(email);
      
      await axios.post(
        `${this.baseUrl}/lists/${this.listId}/members/${memberId}/tags`,
        {
          tags: [{ name: tag, status: 'active' }]
        },
        {
          auth: {
            username: 'apikey',
            password: this.apiKey
          }
        }
      );

      console.log(`✅ Added tag "${tag}" to ${email}`);
    } catch (error) {
      console.error('❌ Mailchimp tag error:', error.message);
    }
  }

  getSubscriberHash(email) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  }
}

module.exports = new MailchimpService();