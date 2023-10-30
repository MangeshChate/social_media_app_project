import React, { useEffect, useRef, useState } from 'react'
import './register.css'
import axios from 'axios';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {Button} from '@mui/material'

function Register() {

   const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Changed from 'usern' to 'user'
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value); // Fixed passing email and password as values
        const newUser = userCredential.user;
        await sendEmailVerification(newUser); // Fixed variable name 'newUser'
        if (newUser && !newUser.emailVerified) { // Fixed variable name 'newUser'
          setError('Please verify your email by clicking the verification link sent to your email address.');
        }
      } catch (error) {
        setError(error.message);
      }

      const newUser = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("http://localhost:8800/api/auth/register", newUser); // Fixed variable name 'newUser'
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (user && user.emailVerified) {
      navigate('/login');
    } else {
      console.log('User is not verified');
    }
  }, [user, navigate]);

  return (


    <div className='login gradient-bg-welcome  '>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className='loginLogo text-gradient'>RabbitChat</h3>
          <span className="loginDesc text-secondary">
          New Generation Social Media Web3 Application.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox white-glassmorphism">
            <input type="text" className="loginInput " placeholder='Enter Username' ref={username} required />
            <input type="email" className="loginInput" placeholder='Enter Email' ref={email} required />
            <input type="password" className="loginInput" minLength={6} placeholder='Password' ref={password} required />
            <input type="password" className="loginInput" placeholder='Password Again' ref={passwordAgain} required />
            {error && <p className="text-danger">{error}</p>}
            {user && user.emailVerified && <p>Email is verified!</p>}
            <Button className="loginButton mt-4" variant="contained" type="submit">Sign Up</Button>
            <Link to="/login" className='d-flex justify-content-center text-decoration-none'>

              <Button variant="contained" color='success' className="loginRegisterButton  d-flex  justify-content-center align-items-center">Log in to your account</Button>
            </Link>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Register
