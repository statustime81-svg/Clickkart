# Your Clickkart administrator login

There is no shared or hardcoded admin password. The website uses your Supabase Auth account and verifies its membership in the `admins` table.

Suggested login email: **info@clickkartdigital.com**. This is a suggestion, not an existing account created by this ZIP.

## 1. Prepare the database

In your Supabase SQL editor, run `supabase/schema.sql` once for a new project. On a previously configured v1 project, run only `supabase/blog.sql`. Optionally run `seed.sql` and `blog-seed.sql` once to import existing testimonials and articles.

## 2. Set the public environment values

Copy `.env.example` to `.env`. Add your own `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Restart local development or rebuild after changing them. Never put a service_role / secret key in a variable beginning with VITE_.

## 3. Create your admin account

Choose either method:

**Terminal:** after `pnpm install`, run `pnpm setup:admin`. It asks for the project URL, your Supabase service_role/secret key (hidden while typing), and the admin email. It creates a new account, grants admin membership and displays its generated password once in your terminal. Save it in a password manager. The script does not reset existing users or put credentials into source files. Run it only on your own computer. The service key is used only for this local provisioning step and is not needed by the deployed website.

**Supabase dashboard:** Authentication → Users → Add user. Enter your admin email and choose your own strong password. Then run `supabase/grant-admin.sql`, replacing the email if needed.

## 4. Sign in

Open `/admin` on your deployed site. Use the email and password you just created. If you see an unauthorised-account message, the user's UUID has not been added to `public.admins`.

Verify one enquiry submission and follow-up update, one hero upload, gallery upload/delete, testimonial edit and blog draft/publish/delete. These live checks require your actual database. The source build has no configured Supabase project, so no live administrator account has been created from this environment.

## Deployment

The source uses the existing Vinext/Cloudflare Worker build. Set the two public Supabase values in your build environment, build, then deploy the generated Worker and assets using the hosting workflow documented in README.md. A static `dist` upload alone is not equivalent to this server build. Keep the project’s build configuration when moving hosts.
