import React, { useState } from 'react';
// import BackgroundVideo from 'react-background-video';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  
  const [state , setState] = useState({
    web3:null,
    contract:null
  });
  const saveState =  (state) => {
    setState(state);
    
  }
  return (
   <div className='gradient-bg-transactions text-light'>
    <Navbar saveState={saveState}/>
    <Hero state={state} />
    <Features state={state}/>
    <About state={state}/>
    <Footer/>
   </div>
  );
}

export default App;
