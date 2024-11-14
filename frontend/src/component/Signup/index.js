// src/components/Signup.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { signup } from "../../Redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false); // Add success state

  const validate = () => {
    let tempErrors = {};

    if (!/^[A-Za-z]+$/.test(username)) {
      tempErrors.username = "Username should contain only letters.";
    }

    if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      tempErrors.email = "Enter a valid email with '@' and '.'";
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      tempErrors.password =
        "Password must contain at least one special character.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignup = () => {
    if (validate()) {
      dispatch(signup({ username, email, password }))
        .then(() => {
          // Clear form fields on successful signup
          setUsername("");
          setEmail("");
          setPassword("");
          setErrors({});
          setSuccess(true); // Set success to true to show success message
        })
        .catch(() => setSuccess(false)); // Set success to false if signup fails
    }
  };

  // Check if error is an object and get the error message
  const errorMessage =
    error && typeof error === "object"
      ? error.message || JSON.stringify(error)
      : error;

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
      <Typography variant="h5">Sign Up</Typography>

      {/* Show success message if signup was successful */}
      {success && (
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Signup successful!
        </Alert>
      )}

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignup}
        fullWidth
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
      <Link component={RouterLink} to="/" underline="hover" sx={{ mt: 2 }}>
        Already have an account? Login
      </Link>
    </Box>
  );
};

export default Signup;
