import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Fade,
  alpha,
} from '@mui/material';
import {
  People as PeopleIcon,
  CleaningServices as CleaningServicesIcon,
  Work as WorkIcon,
  Analytics as AnalyticsIcon,
  Menu as MenuIcon,
  FlashOn as FlashOnIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 280;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { admin, logout } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile, isOpen]);

  const navItems = [
     { 
      title: 'Analytics', 
      path: '/', 
      icon: AnalyticsIcon,
      color: '#c2185b'
    },
    { 
      title: 'Clients', 
      path: '/clients', 
      icon: PeopleIcon,
      color: '#2e7d32'
    },
    { 
      title: 'Cleaners', 
      path: '/cleaners', 
      icon: CleaningServicesIcon,
      color: '#7b1fa2'
    },
    { 
      title: 'Bookings', 
      path: '/bookings', 
      icon: WorkIcon,
      color: '#f57c00'
    },
   
  ];



  return (
    <>
      {/* Mobile hamburger button - fully responsive */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'fixed',
          top: { xs: 12, sm: 16 },
          left: { xs: 12, sm: 16 },
          zIndex: 1300,
          display: { xs: 'flex', lg: 'none' },
          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
          color: 'white',
          width: { xs: '48px', sm: '56px' },
          height: { xs: '48px', sm: '56px' },
          '&:hover': {
            background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
          '& svg': {
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
          },
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? isOpen : true}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(226, 232, 240, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          {/* Decorative gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(139, 92, 246, 0.02) 50%, rgba(236, 72, 153, 0.03) 100%)',
              pointerEvents: 'none',
            }}
          />
          
          {/* Logo Section */}
          <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                }}
              >
                <FlashOnIcon sx={{ color: 'white' }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #1f2937, #4b5563)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}
                >
                  Cleaner Admin
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Premium Dashboard
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Divider sx={{ mx: 3, background: 'linear-gradient(90deg, transparent, rgba(156, 163, 175, 0.3), transparent)' }} />

          {/* Navigation */}
          <Box sx={{ flex: 1, overflow: 'auto', py: 2, px: 2, position: 'relative', zIndex: 1 }}>
            <List sx={{ p: 0 }}>
              {navItems.map((item) => {
                // Check if route is active
                // For root or analytics, treat / and /analytics as active states
                const isActive = item.path === '/analytics' 
                  ? (location.pathname === '/' || location.pathname === '/analytics')
                  : (location.pathname === item.path || location.pathname.startsWith(item.path + '/'));
                const IconComponent = item.icon;
                
                return (
                  <ListItem key={item.path} sx={{ px: 1, py: 0.5 }}>
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      onMouseEnter={() => setHoveredItem(item.path)}
                      onMouseLeave={() => setHoveredItem(null)}
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        px: 2,
                        mb: 0.5,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: hoveredItem === item.path ? 'scale(1.02)' : 'scale(1)',
                        background: isActive 
                          ? alpha(item.color, 0.15)
                          : hoveredItem === item.path 
                            ? alpha(item.color, 0.08)
                            : 'transparent',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 4,
                          height: isActive ? 24 : 0,
                          background: item.color,
                          borderRadius: '0 4px 4px 0',
                          transition: 'height 0.3s ease',
                        },
                        '&:hover': {
                          background: alpha(item.color, 0.12),
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isActive 
                              ? item.color
                              : hoveredItem === item.path
                                ? item.color
                                : alpha(item.color, 0.1),
                            color: isActive || hoveredItem === item.path ? 'white' : item.color,
                            transition: 'all 0.3s ease',
                            transform: isActive ? 'scale(1.1)' : 'scale(1)',
                            boxShadow: isActive ? `0 4px 12px ${alpha(item.color, 0.3)}` : 'none',
                          }}
                        >
                          <IconComponent sx={{ fontSize: 20 }} />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? item.color : 'text.primary',
                          fontSize: '0.95rem',
                        }}
                      />
                      <Fade in={isActive}>
                        <ChevronRightIcon 
                          sx={{ 
                            color: item.color, 
                            fontSize: 20,
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                            transition: 'all 0.3s ease',
                          }} 
                        />
                      </Fade>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            
        
          </Box>

          {/* Admin Info & Logout */}
          <Box sx={{ p: 2, borderTop: '1px solid rgba(226, 232, 240, 0.3)', position: 'relative', zIndex: 1 }}>
            {admin && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      fontWeight: 700,
                    }}
                  >
                    {admin.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} noWrap>
                      {admin.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" noWrap>
                      {admin.email}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2, background: 'linear-gradient(90deg, transparent, rgba(156, 163, 175, 0.3), transparent)' }} />
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  sx={{
                    borderColor: '#ef4444',
                    color: '#ef4444',
                    '&:hover': {
                      borderColor: '#dc2626',
                      backgroundColor: 'rgba(239, 68, 68, 0.04)',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>

      
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;