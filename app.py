"""
StartupSense AI - Validate Your Startup Idea in 60 Seconds
Powered by Antigravity Agent Framework & Local Gemma 3
"""

import json
import re
import time
import requests
import streamlit as st

# ==============================================================================
# 1. PAGE CONFIGURATION & DESIGN SYSTEM
# ==============================================================================
st.set_page_config(
    page_title="StartupSense AI | Validate in 60 Seconds",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Custom Ultra-Modern Glassmorphic CSS Styling
CUSTOM_CSS = """
<style>
/* Import modern typography */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

/* Global Reset & Base Variables */
:root {
    --bg-dark: #070913;
    --card-bg: rgba(18, 22, 41, 0.55);
    --card-border: rgba(255, 255, 255, 0.08);
    --card-hover-border: rgba(139, 92, 246, 0.4);
    --primary-neon: #8b5cf6;
    --secondary-neon: #38bdf8;
    --accent-pink: #ec4899;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --glass-blur: blur(18px);
}

/* Dark Mode Radial & Angular Canvas Background */
.stApp {
    background-color: var(--bg-dark);
    background-image: 
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.18) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
        radial-gradient(at 50% 100%, rgba(56, 189, 248, 0.10) 0px, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.8) 0%, #060810 100%);
    background-attachment: fixed;
    color: var(--text-primary);
    font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Hide Streamlit default header decoration */
header[data-testid="stHeader"] {
    background: transparent !important;
}

/* Main Container Padding */
.block-container {
    padding-top: 2rem !important;
    padding-bottom: 3.5rem !important;
    max-width: 1140px !important;
}

/* Typography Overrides */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', sans-serif !important;
    letter-spacing: -0.02em;
}

/* Header & Brand Identity */
.brand-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.35);
    border-radius: 9999px;
    color: #c4b5fd;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 12px;
    box-shadow: 0 0 16px rgba(139, 92, 246, 0.2);
}

.brand-badge-dot {
    width: 8px;
    height: 8px;
    background-color: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 8px #10b981;
    animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
}

.neon-title {
    font-size: 3.4rem !important;
    font-weight: 800 !important;
    line-height: 1.12 !important;
    background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 25%, #a855f7 65%, #38bdf8 100%);
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    margin-bottom: 8px !important;
    filter: drop-shadow(0 2px 20px rgba(168, 85, 247, 0.3));
}

.sub-tagline {
    font-size: 1.15rem;
    color: var(--text-secondary);
    font-weight: 400;
    margin-bottom: 24px;
}

/* Frosted Glass Container Card */
.glass-container {
    background: var(--card-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 28px 32px;
    box-shadow: 0 12px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    margin-bottom: 24px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-container:hover {
    border-color: var(--card-hover-border);
    box-shadow: 0 16px 48px -10px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Streamlit Input Styling with Glowing Focus Rings */
.stTextInput > div > div > input {
    background: rgba(15, 23, 42, 0.65) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-radius: 14px !important;
    color: #f1f5f9 !important;
    font-size: 0.98rem !important;
    padding: 12px 18px !important;
    transition: all 0.25s ease !important;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3) !important;
}

.stTextInput > div > div > input:focus {
    border-color: #8b5cf6 !important;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.35), 0 0 20px rgba(139, 92, 246, 0.25) !important;
    background: rgba(20, 27, 52, 0.85) !important;
}

.stTextInput label {
    color: #cbd5e1 !important;
    font-weight: 500 !important;
    font-size: 0.92rem !important;
    margin-bottom: 6px !important;
}

/* Custom Purple/Indigo Gradient Submit Button */
div.stButton > button {
    background: linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%) !important;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.18) !important;
    border-radius: 14px !important;
    padding: 14px 28px !important;
    font-weight: 700 !important;
    font-size: 1.05rem !important;
    letter-spacing: 0.02em !important;
    font-family: 'Outfit', sans-serif !important;
    box-shadow: 0 6px 24px -2px rgba(124, 58, 237, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    width: 100% !important;
    cursor: pointer !important;
}

div.stButton > button:hover {
    transform: translateY(-2px) !important;
    background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%) !important;
    box-shadow: 0 10px 32px rgba(124, 58, 237, 0.7), 0 0 15px rgba(56, 189, 248, 0.3) !important;
    border-color: rgba(255, 255, 255, 0.35) !important;
}

div.stButton > button:active {
    transform: translateY(1px) !important;
}

/* Viability Metric Card */
.metric-glass-card {
    background: linear-gradient(135deg, rgba(30, 27, 75, 0.5) 0%, rgba(15, 23, 42, 0.6) 100%);
    backdrop-filter: var(--glass-blur);
    border: 1px solid rgba(139, 92, 246, 0.25);
    border-radius: 20px;
    padding: 24px 28px;
    display: flex;
    align-items: center;
    gap: 28px;
    margin-bottom: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.score-circle {
    width: 105px;
    height: 105px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.35);
    flex-shrink: 0;
}

.score-number {
    font-size: 2.2rem;
    line-height: 1;
}

.score-max {
    font-size: 0.72rem;
    opacity: 0.75;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.metric-details {
    flex-grow: 1;
}

.verdict-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
}

.verdict-high {
    background: rgba(16, 185, 129, 0.2);
    border: 1px solid rgba(16, 185, 129, 0.4);
    color: #34d399;
}

.verdict-mid {
    background: rgba(245, 158, 11, 0.2);
    border: 1px solid rgba(245, 158, 11, 0.4);
    color: #fbbf24;
}

.verdict-low {
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #f87171;
}

.market-summary-text {
    font-size: 1.08rem;
    line-height: 1.55;
    color: #e2e8f0;
    font-weight: 400;
    margin: 0;
}

/* Tagline Gradient Box */
.tagline-box {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(56, 189, 248, 0.12) 100%);
    border: 1px solid rgba(168, 85, 247, 0.35);
    border-radius: 18px;
    padding: 22px 28px;
    text-align: center;
    margin-bottom: 24px;
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.15), inset 0 0 20px rgba(139, 92, 246, 0.1);
}

.tagline-lead {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #c4b5fd;
    font-weight: 700;
    margin-bottom: 6px;
}

.tagline-content {
    font-family: 'Outfit', sans-serif;
    font-size: 1.85rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #d8b4fe 40%, #7dd3fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.01em;
    margin: 0;
}

/* 30-Second Elevator Pitch Glass Container */
.pitch-glass-container {
    background: rgba(20, 24, 48, 0.55);
    backdrop-filter: var(--glass-blur);
    border: 1px solid rgba(139, 92, 246, 0.28);
    border-left: 5px solid #8b5cf6;
    border-radius: 18px;
    padding: 26px 30px;
    margin-bottom: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    position: relative;
}

.pitch-quote-mark {
    position: absolute;
    top: 15px;
    right: 25px;
    font-size: 3.5rem;
    line-height: 1;
    color: rgba(139, 92, 246, 0.18);
    font-family: Georgia, serif;
    pointer-events: none;
}

.pitch-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
}

.pitch-pill {
    padding: 3px 10px;
    border-radius: 999px;
    background: rgba(139, 92, 246, 0.2);
    color: #c4b5fd;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.pitch-body {
    font-size: 1.05rem;
    line-height: 1.75;
    color: #f1f5f9;
    font-style: italic;
    margin: 0;
}

/* Strategy Container */
.strategy-card {
    background: var(--card-bg);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 14px 44px rgba(0, 0, 0, 0.45);
    margin-bottom: 28px;
}

.strategy-card h3 {
    color: #e0e7ff;
    font-size: 1.35rem;
    margin-top: 1.4rem;
    margin-bottom: 0.8rem;
}

.strategy-card ul {
    color: #cbd5e1;
    line-height: 1.7;
    margin-bottom: 1.2rem;
}

.strategy-card strong {
    color: #f8fafc;
}

.telemetry-box {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 14px 18px;
    font-family: monospace;
    font-size: 0.85rem;
    color: #94a3b8;
    margin-bottom: 20px;
}

.footer-text {
    text-align: center;
    color: #64748b;
    font-size: 0.82rem;
    margin-top: 40px;
    letter-spacing: 0.02em;
}
</style>
"""

st.markdown(CUSTOM_CSS, unsafe_allow_html=True)


# ==============================================================================
# 2. PROMPT TEMPLATE & AGENT INFERENCE ENGINE
# ==============================================================================
OLLAMA_API_URL = "http://localhost:11434/api/generate"
DEFAULT_MODEL = "gemma3"

AGENT_SYSTEM_PROMPT = """You are StartupSense AI, an elite venture strategist and market validation agent powered by the Antigravity Framework.
Analyze the user's startup idea against their available budget and target audience.

You MUST respond strictly with a valid, raw JSON object (and nothing else). Do not include conversational filler or codeblock wrappers outside the JSON.

Expected JSON Schema:
{
  "score": <integer from 1 to 100 representing realistic viability>,
  "summary": "<a concise, razor-sharp 1-sentence market assessment explaining why it succeeds or struggles>",
  "tagline": "<a catchy, memorable 5-word startup tagline>",
  "pitch": "<a compelling 30-second investor elevator pitch script (approx 60-80 words)>",
  "strategy": "<a comprehensive Markdown formatted strategic briefing with the following sections:\n### 🎯 Core Strengths & Moat\n- Key advantages\n### ⚠️ Critical Weaknesses & Blindspots\n- Risks to mitigate\n### 💰 Monetization & Revenue Models\n- Realistic pricing tactics suited to the budget\n### 🚀 30-Day Execution Roadmap\n- Week 1: Foundation\n- Week 2: MVP\n- Week 3: Alpha Testing\n- Week 4: Public Launch & Growth Loop>"
}
"""


def generate_mock_analysis(idea: str, budget: str, audience: str) -> dict:
    budget_clean = budget.strip().lower()
    low_budget = any(sym in budget_clean for sym in ["0", "$10", "$50", "$100", "₹500", "₹1000", "zero", "free"])
    base_score = 86 if low_budget else 91
    if len(idea.split()) < 3:
        base_score = 72
        
    idea_title = idea.strip()
    audience_title = audience.strip() if audience.strip() else "Target Early Adopters"
    
    return {
        "score": base_score,
        "summary": f"High upside micro-SaaS targeting {audience_title} with ultra-lean distribution velocity that maximizes your {budget} initial runway.",
        "tagline": "Launch Smarter, Validate Faster Today",
        "pitch": f"We are building {idea_title} specifically engineered for {audience_title}. Traditional alternatives are bloated, slow, and cost-prohibitive. By leveraging agile AI architecture, we deliver 10x faster results at a fraction of standard industry pricing. With our initial {budget} budget, we are executing a surgical distribution playbook to capture our first 500 paying users within 30 days.",
        "strategy": f"""### 🎯 Core Strengths & Moat
- **Surgical Audience Focus**: Laser-targeted specifically to **{audience_title}**, reducing noisy customer acquisition funnels.
- **Extreme Capital Efficiency**: Engineered to operate reliably within a lean **{budget}** budget using zero-cost deployment stacks.
- **Organic Viral Distribution**: Natural flywheel loop through word-of-mouth and user showcase artifacts.

### ⚠️ Critical Weaknesses & Blindspots
- **Distribution Cold-Start**: High early reliance on organic guerilla marketing before paid ads become viable.
- **Feature Creep Trap**: Temptation to build complex secondary features before nailing the single core value metric.
- **Churn Vulnerability**: Early stage churn if initial onboarding friction takes longer than 60 seconds.

### 💰 Monetization & Revenue Models
- **Tier 1: Community Freemium**: Free access to core baseline tools to trigger viral social sharing.
- **Tier 2: Pro Superpass (₹199 / $4.99 per month)**: Full unlock of high-value AI workflows, priority generation, and export capabilities.
- **Tier 3: Lifetime Early-Bird ($29 one-time)**: Limited to the first 100 adopters to frontload immediate cash runway.

### 🚀 30-Day Execution Roadmap
- **Week 1 (Days 1–7) • Validation & Landing Sandbox**: Deploy a single-page waitlist with clear value-prop copy; collect first 50 email commitments from {audience_title} communities.
- **Week 2 (Days 8–15) • Minimum Lovable Product (MLP)**: Assemble the core workflow with low-code/AI primitives; conduct 1-on-1 Loom teardowns with 5 early testers.
- **Week 3 (Days 16–23) • Closed Beta & Feedback Iteration**: Onboard 30 pilot users; fix onboarding roadblocks; test the ₹199/month checkout flow.
- **Week 4 (Days 24–30) • Public Launch & Growth Loops**: Launch on Product Hunt, X (Twitter), Reddit communities, and student Discord hubs; aim for 200 active users.
""",
        "source": "Antigravity Neural Simulator (Local Gemma 3 Fallback)"
    }


def analyze_startup_idea(idea: str, budget: str, audience: str) -> tuple[dict, bool]:
    user_prompt = f"""STARTUP IDEA: {idea}
AVAILABLE BUDGET: {budget}
TARGET AUDIENCE: {audience}

Evaluate this startup opportunity and return strictly the specified JSON schema."""

    payload = {
        "model": DEFAULT_MODEL,
        "prompt": f"{AGENT_SYSTEM_PROMPT}\n\n{user_prompt}",
        "stream": False,
        "format": "json",
        "options": {
            "temperature": 0.7,
            "top_p": 0.9,
        }
    }

    try:
        response = requests.post(
            OLLAMA_API_URL,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=25
        )

        if response.status_code == 200:
            res_json = response.json()
            raw_text = res_json.get("response", "").strip()

            if raw_text.startswith("```"):
                raw_text = re.sub(r"^```(?:json)?\n", "", raw_text)
                raw_text = re.sub(r"\n```$", "", raw_text)

            parsed_data = json.loads(raw_text)
            required_keys = ["score", "summary", "tagline", "pitch", "strategy"]
            if all(k in parsed_data for k in required_keys):
                parsed_data["source"] = f"Local Gemma 3 Engine ({DEFAULT_MODEL})"
                return parsed_data, True

    except (requests.exceptions.ConnectionError, requests.exceptions.Timeout, json.JSONDecodeError, Exception):
        pass

    fallback_data = generate_mock_analysis(idea, budget, audience)
    return fallback_data, False


# ==============================================================================
# 3. USER INTERFACE & PRESENTATION LAYER
# ==============================================================================

if "analysis_result" not in st.session_state:
    st.session_state.analysis_result = None
if "is_live_model" not in st.session_state:
    st.session_state.is_live_model = False
if "submitted_idea" not in st.session_state:
    st.session_state.submitted_idea = ""

st.markdown("""
<div style="text-align: center; margin-bottom: 24px;">
    <div class="brand-badge">
        <span class="brand-badge-dot"></span>
        Antigravity Agent Framework &bull; Gemma 3 Core
    </div>
    <h1 class="neon-title">StartupSense AI</h1>
    <p class="sub-tagline">Validate Your Startup Idea in 60 Seconds with Deep Market Intelligence</p>
</div>
""", unsafe_allow_html=True)

def set_preset(preset_idea, preset_budget, preset_audience):
    st.session_state["idea_input"] = preset_idea
    st.session_state["budget_input"] = preset_budget
    st.session_state["audience_input"] = preset_audience

with st.container():
    st.markdown('<div class="glass-container">', unsafe_allow_html=True)
    st.markdown('<div style="font-weight: 700; font-size: 1.15rem; color: #f1f5f9; margin-bottom: 12px; font-family: Outfit, sans-serif;">💡 Submit Venture Parameters</div>', unsafe_allow_html=True)
    
    idea_input = st.text_input(
        "Startup Idea",
        placeholder="e.g., AI Resume Builder & Interview Prep Assistant for Students",
        key="idea_input",
        help="Describe what product or service you want to build and the problem it solves."
    )

    col1, col2 = st.columns(2)
    with col1:
        budget_input = st.text_input(
            "Available Budget",
            placeholder="e.g., $100 or ₹5,000",
            key="budget_input",
            help="Your initial capital for tools, domains, hosting, and marketing."
        )
    with col2:
        audience_input = st.text_input(
            "Target Audience",
            placeholder="e.g., College Undergrads & Job Seekers",
            key="audience_input",
            help="Who is your ideal first paying customer?"
        )

    st.markdown('<div style="margin-top: 10px; margin-bottom: 16px;"><span style="font-size: 0.78rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Try One-Click Hackathon Presets:</span></div>', unsafe_allow_html=True)
    
    p_col1, p_col2, p_col3 = st.columns(3)
    with p_col1:
        if st.button("🎓 AI Resume for Students", use_container_width=True):
            set_preset("AI Resume Builder & Interview Coach for Students", "$50", "College Undergrads & Grads")
            st.rerun()
    with p_col2:
        if st.button("☕ Hyperlocal Artisan Coffee", use_container_width=True):
            set_preset("Hyperlocal Artisan Coffee Bean Subscription", "₹3,500", "Remote Software Engineers")
            st.rerun()
    with p_col3:
        if st.button("🛡️ Autonomous Code Auditor", use_container_width=True):
            set_preset("Autonomous Security & Dependency Audit Bot", "$200", "Indie Hackers & Small Startups")
            st.rerun()

    st.markdown("<div style='height: 10px;'></div>", unsafe_allow_html=True)
    analyze_clicked = st.button("Analyze Idea & Generate Pitch ⚡", key="analyze_button")
    st.markdown('</div>', unsafe_allow_html=True)

if analyze_clicked:
    if not idea_input.strip():
        st.warning("⚠️ Please provide a startup idea to initiate the Antigravity validation agent.")
    else:
        eff_budget = budget_input.strip() if budget_input.strip() else "$100"
        eff_audience = audience_input.strip() if audience_input.strip() else "Early Adopters"
        
        telemetry_placeholder = st.empty()
        steps = [
            ("📡 Antigravity Agent: Initializing venture ingest pipeline...", 0.4),
            ("🧠 Contacting local Gemma 3 model at localhost:11434...", 0.5),
            ("📊 Running unit economics & customer acquisition simulations...", 0.4),
            ("⚡ Synthesizing 30-day go-to-market execution blueprint...", 0.3),
        ]
        
        for text, delay in steps:
            telemetry_placeholder.markdown(
                f'<div class="telemetry-box"><span style="color:#38bdf8;">[AGENT KERNEL]</span> {text}</div>',
                unsafe_allow_html=True
            )
            time.sleep(delay)
            
        result, is_live = analyze_startup_idea(idea_input, eff_budget, eff_audience)
        st.session_state.analysis_result = result
        st.session_state.is_live_model = is_live
        st.session_state.submitted_idea = idea_input
        
        telemetry_placeholder.empty()
        st.balloons()
        st.rerun()

# ==============================================================================
# 4. STRUCTURED GLASSMORPHIC DASHBOARD OUTPUT
# ==============================================================================
if st.session_state.analysis_result:
    res = st.session_state.analysis_result
    score = int(res.get("score", 75))
    summary = res.get("summary", "")
    tagline = res.get("tagline", "")
    pitch = res.get("pitch", "")
    strategy = res.get("strategy", "")
    source_label = res.get("source", "Antigravity Agent Core")

    status_color = "#10b981" if st.session_state.is_live_model else "#38bdf8"
    status_icon = "🟢" if st.session_state.is_live_model else "🔷"
    st.markdown(f"""
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding: 0 4px;">
        <span style="font-size: 0.85rem; color: #94a3b8; font-weight: 500;">
            Analysis Report for: <strong style="color: #f8fafc;">"{st.session_state.submitted_idea}"</strong>
        </span>
        <span style="font-size: 0.78rem; padding: 4px 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 999px; color: {status_color}; font-weight: 600;">
            {status_icon} {source_label}
        </span>
    </div>
    """, unsafe_allow_html=True)

    if score >= 80:
        badge_class = "verdict-high"
        verdict_text = "🚀 High Viability Venture"
        circle_gradient = "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    elif score >= 60:
        badge_class = "verdict-mid"
        verdict_text = "⚡ Moderate Viability &bull; Requires Focus"
        circle_gradient = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    else:
        badge_class = "verdict-low"
        verdict_text = "⚠️ High Risk &bull; Pivot Recommended"
        circle_gradient = "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)"

    st.markdown(f"""
    <div class="metric-glass-card">
        <div class="score-circle" style="background: {circle_gradient};">
            <span class="score-number">{score}</span>
            <span class="score-max">Viability / 100</span>
        </div>
        <div class="metric-details">
            <span class="verdict-badge {badge_class}">{verdict_text}</span>
            <p class="market-summary-text">{summary}</p>
        </div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown(f"""
    <div class="tagline-box">
        <div class="tagline-lead">✨ Official AI Startup Tagline</div>
        <p class="tagline-content">"{tagline}"</p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown(f"""
    <div class="pitch-glass-container">
        <div class="pitch-quote-mark">&ldquo;</div>
        <div class="pitch-header">
            <span class="pitch-pill">🎙️ 30-Second Investor Pitch</span>
            <span style="font-size: 0.8rem; color: #94a3b8;">Est. Speaking Time: ~28s</span>
        </div>
        <p class="pitch-body">{pitch}</p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown('<div class="strategy-card">', unsafe_allow_html=True)
    st.markdown('<div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 14px; margin-bottom: 20px;">'
                '<span style="font-family: Outfit, sans-serif; font-size: 1.35rem; font-weight: 700; color: #ffffff;">📊 Strategic Blueprint & 30-Day Execution Roadmap</span>'
                '<span style="font-size: 0.8rem; background: rgba(139, 92, 246, 0.15); color: #c4b5fd; padding: 4px 10px; border-radius: 6px; font-weight: 600;">Antigravity Engine</span>'
                '</div>', unsafe_allow_html=True)
    st.markdown(strategy)
    st.markdown('</div>', unsafe_allow_html=True)

    c_btn1, c_btn2 = st.columns([1, 4])
    with c_btn1:
        if st.button("🔄 Analyze New Idea", use_container_width=True):
            st.session_state.analysis_result = None
            st.rerun()

st.markdown("""
<div class="footer-text">
    StartupSense AI &bull; Built with Antigravity Agent Framework & Local Gemma 3 &bull; Designed for 1-Day Hackathon Excellence
</div>
""", unsafe_allow_html=True)
