import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(0 0 0 / 4%)'
    }}>
        <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default Loading;
