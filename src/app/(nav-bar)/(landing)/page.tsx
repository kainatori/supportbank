import { getCurrentUser } from "@/actions/user-action";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { SparklesText } from "@/components/ui/sparkles-text";
import { ChevronRight } from "lucide-react";

export default async function LandingPage() {
	const user = await getCurrentUser();

	return (
		<div className="flex flex-col items-center justify-center py-12">
			<div className="flex flex-col items-center justify-center gap-1">
				<SparklesText text="Support" />
				<SparklesText text="Bank" />
			</div>
			<div className="z-10 flex min-h-24 items-center justify-center">
				<AnimatedGradientText>
					🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
					<span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
						{user ? "ホームに移動" : "新規登録/ログインする"}
					</span>
					<ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
				</AnimatedGradientText>
			</div>
		</div>
	);
}
