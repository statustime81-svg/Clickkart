# Clickkart Digital redesign

React + JavaScript + Tailwind CSS website with Three.js / React Three Fiber, GSAP ScrollTrigger, Motion and Lenis. The routing/build shell uses the supplied Vinext (Next-compatible React) starter; business pages and components are JavaScript/JSX. This is a separate redesign preview and does not modify clickkartdigital.com.

## Run locally

Use Node 22.13+ and pnpm. Run `pnpm install`, copy `.env.example` to `.env`, then run `pnpm dev`. Run `pnpm build` for a production build. The supplied build targets Cloudflare Workers through Vinext. Do not upload source files directly to PHP/cPanel hosting as a static site.

## Editable structure

- `components/pages/`: HomePage, AboutPage, SolutionsPage, WebDesignPage, DigitalMarketingPage, ContactPage, BlogPage, ArticlePage, GalleryPage and AdminPage.
- `components/site/`: shared Layout, Motion, Scene, Sections and EnquiryForm.
- `app/`: small route files and metadata; `globals.css` contains shared theme and responsive styles.
- `lib/site/data.js`: contact details, navigation, services, FAQ and initial testimonials.
- `lib/site/posts.json`, `articles.js`, `source-pages.json`: imported existing website content.
- `lib/site/supabase.js`: public Supabase client and image upload validation.
- `supabase/schema.sql`: database, RLS, validated enquiry RPC and storage policies.
- `supabase/seed.sql`: optional existing website testimonials.

## Connect Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` once using its SQL editor. It targets a NEW project/schema. Policies and tables are intentionally not a destructive reset script.
3. Optionally run `supabase/seed.sql` to populate the existing website testimonials. Without the seed, the connected testimonials table starts empty.
4. In Authentication > Users, create/invite your admin account and set its password. Copy the user's UUID.
5. Run `insert into public.admins(user_id) values ('YOUR_AUTH_USER_UUID');` in the SQL editor. Disable public sign-ups in Supabase Auth settings. Creating an ordinary Auth user does NOT grant admin rights.
6. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`. Use the public anon/publishable key, NEVER service_role. These public values are embedded at build time. Restart development or rebuild/redeploy after changing them. For hosted builds, provide these values in the build environment.
7. Open `/admin`, sign in, and verify an enquiry submission, status/note update, hero upload, gallery upload/delete, testimonial add/edit/delete, and logout/login before launching to clients.

Keys alone are not enough: the SQL schema and admin membership are required. No keys have been supplied, so live Supabase operations have not been end-to-end tested. Without configuration the enquiry form clearly offers WhatsApp, call and email instead of pretending to save, and admin displays a setup state.

## Admin features

- Enquiries: latest 1,000 entries, search, status filter, details, internal follow-up notes, CSV export, refresh.
- Hero: upload JPG/PNG/WebP up to 5 MB; add accessible description; restore the default studio photo inside the animated scroll frame.
- Gallery: upload with title/caption, preview on gallery page, delete with confirmation.
- Testimonials: create, edit, delete, publish or keep as draft.
- Supabase Auth sessions persist on refresh. RLS enforces admin membership for all admin operations. Public visitors cannot read enquiries or internal notes.

## Animation and accessibility

Desktop: scroll-perspective hero, Comet tilt cards, page-flip book, orbit/tunnel gallery, GSAP reveals, Lenis and a custom cursor. Mobile uses lighter motion and a standard gallery grid. Reduced-motion preferences suppress ornamental animation; native keyboard focus stays visible.

## Content and migration notes

Existing site content was retrieved on 9 October 2026. Core navigation is preserved; 25 additional service/legal/career/pricing pages and all returned published blog articles are included. Original blog URLs redirect to the new blog detail routes. Existing unused empty commerce/theme-demo pages were not recreated. Existing privacy-policy contained a different business domain and WordPress suggested text, so it was not carried into the public footer. Review `docs/content-source-inventory.md` before launch.

The gallery shows clearly labelled stock inspiration until you upload actual work. Existing testimonials are preserved as website-supplied statements, not independently verified. Confirm legacy pricing, testimonials and campaign claims before public launch. The redesigned homepage does not carry the old contradictory client-count claims.

## Before replacing the current site

Verify the Supabase checklist above; confirm content and pricing; configure the production domain/redirects; add an appropriate privacy policy; and check mobile/WebGL rendering on your target devices. The RPC validates fields and throttles repeat submissions by email for 60 seconds; for high-volume public traffic add server-validated CAPTCHA and edge/IP rate limits.

This project does not send WhatsApp messages automatically. WhatsApp links open a conversation. Form submissions go to the database and appear in admin after Supabase setup.

## Version 2 redesign

The homepage now uses the supplied ContainerScroll frame, image-led Comet service cards, animated testimonial columns and an interactive Clickkart playbook. The gallery has the supplied Orbit and Tunnel experiences on desktop. The original brand mark is vector-traced for the supplied SVGDraw route/loading animation. Mobile and reduced-motion users get a static brochure and regular gallery grid; desktop gallery motion has a pause button. Stock inspiration images are explicitly labelled and replaced by uploaded gallery content. They are not claimed as client projects.

All reusable motion components are under `components/ui/`, matching the shadcn alias (`@/components/ui`). This keeps copied components separate from page-specific content. The project already has Tailwind, TypeScript and shadcn configuration; no new CLI bootstrap is required. Business pages remain JSX; the supplied typed components use TSX. Framer editor controls were removed from the owner-supplied modules; the interaction implementations remain local React modules. See `docs/component-sources.md`.

### Blog setup

- New Supabase projects: `schema.sql` now includes `blog_posts`. Then optionally run `blog-seed.sql` to import the 31 original articles, alongside `seed.sql` for testimonials.
- Existing v1 projects: run only `supabase/blog.sql` to add the new blog table/policies, then optionally run `blog-seed.sql`. Do not rerun the entire base schema.
- In `/admin` → Blog, create/edit an article, upload its cover, format content, preview it, save a draft, publish, or delete with confirmation.
- Once Supabase is configured, public blog lists and article routes read only the database. Drafts and deleted articles never fall back to the bundled static copies. An empty database therefore shows an empty journal until seeded or edited.
- Article HTML is sanitized before saving and again before public rendering. RLS allows only admins to write and visitors to read published articles.
- Test publishing a draft, changing its slug, replacing its cover and deleting an article after connecting your project. Supabase end-to-end checks remain pending until real keys/schema/admin membership are configured.

The v2 production build and TypeScript checks are performed locally. Browser-based visual/device verification was unavailable in this environment, so confirm appearance and WebGL interactions on desktop and mobile before replacing the original domain.

## Version 3: immersive reference direction

The new visual direction takes inspiration from the Noomo Labs reference: oversized condensed typography, glass-like materials, a continuous scroll scene and a spatial contact page. The artwork and agency copy are original to this implementation; no Noomo 3D models, site code, logo or case-study claims were copied.

- `components/experience/World.jsx`: the three-chapter homepage stage and colour/pause controls.
- `components/experience/SignalScene.jsx`: original Three.js / React Three Fiber glass sculpture, reflective light environment, floating fragments, pointer response and scroll positions.
- `components/experience/Expertise.jsx`: accessible expandable service panels with animated typographic artwork.
- `components/experience/ProjectInvitation.jsx`: 3D contact invitation.
- `app/experience.css`: the lavender/magenta visual system and responsive overrides. The existing `globals.css` remains the base for shared components.
- `components/site/EnquiryForm.jsx`: redesigned project enquiry with service chips, numbered field groups and native validation. It retains the same Supabase RPC and contact-consent requirement.

Admin hero uploads now appear as a subtle background in the opening 3D scene and as the full image in the scroll showcase. Admin, blog, gallery, testimonials and enquiry storage are preserved. No database migration is needed for this visual update.

Performance: one primary 3D stage, lazy-loaded scenes, reduced mobile geometry and pixel ratio, offscreen render pausing, no external HDRI downloads, no post-processing pipeline. Reduced-motion users get a static sculpture and no looping text or scroll transforms. Continuous animation can be paused in the hero controls. There is no blocking entry screen or autoplay audio.

Verification: production build and TypeScript checks. Browser visual verification and real-key Supabase end-to-end testing remain pending. The supplied Noomo live reference remained at its loading screen in the available browser; its official design case study was used to understand the glass, typography and scrolling approach.

## Version 4: imagery, playbook and first paint

Service, blog, testimonial and value cards now use compressed local WebP photography. `lib/site/media.js` maps subjects to images; uploaded blog covers take priority. The original book module remains available, while `components/experience/Playbook.jsx` renders a ten-page agency guide with a Clickkart cover, page controls and an accessible full reader. Edit its content in `lib/site/playbook.js`.

The hero immediately displays a lightweight SVG while its 3D module loads. Geometry, environment resolution and pixel ratio are reduced; the second scene mounts near the viewport. Pointer movement affects lighting and sculpture orientation, and a background click pulses the petals. Browsers without WebGL2 retain the SVG without attempting a failing renderer. These are implementation optimisations, not a measured loading-speed guarantee.

Admin provisioning and deployment steps: see `ADMIN-SETUP.md`. No live Supabase admin account or password is bundled. Run `pnpm setup:admin` locally after configuring the database to create an admin with a generated password. Never put the service-role key in a VITE variable.

Browser QA verified homepage rendering, book pagination and the complete ten-page reader. The cloud browser has no WebGL context, so live GPU motion still needs verification on a WebGL-capable device. Real Supabase CRUD verification requires your project configuration.
