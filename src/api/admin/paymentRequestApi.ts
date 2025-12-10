import { BASE_URL } from './baseUrl';

export interface PaymentRequest {
  _id: string;
  clientId: string;
  client?: {
    _id: string;
    clientEmail: string;
    firstName?: string;
    lastName?: string;
  };
  bookingId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequestPayload {
  status?: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  [key: string]: any;
}

// Get all payment requests
export const getClientPaymentRequests = async (): Promise<PaymentRequest[]> => {
  const res = await fetch(`${BASE_URL}/admin/payment-requests`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data ?? [];
};

// Send payment request
export const sendPaymentRequest = async (payload: {
  clientId: string;
  bookingId: string;
  amount: number;
}): Promise<PaymentRequest> => {
  const res = await fetch(`${BASE_URL}/admin/payment-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
};

// Update payment status
export const updatePaymentStatus = async (
  id: string,
  payload: PaymentRequestPayload
): Promise<PaymentRequest> => {
  const res = await fetch(`${BASE_URL}/admin/payment-requests/${id}`, {
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
