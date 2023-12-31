import { Avatar, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {updateProfileInfo } from "../../utils/authAPI";
import { toast } from "react-toastify";

const MyProfile = () => {
  
  const email = localStorage.getItem("useremail");
  const [currentName, setCurrentName] = useState(localStorage.getItem("username"))

  const [username, setUsername] = useState(currentName);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isFormActive, setIsFormActive] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingPass, setEditingPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: false,
    pass: false,
    newpass: false,
  });

  // function to show edit profile form(name or password) by identifying the target button
  const enableFordEdit = (e) => {
    const { value } = e.target;
    setIsFormActive(true);
    if (value === "username") {
      setEditingUsername(true);
    } else if (value === "pass") {
      setEditingPass(true);
    }
  };


  // function to make api call to update password or name
  const updateData = async () => {
    let body = {};
    let updateType;
    if (editingUsername) {
      if (username.length<1) {
        toast.error("Please enter valid details")
        return;
      }
      body = {
        name:username
      };
      updateType = "username";
    } else if (editingPass) {
      body = {
        email: email,
        passwordCurrent: password,
        password: newPassword,
      };
      updateType = "password"
    }

    try {
      setLoading(true);
      const res = await updateProfileInfo(body, updateType);

      if (res.status === "success") {
        toast.success("Profile updated succesfully!");
        localStorage.setItem("username", username);
        setCurrentName(username)
        setIsFormActive(false);
        setEditingUsername(false);
        setEditingPass(false);
        
        setPassword("")
        setNewPassword("")
      } else if (res.status === "fail") {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  // function to close the editing form if user decides to descard the editing process
  const discardData = () => {
    setUsername(currentName);
    setPassword("");
    setNewPassword("");
    setIsFormActive(false);
    setEditingUsername(false);
    setEditingPass(false);
    setErrors({ username: false, pass: false, newpass: false });
  };

// function to save user inputs and identify errors in the input
  const handleChanges = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
      if (value == "") {
        setErrors({ ...errors, [name]: true });
      } else {
        setErrors({ ...errors, [name]: false });
      }
    } else if (name === "pass") {
      if (value.length < 6) {
        setErrors({ ...errors, [name]: true });
      } else {
        setErrors({ ...errors, [name]: false });
      }
      setPassword(value);
    } else if (name === "newpass") {
      if (value.length < 6) {
        setErrors({ ...errors, [name]: true });
      } else {
        setErrors({ ...errors, [name]: false });
      }
      setNewPassword(value);
    }
  };


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  });

  return (
    <div className="my-profile-section">
      <Avatar sx={{ height: "100px", width: "100px", background: "black" }}>
        {currentName
          .split(" ")
          .map((word) => word[0].toUpperCase())
          .join(" ")}
      </Avatar>
      <Grid sx={{ margin: "2rem 4rem" }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            type="text"
            value={username}
            name="username"
            variant="standard"
            fullWidth
            onChange={handleChanges}
            disabled={!editingUsername}
            error={errors.username}
            helperText={errors.username ? "Please enter a valid name" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            variant="standard"
            fullWidth
            disabled
          />
        </Grid>
        {editingPass && (
          <Grid item xs={12}>
            <TextField
              label="Current Password"
              type="password"
              name="pass"
              value={password}
              variant="standard"
              fullWidth
              onChange={handleChanges}
              disabled={!isFormActive}
              error={errors.pass}
              helperText={
                errors.pass
                  ? "Password must be at least 6 characters long."
                  : ""
              }
            />
          </Grid>
        )}
        {editingPass && (
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              variant="standard"
              name="newpass"
              fullWidth
              onChange={handleChanges}
              disabled={!isFormActive}
              error={errors.newpass}
              helperText={
                errors.newpass
                  ? "Password must be at least 6 characters long."
                  : ""
              }
            />
          </Grid>
        )}

        <>
          <Grid item xs={6}>
            <button
              onClick={isFormActive ? updateData : enableFordEdit}
              className="update-btn"
              value={!isFormActive && "username"}
              
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                </>
              ) : isFormActive ? (
                "Save Changes"
              ) : (
                "change Name"
              )}
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              onClick={isFormActive ? discardData : enableFordEdit}
              className="update-btn"
              value={!isFormActive && "pass"}
            >
              {isFormActive ? "Discard Changes" : "Change Password"}
            </button>
          </Grid>
        </>
      </Grid>
    </div>
  );
};

export default MyProfile;
