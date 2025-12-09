import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';

interface CleanerPayload {
  firstName?: string;
  lastName?: string;
  cleanerEmail?: string;
  phoneNo?: string;
  city?: string;
  [key: string]: any;
}

interface EditCleanerDialogProps {
  open: boolean;
  initialData: CleanerPayload | null;
  onClose: () => void;
  onSave: (data: CleanerPayload) => void;
}

const EditCleanerDialog: React.FC<EditCleanerDialogProps> = ({ open, initialData, onClose, onSave }) => {
  const [form, setForm] = useState<CleanerPayload>(initialData || {});

  React.useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Cleaner</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="First Name" value={form.firstName || ''} onChange={handleChange('firstName')} fullWidth />
          <TextField label="Last Name" value={form.lastName || ''} onChange={handleChange('lastName')} fullWidth />
          <TextField label="Email" value={form.cleanerEmail || ''} onChange={handleChange('cleanerEmail')} fullWidth />
          <TextField label="Phone" value={form.phoneNo || ''} onChange={handleChange('phoneNo')} fullWidth />
          <TextField label="City" value={form.city || ''} onChange={handleChange('city')} fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCleanerDialog;
