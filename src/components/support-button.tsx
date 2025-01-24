"use client";

import { createCheckoutSession } from "@/actions/stripe-action";
import { redirect } from "next/navigation";
import { useState } from "react";
import { ShimmerButton } from "./ui/shimmer-button";

interface SupportButtonProps {
	isLoggedIn: boolean;
	recipientId: string;
}

export function SupportButton({ isLoggedIn, recipientId }: SupportButtonProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleButton() {
		setIsSubmitting(true);
		if (!isLoggedIn) redirect("/login");

		await createCheckoutSession({
			amount: 300,
			recipientId: recipientId,
		});
	}

	return (
		<ShimmerButton
			className="w-48"
			onClick={handleButton}
			disabled={isSubmitting}
		>
			{!isSubmitting ? (
				<>
					<span className="font-semibold flex gap-x-2 text-lg">¥300</span>
					<span className="pl-1">サポートする</span>
				</>
			) : (
				<>
					<span className="pl-1">送信中...</span>
				</>
			)}
		</ShimmerButton>
	);
}
