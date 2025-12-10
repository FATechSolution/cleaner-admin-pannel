import { BASE_URL } from './baseUrl';

export interface CheckInOutPayload {
  bookingId: string;
  timestamp?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface CheckInOutResponse {
  success: boolean;
  message: string;
  booking: {
    _id: string;
    checkIn?: boolean;
    checkOut?: boolean;
    checkInTime?: string;
    checkOutTime?: string;
  };
}

// Check In
export const checkIn = async (payload: CheckInOutPayload): Promise<CheckInOutResponse> => {
  const res = await fetch(`${BASE_URL}/admin/bookings/check-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json;
};

// Check Out
export const checkOut = async (payload: CheckInOutPayload): Promise<CheckInOutResponse> => {
  const res = await fetch(`${BASE_URL}/admin/bookings/check-out`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json;
};
