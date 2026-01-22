import { apiJson } from '../utils/apiClient';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  authRequired?: boolean;
}

async function apiRequest(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, authRequired = false } = options;
  return apiJson(endpoint, { method, body, mode: 'cors' }, { authRequired });
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
  return apiRequest('/reservations', { authRequired: true });
}

export async function deleteReservation(id: string) {
  return apiRequest(`/reservations/${id}`, {
    method: 'DELETE',
    authRequired: true,
  });
}

export async function updateReservationStatus(id: string, status: string) {
  return apiRequest(`/reservations/${id}`, {
    method: 'PATCH',
    body: { status },
    authRequired: true,
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
    authRequired: true,
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
    authRequired: true,
  });
}

export async function deleteMainMenu() {
  return apiRequest('/main-menu', {
    method: 'DELETE',
    authRequired: true,
  });
}

// ==================== HEALTH CHECK ====================

export async function healthCheck() {
  return apiRequest('/health');
}

// ==================== ADMIN ====================

export async function getContacts() {
  return apiRequest('/admin/contacts', { authRequired: true });
}
