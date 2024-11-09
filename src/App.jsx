import { Routes, Route } from "react-router-dom";

import Home from "./components/home/home";
import Navbar from "./components/navigation/navbar";
import Categories from "./components/categories/categories";
import RecipeDetails from "./components/search-ingredient/RecipeDetails";
import RecipesListByIngredient from "./components/search-ingredient/search-ingredient";
import CategoryDetails from "./components/categories/CategoryDetails";
import SearchMeal from "./components/search-meal/searchmeal";
import Auth from "./Auth"; // Login page
import { AuthProvider } from "./AuthContext"; // Context provider for auth
import ProtectedRoute from "./ProtectedRoute"; // Protects routes for logged-in users

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Auth />} /> {/* Login page */}

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-meal"
          element={
            <ProtectedRoute>
              <SearchMeal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/:category"
          element={
            <ProtectedRoute>
              <CategoryDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ingredient"
          element={
            <ProtectedRoute>
              <RecipesListByIngredient />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
