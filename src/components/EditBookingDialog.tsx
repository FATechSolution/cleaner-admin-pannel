import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Divider,
} from '@mui/material';
import { Booking } from '../api/admin/bookingApi';

interface EditBookingDialogProps {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditBookingDialog: React.FC<EditBookingDialogProps> = ({ open, booking, onClose, onSave }) => {
  const [form, setForm] = useState<Record<string, any>>({});

  React.useEffect(() => {
    if (booking) {
      setForm({
        status: booking.status || 'new',
        cleaningStatus: booking.cleaningStatus || '',
        paymentStatus: booking.payment?.status || 'pending',
        paymentMethod: booking.payment?.method || 'cash',
        notes: booking.notes || '',
      });
    }
  }, [booking]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: Record<string, any>) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    const payload = {
      status: form.status,
      cleaningStatus: form.cleaningStatus || undefined,
      payment: {
        status: form.paymentStatus,
        method: form.paymentMethod,
      },
      notes: form.notes,
    };
    onSave(payload);
  };

  if (!booking) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Booking</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* Booking Status */}
          <TextField
            select
            label="Booking Status"
            value={form.status}
            onChange={handleChange('status')}
            fullWidth
            size="small"
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>

          {/* Cleaning Status */}
          <TextField
            select
            label="Cleaning Status"
            value={form.cleaningStatus}
            onChange={handleChange('cleaningStatus')}
            fullWidth
            size="small"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="on_the_way">On The Way</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>

          <Divider />

          {/* Payment Method */}
          <TextField
            select
            label="Payment Method"
            value={form.paymentMethod}
            onChange={handleChange('paymentMethod')}
            fullWidth
            size="small"
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="card">Card</MenuItem>
            <MenuItem value="online">Online</MenuItem>
          </TextField>

          {/* Payment Status */}
          <TextField
            select
            label="Payment Status"
            value={form.paymentStatus}
            onChange={handleChange('paymentStatus')}
            fullWidth
            size="small"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </TextField>

          <Divider />

          {/* Notes */}
          <TextField
            label="Notes"
            value={form.notes}
            onChange={handleChange('notes')}
            fullWidth
            multiline
            rows={3}
            placeholder="Add any additional notes..."
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookingDialog;
