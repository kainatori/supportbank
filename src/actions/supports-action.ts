import { supabaseAdminClient } from "@/lib/supabase/admin";

export async function createSupport({
	supporterId,
	recipientId,
	amount,
	stripeCheckoutSessionId,
}: {
	supporterId: string;
	recipientId: string;
	amount: number;
	stripeCheckoutSessionId: string;
}): Promise<void> {
	const supabase = await supabaseAdminClient();

	const { error } = await supabase.from("supports").insert({
		supporter_id: supporterId,
		recipient_id: recipientId,
		amount: amount,
		stripe_checkout_session_id: stripeCheckoutSessionId,
	});

	if (error) {
		console.error("[Create Support Error]:", error);
		throw new Error("Unknown error occurred");
	}
}

export async function setStatusSucceeded(
	stripeCheckoutSessionId: string,
): Promise<void> {
	const supabase = await supabaseAdminClient();

	const { error } = await supabase
		.from("supports")
		.update({ status: "succeeded" })
		.eq("stripe_checkout_session_id", stripeCheckoutSessionId);

	if (error) {
		console.error("[Set Checkout Session ID Error]:", error);
		throw new Error("Failed to set stripe payment id");
	}
}
