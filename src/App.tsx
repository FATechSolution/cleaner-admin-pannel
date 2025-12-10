import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import ClientsPage from './pages/clients/ClientsPage';
import CleanersPage from './pages/cleaners/CleanersPage';
import JobsPage from './pages/bookings/JobsPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import PriceRequestsPage from './pages/pricing/PriceRequestsPage';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<AnalyticsPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/clients" element={<ClientsPage />} />
                    <Route path="/cleaners" element={<CleanersPage />} />
                    <Route path="/bookings" element={<JobsPage />} />
                    <Route path="/price-requests" element={<PriceRequestsPage />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;