import { supabaseAdminClient } from "@/lib/supabase/admin";
import { supabaseServerClient } from "@/lib/supabase/server";
import type { Tables } from "../../supabase/types";
import { getCurrentUser } from "./user-action";

export async function getCurrentUserFinancials(): Promise<Tables<"user_financials"> | null> {
	const supabase = await supabaseAdminClient();
	const user = await getCurrentUser();
	if (!user) return null;

	const { data, error } = await supabase
		.from("user_financials")
		.select()
		.eq("id", user.id)
		.single();

	if (error) {
		return null;
	}

	return data;
}

export async function getUserFinancials(
	userId: string,
): Promise<Tables<"user_financials"> | null> {
	const supabase = await supabaseServerClient();

	const { data, error } = await supabase
		.from("user_financials")
		.select()
		.eq("id", userId)
		.single();

	if (error) {
		return null;
	}

	return data;
}

// Updates Stripe customer ID with admin privileges
export async function setStripeCustomerId(
	userId: string,
	stripeCustomerId: string,
): Promise<void> {
	const supabase = await supabaseAdminClient();

	const { error } = await supabase
		.from("user_financials")
		.update({ stripe_customer_id: stripeCustomerId })
		.eq("id", userId);

	if (error) {
		console.error("[Stripe Customer ID Update Error]:", error);
		throw new Error("Failed to update stripe customer id");
	}
}

// Supabase admin privileges
async function addPendingBalance(
	userId: string,
	amount: number,
): Promise<void> {
	const supabase = await supabaseAdminClient();

	const { error } = await supabase.rpc("add_pending_balance", {
		user_id: userId,
		increment_amount: amount * 0.85,
	});

	if (error) {
		console.error("[Pending Balance Update Error]:", error);
		throw new Error("Failed to update pending balance");
	}
}

export async function addPendingBalanceByStripeCheckoutSessionId(
	stripeCheckoutSessionId: string,
): Promise<void> {
	const supabase = await supabaseAdminClient();

	const { data, error } = await supabase
		.from("supports")
		.select()
		.eq("stripe_checkout_session_id", stripeCheckoutSessionId)
		.single();

	if (error) {
		console.error("[Stripe Checkout Session ID Error]:", error);
		throw new Error("Failed to get stripe payment id");
	}

	await addPendingBalance(data.supporter_id, data.amount);
}
