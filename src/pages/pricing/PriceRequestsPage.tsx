import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Stack,
  useTheme,
  Alert,
  Fade,
  Card,
  CardContent,
  alpha,
  Tooltip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  AttachMoney as MoneyIcon,
  HourglassEmpty as PendingIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { getPriceRequests, reviewPriceRequest, PriceRequest } from '../../api/admin/pricingApi';

const PriceRequestsPage = () => {
  const theme = useTheme();
  const [requests, setRequests] = useState<PriceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<PriceRequest | null>(null);
  const [openReview, setOpenReview] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approved' | 'rejected'>('approved');
  const [reviewNotes, setReviewNotes] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPriceRequests();
      setRequests(data);
    } catch (err: any) {
      // If endpoint doesn't exist yet, silently set empty array
      if (err.message?.includes('404')) {
        console.info('Price requests endpoint not yet available on backend');
        setRequests([]);
      } else {
        setError(err.message || 'Failed to load price requests');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReviewClick = (request: PriceRequest, action: 'approved' | 'rejected') => {
    setSelectedRequest(request);
    setReviewAction(action);
    setReviewNotes('');
    setOpenReview(true);
  };

  const handleReviewSubmit = async () => {
    if (!selectedRequest) return;
    try {
      await reviewPriceRequest(selectedRequest._id, {
        status: reviewAction,
        notes: reviewNotes || undefined,
      });
      setOpenReview(false);
      setSelectedRequest(null);
      setReviewNotes('');
      fetchData();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to review price request');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return { color: 'success', bgcolor: 'success.light', textColor: 'success.dark' };
      case 'rejected':
        return { color: 'error', bgcolor: 'error.light', textColor: 'error.dark' };
      case 'pending':
        return { color: 'warning', bgcolor: 'warning.light', textColor: 'warning.dark' };
      default:
        return { color: 'default', bgcolor: 'action.selected', textColor: 'text.primary' };
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section */}
      <Card sx={{ 
        mb: 3, 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
                Price Requests
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Review and manage cleaner pricing requests
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main' }}>
                <PendingIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {pendingCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Requests
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        
        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}>
                <ApproveIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {approvedCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approved
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main' }}>
                <RejectIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {rejectedCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rejected
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Error Alert */}
      {error && (
        <Fade in={!!error}>
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        </Fade>
      )}

      {/* Main Content */}
      <Paper sx={{ 
        overflow: 'hidden', 
        width: '100%', 
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Cleaner</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Current Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Requested Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Requested Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Box sx={{ py: 4 }}>
                      <MoneyIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No price requests found
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => {
                  const statusColors = getStatusColor(request.status);
                  return (
                    <TableRow 
                      key={request._id}
                      hover
                      sx={{ 
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar 
                            sx={{ 
                              bgcolor: 'primary.light',
                              color: 'primary.main',
                              width: 40,
                              height: 40,
                            }}
                          >
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {request.cleaner?.firstName} {request.cleaner?.lastName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {request.cleaner?.cleanerEmail}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          ${request.currentPrice?.toFixed(2) || 'N/A'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          per hour
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold" color="primary.main">
                          ${request.pricePerHour.toFixed(2)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          per hour
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(request.requestedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(request.requestedAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={request.status.toUpperCase()}
                          color={statusColors.color as any}
                          size="small"
                          sx={{
                            bgcolor: statusColors.bgcolor,
                            color: statusColors.textColor,
                            fontWeight: 'medium',
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {request.status === 'pending' ? (
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                            <Tooltip title="Approve" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleReviewClick(request, 'approved')}
                                sx={{
                                  color: 'success.main',
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.success.main, 0.1),
                                  },
                                }}
                              >
                                <ApproveIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject" arrow>
                              <IconButton
                                size="small"
                                onClick={() => handleReviewClick(request, 'rejected')}
                                sx={{
                                  color: 'error.main',
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.error.main, 0.1),
                                  },
                                }}
                              >
                                <RejectIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            {request.status === 'approved' ? 'Approved' : 'Rejected'}
                            {request.reviewedAt && ` on ${new Date(request.reviewedAt).toLocaleDateString()}`}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Review Dialog */}
      <Dialog open={openReview} onClose={() => setOpenReview(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {reviewAction === 'approved' ? 'Approve Price Request' : 'Reject Price Request'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Cleaner: {selectedRequest?.cleaner?.firstName} {selectedRequest?.cleaner?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Price: ${selectedRequest?.currentPrice?.toFixed(2) || 'N/A'} / hour
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Requested Price: ${selectedRequest?.pricePerHour.toFixed(2)} / hour
              </Typography>
            </Box>
            <TextField
              label="Notes (Optional)"
              multiline
              rows={3}
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Add any notes about this decision..."
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReview(false)}>Cancel</Button>
          <Button
            variant="contained"
            color={reviewAction === 'approved' ? 'success' : 'error'}
            onClick={handleReviewSubmit}
          >
            {reviewAction === 'approved' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PriceRequestsPage;
