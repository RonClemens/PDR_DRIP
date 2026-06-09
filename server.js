require('dotenv').config();
const express = require('express');
const path    = require('path');
const OpenAI  = require('openai');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'pdr-drip-training', 'src')));

// ── LLM Client ────────────────────────────────────────────────────────────────
let client = process.env.TENNEX_API_KEY
  ? new OpenAI({ apiKey: process.env.TENNEX_API_KEY, baseURL: process.env.TENNEX_API_BASE })
  : null;

const MODEL = process.env.TENNEX_MODEL || 'bedrock-claude-sonnet-4-6';

function initClient(apiKey, baseURL) {
  if (baseURL) process.env.TENNEX_API_BASE = baseURL;
  client = new OpenAI({ apiKey, baseURL: process.env.TENNEX_API_BASE });
}

// ── System Prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are DRIP Advisor, an expert AI assistant embedded inside a U.S. Government customer training module focused on DI-SESS-81757A (Design Review Information Package) and the Preliminary Design Review (PDR) process.

Your knowledge base includes:
- DI-SESS-81757A: Data Item Description for the Design Review Information Package (DRIP), April 6, 2010. The DRIP is used by the Government to determine and ensure that the emerging system has demonstrated sufficient maturity to enter the next phase of development.
- PDR DRIP Section Requirements: system performance specification status; preliminary hardware & software design; interface requirements & ICDs; software architecture & CSCI/CSC/CSU identification; trade study results; risk assessment & mitigation; R&M analysis & FMECA; manufacturing & producibility assessment; logistics & sustainment (LCSP); schedule & IMS; CARD update.
- Allocated Baseline: PDR's primary technical output. Complete when all system-level requirements are decomposed to CI level, all internal/external interfaces documented in ICDs, verification requirements documented for all allocated performance characteristics, and design constraints captured. Placed under formal configuration management at PDR exit. Changes after PDR require an ECP and CCB action.
- PDR Entry Criteria: prior action items closed, SEP criteria documented, validated CDD in place, SMEs identified, DRIP package received 30 days prior.
- PDR Exit Criteria: allocated baseline established and under CM, technical data complete, risks acceptable, feasibility/cost/schedule within margins, IMS updated with CDR path, CARD updated.
- PDR Success Confirmation: satisfies CDD requirements; affordable/producible/sustainable; uses demonstrated technologies; complete and ready for detailed design; provides Milestone B technical basis; captured in all specifications and ICDs.
- CDRL / DD Form 1423: The DRIP is ordered contractually via DD Form 1423 referencing DI-SESS-81757A. Related CDRLs include: SEMP (DI-SESS-81659B), IMS (DI-MGMT-81650), Risk Management Plan (DI-SESS-81651), Software Development Plan (DI-IPSC-81441A), SRS per CSCI (DI-IPSC-81433B), SEP (DI-SESS-81758A), ICDs (DI-SESS-80255), LCSP (DI-SESS-81535), TEMP (DI-SESS-81519).
- Roles: Government PM (approves/funds PDR, controls baselines, convenes CCBs); Government Lead SE (develops PDR plan with quantifiable criteria, verifies entry criteria met, updates risk plans, documents plan to CDR); Chief Developmental Tester (participates in PDR, verifies TEMP and test resources); DASD(SE) for ACAT ID / CAE for ACAT IC (conducts independent PDR assessment for MDA).
- Statutory Reference: 10 U.S.C. 2366b requires MDA certification at Milestone B for MDAPs; certification requires PDR conduct and assessment.
- DAG Reference: DAG CH 3-3.3.4 Preliminary Design Review; DAG CH 8-3.8.2 T&E considerations at PDR; DAG CH 4 Sustainment at PDR.
- IEEE 15288.2: Standard for Technical Reviews and Audits on Defense Programs.

You are speaking to Government customer representatives (PMs, Systems Engineers, Contract Officers, T&E leads). Your role is to help them understand their obligations, evaluate the contractor's DRIP, and exercise their gatekeeping authority effectively.

Respond in a clear, authoritative but approachable tone. Use concise paragraphs. When relevant, reference the specific DID, DAG chapter, statute, or CDRL. Format key terms in bold. Keep responses focused and actionable. Do not exceed 400 words unless the question genuinely requires more depth. Never fabricate regulatory citations.`;

// ── Key Status ─────────────────────────────────────────────────────────────────
app.get('/api/key-status', (req, res) => {
  const hasKey = !!(client && process.env.TENNEX_API_KEY);
  res.json({ hasKey, endpoint: process.env.TENNEX_API_BASE || null });
});

// ── Set API Key ────────────────────────────────────────────────────────────────
app.post('/api/set-key', (req, res) => {
  const { apiKey, baseURL } = req.body;
  if (!apiKey || typeof apiKey !== 'string' || !apiKey.trim())
    return res.status(400).json({ error: 'API key must not be empty.' });
  const key = apiKey.trim();
  try {
    process.env.TENNEX_API_KEY = key;
    initClient(key, baseURL && baseURL.trim() ? baseURL.trim() : undefined);
    const envPath = path.join(__dirname, '.env');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
    if (envContent.includes('TENNEX_API_KEY='))
      envContent = envContent.replace(/TENNEX_API_KEY=.*/, 'TENNEX_API_KEY=' + key);
    else
      envContent += (envContent.endsWith('\n') ? '' : '\n') + 'TENNEX_API_KEY=' + key + '\n';
    if (baseURL && baseURL.trim()) {
      const base = baseURL.trim();
      if (envContent.includes('TENNEX_API_BASE='))
        envContent = envContent.replace(/TENNEX_API_BASE=.*/, 'TENNEX_API_BASE=' + base);
      else
        envContent += (envContent.endsWith('\n') ? '' : '\n') + 'TENNEX_API_BASE=' + base + '\n';
    }
    fs.writeFileSync(envPath, envContent, 'utf-8');
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save API key: ' + err.message });
  }
});

// ── Chat ───────────────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  if (!client) return res.status(503).json({ error: 'No API key configured.' });
  const { message, history } = req.body;
  if (!message || !message.trim()) return res.status(400).json({ error: 'Message is required.' });

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
  if (Array.isArray(history)) {
    history.slice(-10).forEach(h => {
      if (h.role && h.content) messages.push({ role: h.role, content: h.content });
    });
  }
  messages.push({ role: 'user', content: message.trim() });

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.2,
      messages
    });
    const answer = completion.choices[0].message.content.trim();
    console.log('Chat ok - model: ' + MODEL);
    return res.json({ answer });
  } catch (err) {
    console.error('Chat error:', err.message);
    const status   = err.status || 500;
    const message2 = err.status === 401 ? 'Invalid API key.'
      : err.status === 429 ? 'Rate limit - please wait and retry.'
      : err.status === 503 ? 'AI service unavailable.'
      : 'Error communicating with AI service.';
    return res.status(status).json({ error: message2 });
  }
});

// ── Start ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('PDR DRIP Advisor running on http://localhost:' + PORT);
  console.log('Model: ' + MODEL);
});