import React from 'react';
import IndexList from '../IndexList';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';

const Index = () => {
  return (
    <Box sx={{ maxWidth: 1000 }}>
      <h1>Welcome to Rowing Calculator</h1>
      <Paper>
        <IndexList />
      </Paper>
    </Box>
  );
}

export default Index
