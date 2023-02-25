import axios from 'axios'
import React from 'react'
import { url } from '../App/App'

const LeftPanel = () => {

  axios.get(url+'authors').then((resp)=>{
console.log(resp.data);
  })

  return (
    <div className='left__box'>
        Left Panel
    </div>
  )
}

export default LeftPanel