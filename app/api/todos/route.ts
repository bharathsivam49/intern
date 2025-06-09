import { NextRequest, NextResponse } from 'next/server';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// ✅ Use const instead of let to satisfy ESLint
const todos: Todo[] = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build a To-Do API', completed: false },
  { id: 3, title: 'write code', completed: false }
];

// Handle GET request to return all todos
export async function GET() {
  return NextResponse.json(todos);
}

// Handle POST request to add a new todo
export async function POST(req: NextRequest) {
  const body = await req.json();
  const newTodo: Todo = {
    id: todos.length + 1,
    title: body.title || 'Untitled',
    completed: false,
  };
  todos.push(newTodo); // ✅ This is allowed with const (mutation is fine)
  return NextResponse.json(newTodo, { status: 201 });
}
