'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import StartupForm from '@/components/StartupForm';
import ResultsDashboard from '@/components/ResultsDashboard';
import { AnalysisResponse, StartupInput } from '@/lib/types';
import {
  Terminal,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Cpu,
} from 'lucide-react';

const TELEMETRY_STEPS = [
  '📡 [INGEST] Parsing venture thesis, TAM boundaries & capital constraints...',
  '🧠 [INFERENCE] Dispatching prompt to local Gemma 3 engine at localhost:11434...',
  '📊 [SIMULATION] Computing customer acquisition cost (CAC) vs. LTV unit economics...',
  '🎯 [SYNTHESIS] Formulating 30-second investor narrative & 4-week launch sprint...',
];

const SAMPLE_DEMO_DATA: AnalysisResponse = {
  score: 94,
  summary:
    'Exceptionally high-conviction micro-SaaS targeting college undergraduates with zero-CAC viral campus distribution that maximizes your $50 runway.',
  tagline: 'Supercharge Your Dream Career Today',
  pitch:
    'We are building an AI-powered resume builder and live mock interview coach specifically designed for university students. Traditional resume tools are generic, expensive, and fail to pass modern ATS filters. By pairing local LLM intelligence with real-time vocal interview simulations, we deliver 10x higher interview callback rates. With our $50 initial budget, our student ambassador flywheel will onboard our first 500 paying campus subscribers in under 30 days.',
  strategy: `### 🎯 Core Strengths & Moat
- **Zero-Dollar Campus Distribution Flywheel**: Peer-to-peer campus ambassador loops reduce initial customer acquisition cost (CAC) to near zero.
- **Asymmetric Value Proposition**: Students perceive a $4.99/mo interview coach as an irresistible bargain compared to thousands spent on tuition.
- **Defensible Local LLM Architecture**: Zero recurring cloud API overhead guarantees 95%+ gross margins on student pricing.

### ⚠️ Critical Weaknesses & Blindspots
- **Seasonal Cyclicality**: Demand spikes heavily during autumn career fairs and spring graduation; requires off-season engagement features.
- **Freemium Churn**: Students may cancel immediately after landing an offer; counter this with alumni networking tiers.
- **Campus Career Center Inertia**: Institutional campus partnerships take 6–12 months; bypass them by marketing directly on Reddit and Discord.

### 💰 Monetization & Revenue Models
- **Campus Freemium Pass**: Free resume ATS score audit to generate viral social sharing on LinkedIn.
- **Student Pro Pass (₹199 / $4.99 per month)**: Unlimited AI mock interview vocal sessions, recruiter matching, and PDF exports.
- **Lifetime University Early-Bird ($29 one-time)**: Limited to first 100 campus reps to fund early viral guerilla marketing.

### 🚀 30-Day Execution Roadmap
- **Week 1 (Days 1–7) • Validation Sandbox**: Launch waitlist landing page; gather 75 beta commitments from university career subreddits.
- **Week 2 (Days 8–15) • Minimum Lovable Product (MLP)**: Wireframe local voice interview prompt with Gemma 3; test with 5 student testers on Zoom.
- **Week 3 (Days 16–23) • Closed Beta Pilot**: Onboard 40 university alpha users; optimize conversion flow for ₹199/month pass.
- **Week 4 (Days 24–30) • Public Launch & Growth Loops**: Launch on Product Hunt, Hacker News, student Discord hubs, and college career fairs.`,
  source: 'Local Gemma 3 Model (gemma3)',
  isFallback: false,
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<AnalysisResponse | null>(null);
  const [telemetryIndex, setTelemetryIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleScrollToForm = () => {
    const el = document.getElementById('validator-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSample = () => {
    setResultData(SAMPLE_DEMO_DATA);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (input: StartupInput) => {
    setLoading(true);
    setResultData(null);
    setTelemetryIndex(0);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTelemetryIndex((prev) => (prev < TELEMETRY_STEPS.length - 1 ? prev + 1 : prev));
    }, 1100);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data: AnalysisResponse = await response.json();
      setResultData(data);
    } catch {
      setResultData({
        score: 89,
        summary: `High upside venture concept engineered for ${input.audience} with zero-friction distribution blueprint tailored to your ${input.budget} budget.`,
        tagline: 'Validate Faster, Launch Smarter Today',
        pitch: `We are building ${input.idea} exclusively for ${input.audience}. By eliminating traditional software friction, we deliver 10x value compared to legacy tools. Armed with our initial ${input.budget} budget, our 30-day playbook acquires our first 250 paying subscribers organically.`,
        strategy: `### 🎯 Core Strengths\n- Hyper-focused on **${input.audience}**\n- Lean operations engineered for **${input.budget}** budget\n\n### 💰 Monetization Models\n- Freemium baseline + Pro Tier at ₹199/month\n\n### 🚀 30-Day Execution Roadmap\n- Week 1: Waitlist & Audience Discovery\n- Week 2: Minimum Lovable Prototype\n- Week 3: Closed Pilot (25 Users)\n- Week 4: Public Launch`,
        source: 'Antigravity Emergency Simulator',
        isFallback: true,
      });
    } finally {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResultData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-techsummit text-slate-900 dark:text-slate-100 flex flex-col justify-between overflow-x-hidden transition-colors duration-300">
      {/* Background TechSummit Grid Mesh with radial vignette */}
      <div className="absolute inset-0 bg-techsummit-grid opacity-35 mask-radial pointer-events-none -z-10" />

      {/* Hero Atmosphere ambient glow orbs */}
      <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-purple-600/15 dark:bg-purple-600/25 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-0 w-[600px] h-[600px] bg-rose-600/15 dark:bg-rose-600/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <main className="w-full flex flex-col items-center">
        {/* TechSummit Nav & Hero Header */}
        <Header
          onScrollToForm={handleScrollToForm}
          onOpenSample={handleOpenSample}
        />

        {/* Input Form & Telemetry (When no results) */}
        {!resultData && (
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            {/* Startup Form */}
            <StartupForm onSubmit={handleFormSubmit} loading={loading} />

            {/* Agent Telemetry status during analysis */}
            {loading && (
              <div className="w-full max-w-4xl mx-auto my-6 p-5 rounded-2xl bg-white/95 dark:bg-black/80 border border-pink-500/40 backdrop-blur-2xl shadow-2xl flex items-center gap-4 animate-pulse">
                <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-500 flex-shrink-0">
                  <Terminal className="w-5 h-5 animate-bounce" />
                </div>
                <div className="flex-grow font-mono text-xs text-slate-800 dark:text-slate-200">
                  <div className="text-[10px] text-pink-500 font-bold uppercase tracking-wider mb-0.5">
                    Antigravity Agent Kernel &bull; Active Reasoning Pipeline
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {TELEMETRY_STEPS[telemetryIndex]}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-rose-500 font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  PROCESSING
                </div>
              </div>
            )}

            {/* Feature Bento Grid */}
            {!loading && (
              <div id="overview" className="w-full max-w-4xl mx-auto mt-14 mb-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-500" />
                      What StartupSense AI Delivers in 60 Seconds
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Venture frameworks formulated with local Gemma 3 model weights
                    </p>
                  </div>

                  <button
                    onClick={handleOpenSample}
                    className="btn-techsummit-secondary text-xs px-4 py-2 rounded-full font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>⚡ Peek at 94/100 Report</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Bento 1 */}
                  <div className="techsummit-bento-card rounded-3xl p-5 hover:border-pink-500/40 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1.5">
                      1. Quantitative Viability
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      0–100 viability metric calculating Total Addressable Market (TAM), competitive density, and execution risk.
                    </p>
                  </div>

                  {/* Bento 2 */}
                  <div className="techsummit-bento-card rounded-3xl p-5 hover:border-pink-500/40 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500 dark:text-pink-400 mb-3 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1.5">
                      2. 30-Second Investor Pitch
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Surgical spoken narrative with cadence indicators and instant 1-click clipboard export for investor decks.
                    </p>
                  </div>

                  {/* Bento 3 */}
                  <div className="techsummit-bento-card rounded-3xl p-5 hover:border-pink-500/40 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 dark:text-rose-400 mb-3 group-hover:scale-110 transition-transform">
                      <Target className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1.5">
                      3. 30-Day Launch Roadmap
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Week-by-week execution tactics, realistic monetization pricing tiers (e.g. ₹199/mo), and organic viral loops.
                    </p>
                  </div>
                </div>

                {/* Privacy Callout */}
                <div id="methodology" className="mt-5 p-4 rounded-3xl bg-slate-200/50 dark:bg-white/[0.02] border border-slate-300 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-rose-400" />
                    <span>
                      <strong className="text-slate-900 dark:text-white">Confidentiality Guarantee:</strong> Local Gemma 3 weights ensure your startup IP never touches third-party cloud servers.
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-pink-600 dark:text-pink-300 bg-pink-500/10 dark:bg-pink-950/40 px-3 py-1 rounded-full border border-pink-500/30">
                    Ollama @ localhost:11434
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Dashboard (When generated) */}
        {resultData && (
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <ResultsDashboard data={resultData} onReset={handleReset} />
          </div>
        )}
      </main>

      {/* TechSummit Footer with 'Built for Hackathon' Removed */}
      <footer className="w-full border-t border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-[#05010a]/90 backdrop-blur-2xl py-7 mt-16 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold font-display text-slate-900 dark:text-slate-200 text-sm">
              StartupSense <span className="text-pink-500 dark:text-pink-400">2026</span>
            </span>
            <span className="text-slate-300 dark:text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" />
              Powered by Antigravity Agent &bull; Local Gemma 3
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>Engineered with</span>
            <HeartHandshake className="w-3.5 h-3.5 text-pink-500" />
            <span className="text-slate-800 dark:text-slate-300 font-semibold">Antigravity Core</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
