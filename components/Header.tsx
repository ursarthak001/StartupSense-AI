'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, Zap, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onScrollToForm: () => void;
  onOpenSample: () => void;
}

export default function Header({ onScrollToForm, onOpenSample }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Live countdown matching the reference design
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 42,
  });

  // Sync theme on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Top Navigation Bar Matching TechSummit Navbar */}
      <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
        {/* Brand on the Left - Made Small, Refined & Proportional */}
        <div className="flex items-center gap-2.5">
          {/* Compact Rounded Gradient Squircle Icon */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-0.5 shadow-md shadow-pink-500/20 flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-[#12071f] dark:bg-[#12071f] rounded-[6px] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 fill-pink-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold font-display text-slate-900 dark:text-white text-sm sm:text-base tracking-tight">
              StartupSense <span className="text-pink-500 dark:text-pink-400">2026</span>
            </span>

            {/* Outlined Date/Pill Badge */}
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-[10px] font-semibold text-pink-600 dark:text-pink-300">
              Gemma 3 &bull; Antigravity
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300 tracking-wide">
          <a href="#overview" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors">Overview</a>
          <button onClick={onScrollToForm} className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">Validator</button>
          <a href="#methodology" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors">Methodology</a>
          <button onClick={onOpenSample} className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">Sample Deck</button>
          <a href="#roadmap" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors">30-Day Sprint</a>
        </div>

        {/* Right Actions: Functional Dark Mode Toggle & Pill CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
          >
            {mounted && !isDark ? (
              <Moon className="w-4 h-4 text-slate-700 hover:text-pink-600 transition-transform hover:scale-110" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-transform hover:scale-110" />
            )}
          </button>

          <button
            onClick={onScrollToForm}
            className="btn-techsummit-primary px-4 sm:px-5 py-2 rounded-full text-xs font-bold font-display tracking-wide flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Validate Idea</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Main Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-10 flex flex-col items-center text-center px-4">
        {/* Top Centered Location Pill Badge with glowing dot */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse" />
          <span>Antigravity Agent Core &bull; Local Gemma 3 &bull; Silicon Valley, CA</span>
        </div>

        {/* Massive Headline matching TechSummit "The Premier Technology Conference" */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mb-5 sm:mb-6 max-w-4xl leading-[1.12]">
          The Premier{' '}
          <span className="text-techsummit-gradient">StartupSense</span>
          <br />
          AI Validator
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-8 sm:mb-10">
          Join 3,000+ tech leaders, innovators, and founders validating ventures with local Gemma 3 intelligence, 
          instant quantitative viability scoring, and surgical 30-day go-to-market execution blueprints.
        </p>

        {/* 4 Countdown Metric Cards matching the exact [45 DAYS, 12 HOURS, 30 MINUTES, 42 SECONDS] design */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl mb-8 sm:mb-10">
          {/* Card 1: DAYS */}
          <div className="techsummit-bento-card py-4 sm:py-5 px-4 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
              DAYS
            </span>
          </div>

          {/* Card 2: HOURS */}
          <div className="techsummit-bento-card py-4 sm:py-5 px-4 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
              HOURS
            </span>
          </div>

          {/* Card 3: MINUTES */}
          <div className="techsummit-bento-card py-4 sm:py-5 px-4 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
              MINUTES
            </span>
          </div>

          {/* Card 4: SECONDS */}
          <div className="techsummit-bento-card py-4 sm:py-5 px-4 rounded-2xl flex flex-col items-center justify-center border-pink-500/20">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-1">
              SECONDS
            </span>
          </div>
        </div>

        {/* Action Button Pair */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 sm:mb-14">
          <button
            onClick={onScrollToForm}
            className="btn-techsummit-primary px-7 sm:px-8 py-3.5 rounded-full font-bold font-display text-sm tracking-wide flex items-center gap-2 cursor-pointer"
          >
            <span>Validate Your Idea</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSample}
            className="btn-techsummit-secondary px-7 sm:px-8 py-3.5 rounded-full font-semibold font-display text-sm tracking-wide cursor-pointer"
          >
            <span>View Sample Deck</span>
          </button>
        </div>

        {/* Divider & 4-column Bottom Stats row matching TechSummit */}
        <div className="w-full max-w-3xl pt-8 sm:pt-10 border-t border-slate-300 dark:border-white/[0.08]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mb-0.5">
                3,000+
              </div>
              <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                Founders
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mb-0.5">
                50+
              </div>
              <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                AI Models Evaluated
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mb-0.5">
                30
              </div>
              <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                Day Roadmaps
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mb-0.5">
                20+
              </div>
              <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                Moat Metrics
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center text-[10px] tracking-widest text-slate-400 dark:text-slate-500 uppercase font-semibold">
          <span>SCROLL</span>
          <ChevronDown className="w-4 h-4 mt-1 text-slate-400 dark:text-slate-500 animate-bounce" />
        </div>
      </section>
    </div>
  );
}
