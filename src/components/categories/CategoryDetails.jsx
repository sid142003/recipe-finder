import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Container, Card, CardContent, CardMedia, Pagination } from "@mui/material";

export default function CategoryDetails() {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6); // Number of recipes per page
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = await response.json();
        setLoading(false);

        if (data.meals) {
          setRecipes(data.meals);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [category]);

  // Pagination calculations
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRecipeClick = (idMeal) => {
    navigate(`/recipe/${idMeal}`);
  };

  return (
    <Container sx={{ py: 5 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
            {category} Recipes
          </Typography>
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
                onClick={() => handleRecipeClick(recipe.idMeal)}
                sx={{
                  maxWidth: 345,
                  borderRadius: "16px",
                  boxShadow: 3,
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
              >
                <CardMedia component="img" height="180" image={recipe.strMealThumb} alt={recipe.strMeal} />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: "Light" }}>
                    {recipe.strMeal}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
