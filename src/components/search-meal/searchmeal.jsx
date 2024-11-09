import { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchMeal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm) return;

    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      setLoading(false);

      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
        setError("No meals found. Try searching for something else.");
      }
    } catch (err) {
      console.error("Error fetching meals:", err);
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  const handleMealClick = (idMeal) => {
    navigate(`/recipe/${idMeal}`);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}>
        Search for a Meal
      </Typography>

      {/* Search Form */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          label="Enter meal name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500 }}
        />
          <IconButton
            type="submit"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              borderRadius: "8px",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <IoSearchSharp />
          </IconButton>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography variant="body1" color="error" sx={{ textAlign: "center", my: 2 }}>
          {error}
        </Typography>
      )}

      {/* Display Search Results */}
      <Grid container spacing={3}>
        {meals.map((meal) => (
          <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
            <Card
              onClick={() => handleMealClick(meal.idMeal)}
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {meal.strMeal}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {meal.strCategory} | Area: {meal.strArea}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchMeal;
