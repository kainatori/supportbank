import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

interface BalanceCardProps {
	title: string;
	description?: string;
	amount: number;
	footerContent?: React.ReactNode;
}

export function BalanceCard({
	title,
	amount,
	description,
	footerContent,
}: BalanceCardProps) {
	return (
		<Card className="w-64">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>

			<CardContent className="flex justify-center items-baseline gap-x-2">
				<div className="flex items-baseline">
					<span className="text-6xl text-black">
						{Intl.NumberFormat("en-US", {
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						}).format(amount)}
					</span>
					<span className="text-3xl ml-2">円</span>
				</div>
			</CardContent>
			{footerContent && <CardFooter>{footerContent}</CardFooter>}
		</Card>
	);
}
