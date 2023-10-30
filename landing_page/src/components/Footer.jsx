import React from 'react'
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material"
function Footer() {
  return (
    <div className="  mt-5 p-5">

      <footer className="white-glassmorphism m-5 text-center text-lg-start">
        <div className="container d-flex justify-content-center py-5">
          <button type="button" className="btn btn-primary  btn-lg btn-floating mx-2" >
            <Facebook className='fs-1 ' />
          </button>
          <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
            <YouTube className='fs-1'/>
          </button>
          <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
            <Instagram className='fs-1'/>
          </button>
          <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
            <Twitter className='fs-1'/>
          </button>
        </div>


        <div className="text-center text-white p-4" >
          © 2023 Copyright All rights reserved to Rabbit Corp

        </div>

      </footer>

    </div>
  )
}

export default Footer
