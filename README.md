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

## Firebase Hosting

This repo includes configuration for deploying the site on [Firebase Hosting](https://firebase.google.com/docs/hosting).

1. Install the Firebase CLI: `npm install -g firebase-tools`
2. Log in and select your project: `firebase login` and update `.firebaserc` with your project ID.
3. Deploy both the static site and the Cloud Function: `firebase deploy`

The `public` directory contains the site assets and requests to `/api/**` are rewritten to the `app` Cloud Function defined in `functions/index.js`.
