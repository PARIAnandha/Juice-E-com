import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Helper function for handling errors
const handleError = (error) => {
  if (error.response) {
    return error.response.data || error.message;
  }
  return error.message;
};

// Signup API call
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw handleError(error);
  }
};

// Login API call
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Incorrect password. Please try again.");
    } else if (error.response && error.response.status === 404) {
      throw new Error("Email not found. Please sign up.");
    }
    throw new Error("Login failed. Please try again later.");
  }
};
