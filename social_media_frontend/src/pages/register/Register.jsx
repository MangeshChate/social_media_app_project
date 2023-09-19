import React from 'react'
import './register.css'
function Register() {
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
          <div className="loginBox">
              <input type="text" className="loginInput"  placeholder='Enter Username'/>
              <input type="email" className="loginInput" placeholder='Enter Email' />
              <input type="password" className="loginInput"  placeholder='Password'/>
              <input type="password" className="loginInput"  placeholder='Password Again'/>

              <button className="loginButton">Sign Up</button>
              
              <button className="loginRegisterButton">Log in to your account</button>
          </div>
      </div>

    </div>
  </div>
  )
}

export default Register
