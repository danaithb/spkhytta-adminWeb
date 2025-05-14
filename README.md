# Admin Dashboard for Cabin Booking

**spkhytta-adminWeb** is a web-based React application designed to manage company cabin bookings.  
This admin interface allows administrators to oversee and manage cabin bookings, as well as view and process user data.  
The app integrates with [Nager.Date](https://date.nager.at/) for holiday awareness.

---

## 1. Requirements
- Node.js (version 16 or later recommended)
- npm or Yarn
- Internet connection (for API calls)

---

## 2. Setup Instructions

- Clone the repository
- Install dependencies:
  - `npm install` or `yarn install`

---

## 3. Start the Development Server

- `npm start` or `yarn start`  
  This will run the app on `http://localhost:3000`.

---

## 4. Available Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run eject`: Gives full control over the configuration (irreversible).

---

## 5. Environment Configuration

To run the app locally, create a `.env` file in the root folder and add your **Firebase configuration**:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

For deployment via GitHub Actions, the same values must be added as GitHub Secrets.  
These are injected during the build step in `.github/workflows/firebase-hosting-merge.yml`.

