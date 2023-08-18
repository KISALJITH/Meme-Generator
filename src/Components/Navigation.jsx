import React from 'react'
import './Navigation-Style.css'

function Navigation() {
  return (
    <div className='navigation-outer'>
            <img src={require("./../Images/logo.png")} alt="" />
        <p>Photo Comment Generator</p>
    </div>
  )
}

export default Navigation