import { z } from "zod";

export const PostSinkSchema = z.object({
    name: z.string().min(1).max(255),
    type: z.enum(["todoist"] as const),
    api_token: z.string(),
});

export type AddSinkData = z.infer<typeof PostSinkSchema>;

export const PostPrimarySinkSchema = z.object({
    sink_id: z.string().uuid()
});