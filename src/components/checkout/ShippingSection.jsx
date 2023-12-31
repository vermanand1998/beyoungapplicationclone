import React from 'react'
import AddAnAddress from './AddAnAddress'

const ShippingSection = () => {
  
  return (
    <div className='address-container cart-items-container'>
      <h4>ADDRESS:</h4>
      <section className="saved-address"></section>
      <AddAnAddress/>
    </div>
  )
}

export default ShippingSection