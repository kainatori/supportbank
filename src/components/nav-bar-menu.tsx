import type { Tables } from "@/../../supabase/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { NavBarSignOutButton } from "./nav-bar-sign-out-button";

interface NavBarMenuProps {
	profile: Tables<"profiles"> | null;
}

export function NavBarMenu({ profile }: NavBarMenuProps) {
	if (!profile) {
		return (
			<Link
				href="/login"
				className="rounded-full bg-orange-300 px-6 py-3 font-semibold text-white"
			>
				ログイン
			</Link>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className="w-12 h-12">
					<AvatarImage src={profile.avatar_url || "#"} />
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href={`/u/${profile.id}`}>プロフィール</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<NavBarSignOutButton />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
