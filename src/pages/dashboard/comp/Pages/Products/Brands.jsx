import React from 'react';
import { Box, Typography } from '@mui/material';
import BreadComp from '../../../utils/BreadComp';
import DrawerHeader from '../../../utils/DrawerHeader';

const Brands = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, paddingX: 4, paddingY: 2 }}>
      <DrawerHeader />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3ch' }}>
          <Typography sx={{ fontSize: '3ch' }}>
            Brands 
          </Typography>
          <BreadComp parent="Dashboard" currentPage="Brands" />
      </Box>

    </Box>
  );
};

export default Brands;
