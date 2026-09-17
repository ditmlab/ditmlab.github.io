# Research positioning and language consistency

Approved scope: shared Home/About/PI themes and positioning; shared Home/About/People templates; PI methods as secondary text; student email [at] display; hide publication theme badges while retaining source tags and student/venue badges. Preserve hero height and two-column member grid. Do not classify students or publications.

Implementation: _data/research.json and site_text.json hold shared themes/copy; includes render pages and member cards. PI modal reads theme names as an array, preserves commas and uses language-specific profile fields. Existing student data and publications data are unchanged.

Verification: Jekyll build, JS syntax, rendered structural parity, theme counts, original data preservation, desktop/mobile browser QA and modal interaction.

Verified: Jekyll build, node --check and scoped git diff --check passed. Korean/English Home, About, People and Publications have matching component counts. Original member/publication YAML unchanged from HEAD. Seven [at] emails per language; 29 publication cards (six featured plus 23 in the full list), three full-list student badges, no subject badges. At 390px all eight pages and the PI modal fit without horizontal overflow. PI modal displays exactly three comma-containing themes; English member achievements render correctly. Featured filter verified. Hero CSS byte-identical before home-specific rules; single-member groups remain in the two-column grid. No deployment.
