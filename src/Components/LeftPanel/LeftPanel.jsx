import React from 'react'
import './LeftPanel.scss'


const LeftPanel = (props) => {

  const {children} = props


  return (
    <div className='left__panel'>
      {children}
    </div>



  )
}

export default LeftPanel