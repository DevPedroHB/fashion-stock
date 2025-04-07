import { z } from "zod";

export const upsertUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

export type UpsertUserSchema = z.infer<typeof upsertUserSchema>;
