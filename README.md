# Escobar AI System

A production-ready digital business infrastructure platform combining lead generation, AI trading logic, and automation funnels.

## Features

- 💰 **Digital Money System** - Lead generation engine, service monetization, automation flows
- 🤖 **AI Trading Brand System** - Market logic, risk management, execution discipline
- 📧 **Email Integration** - Mailchimp lead capture and automation
- 📱 **WhatsApp Business API** - Direct WhatsApp lead routing
- 🗄️ **PostgreSQL Database** - Persistent lead storage and analytics
- 🐳 **Docker Support** - Easy self-hosted deployment

## Tech Stack

- **Backend**: Node.js (Express.js)
- **Database**: PostgreSQL
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Integrations**: WhatsApp Business API, Mailchimp
- **Deployment**: Docker, Docker Compose

## Quick Start with Docker

```bash
git clone https://github.com/pablopalace/escobar-ai-system.git
cd escobar-ai-system
cp backend/.env.example backend/.env
# Edit .env with your credentials
docker-compose up -d
```

Access the system:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## Manual Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database and API credentials
   ```

3. **Start server**
   ```bash
   npm start
   ```

## API Documentation

### POST /api/leads

Submit a new lead.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "source": "landing_page"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "leadId": "550e8400-e29b-41d4-a716-446655440000",
  "data": { ... }
}
```

### GET /api/leads

Retrieve all leads with filtering.

**Query Parameters:**
- `status` - Filter by status (new, contacted, converted)
- `source` - Filter by source (landing_page, referral, etc.)
- `limit` - Results per page (default: 50)
- `offset` - Pagination offset (default: 0)

### GET /api/leads/:id

Retrieve a specific lead.

### PUT /api/leads/:id

Update a lead.

### DELETE /api/leads/:id

Delete a lead.

## Environment Variables

See `backend/.env.example` for all required variables:

- `DATABASE_URL` - PostgreSQL connection string
- `MAILCHIMP_API_KEY` - Mailchimp API key
- `MAILCHIMP_LIST_ID` - Mailchimp audience/list ID
- `WHATSAPP_BUSINESS_PHONE_ID` - WhatsApp Business phone ID
- `WHATSAPP_BUSINESS_TOKEN` - WhatsApp Business API token
- `WHATSAPP_VERIFY_TOKEN` - Webhook verification token
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)

## Integration Guides

### Mailchimp Setup

1. Get API key from [Mailchimp account settings](https://mailchimp.com/account/api/)
2. Create an audience/list and get the List ID
3. Add credentials to `.env`:
   ```
   MAILCHIMP_API_KEY=your_api_key
   MAILCHIMP_LIST_ID=your_list_id
   ```

### WhatsApp Business API Setup

1. Register for [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
2. Get phone number ID and access token
3. Add to `.env`:
   ```
   WHATSAPP_BUSINESS_PHONE_ID=your_phone_id
   WHATSAPP_BUSINESS_TOKEN=your_token
   WHATSAPP_VERIFY_TOKEN=your_verify_token
   ```

## Database Schema

### leads table

```sql
CREATE TABLE leads (
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
```

## Project Structure

```
escobar-ai-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── leadController.js
│   │   ├── routes/
│   │   │   ├── leads.js
│   │   │   └── health.js
│   │   ├── services/
│   │   │   ├── mailchimp.js
│   │   │   └── whatsapp.js
│   │   ├── middleware/
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   └── app.js
│   ├── .env.example
│   ├── package.json
│   ├── Dockerfile
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Deployment

### Docker Compose (Self-Hosted)

```bash
docker-compose up -d
```

Starts:
- PostgreSQL database (port 5432)
- Express API (port 3000)
- Frontend (port 3000)

## License

Proprietary - Built for Operators Only

## Support

For issues, create a GitHub issue or contact support.