-- Run after creating your own Auth user in Supabase Authentication > Users.
-- Edit the email below to the exact email of the account you created.
-- This grants membership only; it never sets or resets a password.
do $$
declare target_user uuid;
begin
 select id into target_user from auth.users where lower(email)=lower('info@clickkartdigital.com');
 if target_user is null then raise exception 'Create this email in Supabase Authentication > Users first.'; end if;
 insert into public.admins(user_id) values(target_user) on conflict(user_id) do nothing;
end $$;
