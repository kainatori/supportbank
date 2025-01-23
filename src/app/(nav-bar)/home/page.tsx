import { supabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
	const supabase = await supabaseServerClient();

	const { data, error } = await supabase.auth.getUser();

	if (error || !data.user) {
		redirect("/login");
	}

	return (
		<>
			<div>Home</div>
		</>
	);
}
