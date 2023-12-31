import { Divider } from '@mui/material'
import React from 'react'
import cactus from "../../assets/cactus.png";


const NoProducts = () => {
  return (
    <div className='no-products'>
        <img src={cactus} alt="nothing-matched-your-search" />
        
        <p>WE COULDN'T FIND ANY MATCHES</p>
    </div>
  )
}

export default NoProducts