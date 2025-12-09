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
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Skeleton,
  Alert,
  Fade,
  Tooltip,
  Card,
  CardContent,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inbox as InboxIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import EditClientDialog from '../../components/EditCleanerDialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import { getClients, editClient, deleteClient, Client } from '../../api/admin/clientApi';

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getClients();
      setClients(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (client: Client) => { 
    setCurrentClient(client); 
    setEditOpen(true); 
  };

  const handleEditSave = async (data: any) => { 
    if (!currentClient) return;
    try {
      await editClient(currentClient._id, data);
      setEditOpen(false);
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to update client');
    }
  };

  const handleDeleteClick = (id: string) => { 
    setDeleteId(id); 
    setConfirmOpen(true); 
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deleteClient(deleteId);
      setConfirmOpen(false);
      setDeleteId(null);
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to delete client');
      setConfirmOpen(false);
    }
  };

  const filteredClients = clients.filter((c:any) => {
    const q = searchTerm.toLowerCase();
    return (
      (c.firstName?.toLowerCase().includes(q) || false) ||
      (c.lastName?.toLowerCase().includes(q) || false) ||
      (c.clientEmail?.toLowerCase().includes(q) || false)
    );
  });

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  const paginated = filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ width: '100%', p: { xs: 0, sm: 1 } }}>
      {/* Header Section */}
      <Card sx={{ 
        mb: 3, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
                Client Management
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage and track all your clients in one place
              </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={{ xs: '100%', sm: 'auto' }}>
              <TextField
                size="small"
                placeholder="Search clients..."
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
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {clients.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Clients
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        
        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}>
                <EmailIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {filteredClients.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Search Results
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
                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Client</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Joined</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                // Enhanced loading skeleton
                Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box>
                          <Skeleton variant="text" width={120} height={20} />
                          <Skeleton variant="text" width={80} height={16} />
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell><Skeleton variant="text" width={150} height={20} /></TableCell>
                    <TableCell><Skeleton variant="text" width={100} height={20} /></TableCell>
                    <TableCell><Skeleton variant="text" width={80} height={20} /></TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : paginated.map((client:any, index) => (
                <Fade in={true} timeout={300 + index * 100} key={client._id}>
                  <TableRow 
                    hover 
                    sx={{ 
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                      },
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar 
                          sx={{ 
                            bgcolor: `hsl(${(client.clientEmail.charCodeAt(0) * 137.5) % 360}, 70%, 50%)`,
                            color: 'white',
                            fontWeight: 'bold',
                            width: 44,
                            height: 44,
                            fontSize: '1.1rem'
                          }}
                        >
                          {[(client.firstName||'')[0], (client.lastName||'')[0]].filter(Boolean).join('') || client.clientEmail[0].toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="600" sx={{ mb: 0.5 }}>
                            {[client.firstName, client.lastName].filter(Boolean).join(' ') || 'N/A'}
                          </Typography>
                          <Chip 
                            label="Active" 
                            size="small" 
                            sx={{ 
                              bgcolor: alpha(theme.palette.success.main, 0.1),
                              color: 'success.main',
                              fontSize: '0.75rem',
                              height: 20
                            }} 
                          />
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" fontWeight="500">
                            {client.clientEmail}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {client.streetAddress || 'No address'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(client.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Tooltip title="Edit Client" arrow>
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditClick(client)}
                            sx={{
                              color: 'primary.main',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                transform: 'scale(1.1)'
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Client" arrow>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteClick(client._id)}
                            sx={{
                              color: 'error.main',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.error.main, 0.1),
                                transform: 'scale(1.1)'
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
                </Fade>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredClients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: 1, borderColor: 'divider' }}
        />

        {filteredClients.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 8, borderTop: 1, borderColor: 'divider' }}>
            <InboxIcon sx={{ mx: 'auto', fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.primary" gutterBottom>
              No clients found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              No data found.
            </Typography>
          </Box>
        )}
      </Paper>

      <EditClientDialog open={editOpen} initialData={currentClient} onClose={()=>setEditOpen(false)} onSave={handleEditSave} />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Client"
        description="Are you sure you want to delete this client?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default ClientsPage;