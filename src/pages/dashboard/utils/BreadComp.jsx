import React from 'react';
import { Typography, Breadcrumbs } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';

const BreadComp = (props) => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/admin/home">
          {props.parent}
        </Link>
        <Link underline="hover" to=''>
          {props.subParent}
        </Link>
        <Typography color="text.primary">
          {props.currentPage}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadComp;
