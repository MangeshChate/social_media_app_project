import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8900');

const ThoughtEnhancer = ({ textMessage }) => {
  // const socket = io('http://localhost:8900');
  const [message, setMessage] = useState(textMessage || '');
  const [chat, setChat] = useState([]);
  console.log(textMessage)
  socket.on('connect', () => {
    console.log('Connected to the server');
  });


  const sendMessage = () => {
    if (message.trim() !== '') {
      try {
        // Send the message to the server
        socket.emit('message', message);
        setMessage(''); // Clear the message after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Handle sending the message when the component mounts
  useEffect(() => {
    sendMessage();
  }, [message]);

  // Update the message state when the textMessage prop changes
  useEffect(() => {
    setMessage(`"${textMessage}" , make this sentence meaningfull and short as possible for posting a tweet  ` || '');
  }, [textMessage]);

  useEffect(() => {
    const handleResponse = (response) => {
      // Ensure the response is not empty
      if (response[0].trim() !== '') {
        setChat(response);
      }
    };

    // Register the event listener
    socket.on('response', handleResponse);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('response', handleResponse);
      setMessage("");
    };

  }, []);

  useEffect(() => {
    console.log(chat)
  }, [chat])


  return (
    <>
      {chat}
    </>

  );
};

export default ThoughtEnhancer;
