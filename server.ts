import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize GoogleGenAI SDK server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Business Context Constants for NovaTech Solutions demo
const COMPANY_CONTEXT = `
Company: NovaTech Solutions (Fictional Demo Environment)
Industry: IT Consulting and Software Development
Currency: INR (₹)
Headcount: 35 employees (Engineering: 24, Design/Product: 4, Sales/Ops: 4, Exec: 3)
Monthly Revenue: ₹25,00,000 (₹25 Lakhs)
Monthly Operating Costs: ₹19,00,000 (₹19 Lakhs - Payroll ₹14.5L, Infrastructure ₹2.1L, Rent/Office ₹1.4L, Sales/Ops ₹1.0L)
Monthly Operating Profit: ₹6,00,000 (₹6 Lakhs)
Current Operating Margin: 24.0%
Active Projects: 12 projects across 18 enterprise & mid-market clients
Team Utilization: 76% (Target: 82%)
Business Risk Score: 32/100 (Moderate Risk)
Customer Concentration: Top 3 clients (FinCorp Global, RetailStream, MedTech Health) generate 64% of total monthly billing.
Historical Decision Lessons:
1. Q1 Hiring lesson: Hired 3 developers prematurely before customer signed contract; resulted in 45 days of unbilled capacity costing ₹3,60,000 in idle burn.
2. Pricing lesson: Fixed-scope pricing for Project Alpha resulted in -14% margin variance due to unbilled change requests.
3. Contractor expansion lesson: Using specialized contractors for Project Delta preserved 28% margin with zero long-term payroll commitment.
`;

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'DecisionTwin AI',
    workspace: 'NovaTech Solutions',
    aiConnected: Boolean(apiKey),
    hindsightConnected: true,
  });
});

// Hindsight Persistent Memory Status
app.get('/api/hindsight/status', (req, res) => {
  res.json({
    connected: true,
    engine: 'Hindsight Vector Memory Protocol',
    version: '1.4.2-enterprise',
    workspaceId: 'novatech-solutions-prod-in',
    tenantIsolation: 'Active (Hard Multi-Tenant Boundary)',
    storage: {
      businessFacts: 18,
      decisionHistory: 14,
      lessonsLearned: 12,
      strategicPreferences: 9,
    },
    lastSyncedAt: new Date().toISOString(),
    statusNote: 'Hindsight development adapter active with deterministic organizational vector recall.',
  });
});

// AI Decision Studio Analysis
app.post('/api/ai/analyze-decision', async (req, res) => {
  try {
    const { question, category, investment, deadline, riskTolerance, businessUnit } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (aiClient) {
      try {
        const prompt = `
You are DecisionTwin AI, an executive decision simulation and enterprise intelligence engine.
Analyze the following business decision for NovaTech Solutions:

Decision Query: "${question}"
Category: ${category || 'General'}
Expected Investment: ${investment || 'Not specified'}
Deadline: ${deadline || 'Next quarter'}
Risk Tolerance: ${riskTolerance || 'Moderate'}
Business Unit: ${businessUnit || 'Engineering'}

Company Context:
${COMPANY_CONTEXT}

Instructions:
1. Clearly distinguish VERIFIED FACTS from ASSUMPTIONS and UNKNOWN VALUES.
2. Never promise or guarantee financial outcomes; always state confidence levels and caveats.
3. Draw upon the company's historical decisions (e.g., past hiring idle burn, fixed price contract creep, contractor elasticity).
4. Provide a structured response in plain JSON without markdown wrapping.

Respond with valid JSON with this exact schema:
{
  "summary": "Brief executive evaluation in 2 sentences",
  "businessContext": ["fact 1 with real numbers", "fact 2 with real numbers", "fact 3"],
  "historicalDecisions": [
    {"title": "Decision title", "date": "e.g. Q1 2026", "similarity": "High/Medium", "outcome": "What happened", "relevance": "Why it applies"}
  ],
  "similarSituations": ["Past situation 1", "Past situation 2"],
  "verifiedData": ["Verified data point 1", "Verified data point 2"],
  "missingInformation": ["Crucial unknown 1", "Crucial unknown 2"],
  "assumptionsToConfirm": ["Key assumption 1", "Key assumption 2"],
  "riskFactors": ["Risk 1", "Risk 2", "Risk 3"],
  "recommendedNextStep": "Immediate recommendation for simulation"
}
`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const rawText = response.text || '{}';
        const parsed = JSON.parse(rawText);
        return res.json({ analysis: parsed, source: 'gemini-3.8-flash' });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using deterministic intelligence engine fallback:', geminiError?.message);
      }
    }

    // High quality deterministic fallback when Gemini is offline or rate-limited
    const isHiring = (category || '').toLowerCase().includes('hiring') || question.toLowerCase().includes('hire') || question.toLowerCase().includes('developer');
    const isPricing = (category || '').toLowerCase().includes('pricing') || question.toLowerCase().includes('price');

    const fallbackAnalysis = {
      summary: isHiring
        ? `Hiring additional personnel directly impacts fixed monthly payroll (currently ₹14.5L of ₹19L total costs). Historical data shows a 45-day lag between onboarding and billable deployment.`
        : isPricing
        ? `Pricing adjustments require customer sensitivity testing; your top 3 customers generate 64% of gross revenue, making retention risk a primary factor.`
        : `Simulating "${question}" against current operating margin (24.0%) and cash buffer of ₹18.4L.`,
      businessContext: [
        `Current monthly revenue stands at ₹25,00,000 with ₹19,00,000 monthly burn.`,
        `Team billable utilization is currently 76%, leaving ~24% unbilled capacity in existing headcount.`,
        `Current customer concentration: 3 clients account for 64% of total billing (FinCorp, RetailStream, MedTech).`,
        `Available liquid working capital reserve: ₹18,40,000 (~3.1 weeks of runway at full burn).`
      ],
      historicalDecisions: [
        {
          title: 'Hired 3 full-stack engineers in Q1 without signed SOW',
          date: 'Feb 2026',
          similarity: 'High',
          outcome: 'Resulted in 45 days of unbilled bench time costing ₹3,60,000 in idle payroll before Project Beta started.',
          relevance: 'Demonstrates risk of pre-hiring without committed minimum billing guarantees.'
        },
        {
          title: 'Engaged 2 specialized contractors for Project Delta',
          date: 'Nov 2025',
          similarity: 'Medium',
          outcome: 'Achieved 28% gross margin while scaling back commitments immediately upon project sign-off.',
          relevance: 'Contractor model preserved liquidity during uncertain scope.'
        }
      ],
      similarSituations: [
        'Team utilization was at 74% in December 2025 before a major contract arrived.',
        'Overtime costs spiked on Project Alpha due to fixed delivery deadlines with understaffed senior leads.'
      ],
      verifiedData: [
        'Payroll records confirm average senior developer fully burdened monthly cost is ₹1,20,000.',
        'Average recruitment time-to-hire is 34 days, with recruiter fees of 8.33% annual CTC.',
        'Current average billing rate is ₹1,850/hour across active client accounts.'
      ],
      missingInformation: [
        'Confirmed pipeline conversion probability for Q3 incoming enterprise leads.',
        'Client willingness to accept junior/mid-level billable ratios on upcoming SOWs.',
        'Exact ramp-up schedule and shadow training days required before first billable billing.'
      ],
      assumptionsToConfirm: [
        'Assume new hires achieve 65% utilization in month 1 and 80% in month 2.',
        'Assume existing project demand does not contract or churn during onboarding.',
        'Assume billing rate remains stable at ₹1,850/hr without discounting.'
      ],
      riskFactors: [
        'Fixed cost escalation: Adds permanent monthly payroll obligations irrespective of client payment timing.',
        'Bench cost risk if prospective pipeline deals slip by 30-60 days.',
        'Managerial overhead: Senior architect time diverted to code reviews and mentoring.'
      ],
      recommendedNextStep: 'Proceed to Scenario Simulator to stress-test 3-month and 6-month break-even timelines across 2 vs 5 hires.'
    };

    return res.json({ analysis: fallbackAnalysis, source: 'hindsight-engine-fallback' });
  } catch (err: any) {
    console.error('Error analyzing decision:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// AI Chat Endpoint with Enterprise Business Context
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (aiClient) {
      try {
        const systemPrompt = `
You are "DecisionTwin Intelligence", the executive AI advisor embedded inside NovaTech Solutions' DecisionTwin platform.
Company profile:
${COMPANY_CONTEXT}

Personality & Communication Rules:
1. Speak as a seasoned, pragmatic Chief Strategy Officer / CFO advisor.
2. Ground all answers in NovaTech's actual data: ₹25L revenue, ₹19L cost, ₹6L profit (24% margin), 35 staff, 12 projects, 76% utilization.
3. Explicitly distinguish verified facts from assumptions and estimates.
4. Recall relevant organizational memory (e.g., past Q1 hiring idle burn of ₹3.6L, fixed scope margin erosion on Project Alpha, contractor flexibility).
5. Never promise guaranteed financial returns. Frame forecasts with confidence scores and sensitivities.
6. Provide crisp, structured bullet points with concrete metrics in INR (₹).
`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `${systemPrompt}\n\nUser Question: ${message}`,
        });

        return res.json({
          reply: response.text || 'Analysis completed with verified organizational context.',
          source: 'gemini-3.8-flash',
        });
      } catch (geminiError: any) {
        console.warn('Gemini chat failed, using fallback:', geminiError?.message);
      }
    }

    // Contextual deterministic response
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('price') || lower.includes('pricing') || lower.includes('package')) {
      reply = `**DecisionTwin Intelligence Assessment:**

Your standard monthly service package currently delivers an average **22.4% contribution margin**. 

**Key Business Facts:**
- Three comparable clients (RetailStream, CloudCore, LogisticsX) required +38 additional unbilled support hours last quarter due to custom integrations.
- Customer concentration risk is high: your top 3 clients generate **64% of total billing** (₹16,00,000/mo).

**Strategic Recommendation:**
1. A blanket price hike risks churn among core accounts. Instead, introduce a tiered SLA model or bill unbudgeted integration hours at **₹1,950/hr**.
2. **Critical Assumption to verify:** Confirm whether those 38 support hours were one-time migration glitches or ongoing maintenance debt.
3. If recurring, a 15% rate revision on the top tier would add **₹1,45,000/mo in pure operating profit** without expanding payroll.`;
    } else if (lower.includes('hire') || lower.includes('developer') || lower.includes('team')) {
      reply = `**DecisionTwin Intelligence Assessment:**

Before adding full-time headcount, consider our **Organizational Memory from February 2026**:
- When NovaTech hired 3 developers without signed client SOWs, onboarding delays caused **45 days of unbilled bench time**, costing **₹3,60,000 in idle payroll**.

**Current Resource Reality:**
- Current team billable utilization is **76%** (target 82%), meaning you have approximately **195 billable hours/month of untapped capacity** in your current 24 engineers.
- Hiring 2 developers at ₹1,10,000/month adds ₹2,20,000 in monthly fixed commitments.
- **Recommended Action:** Use the Scenario Simulator to compare *Scenario B (2 full-time hires)* vs *Scenario C (Contractors)* with a 6-month break-even horizon.`;
    } else {
      reply = `**DecisionTwin Intelligence Assessment:**

Regarding: "${message}"

**Business Position & Context:**
- **Monthly Revenue:** ₹25,00,000 | **Operating Profit:** ₹6,00,000 (24.0% margin).
- **Working Capital:** Approximately 3.1 weeks of runway at full monthly burn (₹19,00,000).
- **Active Projects:** 12 projects in flight with 76% team utilization.

**Memory Insight:**
Past strategic reviews indicate NovaTech yields the highest risk-adjusted return when capital expenditure is backed by signed commitments rather than pipeline optimism.

Would you like to simulate this specific initiative in the **Scenario Simulator** or test its impact on your 6-month cash buffer?`;
    }

    return res.json({ reply, source: 'hindsight-engine-fallback' });
  } catch (err: any) {
    console.error('Error in chat:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`DecisionTwin AI server running on port ${port} (mode: ${isProduction ? 'prod' : 'dev'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
