import React, { useContext, useEffect, useRef, useState, } from 'react'
import "./rightbar.css"
import { Add, Chat, CopyAll, Remove, SettingsEthernet } from "@mui/icons-material"
import { Users } from "../../dummyData"
import Online from '../online/Online'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import CopyButton from '../CopyButton';
import {} from "react-router-dom"

function Rightbar({ user, state }) {

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);

  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(currentUser.following.includes(user?._id));

  const navigate = useNavigate();


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`http://localhost:8800/api/users/friends/` + user._id);
        setFriends(friendList.data);

      } catch (error) {
        console.log(error)
      }
    }
    getFriends();
  }, [user])

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
          userId: currentUser._id
        });
        dispatch({ type: "UNFOLLOW", payload: user._id })
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: user._id })

      }
      setFollowed(!followed)
    } catch (error) {
      console.log(error)
    }
  }

  //send transaction
  const amount = useRef()
  const to = useRef()
  const message = useRef()

  const handleEnter = async (e) => {
    e.preventDefault();
    console.log(handleEnter)
    try {
      const { contract, web3 } = state;
      const weiValue = web3.utils.toWei(amount.current.value, "ether");
      const accounts = await web3.eth.getAccounts();

      await contract.methods.sendEther(to.current.value, message.current.value).send({
        from: accounts[0],
        value: weiValue,
        gas: 325666,
      });

      alert("Transaction Successful!");


    } catch (error) {
      alert("Transaction not successful!");
      console.log(error);
    }

  }

  //handle conversation 
  const handleConversation = async () => {

    const conversation = {
      "senderId": currentUser._id,
      "reciverId": user._id
    }


    try {
      await axios.post("http://localhost:8800/api/conversations", conversation);
      console.log("conversation added succesfully !");
      navigate("/messenger");

    } catch (err) {
      console.log(err)
    }
  }


  const HomeRightbar = () => {
    return (
      <div className=''>

        <div className="birthdayContainer ">
          <img src="https://cdn-icons-png.flaticon.com/512/6021/6021967.png" className='birthdayImg' alt="" />
          <span className="birthdayText"><b>Jugal Khandre</b> and <b>3 other friends</b> have a birth day today.</span>
        </div>

        <div className=' mt-4'>
          <div className='eth-card eth shadow rounded-1 shadow-lg  mb-2 ' style={{ height: "270px", width: "100%" }}>
            <div className="eth-wrapper ">
              <div className='d-flex justify-content-between align-items-center fw-bold font-monospace'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/512px-Ethereum-icon-purple.svg.png?20200227011040" alt="" className='img-fluid ' width="60px" />
                <div>

                  Ethereum Card
                </div>
              </div>
              <div className='eth-profile  d-flex flex-column '>
                <span className='fw-bold font-monospace '>{currentUser.username}</span>
                {currentUser.accountNumber ? (
                  <div>

                    <span className='fw-bold font-monospace text-muted mt-2' id="textToCopy" >
                      {currentUser.accountNumber}
                    </span>
                    <CopyButton text={currentUser.accountNumber} />
                  </div>
                ) : (
                  <span className='fw-bold font-monospace text-muted mt-2'>(User doesn't have a MetaMask account)</span>
                )}
              </div>

            </div>
          </div>
          <img src="https://th.bing.com/th/id/OIG.2GdwvS6vu9ZtyGYGuH9A?pid=ImgGn" className='rightbarAd img-fluid object-fit ' alt="ad" style={{position:"relative" , width:"100%" , height:"600px" , }}/>
        </div>







      </div>
    )
  }

  const ProfileRightbar = () => {
    return (
      <div className=''>
        {user.username !== currentUser.username && (
          <div className='d-flex justify-content-between align-items-center '>
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}


            </button>
            <Chat className='mt-5 me-5 text-opacity-10 fw-bold fs-1' onClick={handleConversation} style={{ cursor: "pointer" }} />
          </div>
        )}

        <h4 className='rightbarTitle fw-bold'>user Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "marrid" : "-"}</span>
          </div>
        </div>



        <div className='eth-card eth shadow rounded-1 shadow-lg mt-4 mb-4' >
          <div className="eth-wrapper ">
            <div className='d-flex justify-content-between align-items-center fw-bold font-monospace'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/512px-Ethereum-icon-purple.svg.png?20200227011040" alt="" className='img-fluid ' width="60px" />
              <div>

                Ethereum Card
              </div>
            </div>
            <div className='eth-profile  d-flex flex-column'>
              <span className='fw-bold font-monospace '>{user.username}</span>
              {user.accountNumber ? (
                <div>

                  <span className='fw-bold font-monospace text-muted mt-2' id="textToCopy" >
                    {user.accountNumber}
                  </span>
                  <CopyButton text={user.accountNumber} />
                </div>
              ) : (
                <span className='fw-bold font-monospace text-muted mt-2'>(User doesn't have a MetaMask account)</span>
              )}

            </div>

          </div>

        </div>


        <h4 className='rightbarTitle mt-5 fw-bold'>User Friends</h4>

        <div className="rightbarFollowings ">
          {
            friends.map((friend) => (
              <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                <div className="rightbarFollowing" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "white", fontSize: "800" }}>
                  <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "avatar.gif"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName" >{friend.username}</span>
                </div>
              </Link>
            ))
          }


        </div>
        {user.username == currentUser.username && (
          <>
            <h4 className='rightbarTitle mt-4  fw-bold'>Send Ether's to Your Friend</h4>

            <form onSubmit={handleEnter} className="pt-4 w-100 p-3 d-flex flex-column gap-3 justify-content-start font-monospace">
              <input type="text" className="form-control p-3 rounded-2 bg-light text-light bg-opacity-50 border-0" placeholder='Enter Amount Of Ether' ref={amount} required />
              <input type="text" className="form-control p-3 rounded-2 bg-light text-light bg-opacity-50 border-0" placeholder='Paste Friend Account Number ' ref={to} required />
              <input type="text" className="form-control p-3 rounded-2 bg-light text-light bg-opacity-50 border-0" placeholder='Enter Message' ref={message} required />


              <button type="submit" className="btn bg-danger text-light fw-bold bg-opacity-25 rounded-5 text-center">Send transaction</button>

            </form>
          </>


        )}


      </div>
    )
  }
  return (
    <div className='rightBar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
