import { supabaseServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "./user-action";

export async function getBalances() {
	const supabase = await supabaseServerClient();
	const user = await getCurrentUser();

	if (!user) {
		throw new Error("User not found");
	}

	const { data, error } = await supabase
		.from("user_financials")
		.select("pending_balance, balance")
		.eq("id", user.id)
		.single();

	if (error) {
		console.error("Balances error:", error);
		throw new Error("Failed to get balance data");
	}

	return data;
}
