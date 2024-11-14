import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Button,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../Home/Sidebar/indext";
import About from "../About";
import Contact from "../Contact";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [openCartModal, setOpenCartModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/products")
      .then((response) => {
        const productsWithBase64Images = response.data.map((product) => {
          if (product.images && product.images.length > 0) {
            product.images = product.images.map((image) =>
              getBase64Image(image),
            );
          }
          return product;
        });
        setProducts(productsWithBase64Images);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const getBase64Image = (image) => {
    if (image && image.data && image.contentType) {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(image.data.data)),
      );
      return `data:${image.contentType};base64,${base64String}`;
    }
    return null;
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleOpenCartModal = () => setOpenCartModal(true);
  const handleCloseCartModal = () => setOpenCartModal(false);

  const handleQuantityChange = (item, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem,
      ),
    );
  };

  const handleRemoveItem = (itemToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemToRemove._id),
    );
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

        <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
          <IconButton
            sx={{
              backgroundColor: "#ff6f61",
              color: "#fff",
              padding: 2,
              borderRadius: "50%",
              boxShadow: 3,
            }}
            onClick={handleOpenCartModal}
          >
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card
                sx={{
                  maxWidth: 345,
                  backgroundColor: "#f8f8f8",
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0] || ""}
                  alt={product.name}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                </CardContent>
                <Button
                  onClick={() => addToCart(product)}
                  sx={{
                    margin: 2,
                    backgroundColor: "#ff6f61",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#ff5a47",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Cart Modal */}
        <Dialog
          open={openCartModal}
          onClose={handleCloseCartModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Shopping Cart</DialogTitle>
          <DialogContent>
            {cartItems.length === 0 ? (
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign="center"
              >
                Your cart is empty.
              </Typography>
            ) : (
              <List>
                {cartItems.map((item) => (
                  <ListItem
                    key={item._id}
                    sx={{ borderBottom: "1px solid #ddd", py: 2 }}
                  >
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <CardMedia
                          component="img"
                          height="70"
                          width="70"
                          image={
                            item.images[0] || "https://via.placeholder.com/70"
                          }
                          alt={item.name}
                          sx={{ borderRadius: "5px" }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" sx={{ mx: 2 }}>
                          {item.quantity}*{item.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" sx={{ mx: 2 }}>
                          Total Amout : {item.quantity * item.price}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        container
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(
                              item,
                              Math.max(item.quantity - 1, 1),
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 2 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(item, item.quantity + 1)
                          }
                        >
                          +
                        </IconButton>
                      </Grid>
                      <Grid item xs={2} container justifyContent="flex-end">
                        <IconButton onClick={() => handleRemoveItem(item)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </DialogContent>
          <Typography variant="p">Total Product Count:</Typography>
          <Typography variant="p">Total Product Amount:</Typography>
          <Button>Order Conform</Button>
          <DialogActions>
            <Button onClick={handleCloseCartModal} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <About />
        <Contact />
      </Box>
    </div>
  );
};

export default Home;
