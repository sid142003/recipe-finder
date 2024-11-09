import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Container,
  TextField,
  IconButton,
} from "@mui/material";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const RecipesListByIngredient = () => {
  const [ingredientRecipes, setIngredientRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("bread");
  const [parameter, setParameter] = useState("bread");

  const navigate = useNavigate();

  useEffect(() => {
    async function getIngredientRecipes() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${parameter}`
        );
        const data = await response.json();
        setLoading(false);

        if (data) {
          setIngredientRecipes(data.meals);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    setCurrentPage(1);
    getIngredientRecipes();
  }, [parameter]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = ingredientRecipes
    ? ingredientRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    : [];

  const totalPages = ingredientRecipes
    ? Math.ceil(ingredientRecipes.length / recipesPerPage)
    : 0;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setParameter(searchTerm);
  };

  const handleCardClick = (idMeal) => {
    navigate(`/recipe/${idMeal}`);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          component="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            color: "primary.main",
          }}
        >
          Recipes with {parameter ? parameter : "an ingredient"}
        </Typography>

        {/* Search Box */}
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
            label="Search by Ingredient"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.main",
                },
                "&:hover fieldset": {
                  borderColor: "primary.light",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
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

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : ingredientRecipes ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
              gap: 3,
            }}
          >
            {currentRecipes.map((recipe) => (
              <Card
                key={recipe.idMeal}
                onClick={() => handleCardClick(recipe.idMeal)}
                sx={{
                  position: "relative",
                  maxWidth: 345,
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <Box sx={{ position: "relative", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    sx={{
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      filter: "brightness(90%)",
                      transition: "filter 0.3s ease",
                      "&:hover": {
                        filter: "brightness(75%)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        textShadow: "0px 0px 8px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      View Recipe
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ textAlign: "center", p: 2 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "light", color: "text.primary" }}
                  >
                    {recipe.strMeal}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="error" textAlign="center">
            No data to display for <strong>{parameter}</strong>. Please try
            another ingredient.
          </Typography>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RecipesListByIngredient;
