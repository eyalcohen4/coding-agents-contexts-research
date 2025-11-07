import { useQuery } from '@tanstack/react-query'
import { fetchTodos } from './api'

function App() {
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

