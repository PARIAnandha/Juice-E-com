import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
  Badge,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import ProductRegister from "../Admin/ProductRegister/indext";
import Sidebar from "../Dashboard/Sidebar/indext";

const ProductData = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false); // For the Add/Edit Product dialog
  const [editProduct, setEditProduct] = useState(null); // For edit mode
  const [openSidebar, setOpenSidebar] = useState(false);

  // Function to convert binary image data to base64 URL (only if the data is not empty)
  const getBase64Image = (image) => {
    if (image && image.data && image.contentType) {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(image.data.data)),
      );
      return `data:${image.contentType};base64,${base64String}`;
    }
    return null; // Return null if image data is missing
  };

  // Fetch products from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/products")
      .then((response) => {
        const productsWithBase64Images = response.data.map((product) => {
          // Convert image to base64 when fetching data
          const productWithImages = { ...product };
          if (product.images && product.images.length > 0) {
            productWithImages.images = product.images.map((image) =>
              getBase64Image(image),
            );
          }
          return productWithImages;
        });
        setProducts(productsWithBase64Images);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle Add button click to open the dialog
  const handleAddClick = () => {
    setEditProduct(null); // Clear any product being edited
    setOpen(true);
  };

  // Handle Edit button click
  const handleEditClick = (product) => {
    setEditProduct(product); // Set the product to be edited
    setOpen(true); // Open the dialog with the product data
  };

  // Handle Delete button click
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
      setProducts(products.filter((product) => product._id !== id)); // Update the state after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <IconButton
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            backgroundColor: "#ff6f61",
            color: "#fff",
            padding: 2,
            borderRadius: "50%",
            boxShadow: 3,
          }}
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontFamily: "'Pacifico', cursive",
            color: "#ff6f61",
            marginBottom: 3,
          }}
        >
          Monkey Juice Admin
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]} // Using the pre-converted base64 image
                        alt={product.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteClick(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Floating Add Button */}
        <IconButton
          style={{
            position: "fixed",
            bottom: 40,
            right: 20,
            backgroundColor: "#28a745",
            color: "#fff",
            borderRadius: "50%",
            padding: 16,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#218838")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#28a745")
          }
          onClick={handleAddClick}
        >
          <AddIcon />
        </IconButton>

        {/* Add/Edit Product Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogContent>
            <ProductRegister product={editProduct} />{" "}
            {/* Pass product data for editing */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default ProductData;
