import React from 'react';
import { styled as muiStyled, Grid, Paper, Typography } from '@mui/material';
import CountUp from 'react-countup';

const GridItem = muiStyled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export const OrderStats = () => {
  return (
    <Grid item xs={4}>
      <GridItem sx={{ background: 'whitesmoke', height: '18.5ch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>
          <CountUp style={{ fontSize: '2.25rem', marginRight: '0.375rem' }} duration={2} end={11015} />
          <span>Orders</span>
        </Typography>
        <Typography>
          This Month
        </Typography>
      </GridItem>
    </Grid>
  );
};

export const CustomerStats = () => {
  return (
    <Grid item xs={4}>
      <GridItem sx={{ background: 'whitesmoke', height: '18.5ch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>
          <CountUp style={{ fontSize: '2.25rem', marginRight: '0.375rem' }} duration={2} end={15095} />
          <span>Customers</span>
        </Typography>
        <Typography>
          This Month
        </Typography>
      </GridItem>
    </Grid>
  );
};

export const SalesStats = () => {
  return (
    <Grid item xs={4}>
      <GridItem sx={{ background: 'whitesmoke', height: '18.5ch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>
          <span style={{ fontSize: '2.25rem'}}>N </span>
          <CountUp style={{ fontSize: '2.25rem' }} duration={2} end={97} />
          <span style={{ fontSize: '2.25rem', marginRight: '0.375rem'}}>m</span>
          <span>Revenue</span>
        </Typography>
        <Typography>
          This Month
        </Typography>
      </GridItem>
    </Grid>
  );
};

export const ProductCount = () => {
  return (
    <Grid item xs={4}>
      <GridItem sx={{ background: 'whitesmoke', height: '18.5ch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>
          <CountUp style={{ fontSize: '2.25rem', marginRight: '0.375rem' }} duration={2} end={7051} />
          <span>Products</span>
        </Typography>
        <Typography>
          and counting
        </Typography>
      </GridItem>
    </Grid>
  );
};