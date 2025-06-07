'use client';

import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then(setTodos)
      .catch(() => setError('Failed to fetch todos'));
  }, []);

  const addTodo = async () => {
    if (!newTitle.trim()) {
      setError('Please enter a title');
      return;
    }
    setError('');
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || 'Failed to add todo');
        return;
      }
      const createdTodo = await res.json();
      setTodos((prev) => [...prev, createdTodo]);
      setNewTitle('');
    } catch {
      setError('Failed to add todo');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>To-Do List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '(done)' : ''}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New to-do title"
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      <button onClick={addTodo} style={{ padding: '8px 16px' }}>
        Add To-Do
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
