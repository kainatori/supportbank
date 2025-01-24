import { getProfile } from "@/actions/profiles-action";
import { getCurrentUser } from "@/actions/user-action";
import { PiggyBank } from "lucide-react";
import Link from "next/link";
import { NavBarMenu } from "./nav-bar-menu";

export async function NavBar() {
	const user = await getCurrentUser();

	const profile = user ? await getProfile(user.id) : null;

	return (
		<nav className="flex h-20 items-center justify-between bg-white px-4 sm:h-24 sm:px-12 shadow">
			<Link href="/" className="flex items-center gap-x-2 text-2xl sm:gap-x-4">
				<PiggyBank className="text-orange-600 hidden sm:block" />
				<div className="font-bold">SupportBank</div>
			</Link>
			<NavBarMenu profile={profile} />
		</nav>
	);
}
