// Sidebar.js
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Sidebar = ({ open, onClose }) => (
  <Drawer
    open={open}
    onClose={onClose}
    sx={{
      width: 240,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: 240,
        boxSizing: "border-box",
        backgroundColor: "#2c3e50", // Darker background for sidebar
        color: "#fff", // White text color
      },
    }}
  >
    {/* Sidebar Header with Circular Image */}
    <List sx={{ padding: 0 }}>
      <ListItem
        sx={{
          backgroundColor: "#34495e", // Dark background for header
          textAlign: "center",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="https://via.placeholder.com/80" // Replace with your logo image URL
          alt="Logo"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%", // Circular logo
            marginBottom: 8,
          }}
        />
        <ListItemText
          primary="Monkey Juice"
          sx={{
            color: "#fff",
            fontSize: "8rem", // Larger size
            fontWeight: "bold",
            marginTop: 4,
          }}
        />
      </ListItem>
    </List>
    <Divider sx={{ borderColor: "#fff" }} />

    {/* Navigation Links */}
    <List>
      <ListItem
        button
        component={Link}
        to="/home"
        sx={{
          color: "#fff",
          "&:hover": { backgroundColor: "#e74c3c" }, // Hover color for links
        }}
      >
        <ListItemIcon sx={{ color: "#fff" }}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/admin"
        sx={{
          color: "#fff",
          "&:hover": { backgroundColor: "#e74c3c" }, // Hover color for links
        }}
      >
        <ListItemIcon sx={{ color: "#fff" }}>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/about"
        sx={{
          color: "#fff",
          "&:hover": { backgroundColor: "#e74c3c" }, // Hover color for links
        }}
      >
        <ListItemIcon sx={{ color: "#fff" }}>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/contact"
        sx={{
          color: "#fff",
          "&:hover": { backgroundColor: "#e74c3c" }, // Hover color for links
        }}
      >
        <ListItemIcon sx={{ color: "#fff" }}>
          <ContactMailIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
