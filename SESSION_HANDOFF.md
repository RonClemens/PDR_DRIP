# Session Handoff - PDR DRIP Training

## Project Location
`C:\Dev\_VSC_Workspace\PDR_DRIP`

## Repository
- **GitHub:** https://github.com/RonClemens/PDR_DRIP
- **Active Branch:** `tfd-agent`
- **Latest Commit:** MK 710 CI data package + entry/exit criteria sections

## Project Purpose
Interactive DoD PDR DRIP customer training webapp for the **MK 710 Torpedo Support Equipment (TSE)** program. Built by SAIC for **PMS-404 / Code 85** Government customer representatives.

## Standard Run Commands
```powershell
# Start server
node server.js
# App runs at http://localhost:3006

# Stop server
Stop-Process -Name node -Force

# Push changes
git add pdr-drip-training/src/index.html
git commit -m "your message"
git push origin tfd-agent
```

## Current State (as of 2026-06-09)

### What Works
- All 11 sections render correctly including new MK 710 sections (09, 10)
- Navigation: all goTo() calls work, no JS errors
- SAIC branding applied (orange/blue palette, SAIC wordmark)
- AI DRIP Advisor functional (requires TENNEX_API_KEY in .env)
- Roles & Responsibilities fully populated with KO role, contractor table
- CI Data Package: all 44 MK 710 CIs displayed with HWCI/CSCI types
- PDR Entry/Exit Criteria: NAVSEA TRM 3.0 + MK 710 program-specific

### Known Issues / Pending Items
- SAIC color palette is functional but not fully polished - future refinement pass planned
- Progress bar percentage text color could be more prominent
- FAB robot icon may not render on all browsers (emoji fallback)
- Source documents in `src/` folder are not committed to git (add to .gitignore or commit separately)

### Next Planned Work
1. **Color polish** - Refine SAIC branding pass for better visual consistency
2. **Additional MK 710 content** - Populate actual CDRL status from PDR_CDRL_Status sheet once data is available
3. **CI detail expansion** - Add individual CI PDR status tracking (submitted / under review / approved)
4. **AI system prompt update** - Add MK 710 program context, PMS-404 specifics, NAVSEA TRM 3.0 criteria to DRIP Advisor knowledge base

## File Structure
```
PDR_DRIP/
??? pdr-drip-training/
?   ??? src/index.html        # MAIN APP - all HTML/CSS/JS in one file (~129KB)
?   ??? docs/CHANGELOG.md
?   ??? README.md
??? src/                      # Reference documents (NOT in git)
?   ??? CI_List.xlsx          # Source for 44-CI register
?   ??? PDR Entry Criteria Analysis.xlsx
?   ??? NAVSEA_Technical_Review_Manual_TRM 3.0.html
?   ??? NAVSEA_Technical_Review_Manual_TRM 3.0_AppC_SE_Docs.pdf
??? server.js                 # Express server - PORT 3006
??? package.json
??? .env                      # NOT in git - contains API keys
??? SESSION_HANDOFF.md        # This file
```

## Environment Notes
- **Python:** `py -3.11` (use explicitly)
- **Shell:** PowerShell - see CODING_RULES.md for file writing rules
- **Node:** Express server on port 3006
- **AI Model:** bedrock-claude-sonnet-4-6 via Tennex API
- **Key env vars:** TENNEX_API_KEY, TENNEX_API_BASE, TENNEX_MODEL, PORT

## Critical Coding Notes
- Target file `pdr-drip-training/src/index.html` is INSIDE workspace - use multi_edit or here-string pipe to Python
- Python scripts cannot be executed from `scratch/` folder (permission denied) - use `Get-Content script.py | py -3.11` pattern or write to root and pipe
- Do NOT wrap run_terminal_command in outer double-quotes (Rule 23)
- Here-string `@'...'@ | py -3.11` is the most reliable pattern for complex scripts
- chr(34)/chr(39) substitution pattern required when building HTML strings in Python
- Always verify section IDs have no trailing spaces after insertion

## Coding Environment
- Python: `py -3.11`
- Shell: PowerShell (CODING_RULES.md at C:\Dev\_VSC_Workspace\Init_Workspace\CODING_RULES.md)
- Background process logs: check with Get-Content *.log
