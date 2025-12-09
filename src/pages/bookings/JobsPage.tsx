import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TablePagination,
  Stack,
  useTheme,
  Alert,
  Fade,
  Card,
  CardContent,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Work as WorkIcon,
  Inbox as InboxIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { getBookings, Booking, deleteBooking, editBooking } from '../../api/admin/bookingApi';
import ConfirmDialog from '../../components/ConfirmDialog';
import EditBookingDialog from '../../components/EditBookingDialog';

const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBookings = bookings.filter((b) =>
    (b.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (b.client?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (b.client?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (b.client?.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenEdit(true);
  };

  const handleDeleteClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBooking) return;
    try {
      await deleteBooking(selectedBooking._id);
      setOpenDelete(false);
      setSelectedBooking(null);
      fetchData();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete booking');
    }
  };

  const handleEditSave = async (data: any) => {
    if (!selectedBooking) return;
    try {
      await editBooking(selectedBooking._id, data);
      setOpenEdit(false);
      setSelectedBooking(null);
      fetchData();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update booking');
    }
  };

  const paginatedBookings = filteredBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const theme = useTheme();

  // Helper function to get status color based on booking status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return { color: 'info', bgcolor: 'info.light', textColor: 'info.dark' };
      case 'in progress':
        return { color: 'warning', bgcolor: 'warning.light', textColor: 'warning.dark' };
      case 'completed':
        return { color: 'success', bgcolor: 'success.light', textColor: 'success.dark' };
      case 'cancelled':
        return { color: 'error', bgcolor: 'error.light', textColor: 'error.dark' };
      default:
        return { color: 'default', bgcolor: 'action.selected', textColor: 'text.primary' };
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section */}
      <Card sx={{ 
        mb: 3, 
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        color: 'white',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
                Booking Management
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Track and manage all cleaning service bookings
              </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={{ xs: '100%', sm: 'auto' }}>
              <TextField
                size="small"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  minWidth: 280,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.95)',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'white',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'white',
                    }
                  }
                }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main' }}>
                <AssignmentIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {bookings.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Bookings
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        
        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}>
                <ScheduleIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {bookings.filter(b => b.status === 'accepted').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scheduled
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
            <TableRow>
              <TableCell>Booking</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {error}
                </TableCell>
              </TableRow>
            ) : (
              paginatedBookings.map((booking) => {
                const statusColors = getStatusColor(booking.status);
                return (
                  <TableRow key={booking._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>
                          <WorkIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {booking.serviceType}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {booking.client?.clientEmail}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {booking.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.time}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Duration: {booking.duration} {booking.duration === '1' ? 'hour' : 'hours'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        ${(booking.payment?.amount || 0).toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.payment?.status || 'pending'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
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
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Tooltip title="Edit Booking" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(booking)}
                            sx={{
                              color: 'primary.main',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Booking" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(booking)}
                            sx={{
                              color: 'error.main',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.error.main, 0.1),
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredBookings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: 1, borderColor: 'divider' }}
        />

        {filteredBookings.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 8, borderTop: 1, borderColor: 'divider' }}>
            <InboxIcon sx={{ mx: 'auto', fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.primary" gutterBottom>
              No bookings found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              No bookings found.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={openDelete}
        title="Delete Booking"
        description={`Are you sure you want to delete the booking for ${selectedBooking?.serviceType}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setOpenDelete(false);
          setSelectedBooking(null);
        }}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Edit Booking Dialog */}
      <EditBookingDialog
        open={openEdit}
        booking={selectedBooking}
        onClose={() => {
          setOpenEdit(false);
          setSelectedBooking(null);
        }}
        onSave={handleEditSave}
      />
    </Box>
  );
};

export default BookingsPage;