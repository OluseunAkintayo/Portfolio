import React from 'react';
import styled from 'styled-components';
import { PersonOutline, Key, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from '@mui/material';

const Login = () => {

  let [inputType, setInputType] = React.useState("password");
  let toggleInputType = () => {
    if(inputType === "password"){
      return "text"
    } else {
      return "password"
    }
  }

  React.useEffect(() => {
    document.title = "Login to Dashboard";
  }, []);

  return (
    <LoginComp>
      <div className="login-container">
        <h3>Login to admin dashboard</h3>
        <form>
          <div className="form-input">
            <PersonOutline className="loginIcon" />
            <input type="text" placeholder='Enter Username' />
          </div>
          <div className="form-input">
            <Key className="loginIcon" />
            <input type={inputType} placeholder='Enter Password' />
            {/* {<Visibility />} */}
          </div>
          <div className="rememberMe">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor='rememberMe'>Remember me</label>
          </div>
          <Button variant="contained" id="loginBtn">Login</Button>
        </form>
      </div>
    </LoginComp>
  );
};

export default Login;

const LoginComp = styled.div`
  height: 100vh;
  width: 100%;
  background: rgb(255, 255, 255);
  color: rgb(17, 24, 39);
  display: flex;
  align-items: center;
  justify-content: center;

  .login-container {
    width: 100%;
    max-width: 400px;
    border: 1px solid gray;
    padding: 1rem;
    border-radius: 0.375rem;
    h3 {
      margin: 1rem 0;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .form-input {
        width: 100%;
        height: 2.25rem;
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        overflow: hidden;
        border: 1px solid lightgray;

        .loginIcon {
          padding: 0.25rem;
          height: 100%;
          width: 2rem;
          background: #1976d2;
          color: whitesmoke;
        }

        input[type=text], input[type=password] {
          height: 100%;
          width: 100%;
          border: none;
          outline: none;
          padding: 0 0.625rem;
        }
      }

      .rememberMe {
        width: 100%;
        height: 2rem;
        margin: 0.25rem 0;
        display: flex;
        align-items: center;
        input[type=checkbox] {
          height: 1.125rem;
          width: 1.125rem;
          margin-right: 0.5rem;
        }
        label {
          cursor: pointer;
        }
      }

      #loginBtn {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
`;