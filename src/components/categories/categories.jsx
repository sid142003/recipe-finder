import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Box,
  Container,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function getCategories() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        const data = await response.json();
        setLoading(false);

        if (data) {
          setCategories(data.categories);
          toast.success("Categories loaded successfully!");
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Failed to load categories. Please try again.");
      }
    }
    getCategories();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentCategories = categories.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(categories.length / recipesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCardClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <Container>
      <ToastContainer />
      <Box sx={{ py: 5, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h3"
          sx={{ fontWeight: "bold", mb: 3, mt: 3, color: "primary.main" }}
        >
          Categories
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
              gap: 3,
              mt: 3,
            }}
          >
            {currentCategories.map((category) => (
              <Card
                key={category.idCategory}
                onClick={() => handleCardClick(category.strCategory)}
                sx={{
                  maxWidth: 345,
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={category.strCategoryThumb}
                  alt={category.strCategory}
                  sx={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />
                <CardContent sx={{ textAlign: "center", p: 2 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    {category.strCategory}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {expandedDescriptions[category.idCategory]
                      ? category.strCategoryDescription
                      : `${category.strCategoryDescription?.slice(0, 100)}...`}
                  </Typography>
                  {category.strCategoryDescription && category.strCategoryDescription.length > 100 && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDescription(category.idCategory);
                      }}
                      size="small"
                      sx={{ mt: 1, color: "primary.main" }}
                    >
                      {expandedDescriptions[category.idCategory] ? "Show Less" : "Read More"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

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
      </Box>
    </Container>
  );
}
