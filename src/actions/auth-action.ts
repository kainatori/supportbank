"use server";

import { supabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function loginWithGoogle() {
	const supabase = await supabaseServerClient();

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${siteUrl}/api/auth/callback`,
		},
	});

	if (error) {
		throw new Error("Google login failed");
	}

	if (data.url) {
		redirect(data.url);
	}
}

export async function signOut() {
	const supabase = await supabaseServerClient();

	await supabase.auth.signOut();
}
