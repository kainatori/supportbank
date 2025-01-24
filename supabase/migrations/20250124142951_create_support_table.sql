create type payment_status as enum('pending', 'succeeded', 'failed');

create table
  supports (
    id uuid not null default gen_random_uuid() primary key,
    supporter_id uuid references auth.users not null,
    recipient_id uuid references auth.users not null,
    amount bigint not null default 0,
    message text,
    is_anonymous boolean not null default false,
    is_message_private boolean not null default false,
    stripe_checkout_session_id text unique,
    status payment_status not null default 'pending',
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
  );

alter table supports enable row level security;

create extension if not exists moddatetime schema extensions;

create trigger handle_update_at before
update on supports for each row
execute procedure moddatetime (updated_at);
