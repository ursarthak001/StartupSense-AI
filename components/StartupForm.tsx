'use client';

import React, { useState } from 'react';
import { StartupInput } from '@/lib/types';
import {
  Sparkles,
  DollarSign,
  Users,
  Lightbulb,
  ArrowRight,
  Loader2,
  Zap,
  Sliders,
} from 'lucide-react';

interface StartupFormProps {
  onSubmit: (input: StartupInput) => void;
  loading: boolean;
}

const PRESETS = [
  {
    icon: '🎓',
    tag: 'EdTech / GenAI',
    title: 'AI Resume & Mock Interview Coach',
    idea: 'AI Resume Builder and Live Voice Mock Interview Coach tailored specifically for university undergrads seeking tech internships',
    budget: '$50',
    audience: 'College Undergrads & Job Seekers',
  },
  {
    icon: '☕',
    tag: 'Direct-to-Consumer',
    title: 'Hyperlocal Artisan Coffee Club',
    idea: 'Curated monthly subscription connecting remote software engineers with hyperlocal micro-roasters in their state',
    budget: '₹3,500',
    audience: 'Remote Software Engineers & Tech Workers',
  },
  {
    icon: '🛡️',
    tag: 'DevTools / Security',
    title: 'Autonomous Code & Secrets Auditor',
    idea: 'Self-hosted AI agent auditing GitHub PRs in real time for leaked API keys, dependency rot, and OWASP vulnerabilities',
    budget: '$200',
    audience: 'Indie Hackers & Early-Stage Startups',
  },
];

export default function StartupForm({ onSubmit, loading }: StartupFormProps) {
  const [idea, setIdea] = useState('');
  const [budget, setBudget] = useState('');
  const [audience, setAudience] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) {
      setErrorMsg('⚠️ Please enter a startup idea to initiate the Antigravity Agent.');
      return;
    }
    setErrorMsg('');
    onSubmit({
      idea: idea.trim(),
      budget: budget.trim() || '$100',
      audience: audience.trim() || 'Early Adopters',
    });
  };

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setIdea(preset.idea);
    setBudget(preset.budget);
    setAudience(preset.audience);
    setErrorMsg('');
  };

  return (
    <div id="validator-form" className="w-full max-w-4xl mx-auto my-6 scroll-mt-24">
      <div className="relative">
        {/* Subtle Ambient Glow behind form */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-rose-600/20 rounded-3xl blur-2xl opacity-75 -z-10" />

        {/* TechSummit Glassmorphic Form Card */}
        <div className="techsummit-panel rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden border border-slate-200 dark:border-white/10">
          {/* Top Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/[0.08] pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-500 dark:text-pink-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  Startup Validation Console
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-pink-500/10 dark:bg-pink-950/60 border border-pink-500/30 dark:border-pink-500/40 text-pink-600 dark:text-pink-300">
                    60-Second Scan
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Powered by Antigravity Agent Framework &bull; Local Gemma 3 Weights
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse" />
              <span>Gemma 3 Engine Online</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Startup Idea Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-pink-500" />
                  Describe Your Startup Idea <span className="text-pink-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {idea.length > 0 ? `${idea.length} chars` : 'Detailed descriptions yield higher accuracy'}
                </span>
              </div>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g., AI Resume Builder and Live Voice Interview Coach tailored specifically for university undergrads seeking tech internships..."
                rows={3}
                disabled={loading}
                className="w-full px-4 py-3.5 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm techsummit-input resize-none leading-relaxed shadow-sm"
              />
            </div>

            {/* Two-Column Inputs: Budget & Target Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    Available Budget / Runway
                  </label>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Initial capital</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., $100 or ₹5,000"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm techsummit-input font-mono shadow-sm"
                  />
                </div>
                {/* Quick Budget Chips */}
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Chips:</span>
                  {['$50', '$100', '$500', '₹3,500', '₹10,000'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setBudget(val)}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-pink-100 dark:hover:bg-pink-950/40 border border-slate-200 dark:border-white/5 hover:border-pink-400 dark:hover:border-pink-500/30 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-pink-500" />
                    Target Audience / Early Adopters
                  </label>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">First paying cohort</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g., College Undergrads & Job Seekers"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm techsummit-input shadow-sm"
                  />
                </div>
                {/* Quick Audience Chips */}
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Chips:</span>
                  {['College Students', 'Remote Devs', 'Indie Hackers', 'Gen Z Creators'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAudience(val)}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.04] hover:bg-pink-100 dark:hover:bg-pink-950/40 border border-slate-200 dark:border-white/5 hover:border-pink-400 dark:hover:border-pink-500/30 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 1-Click Presets */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-pink-500" />
                  Try 1-Click Fast Demonstrations:
                </span>
                <span className="text-[11px] text-pink-500 dark:text-pink-400 font-medium">Instant Presets</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    disabled={loading}
                    className="text-left p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] hover:bg-pink-50 dark:hover:bg-pink-950/30 border border-slate-200 dark:border-white/[0.08] hover:border-pink-300 dark:hover:border-pink-500/40 transition-all duration-200 group relative overflow-hidden shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xl">{preset.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors">
                        {preset.tag}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-200 transition-colors line-clamp-1">
                      {preset.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      Budget: {preset.budget} &bull; {preset.audience}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-500/40 rounded-2xl text-xs text-red-700 dark:text-red-200">
                {errorMsg}
              </div>
            )}

            {/* Primary Submit Button matching TechSummit Pill Style */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-techsummit-primary w-full py-4 px-8 rounded-full font-bold font-display text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Orchestrating Local Gemma 3 Agent...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-white" />
                    <span>Analyze Idea &amp; Generate Pitch ⚡</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
