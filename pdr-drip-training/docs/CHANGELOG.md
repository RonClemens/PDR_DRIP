# Changelog

All notable changes to the PDR DRIP Training app are documented here.  
Format: **MAJOR.MINOR.PATCH**

---

## [1.1.0] — 2026-06-08

### Added
- **AI-powered DRIP Advisor** (Module 09) — full-page conversational interface
  - Claude Sonnet (claude-sonnet-4-20250514) powered Q&A
  - System prompt grounded in DI-SESS-81757A, DAG CH 3-3.3.4, CDRL obligations, 10 U.S.C. § 2366b
  - 6 pre-loaded suggested questions
  - Per-session conversation history
  - Markdown-to-HTML response formatting
- **Floating AI popup** — accessible from any module without navigation
  - Shield button (bottom-right) with animated status badge
  - Auto-hides when navigating to full AI page
  - Shared AI system prompt, independent conversation history
- Navigation updated to include DRIP Advisor entry in sidebar
- Progress tracking updated to include Module 09

### Changed
- `sections` array updated from 8 to 9 entries for progress calculation
- FAB button hides automatically on the AI Assistant page

---

## [1.0.0] — 2026-06-08

### Added
- Initial release
- 8 training modules:
  - 01 Overview & Purpose (DRIP definition, review progression timeline)
  - 02 PDR Section Content Requirements (11 mandatory content elements)
  - 03 Allocated Baseline (completeness criteria, traceability matrix)
  - 04 Entry / Exit Criteria (Government gatekeeping responsibilities)
  - 05 Contract Data Requirements (CDRL / DD Form 1423 table)
  - 06 Roles & Responsibilities (PM, Lead SE, CDT, DASD(SE), Contractor)
  - 07 Customer Readiness Checklist (24 interactive checkboxes, 3 sections)
  - 08 Knowledge Assessment (7-question quiz with scored feedback)
- Sticky sidebar navigation with progress dots and completion tracking
- Header progress bar (section visit tracking)
- Responsive two-column card layouts
- Design aesthetic: dark navy/accent blue, Share Tech Mono + Syne + DM Sans
