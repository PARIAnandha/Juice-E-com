// Contact.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Menu as MenuIcon,
  WhatsApp,
} from "@mui/icons-material";
import Sidebar from "../Sidebar/indext";

const Contact = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />

      {/* Floating Menu Icon to Toggle Sidebar */}
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
          zIndex: 1000,
        }}
        onClick={handleSidebarToggle}
      >
        <MenuIcon />
      </IconButton>

      {/* Floating WhatsApp Badge in Bottom-Left */}
      <Box
        component="a"
        href="https://wa.me/919080565542?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services!"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          backgroundColor: "#25D366",
          color: "#fff",
          padding: 1.5,
          borderRadius: "50%",
          boxShadow: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          width: 20,
          height: 20,
          "&:hover": {
            backgroundColor: "#20b557",
          },
        }}
      >
        <WhatsApp fontSize="medium" />
      </Box>

      {/* Main Contact Content */}
      <Container maxWidth="sm" sx={{ mt: 5, mb: 5, flexGrow: 1 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="primary"
          >
            Contact Us
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            We love to hear from you!
          </Typography>
        </Box>

        {/* Contact Information */}
        <Grid container spacing={3}>
          {/* Phone Section */}
          <Grid item xs={12} display="flex" alignItems="center">
            <Phone fontSize="large" sx={{ color: "green", mr: 2 }} />
            <Box>
              <Typography variant="h6" fontWeight="medium">
                Phone
              </Typography>
              <Link
                href="tel:+1234567890"
                color="text.secondary"
                underline="hover"
              >
                +1 234 567 890
              </Link>
            </Box>
          </Grid>

          {/* Email Section */}
          <Grid item xs={12} display="flex" alignItems="center">
            <Email fontSize="large" sx={{ color: "orange", mr: 2 }} />
            <Box>
              <Typography variant="h6" fontWeight="medium">
                Email
              </Typography>
              <Link
                href="mailto:contact@juiceshop.com"
                color="text.secondary"
                underline="hover"
              >
                contact@juiceshop.com
              </Link>
            </Box>
          </Grid>

          {/* Location Section */}
          <Grid item xs={12} display="flex" alignItems="center">
            <LocationOn fontSize="large" sx={{ color: "red", mr: 2 }} />
            <Box>
              <Typography variant="h6" fontWeight="medium">
                Location
              </Typography>
              <Typography variant="body2" color="text.secondary">
                123 Juice Street, Freshville, CA 90210
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Footer or Social Media Links */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Follow us on social media or visit us in-store!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
