# Via Mare WordPress theme — development

This directory is the canonical WordPress-theme workspace for Via Mare.

Rules:
- Production/static site on main is not modified by work in this branch.
- WordPress theme code must be self-contained; no activation-time download from GitHub.
- Supabase remains the dynamic data/photo backend until PMS/channel-manager integration replaces availability/pricing.
- MNE/SRB and EN must remain complete language versions, not string-replacement fragments.
- Build/deploy artifacts are generated from this source; InfinityFree is only a disposable test target.
