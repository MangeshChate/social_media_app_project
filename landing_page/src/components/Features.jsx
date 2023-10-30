import React, { useEffect, useState } from 'react'

function Features({state}) {

  const [ethInfo , setEthInfo] = useState("");
  const [ethImg , setEthImg] = useState("");
  const [aiInfo , setAIInfo] = useState("")
  const [aiImg , setAIImg] = useState("")

  useEffect(()=>{
    const {contract} = state;
    const des = async()=>{
      const ethInfo = await contract.methods.ethereumInfo().call();
      const ethImg = await contract.methods.ethereumImg().call();
      const aiInfo = await contract.methods.aiInfo().call();
      const aiImg = await contract.methods.aiImg().call();
      setEthImg(ethImg);
      setAIImg(aiImg)
      setAIInfo(aiInfo)
      setEthInfo(ethInfo)

    }
    contract && des();

  },[state])

  return (
    <div className='m-5 p-5' style={{height:"150vh"}}>
     <div className='row d-flex m-5 shadow-lg rounded-5 p-5 blue-glassmorphism'>
      <div className="col-6 d-flex align-items-center">
        <h1 className='fw-bold w-75 text-center'>{ethInfo}</h1>
      </div>
      <div className="col-6 d-flex justify-content-center align-items-center">
        <div className='bg-light p-3 rounded-5'>
          <img src={ethImg} className='img-fluid  rounded-5 shadow' alt="" style={{height:"500px" , width:"500px"}} />
        </div>
      </div>
     </div>



     <div className='row d-flex m-5 shadow-lg rounded-5 p-5 white-glassmorphism'>
     <div className="col-6 d-flex justify-content-center align-items-center">
        <div className='bg-light p-3 rounded-5'>
          <img src={aiImg} style={{height:"500px" ,width:"500px"}}className='img-fluid rounded-5 shadow' alt="" />
        </div>
      </div>
      <div className="col-6 d-flex align-items-center">
        <h1 className='fw-bold w-75 text-center'> {aiInfo}
      </h1>
      </div>
     
     </div>
    </div>
  )
}

export default Features
