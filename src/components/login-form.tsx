import { LoginWithGoogleButton } from "@/components/login-with-google-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">ようこそ！</CardTitle>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid gap-6">
							<div className="flex flex-col gap-4">
								<LoginWithGoogleButton />
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				新規登録またはログインをすることで、 <Link href="/terms">利用規約</Link>{" "}
				および <Link href="/privacy-policy">プライバシーポリシー</Link>
				に同意したとみなします.
			</div>
		</div>
	);
}
