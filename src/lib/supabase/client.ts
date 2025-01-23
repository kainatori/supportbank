import { getSupabaseEnv } from "@/lib/supabase/get-supabase-env";
import { createBrowserClient } from "@supabase/ssr";

export function supabaseBrowserClient() {
	const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

	return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
