"use client";

import { signOut } from "@/actions/auth-action";
import { Button } from "./ui/button";

export function SignOutButton() {
	const handleButton = async () => {
		await signOut();
	};

	return <Button onClick={handleButton}>Sign Out</Button>;
}
