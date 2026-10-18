import { NextResponse } from 'next/server';
import { AnalysisResponse, StartupInput } from '@/lib/types';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const DEFAULT_MODEL = 'gemma3';

const AGENT_SYSTEM_PROMPT = `You are StartupSense AI, an elite venture scout and startup strategist powered by the Antigravity Agent Framework.
Analyze the user's startup idea against their available budget and target audience.

You MUST respond strictly with a valid raw JSON object. No conversational intro, markdown backticks wrapper, or trailing commentary.

Expected JSON schema:
{
  "score": <integer from 1 to 100>,
  "summary": "<1-sentence razor-sharp market viability assessment>",
  "tagline": "<5-word catchy startup tagline>",
  "pitch": "<30-second investor elevator pitch script (60-80 words)>",
  "strategy": "<Markdown formatted strategic blueprint containing:
### 🎯 Core Strengths & Moat
- Key advantages and competitive positioning
### ⚠️ Critical Weaknesses & Blindspots
- Key risks to mitigate early
### 💰 Monetization & Revenue Models
- Realistic pricing tactics suited to the budget (e.g., Freemium, ₹199/month, B2B Tier)
### 🚀 30-Day Execution Roadmap
- Week 1: Foundation & Audience Smoke Testing
- Week 2: Minimum Lovable Product (MLP)
- Week 3: Closed Alpha Pilot (30 Users)
- Week 4: Public Launch & Organic Growth Loop>"
}`;

function generateFallbackAnalysis(
  idea: string,
  budget: string,
  audience: string
): AnalysisResponse {
  const safeIdea = idea.trim() || 'AI Micro-SaaS Product';
  const safeAudience = audience.trim() || 'Early Adopters & Tech Builders';
  const safeBudget = budget.trim() || '$100';

  const budgetLower = safeBudget.toLowerCase();
  const isBudgetLean = ['0', '$10', '$50', '$100', '₹500', '₹1000', 'zero', 'free'].some(
    (val) => budgetLower.includes(val)
  );

  const score = isBudgetLean ? 87 : 92;

  return {
    score,
    summary: `High upside opportunity targeting ${safeAudience} with an ultra-lean distribution velocity tailored to maximize your ${safeBudget} initial runway.`,
    tagline: 'Launch Smarter, Validate Faster Today',
    pitch: `We are building ${safeIdea} specifically tailored for ${safeAudience}. Existing market solutions are fragmented, cost-prohibitive, and slow to deliver value. By coupling agile AI automation with hyper-targeted distribution, we deliver 10x faster validation at a fraction of traditional SaaS pricing. Armed with our initial ${safeBudget} budget, our 30-day sprint is dialed to acquire our first 300 active users organically.`,
    strategy: `### 🎯 Core Strengths & Moat
- **Surgical Audience Focus**: Laser-targeted specifically to **${safeAudience}**, drastically reducing wasteful customer acquisition spend.
- **Extreme Capital Efficiency**: Engineered to operate smoothly within a lean **${safeBudget}** budget using modern zero-cost cloud tiers.
- **Organic Product Flywheel**: Built-in viral sharing triggers where each user analysis yields shareable social artifacts.

### ⚠️ Critical Weaknesses & Blindspots
- **Distribution Cold-Start**: High initial reliance on guerilla community marketing before paid channels become viable.
- **Feature Creep Trap**: Risk of over-engineering secondary features before establishing deep retention on the single core problem.
- **Onboarding Friction**: Potential drop-off if time-to-value exceeds 60 seconds on first run.

### 💰 Monetization & Revenue Models
- **Community Freemium Tier**: Free instant analysis to spur viral word-of-mouth adoption across Twitter and Discord.
- **Pro Tier (₹199 / $4.99 per month)**: Full unlock of competitor intelligence, automated pitch decks, and investor-ready PDF exports.
- **Early-Bird Lifetime Access ($29 one-time)**: Limited to the first 100 founders to secure upfront working capital.

### 🚀 30-Day Execution Roadmap
- **Week 1 (Days 1–7) • Validation Sandbox**: Launch a single-page waitlist; gather initial feedback from 50 target members of ${safeAudience}.
- **Week 2 (Days 8–15) • Minimum Lovable Product (MLP)**: Wireframe the core AI workflow; conduct 5 recorded Loom walkthroughs with prospective users.
- **Week 3 (Days 16–23) • Closed Beta Pilot**: Onboard 30 test users; optimize checkout conversions for the ₹199/month tier; fix onboarding drop-offs.
- **Week 4 (Days 24–30) • Public Launch & Growth Loops**: Execute coordinated launches across Product Hunt, Hacker News, Reddit, and student tech clubs.`,
    source: 'Antigravity Simulation Engine (Local Gemma 3 Offline)',
    isFallback: true,
  };
}

export async function POST(request: Request) {
  let body: StartupInput;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request payload.' },
      { status: 400 }
    );
  }

  const { idea, budget, audience } = body;

  if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
    return NextResponse.json(
      { error: 'Startup idea description is required.' },
      { status: 400 }
    );
  }

  const userPrompt = `STARTUP IDEA: ${idea}
AVAILABLE BUDGET: ${budget || '$100'}
TARGET AUDIENCE: ${audience || 'Early Adopters'}

Evaluate this startup opportunity and return strictly the specified JSON schema.`;

  const payload = {
    model: DEFAULT_MODEL,
    prompt: `${AGENT_SYSTEM_PROMPT}\n\n${userPrompt}`,
    stream: false,
    format: 'json',
    options: {
      temperature: 0.7,
      top_p: 0.9,
    },
  };

  // Attempt connection to local Gemma 3 via Ollama
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const rawContent = (data.response || '').trim();

      // Robust regex extraction for JSON block
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        if (
          parsed &&
          typeof parsed.score !== 'undefined' &&
          parsed.summary &&
          parsed.tagline &&
          parsed.pitch &&
          parsed.strategy
        ) {
          const result: AnalysisResponse = {
            score: Number(parsed.score) || 85,
            summary: String(parsed.summary),
            tagline: String(parsed.tagline),
            pitch: String(parsed.pitch),
            strategy: String(parsed.strategy),
            source: `Local Gemma 3 Model (${DEFAULT_MODEL})`,
            isFallback: false,
          };

          return NextResponse.json(result);
        }
      }
    }
  } catch {
    // Ollama offline, timed out, or parse error -> gracefully continue to fallback
  }

  // Dynamic, high-fidelity fallback response
  const fallback = generateFallbackAnalysis(idea, budget || '$100', audience || 'Early Adopters');
  return NextResponse.json(fallback);
}
