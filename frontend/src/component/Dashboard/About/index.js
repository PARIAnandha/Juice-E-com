// About.js
import React, { useState } from "react";
import { Container, Typography, Box, Grid, IconButton } from "@mui/material";
import {
  LocalDrink,
  Spa,
  Favorite,
  Public,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Sidebar from "../Sidebar/indext";

const About = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box display="flex">
      {/* Sidebar Component */}
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />

      {/* Floating Menu Button */}
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
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </IconButton>

      {/* Main About Content */}
      <Container maxWidth="md" sx={{ mt: 5, mb: 5, flexGrow: 1 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="primary"
          >
            About Us
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Fresh, Natural, and Delicious Juices
          </Typography>
        </Box>

        {/* Introduction Section */}
        <Box mb={4}>
          <Typography variant="body1" color="text.secondary">
            At <strong>Juice Shop Name</strong>, we believe in offering our
            customers the finest and freshest juices made from the highest
            quality fruits and vegetables. Our mission is to provide delicious
            and nutritious beverages that promote a healthy lifestyle.
          </Typography>
        </Box>

        {/* Why Choose Us Section */}
        <Box mb={4}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            color="primary"
            mb={2}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <LocalDrink fontSize="large" color="secondary" />
              <Typography variant="h6" fontWeight="medium" mt={1}>
                Fresh Ingredients
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                We use only the freshest fruits and vegetables sourced from
                local farms to ensure the highest quality in every sip.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Spa fontSize="large" color="secondary" />
              <Typography variant="h6" fontWeight="medium" mt={1}>
                Unique Flavors
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Our expert team is always experimenting with unique flavor
                combinations to bring you juices that are both refreshing and
                surprising.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Favorite fontSize="large" color="secondary" />
              <Typography variant="h6" fontWeight="medium" mt={1}>
                Health Benefits
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Our juices are packed with essential nutrients, helping you stay
                energized and hydrated throughout the day.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Public fontSize="large" color="secondary" />
              <Typography variant="h6" fontWeight="medium" mt={1}>
                Eco-Friendly
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                We are committed to sustainability, using eco-friendly packaging
                and practices to minimize our environmental impact.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Mission Statement */}
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" fontWeight="medium" color="primary">
            Join us in our journey toward healthier living, one juice at a time!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
