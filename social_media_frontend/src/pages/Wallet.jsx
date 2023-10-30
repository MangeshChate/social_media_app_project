import React from 'react'
import cyberbg from '../assets/cyberpunk-bg.gif'
import { ArrowBack, ArrowForward, ForkRight, Login, OneK } from '@mui/icons-material'
import { Link } from 'react-router-dom'
function Wallet() {



    



    return (
        <>
            <div className='login ' style={{ backgroundImage: `url(${cyberbg})` }}>


                <div className='login w-100 h-100 white-glassmorphism '>
                    <div className='position-absolute top-0 container-fluid d-flex justify-content-end'>
                        <Link to="/login" className='text-light text-decoration-none m-3 gap-3 fw-bold fs-4 right-0 '><span> Login</span> <ArrowForward /> </Link>

                    </div>

                    <div className="loginWrapper d-flex justify-content-center align-items-center ">
                        <div className="loginLeft">
                            <h3 className='loginLogo '>Your RabbitChat Journey Begins Here</h3>
                            <span className="loginDesc ">
                                Let's SetUp Your Metamask Account
                            </span>
                        </div>
                        <div className="loginRight  loginBox blue-glassmorphism d-flex flex-column justify-content-start">
                            <div className='d-flex flex-column align-items-center bg-dark p-3 bg-opacity-75 rounded-5 '>

                                <img src="https://houseoffirst.com/images/misc/mm_twitch_no_matte.gif" style={{ width: "100px" }} className='img-fluid object-fit-cover' alt="" />
                                <h2 className='fw-bold text-center '>Getting Started with MetaMask
                                </h2>
                            </div>

                            <hr />
                            <div className='d-flex flex-column align-items-center justify-content-center container-fluid'>

                                <div className='d-flex flex-column fw-bold gap-4 mt-3 fs-5  '>

                                    <span >Step 1: <span className='ms-3'>Install MetaMask Extension</span></span>
                                    <span>Step 2: <span className="ms-3"> Set Up a Wallet</span> </span>
                                    <span>Step 3: <span className="ms-3">Connect to RabbitChat</span> </span>
                                    <span>Step 4:
                                        <button className='btn btn-primary bg-primary bg-opacity-25  rounded-5 shadow  ms-4 fw-bold  '>Connect Metamask</button>
                                    </span>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default Wallet
