import { BASE_URL } from './baseUrl';

export interface Cleaner {
  _id: string;
  cleanerEmail: string;
  firstName?: string;
  lastName?: string;
  phoneNo?: string;
  sin?: string;
  streetAddress?: string;
  apartment?: string;
  city?: string;
  zipCode?: string;
  fullAddress?: string;
  stripeAccountId?: string;
  chargesEnabled?: boolean;
  payoutsEnabled?: boolean;
  onboardingCompleted?: boolean;
  bankVerified?: boolean;
  availabilityStatus?: 'online' | 'offline';
  createdAt: string;
  updatedAt: string;
}

export interface CleanerPayload {
  firstName?: string;
  lastName?: string;
  cleanerEmail?: string;
  phoneNo?: string;
  sin?: string;
  streetAddress?: string;
  apartment?: string;
  city?: string;
  zipCode?: string;
  [key: string]: any;
}

export const getCleaners = async (): Promise<Cleaner[]> => {
  const res = await fetch(`${BASE_URL}/admin/cleaners`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data ?? [];
};

export const getSingleCleaner = async (id: string): Promise<Cleaner> => {
  const res = await fetch(`${BASE_URL}/admin/cleaners/${id}`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
};

export const editCleaner = async (id: string, payload: CleanerPayload): Promise<Cleaner> => {
  const res = await fetch(`${BASE_URL}/admin/cleaners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
};

export const deleteCleaner = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/admin/cleaners/${id}`, { 
    method: 'DELETE' 
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
};

