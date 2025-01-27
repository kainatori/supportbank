export default function LegalLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="container mx-auto p-4 py-12 flex flex-col items-center justify-center">
			<article className="prose lg:prose-xl">{children}</article>
		</div>
	);
}
