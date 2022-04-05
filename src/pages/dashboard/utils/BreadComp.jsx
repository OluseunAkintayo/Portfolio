import React from 'react';
import { Typography, Breadcrumbs, Box } from '@mui/material';

const BreadComp = (props) => {
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ cursor: 'pointer' }}>
        <Typography>{props.parent}</Typography>
        <Typography>{props.currentPage}</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadComp;
