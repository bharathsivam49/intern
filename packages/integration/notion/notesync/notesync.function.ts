// packages/integrations/notion/notesync/notesync.functions.ts

// Simulate a mock API call to Notion-like note service
export async function listNotes() {
  return [
    { id: '1', title: 'First Note', content: 'This is a mock note' },
    { id: '2', title: 'Second Note', content: 'Another mock note' },
    { id: '3', title: 'College', content: 'writing exam' }
  ];
}
