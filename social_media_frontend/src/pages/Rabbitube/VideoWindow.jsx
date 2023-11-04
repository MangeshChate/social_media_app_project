import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import { Facebook, Share, Twitter, WhatsApp, Window } from '@mui/icons-material'
import { Link } from 'react-router-dom'







function VideoWindow() {

const storedAccount = localStorage.getItem("account");
const storedTitle = localStorage.getItem("title");
const storedDescription = localStorage.getItem("description");
const storedVideoUrl = localStorage.getItem("videoUrl");
const storedThumbnail = localStorage.getItem("thumbnail");


const storedTimestamp = localStorage.getItem("timestamp");


   
    return (
        <div>
            <div className='vw-100 vh-100 gradient-bg-welcome text-light'>
                <Topbar />
                <div className='d-flex  align-items-center justify-content-between p-4 '>
                <Link to="/rabitube" className="text-light text-decoration-none d-flex">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/802/802338.png"
                        alt=""
                        className="img-fluid object-fit-cover"
                        style={{ height: "64px" }}
                    />
                    <div className="d-flex flex-column font-monospace">
                        <span className="fs-2 fw-bold font-monospace">RabbiTube</span>
                        <span className="text-secondary">Web3.0 Video Shareing App</span>
                    </div>
                </Link>

                    <Link to = "/rabitube">
                        <Window className='fs-1 me-4'/>
                    </Link>
                </div>

                <div className='p-4'>

                    <div className="row ">
                        <div className="col-8">
                            <div className=''>
                               
                                <video controls poster={storedThumbnail}  className='w-100  rounded-4 shadow white-glassmorphism'>
                                    <source src={storedVideoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                        <div className="col-4 p-2">
                                <div className='white-glassmorphism w-100 p-5 rounded-3 h-100'>
                                        <div className="title fw-bold m-3 ">
                                            <span className="fs-3 fw-bold ">{storedTitle}</span>
                                            <span className='m-3  text-secondary fs-6 fw-medium'>  {new Date(storedTimestamp * 1000).toLocaleDateString()}</span>
                                        </div>
                                        <span className='text-secondary m-3'>
                                            {storedAccount}
                                        </span>
                                        <div className="blue-glassmorphism  rounded-4 mt-5 overflow-y-scroll " style={{height:"350px"}}>
                                          
                                            <p className='fs-5 p-4 '>
                                                {storedDescription}
                                            </p>
                                        </div>

                                        <div className='d-flex gap-4 mt-4'>
                                            <Share className='fs-1 me-3 text-primary'/>
                                            <WhatsApp className='fs-1'/> 
                                            <Facebook className='fs-1'/>
                                            <Twitter className='fs-1'/>
                                        </div>
                                </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default VideoWindow
