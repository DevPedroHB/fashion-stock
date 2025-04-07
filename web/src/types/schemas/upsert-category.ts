import { z } from "zod";

export const upsertCategorySchema = z.object({
	name: z.string(),
	description: z.string().optional(),
});

export type UpsertCategorySchema = z.infer<typeof upsertCategorySchema>;
