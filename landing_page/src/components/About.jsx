import React, { useEffect, useState } from 'react'

function About({state}) {
const [about , setAbout] = useState("");
  useEffect(()=>{
    const {contract} = state;
    const des = async()=>{
      const about = await contract.methods.about().call();
     setAbout(about)

    }
    contract && des();

  },[state])

  return (
    <div className=' m-5 p-5'>
      <div className='m-5'>
        <h1 className='fw-bold text-gradient'>
        Empower Your Digital Journey with Rabbit Chat 
        </h1>
        <p className='fs-3 text-secondary mt-5 text-secondary'>
        {about}
        </p>
      </div>
    </div>
  )
}

export default About
