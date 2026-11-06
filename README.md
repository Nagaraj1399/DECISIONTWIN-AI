# 🧠 DecisionTwin AI — Simulate Before You Decide

<div align="center">

![DecisionTwin AI Banner](https://img.shields.io/badge/DecisionTwin_AI-Enterprise_Simulation_Platform-2563EB?style=for-the-badge&logo=cpu&logoColor=white)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-Backend_Middleware-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini 3.8 Flash](https://img.shields.io/badge/AI_Engine-Gemini_3.8_Flash-8E75C2?style=flat-square&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Hindsight Memory](https://img.shields.io/badge/Persistent_Memory-Hindsight_Vector_Protocol-10B981?style=flat-square&logo=database&logoColor=white)](https://hindsight.vectorize.io/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square)](LICENSE)

**"Understand the consequences of your decisions before they affect your business."**

*A production-grade, AI-powered Business Decision Simulation and Organizational Learning Platform.*

[Live Architecture](#-system-architecture) • [Core Innovations](#-core-platform-modules) • [Judges Evaluation Walkthrough](#-judges--jury-evaluation-walkthrough) • [Mathematical Traceability](#-mathematical--financial-traceability-engine) • [Installation](#-getting-started)

</div>

---

## 🏆 Executive Summary (Judges Pitch)

Most enterprise software looks backward: accounting dashboards record what you already spent, while generic chat assistants hallucinate generic advice without verifiable numbers.

**DecisionTwin AI introduces a new category: Decision Intelligence & Organizational Memory.**

Designed for business owners, CFOs, and executives, DecisionTwin allows leaders to:
1. **Ground Decisions in Reality:** Connect ledger data, team utilization, and client concentration without AI hallucination.
2. **Simulate Before Committing:** Run dynamic mathematical sensitivity models across aggressive, balanced, and elastic contractor scenarios.
3. **Compare Multi-Horizon Futures:** Project revenues, margins, break-even timelines, and monthly cash flow trajectories across 3, 6, 12, and 24 months.
4. **Enforce Governance & Sign-Off:** Require explicit owner approval before recording a business commitment.
5. **Learn Continuously with Hindsight:** Retain every decision, forecast, and actual measured variance into an immutable vector memory so the business gets smarter with every choice.

> **Company Profile (Demo Environment):** NovaTech Solutions (IT Consulting & Software Engineering) • 35 Employees • ₹25,00,000 Monthly Revenue • ₹19,00,000 Operating Costs • ₹6,00,000 Operating Profit (24.0% Margin) • 76% Team Utilization.

---

## 🏛️ System Architecture

DecisionTwin AI is architected with a strict separation between **authoritative relational state**, **deterministic mathematical simulation**, and **reasoning over verified organizational memory**.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT TIER (React 19 SPA)                               │
│  ┌───────────────────────────┐  ┌───────────────────────────┐  ┌─────────────────────┐  │
│  │     Decision Studio       │  │    Scenario Simulator     │  │ Hindsight Explorer  │  │
│  │ (Context & Facts Ground)  │  │(Sensitivity Sliders & Svg)│  │ (4-Stage Memory)    │  │
│  └─────────────┬─────────────┘  └─────────────┬─────────────┘  └──────────┬──────────┘  │
│                │                              │                           │             │
│                ▼                              ▼                           ▼             │
│        [Custom SVG Multi-Series Charts] [Audit Modals] [Cmd+K Global Index]             │
└───────────────────────────────────────────────┬─────────────────────────────────────────┘
                                                │ REST / Bearer API
                                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                            APPLICATION & MIDDLEWARE TIER                                │
│                              (Node.js / Express / tsx)                                  │
│                                                                                         │
│   ┌──────────────────────────┐    ┌──────────────────────────┐   ┌──────────────────┐   │
│   │   Decision Studio API    │    │  Scenario Engine Proxy   │   │ Hindsight Vector │   │
│   │   /api/ai/analyze        │    │  /api/ai/simulate        │   │ /api/hindsight/* │   │
│   └────────────┬─────────────┘    └────────────┬─────────────┘   └────────┬─────────┘   │
└────────────────┼───────────────────────────────┼──────────────────────────┼─────────────┘
                 │                               │                          │
                 ▼                               ▼                          ▼
┌────────────────────────────────┐ ┌───────────────────────────┐ ┌─────────────────────────┐
│     DECISION INTELLIGENCE      │ │  DETERMINISTIC SIMULATION │ │  ORGANIZATIONAL MEMORY  │
│        (LLM Reasoning)         │ │     (Financial Math)      │ │   (Hindsight Protocol)  │
│                                │ │                           │ │                         │
│  • Google Gemini 3.8 Flash     │ │  • Zero-Hallucination     │ │  • Retain, Recall,      │
│  • User-Agent: aistudio-build  │ │  • Fixed vs Variable Burn │ │    Reflect, Apply Loop  │
│  • Strict Server-Side Only     │ │  • Capex Recovery Formula │ │  • Multi-Tenant Bound   │
│  • No API Key Exposed to Client│ │  • Cash Flow Trajectory   │ │  • Cosine Semantic Rank │
└────────────────────────────────┘ └───────────────────────────┘ └─────────────────────────┘
                 ▲                               ▲                          ▲
                 └───────────────────────────────┴──────────────────────────┘
                                                 │
                                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 DATA INGESTION LAYER                                    │
│  • Local CSV / Excel Parser (Active Timesheets & Profitability Rows)                    │
│  • Simulated Enterprise Connectors (Zoho Books, Tally Prime, QuickBooks, Jira, HubSpot) │
│  • Cryptographic Workspace Isolation: novatech-solutions-prod-in                       │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔬 The Hindsight 4-Stage Organizational Learning Loop

DecisionTwin integrates the official **Hindsight Vector Memory Protocol** (`https://hindsight.vectorize.io/`):

```
                     ┌─────────────────────────────────┐
                     │           1. RETAIN             │
                     │ Store decision context, models, │
                     │ owner rationale & commitments.  │
                     └────────────────┬────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│            4. APPLY             │       │            2. RECALL            │
│ Ground new simulations with     │◀──────│ Retrieve similar past decisions │
│ empirical precedents.           │       │ & post-mortems via vectors.     │
└─────────────────────────────────┘       └─────────────────────────────────┘
                                      ▲
                                      │
                     ┌────────────────┴────────────────┐
                     │           3. REFLECT            │
                     │ Synthesize cross-project        │
                     │ patterns & identify pitfalls.   │
                     └─────────────────────────────────┘
```

### Architectural Principles Enforced:
1. **Authoritative Record Integrity:** Relational structures remain the single source of truth for financial accounting.
2. **Deterministic Computation:** Formulas for profit, margins, and break-even recovery are mathematical, never left to LLM prediction.
3. **Hard Multi-Tenant Isolation:** Memory partitions are bounded strictly to `novatech-solutions-prod-in`. Cross-organization vector leakage is prevented.
4. **Traceable Precedents:** Every recommendation cites specific historical evidence (e.g., *Decision #101: Q1 hiring idle bench drag of ₹3,60,000*).

---

## 🚀 Core Platform Modules

### 1. Business Overview (`/dashboard`)
- **6 Primary KPI Cards:** Real-time revenue, operating profit, net margin, active projects, team utilization, and composite risk score (32/100).
- **Interactive Revenue & Profit Trends Chart:** Custom SVG line/area visualization with hover tooltips and 6-month historical depth.
- **Circular Business Health Gauge:** 4-dimension radial index measuring Financial (84%), Operational (76%), Resource (82%), and Customer (68%) health.
- **AI Decision Insights:** Identifies root causes (e.g., 142 unbilled hours; 64% client concentration) with financial impact tags and direct simulation CTAs.
- **Project Profitability Audit Table:** Real-time visibility into 12 enterprise contracts with margin drift tracking.

### 2. Decision Studio (`/decision-studio`)
- **Interactive Intake:** Multiline strategic inquiry prompt across 7 categories (*Hiring & Workforce, Pricing & Revenue, Investment & Expansion, Customer & Contracts, Operations, Cost Reduction, Other*).
- **Zero-AI-Slop Discipline:** Categorizes intelligence into **Verified Business Facts** (ledger numbers), **Empirical Lessons** (past post-mortems), and **Assumptions to Confirm** (pipeline probabilities).
- **Seamless Handoff:** Instantly sends parameters into the Scenario Simulator with one click.

### 3. Scenario Simulator (`/simulator` — Visual Centerpiece)
- **Live Sensitivity Sliders:** Dynamic controls for headcount (1–8), salary (₹75k–₹2L), recruitment fee, billing rate (₹1,850/hr), and expected billability (50%–95%).
- **Tri-Scenario Comparative Matrix:**
  - **Scenario A (Aggressive Growth):** Hire 5 full-time developers (scales capacity, adds ₹6.5L/mo fixed overhead).
  - **Scenario B (Balanced Growth — DecisionTwin Recommended):** Hire 2 senior developers (3.5-month recovery, ₹2.4L/mo added burn).
  - **Scenario C (Flexible Expansion):** Deploy specialized on-demand contractors (zero upfront capex, zero idle bench liability).
- **Cumulative Cash Flow & Recovery Timeline:** Multi-series chart featuring a clear **Break-Even Line (₹0)** across 3, 6, 12, or 24-month horizons.
- **Explainable AI Recommendation:** Provides confidence score (88%), supporting rationale, potential trade-offs, and critical invalidation conditions.
- **Official Decision Recording:** Launches an owner sign-off modal with governance sign-off.

### 4. Decision History & Detailed Retrospective (`/decisions`)
- **Filterable Governance Ledger:** Searchable by keyword, status (*Under Review, Approved, Rejected, In Progress, Outcome Pending, Completed*), and business unit.
- **10-Point Retrospective View:**
  1. Original business question
  2. Information available at the time
  3. Options evaluated with projected ROI
  4. Simulation results summary
  5. AI recommendation
  6. Owner's final decision & sign-off
  7. Stated rationale
  8. Predicted vs. actual measured outcome with variance tracking
  9. Retained lessons learned
  10. Full event timeline from initiation to post-mortem

### 5. Business Intelligence (`/intelligence`)
- Structured breakdown across 5 specialized domains:
  - **Financial:** Revenue growth rates, expense distribution, fixed vs variable cost ratios (83.7% fixed).
  - **Customers:** Herfindahl concentration index (Top 3 clients account for 64% of gross revenue).
  - **Projects:** SOW budget hours vs actual logged labor variance.
  - **Resources:** Senior developer bottleneck analysis (88% load on leads) and 195 hours/mo untapped bench capacity.
  - **Operations:** On-time milestone delivery rate (75%) and rework/revision drag (11.4%).

### 6. Organizational Memory Explorer (`/memory`)
- **4 Categorized Repositories:** Business Facts, Decision History, Lessons Learned, Strategic Preferences.
- **Knowledge Accumulation Timeline:** Narrative showing how January's hiring idle bench drag led to March's rate revision and August's revision caps.
- **Semantic Memory Search:** Direct querying ("*Have we faced a similar hiring situation before?*") returning cosine-ranked citations with source provenance.

### 7. Lessons Learned Post-Mortem Library (`/lessons`)
- Rigorous 6-step case studies: What happened, What was expected, What actually occurred, Root cause analysis, Core lesson, and Operational rule changes.
- In-app creation flow to retain new post-mortems.

### 8. Executive Reports & Exports (`/reports`)
- 6 standardized templates (*Monthly Business Health, Profitability Audit, Decision Impact, Scenario Comparison, Customer Risk, Hindsight Ledger*).
- Formatted PDF print preview and instant CSV data export.

### 9. Data Sources & CSV Timesheet Ingestion (`/data-sources`)
- Working **CSV & Excel Uploader** that parses timesheets, validates schemas, and updates live profitability tables instantly.
- Transparent integration status for Zoho Books, Tally Prime, QuickBooks, and Jira.

### 10. Settings, Currencies & RBAC (`/settings`)
- Organization metadata, working days per month (21.5), capex hurdle rates (15%), and margin floor enforcement (25%).
- **Multi-Currency Support:** Default Indian Rupee (`INR ₹`), with live switching to `USD $`, `EUR €`, `GBP £`, and `AED د.إ`.
- Role-based access control with distinct governance authorities.

---

## 📐 Mathematical & Financial Traceability Engine

DecisionTwin computes every projection deterministically. Nothing is hallucinated by the LLM:

| Metric | Mathematical Formula | NovaTech Baseline |
| :--- | :--- | :--- |
| **Operating Margin** | $\frac{\text{Recognized Revenue} - \text{Total Operating Costs}}{\text{Recognized Revenue}} \times 100$ | $\frac{₹25\text{L} - ₹19\text{L}}{₹25\text{L}} = \mathbf{24.0\%}$ |
| **Incremental Headcount Cost** | $\text{Headcount} \times \text{CTC} \times \text{Overhead Factor (1.15)}$ | $2 \times ₹1,10,000 \times 1.12 = \mathbf{₹2,46,400/\text{mo}}$ |
| **Incremental Billable Capacity** | $\text{Headcount} \times \text{Hours/Mo} \times \text{Utilization \%}$ | $2 \times 140 \times 81\% = \mathbf{226.8\text{ hrs/mo}}$ |
| **Break-Even Period (Months)** | $\left\lceil \frac{\text{Upfront Recruitment Capex}}{\text{Net Monthly Incremental Operating Profit}} \right\rceil + 1$ | $\left\lceil \frac{₹1,70,000}{₹65,000} \right\rceil + 1 \approx \mathbf{3.5\text{ Months}}$ |
| **Customer Concentration** | $\frac{\sum_{i=1}^{3} \text{Billing}_i}{\text{Total Monthly Revenue}} \times 100$ | $\frac{₹7.15\text{L} + ₹4.65\text{L} + ₹4.0\text{L}}{₹25\text{L}} = \mathbf{64.0\%}$ |

---

## 🎯 Judges & Jury Evaluation Walkthrough

Follow this **3-minute tour** to experience the complete capabilities of DecisionTwin AI:

1. **Business Baseline (Overview):**
   - Review the 6 KPI cards. Click the `(i)` info icon on any card to view the formula and authoritative ledger source.
   - Observe the 2.1 pp margin slip alert in **AI Decision Insights**.
2. **Strategic Simulation (Decision Studio & Simulator):**
   - Click **Decision Studio** in the sidebar. Notice the verified vs assumption separation.
   - Click **Send to Scenario Simulator**.
   - Move the **Headcount** slider from 2 to 5. Notice how all 3 scenario cards and the cash flow trajectory chart update dynamically.
   - Review the **AI Recommendation Panel** (*Balanced Growth — 2 Hires*).
   - Click **Record Official Decision**, check the owner sign-off, and commit the plan to memory.
3. **Audit History & Verification (Decision History):**
   - Navigate to **Decision History**. Open **Decision #101** (*Q1 Hiring without signed SOW*).
   - Review the 10-item structured retrospective, showing how ₹3,60,000 in unbilled idle bench drag was measured and converted into memory.
4. **Hindsight Organizational Memory (Business Memory):**
   - Navigate to **Business Memory**.
   - Switch to the **Knowledge Timeline** tab to see the narrative of lessons from January to November.
   - Switch to **Ask Business Memory** and click "*What happened after our last developer hiring decision?*".
5. **Universal AI Assistant (Always Accessible):**
   - Click **Ask DecisionTwin** in the top navigation bar.
   - Ask: *"Should I increase the price of our monthly service package?"*
   - Observe how the AI grounds its answer in the 22.4% package margin, top 3 client concentration (64%), and unbilled support hours.
6. **Live Data Ingestion (Data Sources):**
   - Navigate to **Data Sources**, click **Import CSV / Excel Records**, click **Insert Sample Data**, and click **Import Records**.
   - Observe the project list and KPIs immediately update with live records.

---

## 💻 Tech Stack & Dependencies

```json
{
  "runtime": "Node.js (v22+)",
  "framework": "React 19 (SPA on Vite 8)",
  "styling": "Tailwind CSS v4 (@tailwindcss/vite)",
  "backend": "Express 4.21 with Vite Middleware mode",
  "aiSdk": "@google/genai v2.4.0 (Gemini 3.8 Flash)",
  "icons": "lucide-react v0.546",
  "animation": "motion v12.23",
  "transpiler": "tsx v4.21 & esbuild v0.25",
  "typeSafety": "TypeScript 5.x / 7.x (Strict mode)"
}
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js `>= 18.0.0`
- npm or bun

### 1. Clone the repository
```bash
git clone https://github.com/your-username/decisiontwin-ai.git
cd decisiontwin-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables (Optional)
```bash
cp .env.example .env
```
Add your Gemini API Key in `.env`:
```env
GEMINI_API_KEY="your-gemini-api-key"
PORT=3000
```
*(Note: DecisionTwin features a built-in deterministic intelligence engine fallback, ensuring all simulations, metrics, and memory retrieval function seamlessly even when working offline).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🛡️ Governance, Privacy & Multi-Tenancy

- **Hard Multi-Tenant Isolation:** Memory partitions are bounded strictly to `novatech-solutions-prod-in`. Cross-organization vector leakage is prevented.
- **Client Security:** API keys are never bundled, transmitted, or accessible to the browser client.
- **Zero Hallucination Guarantee:** The LLM interprets verified figures; it never invents financials.

---

<div align="center">

**DecisionTwin AI — Simulate Before You Decide.**

*Built with ❤️ for enterprise leaders, strategy consultants, and decision makers worldwide.*

</div>
