import { Button } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import ABI from '../ABI.json';
import Web3 from 'web3';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function ConnectButton({ saveState }) {
  const { user } = useContext(AuthContext);
  
  const [ownerAddress, setOwnerAddress] = useState('');
  const [connected, setConnected] = useState(true);
  const init = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const contract = new web3.eth.Contract(
        ABI,
        '0xBDFdb3524A125Ad036D62A399797092831ef5477'
      );
      setConnected(false);
      saveState({ web3: web3, contract: contract });

      const ownerAddr = await contract.methods.owner().call();
      setOwnerAddress(ownerAddr);
    } catch (error) {
      alert('Please Install Metamask! Already installed, then there may be an "Internal Server Error".');
      console.error(error);
    }
  

  // Use a useEffect to log ownerAddress when it's updated and make Axios PUT request
  
}


  return (
    <Button variant="outlined" sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='text-light rounded-5' disabled={!connected} onClick={init}>
      <span>{connected ? 'Connect' : 'Connected'}</span>
      <img
        src={
          connected
            ? 'https://images.ctfassets.net/9sy2a0egs6zh/2XUXAYxxFFVjPlZABUoiLg/d0ff82237d3e5d9bd1097a98e0754453/MMI-icon.svg'
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png'
        }
        style={{ height: '30px', width: '30px' }}
        className='img-fluid object-fit-cover'
        alt=''
      />
    </Button>
  );
}

export default ConnectButton;
