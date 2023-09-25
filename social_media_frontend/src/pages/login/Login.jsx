import React, { useContext, useRef } from 'react'
import './login.css';
import { loginCall } from '../../apiCalls';
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress ,Box, Button} from '@mui/material'

function Login() {

  const email = useRef();
  const password = useRef();
  const {user,isFetching ,error , dispatch} = useContext(AuthContext);
 
  const handleClick = (e) =>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value} ,dispatch)
  }
  console.log(user)
  return (
    <div className='login'>
      
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className='loginLogo'>RabbitChat</h3>
        <span className="loginDesc">
            Connect with friends and world around you on Rabbitchat.
        </span>
        </div>
        <div className="loginRight">
            <form onSubmit={handleClick} className="loginBox">
              
                <input type="email" className="loginInput" placeholder='Enter Email'ref={email} required/>
                <input type="password" className="loginInput"  placeholder='Enter Password' ref={password} minLength={"6"} required/>
                <button className="loginButton" type="submit" disabled={isFetching}>
                  {isFetching ? <CircularProgress sx={{color:"white" }} size="25px"/> : "Log In"}
                </button>
                <span className='loginForgot'>Forgot Password?</span>
                <button  className="loginRegisterButton">
                {isFetching ? <CircularProgress sx={{color:"white" }} size="25px"/> : "Create a New account"}
                </button>
            </form>
        </div>
        

      </div>
    </div>
  )
}

export default Login
