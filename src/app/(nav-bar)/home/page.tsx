import { getBalances } from "@/actions/balances-action";
import { getCurrentUser } from "@/actions/user-action";
import { BalanceCard } from "@/components/balance-card";
import { Button } from "@/components/ui/button";
import { supabaseServerClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "ホーム",
};

export default async function Home() {
	const supabase = await supabaseServerClient();

	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const balances = await getBalances(user.id);

	return (
		<div className="flex flex-col gap-4 items-center py-12">
			<BalanceCard
				title="残高"
				amount={balances.available_balance ?? 0}
				footerContent={
					<Button variant="outline" className="w-full">
						引き出す
					</Button>
				}
			/>
			<BalanceCard
				title="未確定残高"
				description="キャンセルや返金などで未確定の残高です。約２週間後に確定します。"
				amount={balances.pending_balance ?? 0}
			/>
		</div>
	);
}
