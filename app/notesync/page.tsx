'use client';

import { useEffect, useState } from 'react';

interface Note {
  id: string;
  title: string;
  createdAt?: string;
  content?: string;
}

export default function NodeSyncPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('/api/notesync?maxResults=10');
        if (!res.ok) {
          const err = await res.json();
          console.error("Server Error:", err);
          setError('Server responded with error');
          return;
        }

        const data = await res.json();
        console.log("✅ Notes fetched:", data);
        setNotes(data);
      } catch (err) {
        console.error("❌ Fetch failed:", err);
        setError('Failed to fetch notes from API');
      }
    };

    fetchNotes();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🧠 Synced Notes</h1>

      {error && <p style={styles.error}>{error}</p>}

      {notes.length === 0 ? (
        <p style={styles.info}>No notes available.</p>
      ) : (
        <ul style={styles.noteList}>
          {notes.map((note) => (
            <li key={note.id} style={styles.noteItem}>
              <h3 style={styles.noteTitle}>{note.title}</h3>
              {note.createdAt && (
                <p style={styles.noteMeta}>🕒 {new Date(note.createdAt).toLocaleString()}</p>
              )}
              {note.content && <p style={styles.noteContent}>{note.content}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 700,
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  info: {
    textAlign: 'center',
    color: '#555',
  },
  noteList: {
    listStyleType: 'none',
    padding: 0,
  },
  noteItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  noteTitle: {
    fontSize: '1.2rem',
    color: '#2563eb',
    marginBottom: 8,
  },
  noteMeta: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: 6,
  },
  noteContent: {
    fontSize: '1rem',
    color: '#333',
  },
};
