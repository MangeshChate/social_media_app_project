import React, { useContext, useEffect, useRef, useState } from 'react'
import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversations from '../../components/conversation/Conversations'
import Message from '../../components/message/Message'
import { Send } from '@mui/icons-material'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { io } from "socket.io-client";
import TextEnhancer from '../../components/TextEnhancer'
function Messenger({saveState}) {

    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [arrivalMessages, setArrialMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const [aiText , setAiText] = useState('');
    // const [socket , setSocket] = useState(null);
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArrialMessages({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(user.following.filter(f => users.some(u => u.userId === f)));
        });
    }, [user]);

    useEffect(() => {
        socket.current.on("welcome", (message) => {
            // console.log(message);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.current.off("welcome");
        };
    }, []);




    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/conversations/" + user._id);
                setConversations(res.data);


            } catch (error) {
                console.log(error);
            }
        }
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/messages/" + currentChat?._id);
                setMessages(res.data);

            } catch (error) {
                console.log(error)
            }
        };

        getMessages();
    }, [currentChat])
    // console.log(messages)


    useEffect(() => {
        // console.log("currentChat:", currentChat);
        arrivalMessages && currentChat?.members.includes(arrivalMessages.sender) &&
            setMessages((prev) => [...prev, arrivalMessages]);

    }, [arrivalMessages]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessages,
            conversationId: currentChat._id,
        };
        const reciverId = currentChat.members.find(member => member != user._id)
        socket.current.emit("sendMessge", {
            senderId: user._id,
            reciverId,
            text: newMessages
        })
        try {
            const res = await axios.post("http://localhost:8800/api/messages/", message);
            setMessages([...messages, res.data]);
            setNewMessages("");
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const enhanceText = () =>{
        setAiText(newMessages)
        setNewMessages("");
    }
  

    return (
        <div className="gradient-bg-welcome vh-100 text-light" >
            <Topbar saveState={saveState} path={false}/>
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" className="chatMenuInput p-2 m-3 text-light white-glassmorphism" placeholder='Search for friends' />
                        {conversations.map(c => (
                            <div onClick={() => setCurrentChat(c)}>

                                <Conversations key={c._id} conversation={c} currentUser={user} />
                            </div>
                        ))}


                    </div>
                </div>
                <div className="chatBox  white-glassmorphism ">
                    <div className="chatBoxWrapper ">
                        {
                            currentChat ?
                                (
                                    <>
                                        <div className="chatBoxTop">
                                            {messages.map(m => (
                                                <div ref={scrollRef}>

                                                    <Message message={m} own={m.sender == user._id} />
                                                </div>

                                            ))}


                                        </div>
                                        <div className="chatBoxBottom d-flex gap-3">
                                        <span className=' bg-primary bg-opacity-50 rounded-5 p-1' style={{cursor:"pointer"}}   onClick={enhanceText} >
                                                <img src="https://cdn-icons-png.flaticon.com/512/802/802338.png" alt="" className='img-fluid ' style={{ width: "54px" }} />

                                            </span>
                                            <textarea name="" placeholder='write something...' className=' chatMessageInput text-light rounded-5 white-glassmorphism' value={newMessages} onChange={(e) => setNewMessages(e.target.value)}></textarea>
                                            <Send className='chatSubmitButton fs-1 text-success' onClick={handleSubmit} />

                                        </div>
                                    </>
                                ) : (


                                    <span className='noConversationText text-secondary '>Open a conversation to start a chat </span>

                                )}

                    </div>
                </div>
                <div className="chatOnline p-2 m-3">
                    <div className="chatOnlineWrapper" style={{ height: "50%" }}>
                    <h4 className='fw-bold'>Avaible For Chat</h4>
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    </div>
                    <div className="chatOnlineWrapper blue-glassmorphism p-3" style={{ height: "50%" }}>
                        <h4 className="fw-bold">Text Perfection through Rabbit AI</h4>
                        <hr />
                        <p className="overflow-y-scroll w-100 fs-5 font-monospace " style={{height:"19rem"}}>
                            <TextEnhancer textMessage={aiText} />
                        </p>
                    </div>
                       
                </div>

            </div>
        </div>
    )
}

export default Messenger