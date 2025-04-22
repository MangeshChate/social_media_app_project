import React, { useRef, useEffect, useState } from 'react';
import 'aframe';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mountain from './asset/mountain.glb';
import carpet from './asset/carpet.glb';
import sky from "./asset/sky.jpg";
import useSpeechRecognition from './useSpeechRecognition';
import axios from 'axios';
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom';

function Metaverse() {
    const storedUsername = localStorage.getItem('username');


    const loader = new GLTFLoader();
    const mountainRef = useRef(null);
    const cameraRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0, z: 0 });
    const [popupInfo, setPopupInfo] = useState('');
    const [listening, setListening] = useState(false);
    const [movingForward, setMovingForward] = useState(false);
    const [plane, setPlane] = useState("mountain");
    console.log("room activated")
    const [posts, setPosts] = useState([]);
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`http://localhost:8800/api/posts/profile/${storedUsername}`);
            
            // Modify the response data to include custom IDs
            const modifiedData = res.data.map((post, index) => ({
                ...post,
                id: index + 1 // Assigning custom IDs starting from 1
            }));
            
            setPosts(modifiedData);
            console.log(modifiedData);
        };
        
        fetchPosts();
    }, [storedUsername]);
    










    useEffect(() => {
        if (localStorage.getItem('plane') == "carpet") {

            loader.load(carpet, (d) => {
                const mountainEntity = mountainRef.current.object3D;
                mountainEntity.add(d.scene);
            });
        } else {
            loader.load(mountain, (d) => {
                const mountainEntity = mountainRef.current.object3D;
                mountainEntity.add(d.scene);
            });
        }

    }, [loader]);


    const handleImageClick = (position, info, id) => {
        const imagePosition = posts.find(image => image.id === id);
        const popupX = imagePosition ? imagePosition.id * 5 - 7 : 0;
        const popupY = 2;
        const popupZ = -5;

        setShowPopup(true);
        setPopupPosition({ x: popupX, y: popupY, z: popupZ });
        setPopupInfo(info);
    };



    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleButtonClick = () => {
        alert('Button clicked!');
    };

    // Speech recognition setup
    const { transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition(); // Use the custom hook

    useEffect(() => {
        if (listening) {
            startListening();
        } else {
            stopListening();
        }
    }, [listening, startListening, stopListening]);

    useEffect(() => {
        if (transcript === 'move forward') {
            moveCameraForward() // Simulate pressing 'w' key for 1 second
            console.log("move forward")
            resetTranscript();
        } else if (transcript === 'move backward') {
            moveCameraBackward(); // Simulate pressing 's' key for 1 second
            console.log("move backword")

            resetTranscript();
        } else if (transcript === "room") {
            console.log("room")
            if (localStorage.getItem('plane') === "carpet") {
                localStorage.setItem('plane', 'mountain');

            } else {

                localStorage.setItem('plane', 'carpet');
            }
            window.location.reload();

            resetTranscript();

        }
    }, [transcript, resetTranscript]);

    const moveCameraForward = () => {
        const cameraEntity = cameraRef.current.object3D;
        let stepCount = 0; // Initialize step count

        const moveStep = () => {
            if (cameraEntity && stepCount < 20) { // Repeat 20 times
                // Get the current position and rotation of the camera
                const currentPosition = cameraEntity.position.clone();
                const currentRotation = cameraEntity.rotation.clone();

                // Calculate the movement vector based on the camera's rotation
                const deltaX = -0.5 * Math.sin(currentRotation.y);
                const deltaZ = -0.5 * Math.cos(currentRotation.y);

                // Update the camera position relative to the ground plane
                cameraEntity.position.x += deltaX;
                cameraEntity.position.z += deltaZ;

                stepCount++;
            } else {
                clearInterval(moveInterval); // Stop the interval once step count reaches 20
            }
        };

        const moveInterval = setInterval(moveStep, 30); // Adjust the interval duration as needed for smoother movement
    };

    const moveCameraBackward = () => {
        const cameraEntity = cameraRef.current.object3D;
        let stepCount = 0; // Initialize step count

        const moveStep = () => {
            if (cameraEntity && stepCount < 20) { // Repeat 20 times
                // Get the current position and rotation of the camera
                const currentPosition = cameraEntity.position.clone();
                const currentRotation = cameraEntity.rotation.clone();

                // Calculate the movement vector based on the camera's rotation
                const deltaX = 0.5 * Math.sin(currentRotation.y);
                const deltaZ = 0.5 * Math.cos(currentRotation.y);

                // Update the camera position relative to the ground plane
                cameraEntity.position.x += deltaX;
                cameraEntity.position.z += deltaZ;

                stepCount++;
            } else {
                clearInterval(moveInterval); // Stop the interval once step count reaches 20
            }
        };

        const moveInterval = setInterval(moveStep, 30); // Adjust the interval duration as needed for smoother movement
    };



    const toggleListening = () => {
        setListening(!listening);
    };





    return (
        <div style={{ paddingTop: "100px" }}>
            <div style={{ position: 'absolute', top: '45px', left: '10px', zIndex: '9999' }}>
                <button onClick={toggleListening} style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "10px", border: "none", color: "white", fontWeight: "bold", background: 'rgba(25,25,25,0.5)', }}>{listening ? "Stop Listening" : "Start Listening"}</button>
            </div>
            <a-scene cursor="rayOrigin: mouse">
                <a-assets>
                    <img id="sky" src={sky} />
                </a-assets>
                <a-sky color="#FFFFFF" material="src: #sky" rotation="0 0 0" />
                <a-entity
                    color="#FFFFFF"
                    id="mountain"
                    position="0 0 0"
                    scale="15 15 15"
                    ref={mountainRef}
                />
                <a-camera ref={cameraRef}></a-camera>
                {posts.map((post) => (
                    <a-image
                        key={post.id} // Using index + 1 as custom ID (1-based)
                        src={PF + post.img}
                        width="3"
                        height="2"
                        position={`${(post.id) * 5 - 7} 2 -5`} // Adjusting position based on custom ID
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleImageClick({ x: 0, y: 2, z: -5 }, post?.desc,  post.id)} // Pass custom ID to handleImageClick
                    />
                ))}

{showPopup && (
    <a-entity
        id="infoPanel"
        position={`${popupPosition.x} ${popupPosition.y} ${popupPosition.z}`}
        geometry="primitive: plane; width: 5; height: 2; radius: 0.1"
        material="color: #ffffff; shader: flat; opacity: 0.7; transparent: true"
    >
        {/* Close button */}
        <a-entity
            id="closeButton"
            position="1.7 0.9 0.01"
            geometry="primitive: plane; width: 0.5; height: 0.5"
            material="color: #ff0000; shader: flat"
            onClick={handleClosePopup}
            events={{ click: handleClosePopup }}
        >
            <a-text value="X" align="center" color="#ffffff"></a-text>
        </a-entity>

        {/* Popup content */}
        <a-entity id="popupContent" position="0 0 0">
            <a-text value={popupInfo.substring(0, 50)} align="center" color="black" wrap-pixels="800"></a-text>
        </a-entity>
    </a-entity>
)}



            </a-scene>
        </div>
    );
}

export default Metaverse;
