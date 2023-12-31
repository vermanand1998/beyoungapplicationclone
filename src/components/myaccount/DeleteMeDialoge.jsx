import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { deleteMe } from "../../utils/authAPI";

const DeleteMeDialoge = ({ open, setOpen,logout }) => {



  // function to make api call to delete the account
  const deleteAccount = async () => {
    const body = {
        name:localStorage.getItem("userename"),
        email:localStorage.getItem("usermail"),
    }
    try {
        const res = await deleteMe(body);
        console.log(res);
        if (res==true) {
            toast.success("Account Deleted Succesfully");
            logout();

        }else{
            toast.error(res.response.data.message)
        }
    } catch (error) {
        toast.error("Something went wrong, Please try again later!")
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete My Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting your account will result in permanent loss of access,
            including order history and wishlist. Your account data and
            preferences will be irrecoverable.
          </DialogContentText>
          <Alert sx={{ margin: "1rem 0" }} severity="error">
            Are you sure you want to delete your account?
          </Alert>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button onClick={deleteAccount}  color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteMeDialoge;
