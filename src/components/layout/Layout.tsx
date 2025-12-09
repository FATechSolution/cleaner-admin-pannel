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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'grey.50',
          minHeight: '100vh',
          overflow: 'auto',
          width: '100%',
        }}
      >
        <Box
          sx={{
            p: {
              xs: 1.5, // Extra small screens (phones)
              sm: 2,   // Small screens (tablets)
              md: 2,   // Medium screens
              lg: 3,   // Large screens
            },
            pt: isMobile ? 8 : 2, // Extra top padding on mobile for hamburger menu
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;