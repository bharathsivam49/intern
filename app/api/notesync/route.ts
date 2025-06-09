// app/api/notesync/list-notes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { listNotes } from '@/packages/integration/notion/notesync/notesync.function';
import { listNotesSchema } from '@/packages/integration/notion/notesync/notesync.schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const input = {
    maxResults: Number(searchParams.get('maxResults') || 10),
    query: searchParams.get('query') || '',
  };

  const parsed = listNotesSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const notes = await listNotes();
  return NextResponse.json(notes.slice(0, parsed.data.maxResults || 10));
}
