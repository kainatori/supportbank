import { z } from "zod";

export const checkoutSessionSchema = z.object({
	amount: z.number().min(100).positive().int(),
	recipientId: z.string(),
});
