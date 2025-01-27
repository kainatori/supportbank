import { ThankYouContent } from "@/components/thank-you-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Thank you!",
};

export default function ThankYouPage() {
	return <ThankYouContent />;
}
