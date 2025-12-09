import { BASE_URL } from './baseUrl';

export interface Client {
  _id: string;
  clientEmail: string;
  firstName?: string;
  lastName?: string;
  streetAddress?: string;
  Apartment?: string;
  City?: string;
  zipCode?: string;
  location?: {
    lat?: number;
    long?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ClientPayload {
  firstName?: string | null;
  lastName?: string | null;
  clientEmail?: string;
  streetAddress?: string | null;
  Apartment?: string | null;
  City?: string | null;
  zipCode?: string | null;
  [key: string]: any;
}

export const getClients = async (): Promise<Client[]> => {
  const res = await fetch(`${BASE_URL}/admin/clients`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data ?? [];
};

export const getSingleClient = async (id: string): Promise<Client> => {
  const res = await fetch(`${BASE_URL}/admin/clients/${id}`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
};

export const editClient = async (id: string, payload: ClientPayload): Promise<Client> => {
  const res = await fetch(`${BASE_URL}/admin/clients/${id}`, {
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

export const deleteClient = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/admin/clients/${id}`, { 
    method: 'DELETE' 
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
};

