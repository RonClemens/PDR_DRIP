# PDR DRIP Training — DI-SESS-81757A

**Version:** 1.1.0  
**Last Updated:** 2026-06-08

## Overview
Interactive customer training webapp for the DoD Preliminary Design Review (PDR) Design Review Information Package (DRIP), per **DI-SESS-81757A** (06 Apr 2010).

Designed for Government customer representatives: Program Managers, Systems Engineers, Contract Officers, and T&E leads.

## Features
- **8 training modules** covering DRIP content requirements, allocated baseline, entry/exit criteria, CDRL obligations, and roles & responsibilities
- **Interactive readiness checklist** (24 items, live completion tracking)
- **7-question knowledge assessment** with scored feedback
- **AI-powered DRIP Advisor** (Claude Sonnet) — full-page + floating popup
  - Grounded in DI-SESS-81757A, DAG CH 3-3.3.4, 10 U.S.C. § 2366b, and related CDRLs
  - Persistent conversation history per session

## File Structure
```
pdr-drip-training/
├── src/
│   └── index.html        # Single-file app (HTML + CSS + JS)
├── docs/
│   └── CHANGELOG.md      # Version history
└── README.md
```

## Usage
Open `src/index.html` in any modern browser. The AI assistant requires a network connection to reach the Anthropic API.

## Version History
See `docs/CHANGELOG.md`

## Reference Documents
| Document | Title |
|---|---|
| DI-SESS-81757A | Design Review Information Package (DRIP) |
| DAG CH 3-3.3.4 | Preliminary Design Review |
| DAG CH 8-3.8.2 | T&E Considerations at PDR |
| 10 U.S.C. § 2366b | Milestone B Certification for MDAPs |
| IEEE 15288.2 | Technical Reviews and Audits on Defense Programs |
| DD Form 1423 | Contract Data Requirements List |
