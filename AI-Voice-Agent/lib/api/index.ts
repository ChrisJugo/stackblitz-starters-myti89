import { APIResponse, Campaign, CustomerRecord } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com'

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken')
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred')
  }

  return data
}

export const api = {
  campaigns: {
    getAll: (): Promise<APIResponse<Campaign[]>> => fetchWithAuth('/campaigns'),
    getById: (id: string): Promise<APIResponse<Campaign>> => fetchWithAuth(`/campaigns/${id}`),
    create: (campaign: Omit<Campaign, 'id'>): Promise<APIResponse<Campaign>> => 
      fetchWithAuth('/campaigns', { method: 'POST', body: JSON.stringify(campaign) }),
    update: (id: string, campaign: Partial<Campaign>): Promise<APIResponse<Campaign>> => 
      fetchWithAuth(`/campaigns/${id}`, { method: 'PUT', body: JSON.stringify(campaign) }),
    delete: (id: string): Promise<APIResponse<void>> => 
      fetchWithAuth(`/campaigns/${id}`, { method: 'DELETE' }),
  },
  customers: {
    getAll: (): Promise<APIResponse<CustomerRecord[]>> => fetchWithAuth('/customers'),
    getById: (id: string): Promise<APIResponse<CustomerRecord>> => fetchWithAuth(`/customers/${id}`),
    create: (customer: Omit<CustomerRecord, 'id'>): Promise<APIResponse<CustomerRecord>> => 
      fetchWithAuth('/customers', { method: 'POST', body: JSON.stringify(customer) }),
    update: (id: string, customer: Partial<CustomerRecord>): Promise<APIResponse<CustomerRecord>> => 
      fetchWithAuth(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(customer) }),
    delete: (id: string): Promise<APIResponse<void>> => 
      fetchWithAuth(`/customers/${id}`, { method: 'DELETE' }),
  },
  // Add other API endpoints as needed
}

