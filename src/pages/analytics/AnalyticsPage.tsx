import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Card, CardContent, Skeleton, Alert, useTheme, useMediaQuery, Stack, Divider, Avatar } from '@mui/material';
import { AttachMoney as MoneyIcon, CreditCard as CardIcon, LocalAtm as CashIcon, Payment as PaymentIcon } from '@mui/icons-material';
import Loading from '../../components/Loading';
import { getDashboardStats, DashboardStats } from '../../api/admin/analyticsApi';

const AnalyticsPage = () => {
  const navigate = useNavigate();
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
        <Card 
          onClick={() => navigate('/clients')}
          sx={{ 
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Clients
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"}>{stats.overview.totalClients}</Typography>
          </CardContent>
        </Card>

        <Card 
          onClick={() => navigate('/cleaners')}
          sx={{ 
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Cleaners
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"}>{stats.overview.totalCleaners}</Typography>
          </CardContent>
        </Card>

        <Card 
          onClick={() => navigate('/bookings')}
          sx={{ 
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Bookings
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"}>{stats.overview.totalBookings}</Typography>
          </CardContent>
        </Card>

        <Card 
          sx={{ 
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Revenue
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"}>${stats.overview.totalRevenue}</Typography>
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

      {/* Funds Details Section */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
          💰 Funds Details
        </Typography>
        
        {/* Total Revenue Card */}
        <Card sx={{ 
          mb: 3, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                  Total Revenue
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', sm: '2.5rem' } }}>
                  ${stats.overview.totalRevenue?.toLocaleString() || '0'}
                </Typography>
              </Box>
              <MoneyIcon sx={{ fontSize: { xs: 48, sm: 56 }, opacity: 0.3 }} />
            </Stack>
          </CardContent>
        </Card>

        {/* Revenue by Payment Method */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}>
          Revenue by Payment Method
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
          <Card sx={{ 
            height: '100%',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              transform: 'translateY(-4px)',
            },
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Avatar sx={{ p: 1.5, bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}>
                  <CashIcon />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Cash Payments
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ${stats.revenue?.byMethod?.cash?.toLocaleString() || '0'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Direct cash payments
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ 
            height: '100%',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              transform: 'translateY(-4px)',
            },
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Avatar sx={{ p: 1.5, bgcolor: 'success.light', color: 'success.main', width: 48, height: 48 }}>
                  <CardIcon />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Card Payments
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ${stats.revenue?.byMethod?.card?.toLocaleString() || '0'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Credit/Debit cards
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ 
            height: '100%',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              transform: 'translateY(-4px)',
            },
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Avatar sx={{ p: 1.5, bgcolor: 'info.light', color: 'info.main', width: 48, height: 48 }}>
                  <PaymentIcon />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Online Payments
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ${stats.revenue?.byMethod?.online?.toLocaleString() || '0'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Digital payments
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Revenue Summary */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Revenue Summary
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2
        }}>
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
              Total Collected
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
              ${(
                (stats.revenue?.byMethod?.cash || 0) + 
                (stats.revenue?.byMethod?.card || 0) + 
                (stats.revenue?.byMethod?.online || 0)
              ).toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
              Pending/Processing
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
              $0
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.5 }}>
              Refunds/Disputes
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'error.main' }}>
              $0
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AnalyticsPage;
