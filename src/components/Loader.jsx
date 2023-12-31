import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react'
import { useLoader } from '../context/LoaderContext';

const Loader = () => {
    
    
    const {showLoader} = useLoader()
    
  
    return (
      <div>
        
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}
          
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
}

export default Loader