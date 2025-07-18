import React from 'react';
import { Box, CircularProgress, Typography, Skeleton } from '@mui/material';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  type = 'spinner',
  fullHeight = false,
  skeletonRows = 5,
  skeletonHeight = 60
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 20;
      case 'medium': return 40;
      case 'large': return 60;
      default: return 40;
    }
  };

  const getHeight = () => {
    if (fullHeight) return '100vh';
    switch (size) {
      case 'small': return '100px';
      case 'medium': return '200px';
      case 'large': return '400px';
      default: return '200px';
    }
  };

  if (type === 'skeleton') {
    return (
      <Box sx={{ width: '100%' }}>
        {Array.from({ length: skeletonRows }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={skeletonHeight}
            sx={{ mb: 1, borderRadius: 1 }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: getHeight(),
        width: '100%',
      }}
    >
      <CircularProgress size={getSize()} />
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner; 