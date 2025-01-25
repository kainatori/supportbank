import { getBalances } from "@/actions/balances-action";
import { BalanceCard } from "@/components/balance-card";
import { Button } from "@/components/ui/button";
import { supabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface BalanceData {
	pending_balance: number;
	balance: number;
}

export default async function Home() {
	const supabase = await supabaseServerClient();

	const { data, error } = await supabase.auth.getUser();

	if (error || !data.user) {
		redirect("/login");
	}

	const balanceData = await getBalances();

	return (
		<div className="flex flex-col gap-4 items-center py-12">
			<BalanceCard
				title="残高"
				amount={balanceData.balance ?? 0}
				footerContent={
					<Button variant="outline" className="w-full">
						引き出す
					</Button>
				}
			/>
			<BalanceCard
				title="未確定残高"
				description="キャンセルや返金などで未確定の残高です。約２週間後に確定します。"
				amount={balanceData.pending_balance ?? 0}
			/>
		</div>
	);
}
