import { z } from "zod";

export const PostNoteSchema = z.object({
    description: z.string(),
    sink_id: z.string().uuid().optional(),
});

export type CreateNoteData = z.infer<typeof PostNoteSchema>;