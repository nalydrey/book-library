import React from 'react'
import './LeftPanel.scss'
import {useSelector} from "react-redux";


const LeftPanel = (props) => {

  const {children} = props
  const {isOpen} = useSelector(state => state.leftPanel)




  return (
    <div className='left__panel' onClick={(e)=>e.stopPropagation()}
         style={{left: isOpen && 0}} >
      {children}
    </div>



  )
}

export default LeftPanel