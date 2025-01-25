create function add_pending_balance(
  user_id uuid,
  increment_amount integer
) returns void as $$
begin
  update user_financials
  set pending_balance = pending_balance + increment_amount
  where id = user_id;
end;
$$ language plpgsql security definer;
