import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Alert,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from '@mui/material';
import {
  AttachMoney as MoneyIcon,
  CreditCard as CardIcon,
  LocalAtm as CashIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import Loading from '../../components/Loading';
import { getDashboardStats, DashboardStats } from '../../api/admin/analyticsApi';

const FundsPage = () => {
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
        setError(err.message || 'Failed to load funds data');
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
    return <Loading message="Loading Funds Details..." size="medium" />;
  }

  if (!stats) {
    return <Typography>No data available</Typography>;
  }

  const totalCollected =
    (stats.revenue?.byMethod?.cash || 0) +
    (stats.revenue?.byMethod?.card || 0) +
    (stats.revenue?.byMethod?.online || 0);

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 3, fontWeight: 'bold' }}>
        💰 Funds Details
      </Typography>

      {/* Total Revenue Card - Hero Card */}
      <Card
        sx={{
          mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                Total Revenue
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                ${stats.overview.totalRevenue?.toLocaleString() || '0'}
              </Typography>
            </Box>
            <MoneyIcon sx={{ fontSize: { xs: 48, sm: 64 }, opacity: 0.2 }} />
          </Stack>
        </CardContent>
      </Card>

      {/* Revenue by Payment Method */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', mt: 3 }}>
        Revenue by Payment Method
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2,
          mb: 3,
        }}
      >
        {/* Cash Payments Card */}
        <Card
          sx={{
            height: '100%',
            '&:hover': {
              boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              transform: 'translateY(-8px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'primary.light',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CashIcon sx={{ color: 'primary.main', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: 'block', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  Cash Payments
                </Typography>
              </Box>
            </Stack>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
            >
              ${stats.revenue?.byMethod?.cash?.toLocaleString() || '0'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Direct cash payments
            </Typography>
          </CardContent>
        </Card>

        {/* Card Payments Card */}
        <Card
          sx={{
            height: '100%',
            '&:hover': {
              boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              transform: 'translateY(-8px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'success.light',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CardIcon sx={{ color: 'success.main', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: 'block', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  Card Payments
                </Typography>
              </Box>
            </Stack>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
            >
              ${stats.revenue?.byMethod?.card?.toLocaleString() || '0'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Credit/Debit cards
            </Typography>
          </CardContent>
        </Card>

        {/* Online Payments Card */}
        <Card
          sx={{
            height: '100%',
            '&:hover': {
              boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              transform: 'translateY(-8px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'info.light',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PaymentIcon sx={{ color: 'info.main', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: 'block', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  Online Payments
                </Typography>
              </Box>
            </Stack>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
            >
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
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Revenue Summary
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        {/* Total Collected */}
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
            border: '1px solid rgba(76, 175, 80, 0.2)',
          }}
        >
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}
          >
            Total Collected
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'success.main', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
          >
            ${totalCollected.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            All payment methods combined
          </Typography>
        </Paper>

        {/* Pending/Processing */}
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)',
            border: '1px solid rgba(255, 193, 7, 0.2)',
          }}
        >
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}
          >
            Pending/Processing
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'warning.main', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
          >
            $0
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            Transactions in progress
          </Typography>
        </Paper>

        {/* Refunds/Disputes */}
        <Paper
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)',
            border: '1px solid rgba(244, 67, 54, 0.2)',
          }}
        >
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}
          >
            Refunds/Disputes
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'error.main', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
          >
            $0
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            Customer refunds & disputes
          </Typography>
        </Paper>
      </Box>

      {/* Payment Method Breakdown Table */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Detailed Breakdown
      </Typography>
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          overflowX: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
            gap: { xs: 1, sm: 2 },
            minWidth: { xs: '100%', sm: 'auto' },
          }}
        >
          {/* Cash */}
          <Box>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}
            >
              CASH
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              ${stats.revenue?.byMethod?.cash?.toLocaleString() || '0'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {((stats.revenue?.byMethod?.cash || 0) / stats.overview.totalRevenue * 100).toFixed(1)}%
            </Typography>
          </Box>

          {/* Card */}
          <Box>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}
            >
              CARD
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
              ${stats.revenue?.byMethod?.card?.toLocaleString() || '0'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {((stats.revenue?.byMethod?.card || 0) / stats.overview.totalRevenue * 100).toFixed(1)}%
            </Typography>
          </Box>

          {/* Online */}
          <Box>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}
            >
              ONLINE
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'info.main' }}>
              ${stats.revenue?.byMethod?.online?.toLocaleString() || '0'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {((stats.revenue?.byMethod?.online || 0) / stats.overview.totalRevenue * 100).toFixed(1)}%
            </Typography>
          </Box>

          {/* Total */}
          <Box sx={{ borderLeft: { xs: 'none', sm: '2px solid #e0e0e0' }, pl: { xs: 0, sm: 2 } }}>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}
            >
              TOTAL
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              ${stats.overview.totalRevenue?.toLocaleString() || '0'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              100%
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default FundsPage;
