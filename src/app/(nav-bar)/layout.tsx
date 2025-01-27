import { Announcement } from "@/components/announcement";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

export default function NavBarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<NavBar />
			<Announcement />
			{children}
			<Footer />
		</>
	);
}
