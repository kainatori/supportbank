create table
  user_financials (
    id uuid references auth.users on delete cascade not null primary key,
    stripe_customer_id text unique,
    pending_balance bigint not null default 0,
    available_balance bigint not null default 0
  );

alter table user_financials enable row level security;

create policy "Enable users to view their own data balance only" on user_financials for
select
  using (auth.uid () = id);

revoke all on user_financials
from
  public, authenticated;

grant
select
  (id, pending_balance, available_balance) on user_financials to authenticated;

create
or replace function public.handle_new_user () returns trigger
set
  search_path = '' as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');

  insert into public.user_financials (id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;
