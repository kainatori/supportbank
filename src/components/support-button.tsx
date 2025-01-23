"use client";

import { ShimmerButton } from "./ui/shimmer-button";

interface SupportButtonProps {
	isLoggedIn: boolean;
}

export function SupportButton({ isLoggedIn }: SupportButtonProps) {
	function handleButton() {}

	return (
		<ShimmerButton className="w-48" onClick={handleButton}>
			<span className="font-semibold flex gap-x-2 text-lg">¥300</span>
			<span className="pl-1">サポートする</span>
		</ShimmerButton>
	);
}
