import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook"; // Icon for the logo

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #FF5F6D, #FFC371)", // Vibrant gradient background
        color: "#FFFFFF",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo and Brand Name */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton edge="start" color="inherit" aria-label="logo" component={Link} to="/">
            <MenuBookIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
              ml: 1,
              fontSize: "1.5rem",
              "&:hover": {
                color: "#FFFFFF",
                opacity: 0.9,
              },
            }}
          >
            Recipe App
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#FFFFFF",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              transition: "background 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/categories"
            sx={{
              color: "#FFFFFF",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              transition: "background 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Categories
          </Button>
          <Button
            component={Link}
            to="/ingredient"
            sx={{
              color: "#FFFFFF",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              transition: "background 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Search by Ingredient
          </Button>
          <Button
            component={Link}
            to="/search-meal"
            sx={{
              color: "#FFFFFF",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              transition: "background 0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Search by Meal
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
