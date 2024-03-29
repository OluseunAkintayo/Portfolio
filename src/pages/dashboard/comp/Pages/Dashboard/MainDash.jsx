import React from 'react';
import NavComp from '../../../utils/Layout';
import { Typography, Box, Grid } from '@mui/material';
import DrawerHeader from '../../../utils/DrawerHeader';
import BreadComp from '../../../utils/BreadComp';
import { OrderStats, CustomerStats, SalesStats, ProductCount } from './comp/Stats';

const Main = () => {
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, paddingX: 4, paddingY: 2 }}>
        <DrawerHeader />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3ch' }}>
          <Typography sx={{ fontSize: '3ch' }}>
            Overview
          </Typography>
          <BreadComp parent="Dashboard" currentPage="Home" />
        </Box>
        <Box sx={{ flexGrow: 1, }}>
          <Grid container spacing={3}>
            <SalesStats />
            <OrderStats />
            <CustomerStats />
            <ProductCount />
          </Grid>
        </Box>
      </Box>
    </>
  );
};

const MainDash = () => {
  React.useEffect(() => {
    const prev = document.title;
    document.title = "Dashboard: Home";
    return () => document.title = prev;
  });
  return <Main />
};

export default MainDash;