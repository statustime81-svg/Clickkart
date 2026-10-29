-- Run once in a new Supabase project's SQL editor.
-- Never expose your service_role key to the browser.
create extension if not exists pgcrypto;
create table if not exists public.admins(user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admins enable row level security;
create policy "Admins can see their own membership" on public.admins for select to authenticated using(user_id=auth.uid());
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.admins where user_id=auth.uid()); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;
create table public.enquiries(id uuid primary key default gen_random_uuid(),name text not null check(length(name) between 1 and 120),email text not null check(length(email)<=254),phone text not null check(length(phone) between 7 and 20),business text not null default '',service text not null,source text not null default '',message text not null check(length(message) between 1 and 4000),status text not null default 'New' check(status in('New','Contacted','Qualified','Won','Lost')),notes text not null default '' check(length(notes)<=5000),created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create index enquiries_created_idx on public.enquiries(created_at desc);
create index enquiries_email_created_idx on public.enquiries(email,created_at desc);
alter table public.enquiries enable row level security;
create policy "Admin enquiry read" on public.enquiries for select to authenticated using(public.is_admin());
create policy "Admin enquiry updates" on public.enquiries for update to authenticated using(public.is_admin()) with check(public.is_admin());
-- Public intake is restricted to this validated RPC. Visitors cannot select,
-- update, delete, set statuses, or inject internal notes into enquiries.
create or replace function public.submit_enquiry(p_name text,p_email text,p_phone text,p_business text,p_service text,p_source text,p_message text) returns uuid language plpgsql security definer set search_path=public as $$
declare new_id uuid; normalized_email text:=lower(trim(p_email));
begin
 if p_name is null or length(trim(p_name)) not between 1 and 120 or p_email is null or length(p_email)>254 or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or p_phone is null or p_phone !~ '^[+0-9 ()-]{7,20}$' or p_service is null or length(p_service) not between 1 and 120 or p_message is null or length(trim(p_message)) not between 1 and 4000 or length(coalesce(p_business,''))>180 or length(coalesce(p_source,''))>120 then raise exception 'Please check the enquiry details.';end if;
 perform pg_advisory_xact_lock(hashtextextended(normalized_email,0));
 if exists(select 1 from public.enquiries where email=normalized_email and created_at>now()-interval '60 seconds') then raise exception 'Please wait a minute before sending another enquiry.';end if;
 insert into public.enquiries(name,email,phone,business,service,source,message) values(trim(p_name),normalized_email,trim(p_phone),trim(coalesce(p_business,'')),p_service,coalesce(p_source,''),trim(p_message)) returning id into new_id;
 return new_id;
end; $$;
revoke all on function public.submit_enquiry(text,text,text,text,text,text,text) from public;
grant execute on function public.submit_enquiry(text,text,text,text,text,text,text) to anon,authenticated;
create table public.site_settings(key text primary key,value jsonb not null);
alter table public.site_settings enable row level security;
create policy "Read public hero settings" on public.site_settings for select to anon,authenticated using(key='hero_image');
create policy "Admin settings management" on public.site_settings for all to authenticated using(public.is_admin()) with check(public.is_admin());
create table public.gallery(id uuid primary key default gen_random_uuid(),title text not null check(length(title) between 1 and 200),caption text not null default '' check(length(caption)<=500),url text not null,path text not null,created_at timestamptz not null default now());
alter table public.gallery enable row level security;
create policy "Public gallery" on public.gallery for select to anon,authenticated using(true);
create policy "Admin gallery management" on public.gallery for all to authenticated using(public.is_admin()) with check(public.is_admin());
create table public.testimonials(id uuid primary key default gen_random_uuid(),name text not null check(length(name) between 1 and 120),role text not null default '' check(length(role)<=180),quote text not null check(length(quote) between 1 and 2000),published boolean not null default true,created_at timestamptz not null default now());
alter table public.testimonials enable row level security;
create policy "Read published testimonials" on public.testimonials for select to anon,authenticated using(published=true);
create policy "Admin testimonial management" on public.testimonials for all to authenticated using(public.is_admin()) with check(public.is_admin());
grant select on public.site_settings,public.gallery,public.testimonials to anon,authenticated;
grant select on public.admins to authenticated;
grant select,update on public.enquiries to authenticated;
grant insert,update,delete on public.site_settings,public.gallery,public.testimonials to authenticated;
revoke all on public.enquiries from anon;
revoke insert,delete on public.enquiries from authenticated;
revoke insert,update,delete on public.admins from anon,authenticated;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('site-images','site-images',true,5242880,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
create policy "Admin image upload" on storage.objects for insert to authenticated with check(bucket_id='site-images' and public.is_admin());
create policy "Admin image update" on storage.objects for update to authenticated using(bucket_id='site-images' and public.is_admin()) with check(bucket_id='site-images' and public.is_admin());
create policy "Admin image delete" on storage.objects for delete to authenticated using(bucket_id='site-images' and public.is_admin());
create policy "Admin image listing" on storage.objects for select to authenticated using(bucket_id='site-images' and public.is_admin());
-- After creating your user in Authentication > Users, run:
-- insert into public.admins(user_id) values ('YOUR_AUTH_USER_UUID');
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
