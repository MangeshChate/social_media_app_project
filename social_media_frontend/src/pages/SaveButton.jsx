import { Button } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import ABI from '../ABI.json';
import Web3 from 'web3';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function SaveButton({ state }) {
    const {contract , web3} = state;


    const { user } = useContext(AuthContext);
    console.log(contract);

    const saveAccount= async() => {

        const ownerAddr = await contract.methods.owner().call();
        axios.put(`http://localhost:8800/api/users/${user._id}`, {
            accountNumber: ownerAddr,
            userId: user._id,
          })
          .then((response) => {
            console.log(response.data); // Handle the response as needed
            console.log(user);
          })
          .catch((error) => {
            console.error(error); // Handle errors here
          });
          
    }



  return (
    <>
  
    <Button className='bg-primary bg-opacity-50' variant="contained" onClick={saveAccount} >
        Save User
    </Button>
    </>
  );
}

export default SaveButton;
