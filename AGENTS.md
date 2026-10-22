<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Sitemap
- Derive sitemap URLs from required route `staticData.sitemap` decisions using `src/lib/sitemap.ts`; this keeps public pages in sync without a manual URL list.
- Serve `/sitemap.xml` through its TanStack server route using the published site origin; omit lastmod unless authoritative page-specific content timestamps exist.
- Keep robots.txt as a public deployment asset and preserve its crawler blocks; this avoids introducing a competing generator for static crawler rules.

## Page metadata
- Every content route defines one self-referencing canonical and matching og:url using the published site origin in its leaf head(); never add canonicals to the root layout, which would duplicate them on child pages.

## Booking submissions
- Validate enquiries with a shared Zod schema and save through a purpose-built public server function before opening LINE; this ensures enquiries survive without exposing records to visitors.
- Keep booking_requests service-role-only with RLS and per-submission UUID deduplication; owners review entries in Cloud, not a public listing.
- Add owner emails only after a sending domain is verified, using managed fixed-recipient templates and event-derived idempotency keys; never create email queues or email tables.
