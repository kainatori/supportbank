import Link from "next/link";

export function Footer() {
	return (
		<footer className="bg-gray-100 py-6 px-4">
			<div className="container mx-auto text-center space-x-4">
				<Link href="/privacy-policy" className="text-blue-500 hover:underline">
					プライバシーポリシー
				</Link>
				<Link href="/terms" className="text-blue-500 hover:underline">
					利用規約
				</Link>
				<Link href="/trade-law" className="text-blue-500 hover:underline">
					特定商取引法に基づく表示
				</Link>
			</div>
		</footer>
	);
}
