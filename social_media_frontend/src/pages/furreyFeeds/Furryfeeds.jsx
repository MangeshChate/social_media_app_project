import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import { Add, AddRounded, Image, Send } from '@mui/icons-material'
import ThoughtEnhancer from '../../components/ThoughtEnhancer';
import { AuthContext } from '../../context/AuthContext';

function Furryfeeds({ state, saveState }) {

    const { user } = useContext(AuthContext);

    const PF = import.meta.env.VITE_PUBLIC_FOLDER;

    const [thought, setThought] = useState('');
    const [tweet, setTweet] = useState('');
    const [furryFeed, setFurryFeed] = useState([]);
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const { contract } = state;
        const feeds = async () => {
            const res = await contract.methods.getEssay().call();
            setFurryFeed(res);
        }
        contract && feeds();
    }, [state]);
    
    const sendTweet = async (e) => {
        e.preventDefault();
        try {

            const { contract, web3 } = state;
            const accounts = await web3.eth.getAccounts();

            if (user.avatar === undefined) {
                // Handle the case where user.avatar is undefined
                setAvatar(PF + "avatar.gif")
            } else {
                setAvatar(user.avatar)
            }
            await contract.methods.setEssay(user.username, avatar, accounts[0], tweet).send({
                from: accounts[0],
            });


            alert("Successfully Deployed your FurryFeed on Blockchain!");
        } catch (error) {
            alert("Deploy Message not successful!");
            console.error(error);
        }
    }


    const handleAi = () => {
        setThought(tweet);

    }
    console.log(thought)

    return (
        <div className='  gradient-bg-welcome  text-light' style={{ height: "106vh" }}>
            <Topbar saveState={saveState} />
            <div className="row vw-100 " style={{ height: "90vh" }}>
                <div className="col-3  p-3 overflow-y-scroll">
                    <div className='d-flex justify-content-center align-items-center flex-column gap-4 mt-4'>
                        <div className='d-flex  align-items-center justify-content-center'>
                            <img src="https://cdn-icons-png.flaticon.com/512/802/802338.png" alt="" className='img-fluid object-fit-cover' style={{ height: "64px" }} />
                            <div className='d-flex flex-column font-monospace'>
                                <span className='fs-2 fw-bold font-monospace'>FurryFeeds</span>
                                <span className='text-secondary'>50 words of thought</span>
                            </div>
                        </div>
                        <div className='fs-5 p-5 white-glassmorphism m-3 font-monospace'>Welcome to 'FurryFeeds,' where the world of social networking hops into a whole new dimension! 🐇🌟</div>

                    </div>

                    <div className=' m-3  blue-glassmorphism ' style={{ height: "450px" }}>
                        <h4 className='fw-bold text-center p-3 '>Enhance Your Thinking</h4>
                        <hr />
                        <div className='font-monospace fs-5 overflow-y-scroll p-3 rounded-5 '>
                            <p style={{ height: "15em" }}>

                                <ThoughtEnhancer textMessage={thought} />
                            </p>
                        </div>
                    </div>


                </div>
                <div className="col-9  ">
                    <div className="wrapper p-4">
                        <div className='m-4 d-flex gap-4 align-items-center justify-content-center'>
                            <img src="https://altcoinsbox.com/wp-content/uploads/2023/03/magic-logo.png" alt="" style={{ width: "64px", cursor: "pointer" }} onClick={handleAi} />
                            <textarea className='p-3  font-monospace fs-5 bg-light rounded-4 bg-opacity-50  form-control text-dark' placeholder='Start Writing your FurreyFeeds From Here' value={tweet} onChange={(e) => setTweet(e.target.value)} ></textarea>

                            
                            <span className=' p-1 ' onClick={sendTweet} style={{ borderRadius: "50%", cursor: "pointer" }} >
                                <Send className='fs-1' />

                            </span>

                        </div>
                        <div className="m-5  blue-glassmorphism overflow-y-scroll p-3" style={{ height: "71vh" }}>

                            {/* feed  */}
                            {furryFeed.slice().reverse().map((feed) => (
                                <div className="container w-75 p-4 rounded-3 mt-4 shadow-lg white-glassmorphism" key={feed.id}>
                                    <div className="wrapper">
                                        <div className='d-flex align-items-center gap-4'>
                                            <img src={PF + "avatar.gif"} alt="" className="img-fluid object-fit-cover" style={{ width: "64px", borderRadius: "50%", border: "2px solid white" }} />
                                            <div>
                                                <h4 className='fw-bold font-monospace'>{feed.name}</h4>
                                                <span className="text-secondary">
                                                    {feed.account}
                                                </span>
                                            </div>
                                            <span className='text-secondary w-100 me-4 text-end' >
                                            {new Date(feed.timestamp * 1000).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <hr />
                                        <div className='fs-5'>
                                            <p>
                                                {feed.essay}
                                            </p>
                                           
                                        </div>
                                    </div>
                                </div>
                            ))}



                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Furryfeeds
