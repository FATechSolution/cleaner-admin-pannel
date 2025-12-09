import { BASE_URL } from './baseUrl';

export interface DashboardStats {
  overview: {
    totalClients: number;
    totalCleaners: number;
    totalBookings: number;
    activeCleaners: number;
    totalRevenue: number;
    averageBookingValue: number;
  };
  bookings: {
    byStatus: {
      new: number;
      accepted: number;
      rejected: number;
    };
    byCleaningStatus: {
      completed: number;
      inProgress: number;
      confirmed: number;
      onTheWay: number;
    };
    byPaymentStatus: {
      paid: number;
      pending: number;
    };
  };
  revenue: {
    total: number;
    byMethod: {
      cash: number;
      card: number;
      online: number;
    };
  };
  recentActivity: {
    last7Days: {
      newClients: number;
      newCleaners: number;
      newBookings: number;
    };
    last30Days: {
      bookings: number;
    };
  };
  serviceTypes: Array<{
    _id: string;
    count: number;
  }>;
  cleaners: {
    onboarded: number;
    bankVerified: number;
    total: number;
  };
}

export interface TrendData {
  date: string;
  count: number;
  revenue: number;
}

export interface RecentActivity {
  bookings: any[];
  clients: any[];
  cleaners: any[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const res = await fetch(`${BASE_URL}/admin/analytics/dashboard`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.stats;
};

export const getBookingsTrend = async (period: number = 7): Promise<{ period: number; data: TrendData[] }> => {
  const res = await fetch(`${BASE_URL}/admin/analytics/trends?period=${period}`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return { period: json.period, data: json.data };
};

export const getRecentActivity = async (limit: number = 10): Promise<RecentActivity> => {
  const res = await fetch(`${BASE_URL}/admin/analytics/activity?limit=${limit}`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.activity;
};

