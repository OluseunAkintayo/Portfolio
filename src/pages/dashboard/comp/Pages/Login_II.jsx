import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { TextField, Box, IconButton, OutlinedInput, FormControl, InputLabel, InputAdornment, Button, FormControlLabel, Checkbox, CircularProgress, Typography } from '@mui/material/';
import { VisibilityOff, Visibility, Login } from '@mui/icons-material';
import axios from 'axios';

const Login_II = () => {
  const history = useHistory();
  const [values, setValues] = React.useState({
    usr: '', passcode: '', warning: null,
    showPasscode: false, loading: false, rememberMe: false
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value, warning: null });
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

  const login = e => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": values.usr,
      "passcode": values.passcode
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const newData = JSON.parse(raw);
    const { username, passcode } = newData;

    if(username.trim() === '' || passcode.trim() === '') {
      setValues({ ...values, warning: "Username or password cannot be empty", loading: false });
    } else {
      fetch("http://localhost:5000/api/v2/auth/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        setValues({ ...values, loading: false });
        if(result.success === true) {
          sessionStorage.setItem("sessionToken", result.accessToken);
          sessionStorage.setItem("usrData", JSON.stringify(result.data));
          history.push("/admin/home");
        }
      })
      .catch(error => {
        setValues({ ...values, loading: false, warning: "Unable to communicate with server." });
        console.log({error});
      });
    }
  }

  return (
    <Login_II_Comp>
      <Box
        sx={{ maxWidth: '400px', width: '100%', border: '1px solid lightgray', p: '1.5rem' }}
      >
        <Typography sx={{ fontSize: '2.5ch', color: 'rgba(0, 0, 0, 0.6)' }}>Login to Admin Console</Typography>
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
        {values.warning && <Typography sx={{ color: 'red', marginY: '1ch'}}>{values.warning}</Typography>}
        <LoginBtn
          variant="contained" endIcon={!values.loading && <Login />}
          onClick={(e) => login(e)}
        >
          {!values.loading ? 'Login' : <CircularProgress sx={{ color: 'white'}} size="3.5ch" />}
        </LoginBtn>
      </Box>
    </Login_II_Comp>
  );
};

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