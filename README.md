# Haru - Gentle Accountability

> The calm accountability app that helps you build real habits through gentle, proof-based check-ins.

<img src="/public/images/logo.png" alt="Haru Logo" style="width:200px; height:auto;" />

## 🌸 What is Haru?

Haru is an accountability app that uses AI to make sure you actually do what you said you'd do. It's not a habit tracker full of charts and streaks you can game. It's a mirror: you either show up with proof every day, or your streak dies.

**Simple. Brutal. Honest.**

## ✨ Core Features

### 🎯 Daily Streaks
- Set a habit (Gym, Code, or Study)
- One rule: show proof every day
- Miss once? Start over
- Simple. Calm. Consistent

### 🤖 AI-Validated Check-Ins
- Upload proof → AI gently verifies it
- **Gym**: Recognizes your effort and equipment
- **Code**: Acknowledges your work and commits
- **Study**: Celebrates your learning materials
- No stock pics, no cheating

### 📊 Visual Progress
- Weekly streak view (✅ / ❌ / pending)
- Monthly calendar: calm, clear
- Current & longest streak stats
- No pressure, just awareness

### 💝 Gentle Reminders
- Calm, supportive messaging
- "You're building something beautiful"
- AI as your peaceful companion
- Encouraging without pressure

### 🎨 Minimal Design
- No distractions, no overwhelming features
- AI = one peaceful role: gently validate your progress
- Build your chain, one day at a time

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mehulparekh144/haru.git
   cd haru
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/app"
    BETTER_AUTH_SECRET=your-secret-key
    NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000 
    OPENAI_API_KEY=openai-key
    CRON_SECRET=anysecret
    BLOB_READ_WRITE_TOKEN="blob_token_from_vercel"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: BetterAuth.js
- **AI**: Openrouter
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (protected)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   └── ui/               # Shadcn UI components
├── lib/                  # Utility functions
├── server/               # Server-side code
│   └── api/              # tRPC routers
└── styles/               # Global styles
```

## 🎨 Design Philosophy

Haru follows a **calm, zen-like design philosophy**:

- **Gentle Colors**: Warm, muted color palette
- **Peaceful Typography**: Serif for emotion, mono for process
- **Minimal Interface**: No distractions, focus on the core loop
- **Proof-Based**: External accountability through AI validation
- **No Gamification**: Simple, honest progress tracking

## 🔧 Development

### Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
```

### Database Management

```bash
npx prisma studio           # Open Prisma Studio
npx prisma migrate dev      # Create and apply migration
npx prisma generate         # Generate Prisma client
npx prisma db push          # Push schema changes
```

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.


## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Typography from [Google Fonts](https://fonts.google.com/)
- Auth from [Better-Auth](https://www.better-auth.com/)
- Cron Jobs [Cron-Job](https://cron-job.org/)
- AI-SDK + OpenRouter

---

**Haru** - Your gentle companion for building real habits 🌸
