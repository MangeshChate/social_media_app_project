import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import "./home.css"

function Home({saveState , state}) {
  return (
    <div className='text-light gradient-bg-welcome'>
      <Topbar saveState={saveState} />
      <div className="homeContainer">
        <Sidebar />
        <Feed  state={state}/>
        <Rightbar />

      </div>
    </div>
  )
}

export default Home
