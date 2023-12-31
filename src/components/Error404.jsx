import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useError } from '../context/ErrorContext';
import errorImage from "../assets/Error404.jpg"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // boxShadow: '0px 10px 33px 49px #3d2073',
  
  // p: 4,
};

const Error404 = () => {

  const {showError,updateErrorStatus} = useError()
  const handleClose = () => updateErrorStatus(false);


  return (
    <div>
    <Modal
      open={showError}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <img style={{width:'100%',borderRadius:'20px'}} src={errorImage} alt="page-unavailable" />
      </Box>
    </Modal>
  </div>
  )
}

export default Error404