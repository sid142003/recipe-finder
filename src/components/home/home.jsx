import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ShareIcon from '@mui/icons-material/Share';

// Background image from Unsplash
const backgroundImageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?fit=crop&w=1350&q=80';

// Styled components
const HeroSection = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${backgroundImageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#FFFFFF',
  textAlign: 'center',
  position: 'relative',
});

const Content = styled(Container)({
  position: 'relative',
  zIndex: 1,
  padding: '20px',
  color: '#FFFFFF',
  maxWidth: '600px',
});

const StyledButton = styled(Button)({
  marginTop: '24px',
  padding: '12px 36px',
  fontSize: '1rem',
  borderRadius: '30px',
  textTransform: 'uppercase',
  backgroundColor: '#FF477E',
  color: '#FFFFFF',
  fontWeight: 'bold',
  boxShadow: '0px 4px 15px rgba(255, 71, 126, 0.3)',
  '&:hover': {
    backgroundColor: '#FF618D',
  },
});

const HighlightsSection = styled(Container)({
  padding: '60px 20px',
  textAlign: 'center',
});

const HighlightCard = styled(Card)({
  padding: '20px',
  backgroundColor: '#FFFFFF',
  color: '#333',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  textAlign: 'center',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease-in-out',
  },
});

const Home = () => {
  return (
    <>
      <HeroSection>
        <Content>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              textShadow: '0px 0px 10px rgba(255, 255, 255, 0.8)',
            }}
          >
            Unleash Your Inner Chef
          </Typography>
          <Typography
            variant="h6"
            component="p"
            gutterBottom
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' },
              mt: 2,
              color: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            Discover, cook, and share exciting recipes from around the world. It’s more than just food—it’s an adventure!
          </Typography>
          <StyledButton component={Link} to="/categories">
            Start Exploring
          </StyledButton>
        </Content>
      </HeroSection>

      {/* Highlights Section */}
      <HighlightsSection maxWidth="lg">
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <HighlightCard>
              <RestaurantIcon fontSize="large" color="secondary" />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                Discover Recipes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Explore thousands of curated recipes tailored for all tastes and dietary preferences.
              </Typography>
            </HighlightCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <HighlightCard>
              <LocalFireDepartmentIcon fontSize="large" color="secondary" />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                Cook Along
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Step-by-step guides that make cooking easy and enjoyable, even for beginners.
              </Typography>
            </HighlightCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <HighlightCard>
              <ShareIcon fontSize="large" color="secondary" />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                Share Your Creations
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Snap and share your culinary creations with a vibrant community of food lovers.
              </Typography>
            </HighlightCard>
          </Grid>
        </Grid>
      </HighlightsSection>

      {/* Footer Section */}
      <Box sx={{ bgcolor: '#333', color: '#FFFFFF', py: 3, textAlign: 'center' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button component={Link} to="/" color="inherit" sx={{ fontSize: '0.9rem', textTransform: 'none', mx: 1 }}>
            Home
          </Button>
          <Button component={Link} to="/categories" color="inherit" sx={{ fontSize: '0.9rem', textTransform: 'none', mx: 1 }}>
            Categories
          </Button>
          <Button component={Link} to="/ingredient" color="inherit" sx={{ fontSize: '0.9rem', textTransform: 'none', mx: 1 }}>
            Search by Ingredient
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
