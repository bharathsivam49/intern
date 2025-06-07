// app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build a To-Do API', completed: false },
  { id: 3, title: 'write code', completed: false }
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newTodo: Todo = {
    id: todos.length + 1,
    title: body.title || 'Untitled',
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}
