import React from 'react'
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { TextField, Box, IconButton, OutlinedInput, FormControl, InputLabel, InputAdornment, Button, FormControlLabel, Checkbox } from '@mui/material';
import { VisibilityOff, Visibility, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login_II = () => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    usr: '', passcode: '',
    showPasscode: false, loading: false, rememberMe: false
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handlePasswordToggle = () => {
    setValues({
      ...values,
      showPasscode: !values.showPasscode,
    });
  };

  const onCheckboxChange = () => {
    setValues({ ...values, rememberMe: !values.rememberMe });
  }

  return (
    <Login_II_Comp>
      <Box
        sx={{ maxWidth: '400px', width: '100%', border: '1px solid lightgray', p: '1.5rem' }}
      >
        <h3>Login to Admin Console</h3>
        <TextField
          sx={{ marginY: 2 }} id="outlined-basic" label="Username" variant="outlined" fullWidth="true"
          onChange={handleChange('usr')}
        />
        <FormControl sx={{ marginY: 2, width: '100%', }} variant="outlined">
          <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
          <OutlinedInput
            sx={{ height: '100%' }}
            id="outlined-adornment-password"
            type={values.showPasscode ? 'text' : 'password'}
            value={values.passcode}
            onChange={handleChange('passcode')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handlePasswordToggle}
                  edge="end"
                >
                  {values.showPasscode ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControlLabel control={<Checkbox onChange={onCheckboxChange} />} label="Remember me" />
        <LoginBtn
          variant="contained" endIcon={<Login />}
          onClick={() => navigate("/admin/home")}
        >
          Login
        </LoginBtn>
      </Box>
    </Login_II_Comp>
  )
}
export default Login_II;

const LoginBtn = muiStyled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[600],
  '&:hover': {
    backgroundColor: blue[700],
    transition: 'ease-out 0.3s'
  },
  width: '100%',
  margin: '0.5rem 0',
  height: '3rem'
}));

const Login_II_Comp = styled.div`
  height: 100vh;
  width: 100%;
  background: rgb(255, 255, 255);
  color: rgb(17, 24, 39);
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    margin: 0.5rem 0 1rem 0;
  }
`;