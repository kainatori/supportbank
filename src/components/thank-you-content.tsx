"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Confetti, type ConfettiRef } from "./ui/confetti";

export function ThankYouContent() {
	const confettiRef = useRef<ConfettiRef>(null);
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("/home");
		}, 3000);
		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
			<span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
				Thank you!
			</span>

			<Confetti
				ref={confettiRef}
				className="absolute left-0 top-0 z-0 size-full"
				onMouseEnter={() => {
					confettiRef.current?.fire({});
				}}
			/>
		</div>
	);
}
