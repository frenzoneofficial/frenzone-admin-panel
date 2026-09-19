const API_BASE = import.meta.env.VITE_FRENZONE_API_BASE || ''

export class ApiUnavailableError extends Error {
  constructor(message = 'Frenzone backend is not configured for this preview') {
    super(message)
    this.name = 'ApiUnavailableError'
  }
}

export async function apiRequest(path, options = {}) {
  if (!API_BASE) throw new ApiUnavailableError()
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  if (response.status === 204) return null
  return response.json()
}

export const backendConfigured = Boolean(API_BASE)
