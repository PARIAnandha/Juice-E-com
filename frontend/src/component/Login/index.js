// src/components/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography, Link, Alert } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { login } from "../../Redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        await dispatch(login({ email, password })).unwrap();
        navigate("/home"); // Navigate to home page on successful login
      } catch (error) {
        setErrorMessage(error.message || "Invalid login credentials.");
      }
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5">Login</Typography>

      {/* Display error message */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mt: 2,
        }}
      >
        <Link component={RouterLink} to="/forgot-password" underline="hover">
          Forgot Password?
        </Link>
        <Link component={RouterLink} to="/signup" underline="hover">
          Sign Up
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
