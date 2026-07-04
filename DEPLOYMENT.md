# Escobar AI System - Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account (already connected ✅)
- Neon PostgreSQL database (already configured ✅)
- Vercel account (free)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### Step 2: Import Repository
1. Go to https://vercel.com/new
2. Click "Import Repository"
3. Search for "pablopalace/escobar-ai-system"
4. Click "Import"

### Step 3: Configure Project
1. **Project Name**: `escobar-ai-system`
2. **Framework Preset**: Select "Other"
3. **Root Directory**: Leave as root
4. **Build Command**: `npm install`
5. **Output Directory**: Leave blank

### Step 4: Add Environment Variables
Click "Environment Variables" and add:

```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://escobar-ai-system.vercel.app
DATABASE_URL=postgresql://neondb_owner:npg_ONiCH3Y7jGlX@ep-odd-moon-atk2zi6h-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
MAILCHIMP_API_KEY=test_mailchimp_key
MAILCHIMP_LIST_ID=test_list_id
WHATSAPP_BUSINESS_PHONE_ID=test_phone_id
WHATSAPP_BUSINESS_TOKEN=test_whatsapp_token
JWT_SECRET=escobar_ai_system_secret
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. ✅ Your site is live!

### 🎉 Your Live URL
👉 **https://escobar-ai-system.vercel.app**

---

## 📍 Database Connection

Neon PostgreSQL (Already Configured):
```
Host: ep-odd-moon-atk2zi6h-pooler.c-9.us-east-1.aws.neon.tech
Database: neondb
User: neondb_owner
```

Access: https://console.neon.tech

---

## ✅ Testing

1. Visit your live site
2. Fill in the lead form
3. Submit and verify
4. Check database: https://console.neon.tech

---

## 🔑 Add Real Credentials Later

In Vercel Dashboard:
1. Select project
2. Go to Settings → Environment Variables
3. Update with your actual:
   - Mailchimp API key
   - WhatsApp Business token

---

## 📞 Need Help?
- GitHub Repo: https://github.com/pablopalace/escobar-ai-system
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
