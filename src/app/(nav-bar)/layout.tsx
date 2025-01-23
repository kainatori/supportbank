import { NavBar } from "@/components/nav-bar";

export default function NavBarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
}
