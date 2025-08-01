# JORARA Consulting

This project shows how to fetch LinkedIn posts for the **Notas y actualidad** section.

## Setup

1. Copy `.env.example` to `.env` and fill in your `LINKEDIN_TOKEN` and `LINKEDIN_ORG_ID`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Visit `http://localhost:3000` to view the site.

The server exposes `/api/linkedin` which proxies requests to the LinkedIn API and returns the latest posts.
