# Development architecture

Source of truth: GitHub branch `wordpress-development`.

## Isolation
The public static site is not edited by WordPress development.

## Theme requirements
1. Bundle HTML/template logic, CSS, JS and theme images locally.
2. Never download theme source from GitHub at WordPress activation/runtime.
3. Supabase is accessed only for intended dynamic public data.
4. No card data is stored by the theme.
5. Booking/payment submission remains disabled until PMS/payment integrations are deliberately enabled.
6. MNE/SRB and English are maintained as complete render paths.
7. Mobile header and gallery page banner are regression-test items before release.

## Hosting
InfinityFree is a disposable test target, not the source of truth.
A production host will be selected only when the application is ready for production.
