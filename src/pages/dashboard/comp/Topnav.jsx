import React from 'react';
import { Box, AppBar, Typography, Toolbar } from '@mui/material';
import { Search } from '@mui/icons-material';
import { styled as muiStyled, alpha, InputBase } from '@mui/material';

const Topnav = () => {
  const [searchText, setSearchText] = React.useState('');
  const menu = ['Profile', 'Logout'];

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, }}>
        <AppBar position="static" sx={{ padding: '0.125rem' }}>
          <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" component="h">
              Techy DNA
            </Typography>
            <SearchComp>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => setSearchText(e.target.value)}
              />
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
            </SearchComp>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};
export default Topnav;

const SearchComp = muiStyled('div')(({ theme}) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row-reverse',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = muiStyled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '24ch',
      },
    },
  },
}));