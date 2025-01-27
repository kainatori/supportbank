import Link from "next/link";

export function Footer() {
	return (
		<footer className="bg-gray-100 py-6">
			<div className="container mx-auto text-center space-x-4">
				<Link href="/privacy-policy" className="text-blue-500 hover:underline">
					プライバシーポリシー
				</Link>
				<Link href="/terms" className="text-blue-500 hover:underline">
					利用規約
				</Link>
			</div>
		</footer>
	);
}
