import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { useError } from "../../context/ErrorContext";

const MyOrderCard = ({ orderItem }) => {
  const { order } = orderItem;
  const {updateErrorStatus} = useError()

  const { _id, totalPrice } = order;
  const { name, displayImage } = order.items[0].product;
  const navigate = useNavigate();
  

  return (
    <div className="my-order-card">
      <Stack spacing={2}>
        <Link to={`${_id}`} className="order-card-head">
          <p>Order <span>#{_id}</span></p>
          <KeyboardArrowRightIcon />
        </Link>
        <section className="order-card-detail">
          <Link to={`${_id}`}>
            <img src={displayImage} alt={name}  />
          </Link>
          <div>
            <Stack sx={{ minWidth: 0,height:'100%' }} justifyContent="space-between">
              <Typography  sx={{maxWidth:'100%', fontWeight:520,color:'#070707'}}  >
                {name}
              </Typography>

              <div className="order-total-amount">
                <Typography sx={{fontWeight:590, display:'inline-block'}}>Amount: </Typography>
                &#8377;{totalPrice}
              </div>
            </Stack>
          </div>
        </section>
        <section className="order-status-btn"><button onClick={()=>navigate(`${_id}`)}>Processing</button><button onClick={()=>updateErrorStatus(true)}>Need Help?</button></section>
        
      </Stack>
    </div>
  );
};

export default MyOrderCard;
