"use client";

import { signOut } from "@/actions/auth-action";

export function NavBarSignOutButton() {
	const handleSignOutButton = async () => {
		await signOut();
	};

	return (
		<button
			type="button"
			className="text-red-600 w-full text-start"
			onClick={handleSignOutButton}
		>
			ログアウト
		</button>
	);
}
