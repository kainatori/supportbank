import { supabaseServerClient } from "@/lib/supabase/server";
import type { Tables } from "../../supabase/types";

export async function getProfile(
	userId: string,
): Promise<Tables<"profiles"> | null> {
	const supabase = await supabaseServerClient();

	const { data, error } = await supabase
		.from("profiles")
		.select()
		.eq("id", userId)
		.single();

	if (error) {
		return null;
	}

	return data;
}
