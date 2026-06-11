# PDR DRIP Training - DI-SESS-81757A

**Version:** 2.0.0
**Last Updated:** 2026-06-09
**Branch:** tfd-agent
**Program:** MK 710 Torpedo Support Equipment (TSE) | PMS-404 / Code 85

## Overview
Interactive customer training webapp for the DoD Preliminary Design Review (PDR) Design Review Information Package (DRIP), per **DI-SESS-81757A** (06 Apr 2010). Built and maintained by SAIC for Government customer representatives: Program Managers, Systems Engineers, Contract Officers, and T&E leads.

## Features
- **11 training sections** covering DRIP content requirements, allocated baseline, entry/exit criteria, CDRL obligations, roles & responsibilities, MK 710 program-specific criteria, and CI data package
- **MK 710 PDR Entry & Exit Criteria** - PMS-404 / Code 85 specific, sourced from NAVSEA TRM 3.0 and MK 710 PDR Entry Criteria Analysis
- **MK 710 CI Register** - All 44 Configuration Items (HWCIs and CSCIs) with PDR data package requirements
- **Interactive readiness checklist** (24 items, live completion tracking)
- **7-question knowledge assessment** with scored feedback
- **AI-powered DRIP Advisor** (Claude via Tennex/Bedrock) - full-page + floating popup
  - Grounded in DI-SESS-81757A, DAG CH 3-3.3.4, 10 U.S.C. 2366b, and related CDRLs
- **SAIC branding** - orange/blue palette, SAIC wordmark in header

## File Structure
```
PDR_DRIP/
??? pdr-drip-training/
?   ??? src/
?   ?   ??? index.html        # Single-file app (HTML + CSS + JS)
?   ??? docs/
?   ?   ??? CHANGELOG.md
?   ??? README.md
??? src/                      # Source reference documents
?   ??? CI_List.xlsx          # MK 710 44-CI register
?   ??? PDR Entry Criteria Analysis.xlsx
?   ??? NAVSEA_Technical_Review_Manual_TRM 3.0.html
?   ??? NAVSEA_Technical_Review_Manual_TRM 3.0_AppC_SE_Docs.pdf
??? server.js                 # Express server (port 3006)
??? package.json
??? .env                      # TENNEX_API_KEY, TENNEX_API_BASE, TENNEX_MODEL
```

## Running the App
```bash
node server.js
# Open http://localhost:3006
```

To stop the server:
```powershell
Stop-Process -Name node -Force
```

## Environment Configuration
Create a `.env` file at project root:
```
TENNEX_API_KEY=your_key_here
TENNEX_API_BASE=https://ai-api.sif.saicdevops.com/v1/
TENNEX_MODEL=bedrock-claude-sonnet-4-6
PORT=3006
```

## Navigation Sections
| # | Section | Description |
|---|---|---|
| 01 | Overview & Purpose | DRIP introduction, design review progression |
| 02 | PDR Section Content | 11 required DRIP content elements |
| 03 | Allocated Baseline | PDR primary technical output |
| 04 | Entry / Exit Criteria | Customer gatekeeping responsibilities |
| 05 | Contract Data Requirements | CDRL / DD Form 1423 obligations |
| 06 | Roles & Responsibilities | PM, SE, CDT, DASD(SE), KO, Contractor |
| 07 | Customer Readiness Checklist | 24-item interactive pre-PDR checklist |
| 08 | Knowledge Assessment | 7-question scored quiz |
| 09 | MK 710 PDR Entry & Exit Criteria | PMS-404 / Code 85 program-specific |
| 10 | CI Data Package | 44-CI MK 710 register with package requirements |
| AI | DRIP Advisor | AI assistant grounded in DI-SESS-81757A |

## Reference Documents
| Document | Title |
|---|---|
| DI-SESS-81757A | Design Review Information Package (DRIP) |
| NAVSEA TRM 3.0 | Technical Review Manual |
| DAG CH 3-3.3.4 | Preliminary Design Review |
| 10 U.S.C. 2366b | Milestone B Certification for MDAPs |
| IEEE 15288.2 | Technical Reviews and Audits on Defense Programs |
| DD Form 1423 | Contract Data Requirements List |
| MK 710 SEP | Systems Engineering Plan (NUWC) |
