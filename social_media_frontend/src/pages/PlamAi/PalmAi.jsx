import React, { useEffect, useRef, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import { Send } from '@mui/icons-material'
import io from 'socket.io-client';
const socket = io('http://localhost:8900');
import './palmAi.css'
import avatar from '../../../assets/avatar.gif'
function PalmAi() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const scrollRef = useRef();

    const processText = (text) => {
        // Use a regular expression to find text enclosed within asterisks
        const processedText = text.replace(/\*(.*?)\*/g, '<span class="highlighted">$1</span>');
        return processedText;
    }

    const handleSendMessage = () => {
        // Ensure the message is not empty or contains only whitespace
        if (message.trim() !== '') {
            // Send the message to the server
            socket.emit('message', message);

            // Update the chat with the user's message
            setChat((prevChat) => [...prevChat, { text: message, type: 'user blue-glassmorphism', flex: 'justify-content-end', img: avatar }]);

            // Clear the input field
            setMessage('');
        }
    };

    useEffect(() => {
        const handleResponse = (response) => {
            // Ensure the response is not empty
            if (response[0].trim() !== '') {
                setChat((prevChat) => [
                    ...prevChat,
                    { text: processText(response), type: 'bot white-glassmorphism ', img: "https://stickerswiki.ams3.cdn.digitaloceanspaces.com/zoobapack/6168298.512.webp" },
                ]);
            }
        };

        // Register the event listener
        socket.on('response', handleResponse);

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('response', handleResponse);
        };
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat])



    return (
        <div className='vh-100  gradient-bg-welcome text-light'>
            <Topbar />
            <div className="chatai row  " style={{ height: "90%" }}>
                <div className="aiSuggest col-2 " style={{ borderRight: "1px solid grey" }}>
                    <div className="aiSuggestWrapper p-3 " >
                        <div className="brand d-flex align-items-center">
                            <img src="https://stickerswiki.ams3.cdn.digitaloceanspaces.com/zoobapack/6168298.512.webp" alt="" className='rabbitlogo object-fit-cover' style={{ width: "80px" }} />
                            <div>
                                <span className='text-light fw-bold fs-3 font-monospace'>Rabbit AI</span>
                                <p className='text-light font-monospace text-secondary fw-semibold'>powered by PaLM 2</p>
                            </div>

                        </div>
                        <div className="ask mt-5 d-flex flex-column gap-4">
                            <span className="btn  font-monospace btn-outline-info p-2" onClick={() => setMessage("Good Morning !")} >
                                Say, "Good Morning" to Rabbit.
                            </span>
                            <span className="btn  font-monospace btn-outline-info p-2" onClick={() => setMessage("Tell me some unique facts .")}>
                                Ask about some unique facts ?
                            </span>
                            <span className="btn font-monospace btn-outline-info p-2" onClick={() => setMessage("Tell me some facts about one piece anime ?")}>
                                Ask facts about OnePiece Anime ?
                            </span>
                            <span className="btn  font-monospace btn-outline-info p-2" onClick={() => setMessage("Jay Shree Ram !")}>
                                Say, Jay Shree Ram to Rabbit.
                            </span>
                        </div>

                    </div>
                </div>
                <div className="aiChat col-8   " style={{ borderRight: "1px solid grey" }}>
                    <div className="aiChatWrapper3 position-relative  w-100" style={{ height: "100%" }}>
                        <div className='w-100  shadow-lg rounded-5 overflow-y-scroll' style={{ height: "45em" }}>
                            {chat.map((entry, index) => (
                                <div className={`d-flex ${entry.flex}`}>

                                    <div className={`${entry.type} w-75 p-4  rounded-5 d-flex gap-3`} key={index}>
                                        <img src={entry.img} alt="" className='object-fit-cover rounded-5 ' style={{ width: "50px", height: "50px" }} />
                                       
        
                                        <span ref={scrollRef}>{entry.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='d-flex align-items-center  justify-content-center position-absolute bottom-0 w-100 gap-3'>
                            <textarea name="" id="" className='w-75 ps-3 pt-3 fw-bold shadow-lg p-2 text-light bg-black bg-opacity-25 rounded-5 border-1  rounded-3 ' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type Your Message here ...'></textarea>
                            <Send className='fs-2' style={{ cursor: "pointer" }} onClick={handleSendMessage} />
                        </div>
                    </div>
                </div>
                <div className="aiAbout col-2">
                    <div className="aiAboutWrapper mt-3 p-3">
                        <img src="https://i.pinimg.com/originals/01/63/6c/01636c5434cd0462086620c60fdfec16.gif" alt="" style={{ width: "100%" }} />
                        <div className='bg-primary mt-3 rounded-5' style={{ height: "10px", width: "100%" }} ></div>
                        <div className='mt-4'>
                           <h1 className='font-monospace fw-bold text-decoration-underline'> Hello again</h1>
                            <p className='mt-5 p-2 font-monospace bg-info bg-opacity-10 rounded-3'>
                            Tell me what's on your mind or pick a suggestion. I have limitations and won't always get it right, but your prompt will help me to improve.
                            </p>
                            <p className='mt-3 p-2 font-monospace bg-warning bg-opacity-10 rounded-3'>
                            Rabbit may display inaccurate or offensive information .
                            </p>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default PalmAi
