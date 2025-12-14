# Firebase Configuration Template

Copy this file to `.env.local` and fill in your Firebase project details.

Get these values from Firebase Console:
1. Go to https://console.firebase.google.com
2. Create a new project (or select existing)
3. Enable Google Authentication in Authentication > Sign-in method
4. Go to Project Settings > General > Your apps > Web app
5. Copy the config values below

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
