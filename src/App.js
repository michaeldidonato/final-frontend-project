import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecipeList from "./components/RecipeList";
import SingleRecipe from "./components/SingleRecipe";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recipe-list" element={<RecipeList />} />
        <Route path="recipe-list/:id" element={<SingleRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
