# Layout refinement design and implementation plan

Goal: Apply the approved visual review while preserving the home hero height, media and framing.
Architecture: Narrow changes to shared CSS and the independent Korean/English Liquid templates. Preserve content, publication ordering and interaction hooks.
Tech stack: Jekyll, Liquid, CSS.

1. Make the shared header opaque; apply Korean word-boundary wrapping to body content below the hero.
2. Reduce home research/news spacing from 192px to 88px (64px on small screens); keep all six quick links in a compact two-column grid. Translate the Korean Contact CTA.
3. Remove journal boxes, reduce publication padding and group featured years with tags in both languages.
4. Use a full-width horizontal gallery card only for a single item; keep multiple-item grids and mobile stacking.
5. Align member email/actions within each row and reduce keyword badge padding in both languages.
6. Build Jekyll into /tmp; verify desktop/mobile Korean and English rendering, no horizontal overflow, unchanged hero height, and existing modal/filter interactions.

Approval: User requested implementation of the reviewed changes, explicitly excluding hero height reduction. No additional design approval needed.

Verification: Jekyll build and scoped git diff --check passed. Hero CSS unchanged byte for byte; desktop hero measured 699px in a 771px viewport (72px header). Korean/English home, about, members, publications and gallery had no horizontal overflow at 390px. Korean/English member email positions match within each desktop row. Publication featured filter, member detail modal and gallery modal open/close verified in browser. Changes remain local; no push/deployment performed.

## Follow-up spacing refinement
User excluded widening single-person groups: preserve their two-column grid and card widths. Reduce contact top padding to 48px and remove the extra 40px shell margin; align map and shell at 900px. Move news metadata above titles and clamp summary previews to two lines, preserving full article content. Hide control-free action rows only on lone member cards. Validate contact/news/member views in both languages and at desktop/mobile widths.
