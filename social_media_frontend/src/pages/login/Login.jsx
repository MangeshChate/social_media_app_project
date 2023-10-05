import React, { useContext, useRef } from 'react'
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from "../../context/AuthContext"
import { CircularProgress, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom';

function Login() {

  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch)
  }
  console.log(user)
  return (
    <div className='login gradient-bg-services'>

      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className='loginLogo text-gradient'>RabbitChat</h3>
          <span className="loginDesc text-secondary">
            New Generation Social Media Web3 Application.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox white-glassmorphism">

            <input type="email" className="loginInput" placeholder='Enter Email' ref={email} required />
            <input type="password" className="loginInput" placeholder='Enter Password' ref={password} minLength={"6"} required />
            <Button variant='contained' color="primary" className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress sx={{ color: "white" }} size="25px" /> : "Log In"}
            </Button>
            <span className='loginForgot'>Forgot Password?</span>
            <Link to="/register" className=' text-decoration-none d-flex justify-content-center'>
              <Button variant="contained" color="success" className="loginRegisterButton d-flex justify-content-center align-items-center text-decoration-none">
                {isFetching ? <CircularProgress sx={{ color: "white" }} size="25px" /> : "Create a New account"}
              </Button>
            </Link>
          </form>
        </div>


      </div>
    </div>
  )
}

export default Login
