import { Box, Modal } from '@mui/material'
import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router';
import { useSuccessModal } from '../../context/SuccessModalContext';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
   
    boxShadow: 24,
    p: 4,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    gap:'1rem',
    '@media (max-width: 450px)': {
        width: '90%', 
      },
      
  };
  const btnStyle={
    alignItems: 'center',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        fontWeight: 610,
        justifyContent: 'center',
        padding: '1rem 0',
        width: '100%',
  }
const SuccessModal = () => {
    const navigate = useNavigate()
    const {showSuccessModal,updateSuccessmodal} = useSuccessModal()
    const handleClick = ()=>{
        updateSuccessmodal(false)
        navigate('/')
    }
   

    
    return (
        <div>
        <Modal
          open={showSuccessModal}
          onClose={updateSuccessmodal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <Box sx={style}>
            <CheckCircleOutlineIcon style={{color:'green',fontSize:'5rem'}}/>
            <h5>Order placed succesfully</h5>
            <button onClick={handleClick} style={btnStyle}>Continue Shopping</button>
          </Box>
        </Modal>
      </div>
      )
}

export default SuccessModal