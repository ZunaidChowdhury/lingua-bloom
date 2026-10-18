# 🌸🌱 LinguaBloom – AI-Powered English Learning Chatbot (Frontend)

> **Little words. Big worlds.** 🌸  
> A delightful, child-centered web interface for **LinguaBloom**, an adaptive English-learning companion designed specifically for children under 7.

LinguaBloom offers an inviting, storybook-style interactive world where early learners can discover vocabulary, practice short phrases, and build confidence through playful conversation, gentle quizzes, and effort-based positive encouragement.

---

## 🌐 Live URLs & Repositories

| Component | Live Deployment | GitHub Repository |
|---|---|---|
| **Frontend Web App** | [https://lingua-bloom-sigma.vercel.app](https://lingua-bloom-sigma.vercel.app) | [github.com/ZunaidChowdhury/lingua-bloom](https://github.com/ZunaidChowdhury/lingua-bloom) |
| **Backend API** | [https://lingua-bloom-server.onrender.com](https://lingua-bloom-server.onrender.com) | [github.com/ZunaidChowdhury/lingua-bloom-server](https://github.com/ZunaidChowdhury/lingua-bloom-server) |
| **Backend System Design** | [System Design Doc](https://github.com/ZunaidChowdhury/lingua-bloom-server/blob/main/docs/SYSTEM_DESIGN.md) | — |

---

## 🎯 Purpose & Philosophy

Traditional language apps are often built for adults—with stressful countdowns, harsh red penalty buzzers, and dense text menus.

LinguaBloom is built from the ground up for early childhood development:
* **Effort-Based Praise**: Bloom never says "wrong". Every answer attempt is met with cheerful validation and gentle guidance.
* **No Mandatory Typing**: Big, colorful tap-to-answer pills allow toddlers and preschoolers to interact without frustration.
* **Warm Botanical Aesthetic**: Soft soothing earth tones (mint, sky blue, sunshine yellow, and lavender) that keep young eyes calm and focused.
* **Zero Accounts or Passwords**: Children simply pick a friendly nickname and start learning right away.

---

## ✨ Key Features

### 💬 Storybook Chat Environment (`/chat`)
* **Full-Viewport Kid Lock**: Pinned chat header and bottom input dock ensure little fingers can easily scroll messages without page jumps.
* **Botanical Color Scheme**: Soft mint card background with custom translucent scrollbars and playful message bubbles.
* **Tap-to-Answer Choice Dock**: Large, touch-friendly option buttons (minimum 44px target) with cheerful emojis.
* **Audio Read-Aloud (TTS)**: Built-in Web Speech API read-aloud button on Bloom's messages to support pre-readers.
* **Sprout Mascot Avatar**: Interactive robot friend who blooms and sways as children progress.

### 📚 Adaptive 3-Level Progression
* **Level 1 (Seedling 🌱)**: Single words, fun sounds, and emoji matching.
* **Level 2 (Growing 🌿)**: 2–3 word sentences and two-choice curiosity questions.
* **Level 3 (Blooming 🌸)**: Little story adventures, feelings expression, and compound ideas.
* **Level-Up Celebrations**: Cheerful plant growth animations when new milestones are achieved.

### 💛 Social-Emotional Learning (SEL)
* **Feelings Check-in**: Periodic gentle check-ins to ask how the child is feeling.
* **Emotional Empathy**: If a child types "I'm sad" or "I'm tired", Bloom immediately pauses quizzes and offers comfort and kind words.

### 🛡️ Grown-Up Controls & Data Privacy
* **Anonymous Sessions**: Sessions are tracked by cryptographically random tokens stored locally.
* **1-Click Data Reset**: Grown-ups can wipe all stored tokens, progress, and history instantly from the settings dropdown.
* **Grown-Ups Information Hub (`/grown-ups`)**: Transparent safety guidelines, privacy principles, and educational philosophy.
* **Interactive Walkthrough (`/how-it-works`)**: Step-by-step guide explaining how Bloom talks, teaches, and supports children.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router)
* **UI Library**: React 19
* **Language**: TypeScript (`strict` mode)
* **Styling**: Tailwind CSS v4
* **Primitives**: shadcn/ui (`@base-ui/react`), `class-variance-authority`
* **Icons**: Lucide React
* **Theme Management**: `next-themes` (Botanical Light & Dark themes)
* **Testing**: Vitest
* **Deployment**: Vercel

---

## 📦 NPM Packages Used

```txt
@base-ui/react
class-variance-authority
cn
lucide-react
next
next-themes
react
react-dom
shadcn
tw-animate-css
@tailwindcss/turbopack
eslint
eslint-config-next
tailwindcss
typescript
vitest
```

---

## 🚀 Installation & Local Setup

### 1. Prerequisites
* Node.js 18.18+ or 20+
* npm or pnpm
* Running instance of [LinguaBloom Backend](https://github.com/ZunaidChowdhury/lingua-bloom-server) (port 8000)

### 2. Clone the Repository

```bash
git clone https://github.com/ZunaidChowdhury/lingua-bloom.git
cd lingua-bloom
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create `.env.local` based on `.env.example`:

```bash
cp .env.example .env.local
```

Set the backend API URL:

```env
# Points to local FastAPI backend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> **Note**: For production, point this to your deployed backend URL:  
> `NEXT_PUBLIC_API_URL=https://lingua-bloom-server.onrender.com`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Production Deployment (Vercel)

1. **Import Repository in Vercel**:
   - Framework Preset: `Next.js`
   - Root Directory: `./`
2. **Configure Environment Variable**:
   - `NEXT_PUBLIC_API_URL`: `https://lingua-bloom-server.onrender.com`
3. **Build Command**: `npm run build`
4. **Deploy**:
   - Vercel automatically creates optimized static pre-renders for marketing routes (`/`, `/grown-ups`, `/how-it-works`, `/start`) and client-side streaming for `/chat`.

---

## 🔒 Security & Content Security Policy (CSP)

`next.config.ts` enforces strict security headers on every response:
* **Strict CSP**: `default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, and `connect-src 'self'` locked to the backend API origin.
* **Clickjacking Protection**: `X-Frame-Options: DENY` and `frame-ancestors 'none'`.
* **Sniffing Protection**: `X-Content-Type-Options: nosniff`.
* **Sensor Lockout**: `Permissions-Policy` denies camera, microphone, and geolocation.
* **Child-Safe Rendering**: All bot replies are rendered as pure React text nodes, completely preventing HTML/XSS injection.

---

## 🧪 Testing & Code Quality

LinguaBloom enforces clean code standards with 100% type safety and zero `any` types:

```bash
# Run unit test suite (Vitest)
npm test

# Run ESLint (including JSX a11y & strict rules)
npm run lint

# TypeScript verification
npx tsc --noEmit

# Production build check
npm run build
```

---

## 🎨 Design Tokens

| Token | Light Theme | Dark Theme | Purpose |
|---|---|---|---|
| **Primary Green** | `#389B78` | `#75D6A8` | Brand accents, primary buttons, Learning mode |
| **Soft Mint** | `#DDF4E8` | `#203F35` | Chatbox frame, Level 1 badges, speech bubbles |
| **Sky Blue** | `#8CCFF0` | `#82C9F0` | Level 2 Growing accent, Conversation mode |
| **Sunshine Yellow** | `#FFD76A` | `#F4CF68` | Play & stories mode, stars celebration |
| **Lavender** | `#C8B9F2` | `#B9A6F5` | Level 3 Blooming accent, Support mode |
| **Page Background** | `#FFF9EF` | `#101A17` | Warm botanical storybook canvas |
| **Card Background** | `#FFFFFF` | `#192621` | Elevated cards and message containers |

---

## 👨‍💻 Author

**Zunaid Chowdhury**  
*Full Stack & AI Engineer*  
GitHub: [@ZunaidChowdhury](https://github.com/ZunaidChowdhury)

---

## ⭐ Star the Project

If you love LinguaBloom and want to support gentle, child-first AI learning, please consider starring this repository! 🌟
