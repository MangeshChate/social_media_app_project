import React, { useRef } from 'react'
import './register.css'
import axios from 'axios';
import {useNavigate} from 'react-router'
function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate()
  

  const handleClick = async(e) =>{
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match !");
    }else{
      const user= {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
        
      }
      try {
         await axios.post("http://localhost:8800/api/auth/register",user);
         navigate('/login')
         
      } catch (error) {
        console.log(error)
      }
    }
  
  }
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
            <input type="text" className="loginInput" placeholder='Enter Username' ref={username} required />
            <input type="email" className="loginInput" placeholder='Enter Email'  ref={email} required/>
            <input type="password" className="loginInput" minLength={6} placeholder='Password'ref={password} required />
            <input type="password" className="loginInput" placeholder='Password Again' ref={passwordAgain} required/>

            <button className="loginButton" type="submit">Sign Up</button>

            <button className="loginRegisterButton">Log in to your account</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Register
