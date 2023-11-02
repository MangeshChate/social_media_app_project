import React, { useEffect, useState } from 'react';
import { Tooltip } from "@mui/material"
import { Send } from "@mui/icons-material"
function Modal({ toAccount , state }) {

    const [name, setName] = useState('');
    
    const [amount, setAmount] = useState('');

    const sendEther = async (e) => {
        e.preventDefault();
        try {
            const { contract, web3 } = state;
            const weiValue = web3.utils.toWei(amount, "ether");
            const accounts = await web3.eth.getAccounts();

            await contract.methods.sendEther(toAccount, name).send({
                from: accounts[0],
                value: weiValue,
                gas: 325666,
            });

            alert("Transaction Successful!");
            setName('');
            setAmount('')
        } catch (error) {
            alert("Transaction not successful!");
            console.log(error);
        }
    }
   

    return (
        <div>
            <Tooltip title="Donate Ether" arrow>
                <span
                    className='ms-4 me-3 '
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/512px-Ethereum-icon-purple.svg.png?20200227011040" className='img-fluid object-fit-cover rounded-5' style={{ width: "41px" }} alt="" />
                </span>
            </Tooltip>

            <div className="modal modal-fade  " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: 9999 }}>
                <div className="modal-dialog me-5  blue-glassmorphism">
                    <div className="modal-content blue-glassmorphism rounded-3 ">
                        <div className='modal-wrapper m-5 d-flex flex-column align-items-center  '>
                            <h3 className='fw-bold'>Show Your Appreciation</h3>
                            <h6 className="text-secondary">(Donate Ether)</h6>
                            <span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/512px-Ethereum-icon-purple.svg.png?20200227011040" className='object-fit-cover img-fluid rounded-5' width={42} alt=""  />

                            </span>
                            <hr />
                            <form action="" className='w-100' onSubmit={sendEther}>
                                <input type="text" placeholder='Enter Amount Of Ether' className=' rounded-2 shadow form-control rounded-0 bg-light fw-bold text-info m-2 bg-opacity-25 border-0 ' 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)} required/>

                                <div className="p-2 overflow-x-scroll m-2 mt-3 rounded-2 shadow w-100  font-monospace text-dark  d-flex  bg-light bg-opacity-25 align-items-center ">
                                    <span>To: </span>
                                    <span>
                                        {/* {toAccount} */}
                                        {toAccount ? (
                                            toAccount
                                        ) : (
                                            "Connect to MetaMask"
                                        )}
                                    </span>

                                </div>

                                <input type="text" placeholder='Enter Message' className='mt-3 pb-5 rounded-2 shadow form-control rounded-0 bg-light fw-bold text-info m-2 bg-opacity-25 border-0 '
                                value={name}
                                onChange={(e) => setName(e.target.value)} required/>
                                <div className=' '>

                                    <button className="btn btn-outline-info  m-2 mt-3 w-50 rounded-2 fw-bold">Send Ether</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
