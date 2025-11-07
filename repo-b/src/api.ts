export interface Todo {
  id: string
  text: string
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch('/api/todos')
  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.status}`)
  }
  return response.json()
}

export async function addTodo(text: string): Promise<Todo> {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!response.ok) {
    throw new Error(`Failed to add todo: ${response.status}`)
  }
  return response.json()
}

