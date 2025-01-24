import { setStatusSucceeded } from "@/actions/supports-action";
import { addPendingBalanceByStripeCheckoutSessionId } from "@/actions/user-financials-action";
import { stripeClient } from "@/lib/stripe";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!webhookSecret) {
		throw new Error("Webhook secret not found");
	}

	const payload = await request.text();
	const signature = request.headers.get("stripe-signature") as string;

	let event: Stripe.Event;

	try {
		event = stripeClient.webhooks.constructEvent(
			payload,
			signature,
			webhookSecret,
		);
	} catch (err) {
		console.error("Webhook signature verification failed.", err);
		return NextResponse.json(
			{ error: "Webhook signature verification failed." },
			{ status: 400 },
		);
	}

	switch (event.type) {
		case "checkout.session.completed": {
			await handleCheckoutSessionCompleted(event.data.object);
			break;
		}
	}

	return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(
	checkoutSession: Stripe.Checkout.Session,
): Promise<void> {
	const checkoutSessionId = checkoutSession.id;

	await Promise.all([
		setStatusSucceeded(checkoutSessionId),
		addPendingBalanceByStripeCheckoutSessionId(checkoutSessionId),
	]);
}
