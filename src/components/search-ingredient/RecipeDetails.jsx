import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Container, Grid, Paper } from "@mui/material";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false);
      }
    }
    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Helper function to extract ingredients and measurements
  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <Container maxWidth="md" sx={{ py: 10}}>
      {recipe ? (
        <Card sx={{ maxWidth: 700, mx: "auto", boxShadow: 3, borderRadius: 2 }}>
          <CardMedia
            component="img"
           
            image={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{ borderRadius: "8px 8px 0 0" , height: "300px" ,width:"100%", objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: "bold", color: "primary.main" }}>
              {recipe.strMeal}
            </Typography>
            <Typography variant="h6" color="text.secondary" align="center">
              Category: {recipe.strCategory} | Area: {recipe.strArea}
            </Typography>

            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "secondary.main" }}>
                Ingredients
              </Typography>
              <Grid container spacing={2}>
                {getIngredients().map((ingredient, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper elevation={1} sx={{ padding: 1, textAlign: "center", bgcolor: "grey.100" }}>
                      <Typography variant="body1">{ingredient}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: "bold", color: "secondary.main" }}>
                Instructions
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
                {recipe.strInstructions}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="error" textAlign="center">
          Recipe details not found.
        </Typography>
      )}
    </Container>
  );
};

export default RecipeDetails;
