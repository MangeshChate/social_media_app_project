import React, { useContext, useEffect, useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import { Add } from '@mui/icons-material';
import VideoCard from './VideoCard';
import { CircularProgress, Grid } from '@mui/material';

import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../context/AuthContext';
import DescriptionEnhance from '../../components/DescriptionEnhance';
import { Link } from 'react-router-dom';

function RabbiTube({ state, saveState }) {
    // const { user } = useContext(AuthContext);
    // const PF = import.meta.env.VITE_PUBLIC_FOLDER;

    //props
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUpload, setVideoUpload] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [tubes, setTubes] = useState([]);
    // const thumbnailListRef = ref(storage, 'thumbnails/');
    // const videoListRef = ref(storage, 'videos/');
    const [desAi , setDesAi] = useState('');



    const uploadVideoAndImage = async () => {
        if (videoUpload == null || imageUpload == null) return;

        const videoRef = ref(storage, `videos/${uuidv4()}-${videoUpload.name}`);
        const imageRef = ref(storage, `images/${uuidv4()}-${imageUpload.name}`);

        setUploadingVideo(true);
        setUploadingImage(true);

        Promise.all([
            uploadBytes(videoRef, videoUpload),
            uploadBytes(imageRef, imageUpload)
        ])
            .then(() => {
                return Promise.all([
                    getDownloadURL(videoRef),
                    getDownloadURL(imageRef)
                ]);
            })
            .then(async ([videoDownloadURL, imageDownloadURL]) => {
                setVideoUrl(videoDownloadURL);
                setThumbnail(imageDownloadURL);


                // Deploy on Blockchain
                try {
                    const { contract, web3 } = state;
                    const accounts = await web3.eth.getAccounts();

                    // Check if videoUrl and thumbnail are set before calling the contract function
                    if (videoDownloadURL && imageDownloadURL) {
                        contract.methods.addTube(accounts[0], title, description, videoDownloadURL, imageDownloadURL)
                            .send({ from: accounts[0] })
                            .then(() => {
                                alert("Successfully, Share Video on Blockchain!");
                            })
                            .catch((error) => {
                                alert("Transaction not successful!");
                                console.error(error);
                            });
                    } else {
                        alert("Missing video URL or thumbnail URL.");
                    }
                } catch (error) {
                    alert("Blockchain interaction failed!");
                    console.error(error);
                }
            })
            .catch((error) => {
                console.error('Error during upload:', error);
            })
            .finally(() => {
                setUploadingVideo(false);
                setUploadingImage(false);
            });
    };

    useEffect(() => {
        const { contract } = state;
        const tubes = async () => {
            const res = await contract.methods.getTube().call();
            setTubes(res);
        }
        contract && tubes();
    }, [state]);



const handleDes = () =>{
    setDesAi(description);
}



    return (
        <div className="vw-100 vh-100 overflow-y-scroll gradient-bg-welcome text-light">
            <Topbar saveState={saveState} />
            <div className="d-flex align-items-center justify-content-between p-5">
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
                <div>
                    <Add
                        className=" me-5"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ cursor: "pointer" ,fontSize:"3rem" }}
                    />

                    <div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog modal-dialog-centered modal-xl h-100">
                            <div className=" blue-glassmorphism d-flex w-100  " >
                                <div className="modal-content white-glassmorphism border-0 rounded-0   w-50">
                                    <div className='p-4' >

                                        <h4 className="pt-4 ps-5 pe-5 font-monospace rounded-3 fw-bold text-center">
                                            Share Video Securely on the Blockchain
                                        </h4>
                                        <div className="p-4">
                                            <form action="">
                                                <input type="text" className="form-control rounded-2 p-2 shadow border-0 bg-white bg-opacity-50" placeholder="Video Title"
                                                    onChange={(e) => setTitle(e.target.value)} />
                                                <textarea className="form-control mt-3 bg-white bg-opacity-50 border-0 shadow" placeholder="Video Description ..."
                                                    onChange={(e) => setDescription(e.target.value)}
                                                ></textarea>

                                                <div className="d-flex flex-column mt-4 gap-2">
                                                    <span className="fw-bold">
                                                        Upload Video
                                                    </span>
                                                    <input type="file" accept="video/*" className="form-control blue-glassmorphism" onChange={(e) => setVideoUpload(e.target.files[0])} />
                                                </div>

                                                <div className="d-flex flex-column mt-4 gap-2">
                                                    <span className="fw-bold">
                                                        Upload Thumbnail
                                                    </span>
                                                    <input type="file" accept="image/*,.gif" className="form-control blue-glassmorphism" onChange={(e) => setImageUpload(e.target.files[0])} />
                                                </div>
                                                <div className='text-center d-flex flex-column gap-3'>
                                                    <span className='mt-5'>
                                                        {uploadingVideo && "Uploading Video may take some time !"}
                                                    </span>
                                                    <span className='btn  shadow-lg font-monospace text-light bg-info fs-5 w-100 rounded-5 fw-bold  bg-opacity-25'
                                                        onClick={uploadVideoAndImage}
                                                    >
                                                        {uploadingVideo ? <CircularProgress style={{ fontSize: "0.8rem" }} /> : 'Share video'}

                                                    </span>

                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                    
                                </div>
                                <div className="white-glassmorphism modal-content border-0 rounded-0 w-50">
                                    <div className="p-4 d-flex flex-column align-items-center">
                                       
                                            <img src="https://cdn-icons-png.flaticon.com/512/802/802338.png" alt="" className='img-fluid object-fit-cover  'style={{width:"84px" , height:"84px",cursor:"pointer" }} onClick={handleDes}/>
                                            <div className='m-4 w-100 rounded-5  bg-dark bg-opacity-75 text-light p-3 ' style={{height:"400px"}}>
                                            <p className='h-100 fs-5 font-monospace overflow-y-scroll'>
                                                <DescriptionEnhance textMessage={desAi}/>
                                                
                                            </p>
                                            </div>
                                       
                                    </div>
                                </div>
                            </div>
                                    
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <Grid container spacing={5}>

                    {tubes.length === 0 ? (
                        <div className='m-5 fw-bold p-5 rounded-5 white-glassmorphism fs-4 h-100 w-100 text-center d-flex align-items-center justify-content-center'>
                            <p>Connect to Blockchain</p>

                        </div>
                    ) : (
                        tubes.slice().reverse().map((tube) => (
                            <Grid item xs={12} sm={6} md={3}>
                                <VideoCard account={tube.account} title={tube.title} description={tube.description} videoUrl={tube.videoUrl} thumbnail={tube.thumbnail} timestamp={tube.timestamp} />
                            </Grid>
                        ))
                    )}


                </Grid>
            </div>
        </div>
    );
}

export default RabbiTube;
