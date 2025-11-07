import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'
import * as api from '../api'
import * as errors from '../lib/errors'

// Mock the API and errors
vi.mock('../api')
vi.mock('../lib/errors')

describe('Optimistic Add Todo', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    vi.clearAllMocks()
    // Reset error toast mock
    vi.mocked(errors.showErrorToast).mockImplementation(() => {})
  })

  it('should add todo optimistically and rollback on server 500', async () => {
    const user = userEvent.setup()
    
    // Mock initial fetch
    vi.mocked(api.fetchTodos).mockResolvedValueOnce([
      { id: '1', text: 'Existing todo' },
    ])

    // Mock addTodo to fail with 500
    vi.mocked(api.addTodo).mockRejectedValueOnce(
      new Error('Failed to add todo: 500')
    )

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Existing todo')).toBeInTheDocument()
    })

    // Find the add form (should exist after implementation)
    const input = screen.getByPlaceholderText(/add todo/i)
    const submitButton = screen.getByRole('button', { name: /add/i })

    // Add a new todo
    await user.type(input, 'New todo')
    await user.click(submitButton)

    // Should appear immediately (optimistic)
    await waitFor(() => {
      expect(screen.getByText('New todo')).toBeInTheDocument()
    })

    // Simulate server 500 error - rollback should happen
    await waitFor(
      () => {
        // After rollback, new todo should be gone
        expect(screen.queryByText('New todo')).not.toBeInTheDocument()
        // Original todo should still be there
        expect(screen.getByText('Existing todo')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // Error toast should be shown
    expect(errors.showErrorToast).toHaveBeenCalled()
  })

  it('should show error toast on rollback', async () => {
    const user = userEvent.setup()
    
    vi.mocked(api.fetchTodos).mockResolvedValueOnce([
      { id: '1', text: 'Existing todo' },
    ])
    vi.mocked(api.addTodo).mockRejectedValueOnce(
      new Error('Failed to add todo: 500')
    )

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Existing todo')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText(/add todo/i)
    const submitButton = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'New todo')
    await user.click(submitButton)

    // Wait for rollback and error toast
    await waitFor(() => {
      expect(errors.showErrorToast).toHaveBeenCalled()
    }, { timeout: 3000 })
  })
})

