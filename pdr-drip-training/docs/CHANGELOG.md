# Changelog - PDR DRIP Training

All notable changes to this project are documented here.

---

## [2.0.0] - 2026-06-09 | Branch: tfd-agent

### Added
- **MK 710 PDR Entry & Exit Criteria (Section 09)** - PMS-404 / Code 85 program-specific gate requirements sourced from NAVSEA TRM 3.0 and PDR Entry Criteria Analysis.xlsx. Includes 8 entrance criteria (A-H), 7 exit criteria (a-g), and MK 710 program-specific considerations table with NUWC deviation warning.
- **CI PDR Data Package (Section 10)** - Full 44-CI MK 710 Configuration Item register sourced from CI_List.xlsx. Includes HWCI/CSCI designations, required package contents per DI-SESS-81757A, stat summary (44 total / 36 HWCI / 14 CSCI), and customer review responsibilities.
- **SAIC Branding** - Full palette update: SAIC orange (#E87722) and blue (#003087) replacing cyan accent. SAIC wordmark added to header. Updated: nav active states, buttons (orange CTA / blue ghost), progress bar, FAB, tags, pills, callouts, AI components.
- **Roles & Responsibilities expanded (Section 06)** - Added Contracting Officer (KO) role card, expanded PM/SE/CDT/DASD(SE) content, added contractor accountability table with Government verification column, added Key Principle callout.
- **MK 710 nav section** - New sidebar group with sections 09 and 10.

### Fixed
- Hero title font readability - switched from Syne 800 to DM Sans 500, removed negative letter-spacing across all headings (sec-title, header-title, stat-val, score-num)
- Stray closing div in CDRL SOW Cross-References list that was causing browser parser to swallow entire Roles section
- Invalid onclick handlers using backslash-escaped quotes in HTML attributes
- 13 em-dash characters written as literal ??? due to encoding issue
- Trailing space in id="mk710-ci " causing getElementById to return null
- pill-blue CSS typo (saic-bluet -> saic-blue-light)
- nav-item.active border-left-color still referencing removed variable

---

## [1.1.0] - 2026-06-08 | Branch: claude/version-control-zip-submit-0pwtkg

### Added
- Initial 8-section training module
- AI DRIP Advisor with floating popup and full-page view
- Interactive readiness checklist (24 items)
- 7-question knowledge assessment with scoring
- Progress tracking bar
- API key modal for Tennex configuration

### Sections
- 01 Overview & Purpose
- 02 PDR Section Content Requirements
- 03 Allocated Baseline
- 04 Entry / Exit Criteria
- 05 Contract Data Requirements
- 06 Roles & Responsibilities (initial)
- 07 Customer Readiness Checklist
- 08 Knowledge Assessment
- AI DRIP Advisor

---

## [1.0.0] - 2026-06-08

### Initial Release
- Project scaffolding, Express server, single-file HTML app
- DI-SESS-81757A content integration
- Tennex/Bedrock Claude API integration
