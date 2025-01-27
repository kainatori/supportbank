import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../../supabase/types";

export async function supabaseAdminClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseServiceRoleKey = process.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl || !supabaseServiceRoleKey) {
		throw new Error("Supabase URL or Service Role Key is not set");
	}

	return createClient<Database>(supabaseUrl, supabaseServiceRoleKey);
}
