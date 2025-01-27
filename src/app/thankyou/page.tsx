import { ThankYouContent } from "@/components/thank-you-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Thank you!",
	description: "Thank you for supporting!",
};

export default function ThankYouPage() {
	return <ThankYouContent />;
}
