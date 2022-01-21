import React from 'react';
import { Box, Typography } from '@mui/material';
import NavComp from '../../../utils/NavComp';
import DrawerHeader from '../../../utils/DrawerHeader';
import BreadComp from '../../../utils/BreadComp';

const AccountsComp = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, paddingX: 4, paddingY: 2 }}>
        <DrawerHeader />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3ch' }}>
          <Typography sx={{ fontSize: '3ch' }}>
            Users
          </Typography>
          <BreadComp parent="Dashboard" currentPage="Users" />
        </Box>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Users...
        </Typography>
    </Box>
  );
};

const Accounts = () => {
  React.useEffect(() => {
    const prev = document.title;
    document.title = "Dashboard: Users";
    return () => document.title = prev;
  });
  return (
    <NavComp NavPage={<AccountsComp />} />
  )
}
export default Accounts;