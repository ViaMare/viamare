# Via Mare — Project Status

Last reconstructed: 2026-09-26
Repository: ViaMare/viamare
Branch: main

## Purpose
This file is the durable source of truth for the Via Mare website project. Update it after every significant change so work can resume correctly even when chat context is incomplete.

## Current architecture
- GitHub repository is the canonical source for the Via Mare website code and revision history.
- Supabase remains the data/backend layer used by the site.
- WordPress is part of the current project architecture/workflow, but the exact current 6.x theme/package number must be recovered from the latest project artifacts/history before recording it as fact.
- InfinityFree is no longer part of the current project architecture.

## Current known website state
The GitHub history confirms work beyond the older WordPress 5.x context. Recent confirmed changes include:
- Removed "Online placanje" from navigation.
- Added selected accommodation to the booking summary.
- Synchronized selected accommodation with the booking summary.
- Compacted the booking form and reservation summary.
- Refreshed booking form assets.
- Adjusted/lowered the booking summary panel and refreshed its styling.
- Gallery filter labels were enlarged/refreshed.

Latest confirmed commit at reconstruction time:
- 1d8a3fb7b27c71a2b8f54136e6806b56a38dc05a — "Refresh lowered booking summary style" — 2026-09-24 15:29:02 UTC.

## WordPress version/theme status
IMPORTANT: Older chat context stops around theme 5.8 and is stale.
The user confirms that later work reached a working 6.x WordPress theme/version during a long session ending around midnight.
Do not treat 5.8 as the current theme.
Exact 6.x version is currently UNKNOWN and must not be guessed. Recover it from actual WordPress/GitHub/project artifacts when available, then update this section.

## Working rules
1. Read this file and recent GitHub commits before making substantial Via Mare changes.
2. GitHub/current deployed state outranks stale chat summaries.
3. After every significant project change, update this file in the same work session.
4. Record exact version numbers, commit SHAs, architecture changes, completed fixes, unresolved issues, and next steps.
5. Never store passwords, private keys, service-role keys, tokens, bank data, or other secrets here.
6. Do not reintroduce InfinityFree unless the user explicitly decides to do so.

## Known project requirements
- Bilingual site: MNE/SRB and English.
- MNE/SRB and EN must be complete versions, not mixed-language string-replacement output.
- Supabase-backed accommodation data/photos.
- Booking/reservation flow must not falsely report a successful payment when no payment gateway is active.
- Existing public site/code should not be destructively changed without explicit user intent.
- Long-term booking/channel-manager/payment integrations can be added independently of the presentation layer.

## Next recovery task
Recover the exact latest 6.x WordPress theme/version and the remaining changes from the missing late-session history or current project artifacts, then replace this section with the verified state.

## Change log
- 2026-09-26: Created durable project-status file after chat-context synchronization failure. Reconstructed current facts from GitHub and user-confirmed architecture.
