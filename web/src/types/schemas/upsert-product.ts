import { z } from "zod";

export const upsertProductSchema = z.object({
	name: z.string(),
	description: z.string().nullish(),
	price: z.number(),
	inventory: z.number(),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
