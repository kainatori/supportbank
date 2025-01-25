"use server";

import { checkoutSessionSchema } from "@/lib/schemas/create-checkout-session-schema";
import { stripeClient } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { getProfile } from "./profiles-action";
import { createSupport } from "./supports-action";
import { getCurrentUser } from "./user-action";
import {
	getCurrentUserFinancials,
	getUserFinancials,
	setStripeCustomerId,
} from "./user-financials-action";

interface CreateCheckoutParams {
	amount: number;
	recipientId: string;
}

export async function createCheckoutSession({
	amount,
	recipientId,
}: CreateCheckoutParams): Promise<void> {
	let redirectTo = "";

	try {
		const user = await getCurrentUser();
		if (!user) throw new Error("Authentication required");

		const validationResult = checkoutSessionSchema.safeParse({
			amount,
			recipientId,
		});

		if (!validationResult.success) {
			throw new Error("Invalid input");
		}

		const [recipientProfile, userFinancials] = await Promise.all([
			getProfile(recipientId),
			getCurrentUserFinancials(),
		]);

		if (!recipientProfile) throw new Error("Recipient not found");
		if (!userFinancials) throw new Error("User financial data not found");

		let stripeCustomerId = userFinancials.stripe_customer_id;

		if (!stripeCustomerId) {
			const userProfile = await getProfile(user.id);
			const customer = await stripeClient.customers.create({
				name: userProfile?.name ?? undefined,
				email: user.email,
			});

			stripeCustomerId = customer.id;
			await setStripeCustomerId(user.id, stripeCustomerId);
		}

		if (amount < 300) {
			throw new Error("Minimum amount is 300 JPY");
		}

		const stripeSession = await stripeClient.checkout.sessions.create({
			customer: stripeCustomerId,
			success_url: "http://localhost:3000/thankyou",
			currency: "jpy",
			line_items: [
				{
					price_data: {
						currency: "jpy",
						product_data: {
							name: `${recipientProfile.name}へのサポート`,
							images: [recipientProfile.avatar_url ?? ""],
						},
						unit_amount: amount,
					},
					quantity: 1,
				},
			],
			mode: "payment",
			payment_method_types: ["card"],
			payment_method_options: {
				card: {
					setup_future_usage: "on_session",
				},
			},
			saved_payment_method_options: {
				allow_redisplay_filters: ["always"],
				payment_method_save: "enabled",
			},
		});

		if (!stripeSession.url) {
			throw new Error("Failed to create payment session");
		}

		if (!recipientId) {
			throw new Error("Recipient ID is required");
		}

		await createSupport({
			supporterId: user.id,
			recipientId: recipientId,
			amount: amount,
			stripeCheckoutSessionId: stripeSession.id,
		});

		redirectTo = stripeSession.url;
	} catch (error) {
		console.error("[Stripe Action Error]:", error);
		throw new Error("Unknown error occurred");
	}

	redirect(redirectTo);
}
