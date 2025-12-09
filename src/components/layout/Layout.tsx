import { ReactNode } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'grey.50',
          minHeight: '100vh',
          overflow: 'auto',
          width: '100%',
          maxWidth: { xs: '100%', lg: 'calc(100% - 280px)' },
        }}
      >
        <Box
          sx={{
            p: {
              xs: 1, // Extra small screens (phones) - reduced padding
              sm: 1.5, // Small screens (tablets)
              md: 2, // Medium screens
              lg: 3, // Large screens
            },
            pt: isMobile ? 7.5 : 2, // Extra top padding on mobile for hamburger menu
            pb: { xs: 2, sm: 3 },
            width: '100%',
            maxWidth: '100%',
            overflow: 'visible',
            pointerEvents: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;