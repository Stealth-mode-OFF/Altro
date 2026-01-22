import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../utils/supabase/env';

const API_BASE_URL = `${SUPABASE_URL}/functions/v1/make-server-d880a0b3`;

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
}

async function apiRequest(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body } = options;
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    method,
    headers,
    mode: 'cors',
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    console.log(`🌐 API Request: ${method} ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText };
      }
      console.error(`❌ API Error (${response.status}):`, errorData);
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ API Success: ${method} ${endpoint}`, data);
    return data;
  } catch (error) {
    console.error(`❌ API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// ==================== RESERVATIONS ====================

export async function createReservation(reservationData: {
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  marketingConsent?: boolean;
}) {
  return apiRequest('/reservations', {
    method: 'POST',
    body: reservationData,
  });
}

export async function getReservations() {
  return apiRequest('/reservations');
}

export async function deleteReservation(id: string) {
  return apiRequest(`/reservations/${id}`, {
    method: 'DELETE',
  });
}

export async function updateReservationStatus(id: string, status: string) {
  return apiRequest(`/reservations/${id}`, {
    method: 'PATCH',
    body: { status },
  });
}

// ==================== WEEKLY MENU ====================

export async function getWeeklyMenu(weekStart: string) {
  return apiRequest(`/weekly-menu/${weekStart}`);
}

export async function saveWeeklyMenu(weekStart: string, items: any[]) {
  return apiRequest('/weekly-menu', {
    method: 'POST',
    body: { weekStart, items },
  });
}

// ==================== MAIN MENU ====================

export async function getMainMenu() {
  return apiRequest('/main-menu');
}

export async function saveMainMenu(items: any[]) {
  return apiRequest('/main-menu', {
    method: 'POST',
    body: { items },
  });
}

export async function deleteMainMenu() {
  return apiRequest('/main-menu', {
    method: 'DELETE',
  });
}

// ==================== HEALTH CHECK ====================

export async function healthCheck() {
  return apiRequest('/health');
}

// ==================== ADMIN ====================

export async function getContacts() {
  return apiRequest('/admin/contacts');
}