import React, { useEffect, useState } from 'react';
import '../App.css';

function Hero({ state }) {
  const [name, setName] = useState("");
  const [video, setVideo] = useState("");

  useEffect(() => {
    const { contract } = state;

    const des = async () => {
      const AppName = await contract.methods.nameOfApp().call();
      const video = await contract.methods.heroVideo().call();
      setName(AppName);
      setVideo(video);
    }

    contract && des();
  }, [state])

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
      <div className='position-absolute bg-light p-3 rounded-5'>
        {state.contract ? (
          <video
            autoPlay
            loop
            muted
            className='z-0 rounded-5 shadow-lg'
            style={{ objectFit: 'cover', width: '90vw', height: '90vh' }}
          >
            <source src={"https://cdn-l-cyberpunk.cdprojektred.com/video/EP1_ProjectAce_clean_16x9_15s-av1.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>You have not connected Metamask.</p>
        )}
      </div>

      <div className='vh-100 mt-5 w-100 p-5 z-2' style={{ position: 'relative', zIndex: 1 }}>
        <div className='row h-75 p-5 justify-content-center align-items-center'>
          <div className="col-8 d-flex p-5 flex-column justify-content-center mt-5 h-75">
            {state.contract ? (
              <React.Fragment>
                <h1 className='fw-bold mb-3 text-gradient' style={{ fontSize: "7rem" }}>{name}</h1>
                <div className="wrapper text-secondary">
                  <h4 className='w-75'>
                    {video}
                  </h4>
                </div>
                <button className='btn btn-info btn-lg rounded-3 w-50 fs-4 fw-bold shadow mt-5' >Let's Experience</button>
              </React.Fragment>
            ) : (
              <div style={{height:"100%"}} className="eth-card container w-100 p-5 rounded-5 d-flex align-items-center justify-content-center  bg-dark" >
                <h1 className=' fw-bold  text-center ' style={{fontSize:"3em"}}> Connect Metamask to see content.</h1>

              </div>
            )}
          </div>
          <div className="col-4 p-5 h-75">
            {/* Additional content */}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
