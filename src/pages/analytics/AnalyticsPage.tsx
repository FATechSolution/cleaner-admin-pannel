import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Card, CardContent, Skeleton, Alert, useTheme, useMediaQuery } from '@mui/material';
import Loading from '../../components/Loading';
import { getDashboardStats, DashboardStats } from '../../api/admin/analyticsApi';

const AnalyticsPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (loading) {
    return <Loading message="Loading Analytics..." size="medium" />;
  }

  if (!stats) {
    return <Typography>No data available</Typography>;
  }

  return (
    <Box sx={{ 
      p: { xs: 0, sm: 1, md: 2 },
      width: '100%',
    }}>
      <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 3 }}>
        Dashboard Analytics
      </Typography>

      {/* Overview Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',     // Mobile: 1 column
          sm: 'repeat(2, 1fr)',     // Small: 2 columns
          md: 'repeat(2, 1fr)',     // Medium: 2 columns
          lg: 'repeat(4, 1fr)',     // Large: 4 columns
        },
        gap: { xs: 1.5, sm: 2 },
        mb: 3,
      }}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Clients
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"}>{stats.overview.totalClients}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Cleaners
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"}>{stats.overview.totalCleaners}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Bookings
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"}>{stats.overview.totalBookings}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Revenue
            </Typography>
            <Typography variant="h5">${stats.overview.totalRevenue}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Booking Status */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Booking Status
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="textSecondary">
              New
            </Typography>
            <Typography variant="h6">{stats.bookings.byStatus.new}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Accepted
            </Typography>
            <Typography variant="h6">{stats.bookings.byStatus.accepted}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Rejected
            </Typography>
            <Typography variant="h6">{stats.bookings.byStatus.rejected}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Completed
            </Typography>
            <Typography variant="h6">{stats.bookings.byCleaningStatus.completed}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Revenue Breakdown */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Revenue by Payment Method
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Cash
            </Typography>
            <Typography variant="h6">${stats.revenue.byMethod.cash}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Card
            </Typography>
            <Typography variant="h6">${stats.revenue.byMethod.card}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Online
            </Typography>
            <Typography variant="h6">${stats.revenue.byMethod.online}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AnalyticsPage;
