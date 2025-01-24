import { supabaseServerClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export async function getCurrentUser(): Promise<User | null> {
	const supabase = await supabaseServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user;
}
