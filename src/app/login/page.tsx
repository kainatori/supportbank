import { getCurrentUser } from "@/actions/user-action";
import { LoginForm } from "@/components/login-form";
import { PiggyBank } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "ログイン",
	description:
		"SupportBankに新規登録/ログインして、お気に入りのクリエーターをサポートしよう！",
};

export default async function LoginPage() {
	const user = await getCurrentUser();

	if (user) {
		redirect("/home");
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="/" className="flex items-center gap-2 self-center font-medium">
					<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<PiggyBank className="size-4" />
					</div>
					SupportBank
				</a>
				<LoginForm />
			</div>
		</div>
	);
}
