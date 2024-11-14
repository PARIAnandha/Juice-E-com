import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Input,
  Typography,
  InputAdornment,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { AccountBox, AttachMoney, ShoppingCart } from "@mui/icons-material";

const ProductRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    images: [], // Changed 'image' to 'images' to handle multiple files
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      images: Array.from(e.target.files), // Convert the FileList to an array
    }));
  };

  const createProduct = async (productData, images) => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);

    // Append all selected files to FormData
    images.forEach((image) => {
      formData.append("images", image); // 'images' must match the backend field name
    });

    const response = await axios.post(
      "http://localhost:5000/api/admin/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      price: formData.price,
      quantity: formData.quantity,
    };

    setLoading(true);
    setError(null);
    try {
      await createProduct(productData, formData.images); // Pass multiple images
      setSuccess(true);
      setFormData({ name: "", price: "", quantity: "", images: [] });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create product. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "350px",
        margin: "auto",
        backgroundColor: "#fafafa",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        style={{ color: "#0288d1" }}
      >
        Product Registration
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBox style={{ color: "#0288d1" }} />
              </InputAdornment>
            ),
          }}
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          }}
        />
        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney style={{ color: "#0288d1" }} />
              </InputAdornment>
            ),
          }}
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          }}
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ShoppingCart style={{ color: "#0288d1" }} />
              </InputAdornment>
            ),
          }}
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          }}
        />
        <Input
          type="file"
          onChange={handleImageChange}
          fullWidth
          margin="normal"
          inputProps={{ accept: "image/*", multiple: true }} // Added 'multiple' attribute
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{
            marginTop: "20px",
            backgroundColor: "#00796b",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Register Product"
          )}
        </Button>
      </form>

      {error && (
        <Snackbar
          open={true}
          message={`Error: ${error}`}
          autoHideDuration={4000}
          onClose={() => setError(null)}
        />
      )}

      {success && (
        <Snackbar
          open={true}
          message="Product created successfully!"
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
        />
      )}
    </div>
  );
};

export default ProductRegister;
