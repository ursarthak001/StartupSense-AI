# ⚡ StartupSense AI ("Validate Your Startup Idea in 60 Seconds")

A Silicon Valley SaaS-grade startup validation web application powered by **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Local Gemma 3** models via the **Antigravity Agent Framework**.

---

## 📁 Project Architecture

```
StartupSense-AI/
├── package.json               # Dependencies (Next 14, React 18, Tailwind, Lucide, Confetti)
├── tailwind.config.js         # Custom dark theme, glassmorphism & glow animations
├── tsconfig.json              # TypeScript configuration with @/* path aliases
├── next.config.js             # Next.js App Router configuration
├── postcss.config.js          # PostCSS plugin pipeline
├── app/
│   ├── layout.tsx             # Root Layout with fonts, SEO metadata & theme
│   ├── page.tsx               # Main page orchestrating state, telemetry & views
│   ├── globals.css            # Tailwind directives, frosted glass & neon utilities
│   └── api/
│       └── analyze/
│           └── route.ts       # Edge-ready API route talking to Gemma 3 + Fallback
├── components/
│   ├── Header.tsx             # Navbar with glowing badges and tech stack chips
│   ├── StartupForm.tsx        # Glassmorphic form with presets, inputs & animations
│   └── ResultsDashboard.tsx   # Viability score card, tagline, pitch & 30-day roadmap
└── lib/
    └── types.ts               # Strict TypeScript interfaces (StartupInput, AnalysisResponse)
```

---

## 🎨 Design System & UI Highlights

- **Deep Dark Theme**: Radial canvas transitioning from `#070913` (slate-950) to deep indigo/purple tones.
- **Glassmorphism**: Frosted glass panels with `bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl`.
- **Neon Accents**: Radiant indigo-to-violet-to-pink text gradients and glowing focus states.
- **Interactive Pitch Card**: One-click copy for the 30-second investor pitch script with speaking time indicator.
- **Celebratory Feedback**: Confetti burst powered by `canvas-confetti` upon validation completion.

---

## 🚀 3-Step Setup & Running Guide

### Step 1: Install Dependencies
Open your terminal in `D:\opensource\StarupSense-AI` and install the npm packages:

```bash
npm install
```

### Step 2: (Optional) Start Local Gemma 3 Model
If you want to use live local inference with [Ollama](https://ollama.com/):

```bash
ollama run gemma3
```
*Note: If Ollama or Gemma 3 is not running, StartupSense AI will automatically switch to its built-in Antigravity Simulation Engine so your live hackathon demo never fails.*

### Step 3: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience **StartupSense AI**!
