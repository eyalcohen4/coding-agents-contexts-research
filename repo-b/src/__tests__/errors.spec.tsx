import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'
import * as api from '../api'
import { mapError, showErrorToast } from '../lib/errors'

// Mock the API
vi.mock('../api')
vi.mock('../lib/errors', () => ({
  mapError: vi.fn(),
  showErrorToast: vi.fn(),
}))

describe('Error Mapping', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    vi.clearAllMocks()
  })

  it('should map all fetch errors through error map', async () => {
    // Mock API to throw error
    const serverError = new Error('Server error: 500')
    vi.mocked(api.fetchTodos).mockRejectedValueOnce(serverError)

    // Mock error map to return user-friendly message
    vi.mocked(mapError).mockReturnValue('Something went wrong. Please try again.')

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

    // Wait for error to be handled
    await waitFor(() => {
      expect(mapError).toHaveBeenCalledWith(serverError)
      expect(showErrorToast).toHaveBeenCalledWith(
        'Something went wrong. Please try again.'
      )
    })

    // Verify raw error message is not shown
    expect(screen.queryByText(/Server error: 500/i)).not.toBeInTheDocument()
  })

  it('should use mapped error text in toast', async () => {
    const serverError = new Error('Network error')
    vi.mocked(api.fetchTodos).mockRejectedValueOnce(serverError)
    vi.mocked(mapError).mockReturnValue('Connection failed')

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(showErrorToast).toHaveBeenCalledWith('Connection failed')
    })
  })
})

