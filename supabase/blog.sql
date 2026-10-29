-- Existing v1 installations: run this migration after schema.sql.
-- New installations already have this table in schema.sql; this file is idempotent.
create table if not exists public.blog_posts (
 id uuid primary key default gen_random_uuid(),
 slug text unique not null check(length(slug) between 1 and 200 and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 title text not null check(length(title) between 1 and 250),
 excerpt text not null default '' check(length(excerpt)<=600),
 category text not null default 'Insights' check(length(category)<=100),
 author text not null default 'Clickkart Digital' check(length(author)<=120),
 content_html text not null check(length(content_html) between 1 and 200000),
 cover_url text not null default '', cover_path text not null default '',
 published boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.blog_posts enable row level security;
drop policy if exists "Public published articles" on public.blog_posts;
create policy "Public published articles" on public.blog_posts for select to anon,authenticated using(published=true);
drop policy if exists "Admin blog management" on public.blog_posts;
create policy "Admin blog management" on public.blog_posts for all to authenticated using(public.is_admin()) with check(public.is_admin());
grant select on public.blog_posts to anon;
grant select,insert,update,delete on public.blog_posts to authenticated;
create index if not exists blog_published_created_idx on public.blog_posts(published,created_at desc);
