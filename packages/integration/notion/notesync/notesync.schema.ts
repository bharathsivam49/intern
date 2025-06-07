// packages/integrations/notion/notesync/notesync.schema.ts

import { z } from 'zod';

// Validate inputs like maxResults and query
export const listNotesSchema = z.object({
  maxResults: z.number().min(1).max(100).optional(),
  query: z.string().optional(),
});

// TypeScript type for easy reuse
export type ListNotesInput = z.infer<typeof listNotesSchema>;
