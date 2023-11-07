import React, { useEffect, useState } from 'react'
import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import axios from 'axios';
import { useParams } from 'react-router'
import { Cancel, Edit } from '@mui/icons-material'
function Profile({ state, saveState }) {
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;


    const [user, setUser] = useState([]);
    const username = useParams().username

    useEffect(() => {
        const fetchUsers = async () => {

            const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
            setUser(res.data);
           

        }
        fetchUsers();
    }, [username]);

    const [modal, setModal] = useState("d-none");
    const [name, setName] = useState(user.username);
    const [about, setAbout] = useState(user.desc);
    const [city, setCity] = useState(user.city);
    const [from, setFrom] = useState(user.from);
    const [accountNumber, setAccountNumber] = useState(user.accountNumber);
    const updatedUser = {
        "userId": user._id,
        "username": name,
        "desc": about,
        "city": city,
        "from": from,
        "accountNumber": accountNumber
    }

    const handleUpdate = async () => {
        await axios.put(`http://localhost:8800/api/users/${user._id}` ,updatedUser);
        console.log("user is updated ");
        setModal("d-none");
    }
    return (
        <div className='text-light gradient-bg-welcome '>
            <Topbar saveState={saveState} path={true}/>
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">

                            <img crossOrigin='anonymous' src={user.coverPicture ? PF + user.coverPicture : PF + "coverImg.gif"} className='profileCoverImg' alt="" />
                            <img crossOrigin='anonymous' src={user.profilePicture ? PF + user.profilePicture : PF + "avatar.gif"} className='profileUserImg' alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <div className="profileInfoDesc text-light fw-semibold d-flex gap-3">
                                <span className=''>
                                    {user.desc}
                                </span>
                                <span className=''>
                                    <Edit onClick={() => setModal("d-block")} className=' ' />
                                    <div className={`position-absolute z-1 blue-glassmorphism ${modal}`} style={{ top: "20%", left: "45%" }}>
                                        <div className="modal-content white-glassmorphism border-0 rounded-0   ">
                                            <div className='p-4' >
                                                <span className='d-flex justify-content-end w-100'>

                                                    <Cancel className='fs-3 text-info' onClick={() => setModal("d-none")} />
                                                </span>
                                                <h4 className="pt-4 ps-5 pe-5 font-monospace rounded-3 fw-bold text-center">
                                                    Update Your Profile
                                                </h4>
                                                <div className="p-4">
                                                    <form action="" >
                                                        <input type="text" className="form-control rounded-2 p-2  shadow border-0 bg-white bg-opacity-50" value={name} placeholder={user.username}
                                                        onChange={(e)=>setName(e.target.value)} />
                                                        <textarea className="form-control mt-3 bg-white bg-opacity-50 border-0 shadow" value={about} placeholder="some thing about  you ?"
                                                             onChange={(e)=>setAbout(e.target.value)}
                                                        ></textarea>

                                                        <input type="text" className="form-control rounded-2 p-2 shadow border-0 mt-3 bg-white bg-opacity-50"value={city} placeholder={"City "}  onChange={(e)=>setCity(e.target.value)}
                                                        />

                                                        <input type="text" className="form-control rounded-2 p-2 shadow mt-3 border-0 bg-white bg-opacity-50"value={from}  onChange={(e)=>setFrom(e.target.value)} placeholder={"From "}
                                                        />

                                                       
                                                         <input type="text" className="form-control rounded-2 p-2 shadow mt-3 border-0 bg-white bg-opacity-50" value={accountNumber}  onChange={(e)=>setAccountNumber(e.target.value)} placeholder={"Update Your Account Number"}
                                                        />



                                                        <div className='text-center d-flex flex-column gap-3'>

                                                            <span className='btn mt-4 shadow-lg font-monospace text-light bg-info fs-5 w-100 rounded-5 fw-bold  bg-opacity-25' onClick={handleUpdate}>
                                                                Update Profile

                                                            </span>

                                                        </div>
                                                    </form>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </span>


                            </div>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} state={state} />

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile
