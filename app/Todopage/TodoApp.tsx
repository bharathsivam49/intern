'use client';

import { useEffect, useState } from 'react';
import styles from './TodoApp.module.css';

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
        headers: { 'Content-Type': 'application/json' },
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
    <div className={styles.container}>
      <h2 className={styles.heading}>📝 My To-Do List</h2>

      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Enter a new task"
        className={styles.input}
      />
      <button onClick={addTodo} className={styles.button}>
        ➕ Add To-Do
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
