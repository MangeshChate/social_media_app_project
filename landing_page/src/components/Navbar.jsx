import React, { useState } from 'react'
import ABI from './ABI.json';
import Web3 from "web3";

function Navbar({saveState}) {
  const [connected , setConnected] = useState(true);

  const init = async() => {
    try{
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({method:'eth_requestAccounts'});

      const contract = new web3.eth.Contract(
        ABI,
        "0xf5070C1913419a9B8ef97Ed92751a86f6F0A4FCb"
      );
      setConnected(false);
      saveState({web3:web3 , contract:contract});
    }catch(err){
      alert('Please Install Metamask !')
    }
  }

  return (
  <nav className='p-3 row d-flex align-items-center w-100'>
    <div className="navbar-brand col-2">
      <h3 className='fw-bolder '>RabbitChat</h3>
    </div>
    <div className="navmenu col-8 d-flex justify-content-center">
      <div className='d-flex gap-5 align-items-center '>
        <span  className='  fw-bold' >Home</span>
        <span className='  fw-bold' >Features</span>
        <span  className='  fw-bold'>About</span>
        <span className='  fw-bold' >Contact</span>

      </div>
    </div>
    <div className="connectbtn col-2 d-flex justify-content-end ">
    <button className="btn btn-outline-info border-2 rounded-2 me-5 fw-bold " disabled={!connected} onClick={init}>
        {connected ? "Connect Metamask" : "Connected"}
      </button>
    </div>
  </nav>
  )
}

export default Navbar
