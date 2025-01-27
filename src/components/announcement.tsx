import Link from "next/link";

export function Announcement() {
	return (
		<div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white p-4 flex justify-center items-center font-semibold">
			現在ベータ版です
			<Link
				href="mailto:support@support.app"
				className="text-white underline ml-2"
			>
				お問い合わせ
			</Link>
		</div>
	);
}
