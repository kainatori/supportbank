import type { Tables } from "@/../supabase/types";
import { getProfile } from "@/actions/profiles-action";
import { getCurrentUser } from "@/actions/user-action";
import { SupportButton } from "@/components/support-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProfileProps {
	params: { userId: string };
}

async function getProfileOrFail(userId: string): Promise<Tables<"profiles">> {
	const profile = await getProfile(userId);

	if (!profile) {
		notFound();
	}

	return profile;
}

export async function generateMetadata({
	params,
}: ProfileProps): Promise<Metadata> {
	const userId = (await params).userId;

	const profile = await getProfileOrFail(userId);

	return {
		title: profile.name,
		description: `${profile.name}をサポートしよう！`,
	};
}

export default async function UserPage({ params }: ProfileProps) {
	const userId = (await params).userId;

	const profile = await getProfileOrFail(userId);
	const user = await getCurrentUser();

	const isLoggedIn = !!user;

	return (
		<div className="flex justify-center flex-col">
			<div className="flex flex-col pt-12 justify-center items-center">
				<Avatar className="h-20 w-20">
					<AvatarImage src={profile.avatar_url ?? ""} />
				</Avatar>

				<div className="text-xl font-semibold pt-4">{profile.name}</div>
			</div>

			<div className="flex flex-col pt-8 justify-center items-center">
				<SupportButton isLoggedIn={isLoggedIn} recipientId={userId} />
			</div>
		</div>
	);
}
