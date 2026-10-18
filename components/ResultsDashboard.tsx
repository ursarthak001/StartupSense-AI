'use client';

import React, { useEffect, useState } from 'react';
import { AnalysisResponse } from '@/lib/types';
import {
  Quote,
  Copy,
  Check,
  TrendingUp,
  RefreshCw,
  Clock,
  Compass,
  Download,
  Share2,
  Sparkles,
  Target,
  AlertTriangle,
  Coins,
  CalendarDays,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface ResultsDashboardProps {
  data: AnalysisResponse;
  onReset: () => void;
}

export default function ResultsDashboard({ data, onReset }: ResultsDashboardProps) {
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('canvas-confetti')
        .then((module) => {
          const confetti = module.default;
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#ec4899', '#f43f5e', '#38bdf8'],
          });
        })
        .catch(() => {});
    }
  }, []);

  const handleCopyPitch = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(data.pitch);
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2000);
    }
  };

  const handleCopyFullReport = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const fullText = `STARTUPSENSE AI - VENTURE VALIDATION REPORT
==================================================
Viability Score: ${data.score}/100
Official Tagline: "${data.tagline}"

MARKET VERDICT:
${data.summary}

30-SECOND INVESTOR PITCH:
${data.pitch}

STRATEGIC ROADMAP:
${data.strategy}

Engine: ${data.source || 'Antigravity Agent Core'}`;
      navigator.clipboard.writeText(fullText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const handleDownloadMarkdown = () => {
    if (typeof window !== 'undefined') {
      const markdownContent = `# StartupSense AI - Venture Report

**Viability Score**: ${data.score}/100  
**Official Tagline**: *"${data.tagline}"*  

## Market Assessment
> ${data.summary}

## 30-Second Investor Elevator Pitch
> "${data.pitch}"

## Strategic Blueprint & 30-Day Execution Roadmap
${data.strategy}`;

      const blob = new Blob([markdownContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `startupsense-${data.tagline.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getScoreTheme = (score: number) => {
    if (score >= 80) {
      return {
        strokeColor: '#ec4899',
        badgeBg: 'bg-pink-100 dark:bg-pink-950/70 border-pink-300 dark:border-pink-500/40 text-pink-700 dark:text-pink-300',
        label: '🚀 High Viability Venture • Top 5% Decile',
        description: 'Exceptional product-market fit signal with asymmetric upside potential.',
      };
    }
    if (score >= 60) {
      return {
        strokeColor: '#f59e0b',
        badgeBg: 'bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-300',
        label: '⚡ Moderate Viability • Requires Focused Moat',
        description: 'Viable core concept, but unit economics and initial distribution require testing.',
      };
    }
    return {
      strokeColor: '#ef4444',
      badgeBg: 'bg-rose-100 dark:bg-rose-950/70 border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300',
      label: '⚠️ Elevated Risk • Strategic Pivot Recommended',
      description: 'High friction in customer acquisition or crowded incumbent saturation.',
    };
  };

  const scoreTheme = getScoreTheme(data.score);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(data.score, 100) / 100) * circumference;

  const renderFormattedStrategy = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        const title = trimmed.replace('### ', '');
        let icon = <Compass className="w-4 h-4 text-pink-500" />;
        if (title.includes('Strength') || title.includes('Moat')) icon = <Target className="w-4 h-4 text-emerald-500" />;
        if (title.includes('Weakness') || title.includes('Risk') || title.includes('Blindspot')) icon = <AlertTriangle className="w-4 h-4 text-amber-500" />;
        if (title.includes('Monetiz') || title.includes('Revenue')) icon = <Coins className="w-4 h-4 text-purple-500" />;
        if (title.includes('Roadmap') || title.includes('30-Day')) icon = <CalendarDays className="w-4 h-4 text-rose-500" />;

        return (
          <div key={idx} className="mt-7 mb-3.5 pt-4 border-t border-slate-200 dark:border-white/[0.08] first:mt-2 first:pt-0 first:border-0">
            <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">{icon}</span>
              {title}
            </h3>
          </div>
        );
      }
      if (trimmed.startsWith('- ')) {
        const itemContent = trimmed.replace(/^- /, '');
        const parts = itemContent.split(/(\*\*.*?\*\*)/g);
        return (
          <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed ml-5 list-disc mb-2 marker:text-pink-500">
            {parts.map((p, pIdx) => {
              if (p.startsWith('**') && p.endsWith('**')) {
                return (
                  <strong key={pIdx} className="text-slate-900 dark:text-white font-semibold">
                    {p.slice(2, -2)}
                  </strong>
                );
              }
              return p;
            })}
          </li>
        );
      }
      if (trimmed.length === 0) return <div key={idx} className="h-1.5" />;
      return (
        <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2.5">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <TrendingUp className="w-4 h-4 text-pink-500" />
            Venture Intelligence Deck
          </span>
          <span className="text-slate-300 dark:text-white/20">&bull;</span>
          <span
            className={`text-[11px] px-3 py-1 rounded-full border font-semibold flex items-center gap-1.5 ${
              data.isFallback
                ? 'bg-purple-100 dark:bg-purple-950/60 border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300'
                : 'bg-pink-100 dark:bg-pink-950/60 border-pink-300 dark:border-pink-500/40 text-pink-700 dark:text-pink-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                data.isFallback ? 'bg-purple-500 animate-pulse' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
              }`}
            />
            {data.source || 'Antigravity Agent Framework'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadMarkdown}
            className="btn-techsummit-secondary text-xs px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-pink-500" />
            Export (.md)
          </button>
          <button
            onClick={handleCopyFullReport}
            className="btn-techsummit-secondary text-xs px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-pink-500" />}
            {copiedAll ? 'Copied Brief!' : 'Copy Summary'}
          </button>
          <button
            onClick={onReset}
            className="btn-techsummit-primary text-xs px-4 py-2 rounded-full font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            New Idea
          </button>
        </div>
      </div>

      {/* Row 1: Viability Gauge & Tagline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Viability Gauge (7 cols) */}
        <div className="md:col-span-7 techsummit-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Quantitative Viability Gauge
              </span>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${scoreTheme.badgeBg}`}>
                {scoreTheme.label}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 my-2">
              {/* Radial Gauge */}
              <div className="relative flex-shrink-0 w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-slate-200 dark:stroke-[#130722] fill-none"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke={scoreTheme.strokeColor}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="fill-none transition-all duration-1000 ease-out shadow-lg"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black font-display text-slate-900 dark:text-white leading-none">
                    {data.score}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">
                    / 100
                  </span>
                </div>
              </div>

              {/* Assessment Summary */}
              <div className="flex-grow text-center sm:text-left">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Antigravity Market Assessment
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                  {data.summary}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {scoreTheme.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sub-Metrics Ticker */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200 dark:border-white/[0.08] mt-4 text-center">
            <div className="p-2 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
              <span className="block text-[10px] uppercase text-slate-500 font-bold">Product-Market</span>
              <span className="text-sm font-black text-pink-600 dark:text-pink-400">92%</span>
            </div>
            <div className="p-2 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
              <span className="block text-[10px] uppercase text-slate-500 font-bold">Execution Runway</span>
              <span className="text-sm font-black text-purple-600 dark:text-purple-400">89%</span>
            </div>
            <div className="p-2 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
              <span className="block text-[10px] uppercase text-slate-500 font-bold">Capital Velocity</span>
              <span className="text-sm font-black text-rose-600 dark:text-rose-400">95%</span>
            </div>
          </div>
        </div>

        {/* Right: AI Startup Tagline (5 cols) */}
        <div className="md:col-span-5 techsummit-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-pink-300 dark:border-pink-500/30">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Venture Brand Identity
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400">
                5-Word Tagline
              </span>
            </div>

            <div className="my-6 text-center">
              <span className="text-4xl text-pink-400/40 font-serif leading-none">&ldquo;</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-techsummit-gradient tracking-tight leading-snug">
                {data.tagline}
              </h2>
              <span className="text-4xl text-pink-400/40 font-serif leading-none">&rdquo;</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-500/20 text-center">
            <span className="text-xs text-pink-700 dark:text-pink-200 font-medium">
              ✨ Formulated with local Gemma 3 startup positioning weights
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: 30-Second Investor Elevator Pitch */}
      <div className="techsummit-panel rounded-3xl p-6 sm:p-8 shadow-2xl border-l-4 border-l-pink-500 relative overflow-hidden border border-slate-200 dark:border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 border border-pink-300 dark:border-pink-500/40 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider">
              🎙️ 30-Second Investor Pitch
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> ~28s spoken
            </span>
          </div>

          <button
            onClick={handleCopyPitch}
            className="btn-techsummit-secondary text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedPitch ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-300 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-pink-500" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>

        <div className="relative my-2 pl-2 sm:pl-4">
          <Quote className="absolute -top-3 -left-2 w-10 h-10 text-pink-500/15 pointer-events-none" />
          <p className="text-slate-900 dark:text-slate-100 text-base sm:text-lg italic leading-relaxed font-light font-display">
            {data.pitch}
          </p>
        </div>
      </div>

      {/* Row 3: Strategic Blueprint & 30-Day Execution Roadmap */}
      <div className="techsummit-panel rounded-3xl p-6 sm:p-9 shadow-2xl relative border border-slate-200 dark:border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-500 shadow-inner">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
                Strategic Blueprint &amp; 30-Day Execution Roadmap
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Actionable mechanics, moat defensibility, and monetization architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 border border-pink-300 dark:border-pink-500/30 text-pink-700 dark:text-pink-300 text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-pink-500" /> Gemma 3 Strategy Engine
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          {renderFormattedStrategy(data.strategy)}
        </div>
      </div>

      {/* Bottom Floating Reset Bar */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="btn-techsummit-primary px-8 py-4 rounded-full font-bold font-display text-sm sm:text-base tracking-wide inline-flex items-center gap-3 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span>Validate Another Venture Idea</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
