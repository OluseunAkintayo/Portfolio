import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { TextField, Box, IconButton, OutlinedInput, FormControl, InputLabel, InputAdornment, Button, FormControlLabel, Checkbox, CircularProgress, Typography } from '@mui/material/';
import { VisibilityOff, Visibility, Login } from '@mui/icons-material';
import { connect } from 'react-redux';
import axios from 'axios';
import { adminLogin } from '../../../../redux/actions';

const Login_II = ({ auth }) => {
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

  const login = async e => {
    // const loginUrl = "http://localhost:5000/api/v2/auth/login";
    const loginUrl = "https://techydna-app.herokuapp.com/api/v2/auth/login";
    e.preventDefault();
    setValues({ ...values, loading: true });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    
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
      setValues({ ...values, loading: false, warning: "Username or password cannot be empty." });
    } else {
      try {
        const res = await fetch(loginUrl, requestOptions);
        const response = await res.json();
        const { msg, success, ...rest } = response;
        setValues({ ...values, loading: false });
        if(response.success === true) {
          auth(rest);
          history.push("/admin/home");
        } else {
          setValues({ ...values, loading: false, warning: response.msg.toString() });
        }
      } catch (error) {
        setValues({ ...values, loading: false });
        console.error({error});
      }
    }

  }

  return (
    <Login_II_Comp>
      <Box
        sx={{ maxWidth: '400px', width: '100%', border: '1px solid lightgray', p: '1.5rem' }}
      >
        <div>
          <Typography sx={{ fontSize: '2.5ch', color: 'rgba(0, 0, 0, 0.6)' }}>Login to Admin Console</Typography>
          <TextField
            sx={{ marginY: 2 }} id="outlined-basic" label="Username" variant="outlined" fullWidth="true" required
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
              required
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
        </div>
      </Box>
    </Login_II_Comp>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    auth: data => dispatch(adminLogin(data))
  }
}

export default connect(null, mapDispatchToProps)(Login_II);

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