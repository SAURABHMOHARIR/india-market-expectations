# 🇮🇳 India Market Expectations

A Polymarket-inspired prediction platform for quantifying uncertainty around Indian market events using collective intelligence, AI reasoning, and real-time voting.

**🌐 Live Demo:** [https://ind-polymarket.vercel.app](https://ind-polymarket.vercel.app)

![Market Expectations Platform](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-orange?style=for-the-badge&logo=firebase)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)

## ✨ Features

### 🎯 Core Functionality
- **12 India-Specific Market Events** covering Macro, BFSI, Energy, Geopolitics, and Sports
- **Interactive Yes/No Voting** with real-time probability updates based on audience participation
- **AI-Driven Rationales** with explainable logic for each prediction
- **Search & Filter** by category, keyword, and time horizon
- **Detailed Event Pages** showing drivers, signals, and market analysis

### 🔐 Authentication & User Features
- **Google Sign-In** via Firebase Authentication
- **Create Custom Events** - authenticated users can submit their own market questions
- **Vote on Predictions** - cast Yes/No votes and see probabilities update in real-time
- **User Profile Management** with dropdown menu and sign-out

### 📊 Real-Time Voting System
- **Collective Intelligence** - probabilities calculated from all user votes
- **Vote Tracking** - see total participant count for each event
- **User Vote Persistence** - change your vote anytime
- **Transparent Data** - clear display of Yes/No percentages

## 🚀 Tech Stack

- **Frontend:** Next.js 16 (Turbopack), React, TypeScript
- **Styling:** Tailwind CSS v4 with premium dark mode theme
- **Authentication:** Firebase Auth (Google OAuth)
- **Database:** Cloud Firestore with real-time updates
- **Hosting:** Vercel (Production deployment)
- **Icons:** Lucide React

## 📁 Project Structure

```
Ind-polymarket/
├── app/
│   ├── page.tsx              # Homepage with event grid
│   ├── layout.tsx            # Root layout with auth provider
│   ├── create/page.tsx       # Event creation form (protected)
│   └── events/[id]/page.tsx  # Event detail page with voting
├── components/
│   ├── Navbar.tsx            # Navigation with auth button
│   ├── Sidebar.tsx           # Category filter sidebar
│   ├── EventCard.tsx         # Event preview card
│   ├── VotingButtons.tsx     # Interactive voting UI
│   ├── AuthButton.tsx        # Google sign-in/out component
│   └── ProtectedRoute.tsx    # Route protection wrapper
├── lib/
│   ├── firebase.ts           # Firebase initialization
│   ├── AuthContext.tsx       # Authentication context provider
│   ├── firestore.ts          # Firestore CRUD operations
│   ├── voting.ts             # Voting logic and calculations
│   ├── types.ts              # TypeScript interfaces
│   ├── mockData.ts           # 12 India-specific events
│   └── utils.ts              # Utility functions
└── app/globals.css           # Premium theme with CSS variables
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- Firebase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/india-market-expectations.git
cd india-market-expectations
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Google Authentication
   - Create a Firestore database
   - Add your web app configuration

4. **Environment Variables**

Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔥 Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      
      match /votes/{userId} {
        allow read: if true;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## 📦 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy!

3. **Add Authorized Domains to Firebase**
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain to authorized domains

## 🎨 Design Features

- **Premium Dark Theme** with HSL color system
- **Glassmorphism** and subtle animations
- **Responsive Design** for mobile and desktop
- **Bullish/Bearish Color Coding** (Green/Red)
- **Real-time Visual Feedback** on probability changes

## 📊 Sample Events

The platform includes 12 curated India-specific prediction markets:
- 🏦 **Macro:** GDP growth, RBI repo rate, inflation
- 💼 **BFSI:** Bank mergers, IPO activity, fintech regulations  
- ⚡ **Energy:** Renewables capacity, Brent crude prices
- 🌍 **Geopolitics:** India-China relations, G20 outcomes
- 🏏 **Sports:** India World Cup victory predictions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for learning or building your own prediction markets!

## 🙏 Acknowledgments

- Inspired by [Polymarket](https://polymarket.com)
- Built with Google's Firebase ecosystem
- Deployed on Vercel's edge network

---

**Built with ❤️ for the Indian market intelligence community**
