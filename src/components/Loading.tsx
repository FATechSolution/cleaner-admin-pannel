import React from 'react';
import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';

// Simple loading animation
const loadingAnimation = {
  v: '5.5.2',
  fr: 60,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: 'Loading Animation',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle 1',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
            { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 60, s: [360] },
            { t: 120, s: [360] }
          ],
          ix: 10
        },
        p: { a: 0, k: [100, 100, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            { d: 1, ty: 'el', s: { a: 0, k: [20, 20], ix: 2 }, p: { a: 0, k: [0, -50], ix: 3 }, nm: 'Ellipse Path 1', mn: 'ADBE Vector Shape - Ellipse', hd: false },
            { ty: 'st', c: { a: 0, k: [0.2, 0.6, 1, 1], ix: 3 }, o: { a: 0, k: 100, ix: 4 }, w: { a: 0, k: 0, ix: 5 }, lc: 1, lj: 1, ml: 4, bm: 0, nm: 'Stroke 1', mn: 'ADBE Vector Graphic - Stroke', hd: false },
            { ty: 'fl', c: { a: 0, k: [0.2, 0.6, 1, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, bm: 0, nm: 'Fill 1', mn: 'ADBE Vector Graphic - Fill', hd: false },
            { ty: 'tr', p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 4 }, o: { a: 0, k: 100, ix: 5 }, sk: { a: 0, k: 0, ix: 6 }, sa: { a: 0, k: 0, ix: 7 }, nm: 'Transform' }
          ],
          nm: 'Ellipse Group 1',
          np: 3,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: 'ADBE Vector Group',
          hd: false
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    }
  ],
  markers: []
};

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...', size = 'medium' }) => {
  const sizeMap = {
    small: { width: 80, height: 80 },
    medium: { width: 150, height: 150 },
    large: { width: 200, height: 200 },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: 2,
      }}
    >
      <Box sx={{ ...sizeMap[size] }}>
        <Lottie animationData={loadingAnimation} loop autoplay />
      </Box>
      {message && (
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary',
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;
