import { BASE_URL } from './baseUrl';

export interface Booking {
  _id: string;
  time: string;
  date: string;
  duration: string;
  serviceType: string;
  description: string;
  grandTotal: string;
  notes?: string;
  status: 'accepted' | 'rejected' | 'new';
  cleaningStatus?: 'confirmed' | 'on_the_way' | 'in_progress' | 'completed' | null;
  checkIn?: boolean;
  checkOut?: boolean;
  address?: {
    street?: string;
    city?: string;
    zipCode?: string;
    lat?: number;
    long?: number;
  };
  helper?: string;
  client: {
    _id: string;
    clientEmail: string;
    firstName?: string;
    lastName?: string;
  };
  cleaner?: {
    _id: string;
    cleanerEmail: string;
    firstName?: string;
    lastName?: string;
    availabilityStatus?: string;
  } | null;
  payment: {
    amount: number;
    method: 'cash' | 'card' | 'online';
    status: 'pending' | 'paid';
  };
  createdAt: string;
  updatedAt: string;
}

export interface BookingPayload {
  status?: 'accepted' | 'rejected' | 'new';
  cleaningStatus?: 'confirmed' | 'on_the_way' | 'in_progress' | 'completed';
  payment?: {
    amount?: number;
    method?: 'cash' | 'card' | 'online';
    status?: 'pending' | 'paid';
  };
  [key: string]: any;
}

export const getBookings = async (): Promise<Booking[]> => {
  const res = await fetch(`${BASE_URL}/api/admin/bookings`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.bookings ?? [];
};

export const getSingleBooking = async (id: string): Promise<Booking> => {
  const res = await fetch(`${BASE_URL}/api/admin/bookings/${id}`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.booking;
};

export const editBooking = async (id: string, payload: BookingPayload): Promise<Booking> => {
  const res = await fetch(`${BASE_URL}/api/admin/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.booking;
};

export const deleteBooking = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/api/admin/bookings/${id}`, { 
    method: 'DELETE' 
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
};

