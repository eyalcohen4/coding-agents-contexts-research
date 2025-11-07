// Error mapping and toast utilities
// This file maps server errors to user-friendly messages

export interface ErrorMap {
  [key: string]: string
}

const errorMap: ErrorMap = {
  '500': 'Something went wrong. Please try again.',
  '404': 'Resource not found.',
  'Network error': 'Connection failed. Please check your internet.',
  'Failed to fetch': 'Unable to reach server. Please try again.',
}

export function mapError(error: unknown): string {
  if (error instanceof Error) {
    // Check for status code patterns
    const message = error.message
    if (message.includes('500')) {
      return errorMap['500']
    }
    if (message.includes('404')) {
      return errorMap['404']
    }
    // Check for specific error messages
    if (errorMap[message]) {
      return errorMap[message]
    }
  }
  // Default fallback
  return errorMap['500'] || 'An unexpected error occurred.'
}

let toastContainer: HTMLElement | null = null

function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.id = 'toast-container'
    toastContainer.style.cssText =
      'position: fixed; top: 20px; right: 20px; z-index: 1000;'
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

export function showErrorToast(message: string): void {
  const container = ensureToastContainer()
  const toast = document.createElement('div')
  toast.className = 'error-toast'
  toast.textContent = message
  toast.style.cssText =
    'background: #ff4444; color: white; padding: 12px 20px; border-radius: 4px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);'
  container.appendChild(toast)

  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.remove()
  }, 3000)
}

