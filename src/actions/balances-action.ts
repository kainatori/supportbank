import { supabaseServerClient } from "@/lib/supabase/server";

interface Balances {
	pending_balance: number;
	available_balance: number;
}

export async function getBalances(userId: string): Promise<Balances> {
	const supabase = await supabaseServerClient();

	const { data, error } = await supabase
		.from("user_financials")
		.select("pending_balance, available_balance")
		.eq("id", userId)
		.single();

	if (error) {
		console.error("Balances error:", error);
		throw new Error("Failed to get balance data");
	}

	return data;
}
