import React from 'react';
import { styled as muiStyled,Box, Grid, Paper, Card, CardContent, CardActions, Typography } from '@mui/material';
import { useCountUp } from 'react-countup';
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
      <GridItem sx={{ background: '#1c1d72e5', color: 'whitesmoke', height: '18.5ch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>
          <CountUp style={{ fontSize: '2.25rem', marginRight: '0.375rem' }} duration={5} end={15095} />
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