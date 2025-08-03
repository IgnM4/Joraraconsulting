# JORARA Consulting

This project serves the JORARA Consulting website. The **Notas y actualidad** section displays a carousel of selected LinkedIn posts without using the LinkedIn API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Visit `http://localhost:3000` to view the site.

## Firebase Hosting

This repo includes configuration for deploying the site on [Firebase Hosting](https://firebase.google.com/docs/hosting).

1. Install the Firebase CLI: `npm install -g firebase-tools`
2. Log in and select your project: `firebase login` and update `.firebaserc` with your project ID.
3. Deploy both the static site and the Cloud Function: `firebase deploy`

The `public` directory contains the site assets and the `app` Cloud Function defined in `functions/index.js` serves the application.
