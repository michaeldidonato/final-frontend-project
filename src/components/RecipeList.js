import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_KEY = process.env.REACT_APP_VEG_API_KEY;

function RecipeList() {
  const [searchedRecipes, setSearchedRecipes] = useState("");
  const [boxItems, setBoxItems] = useState([]);

  const searchRecipes = async (event) => {
    try {
      if (searchedRecipes !== "") {
        event.preventDefault();
        let fetchSearch = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${searchedRecipes}&diet=vegetarian&apiKey=${API_KEY}`
        );
        let vegRecipes = await fetchSearch?.data?.results;
        setBoxItems(vegRecipes);
        console.log(boxItems);
      } else {
        event.preventDefault();
        setBoxItems([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <div className="App">
      <h1>Search something</h1>
      <form onSubmit={searchRecipes}>
        <input
          type="text"
          name="recipes"
          value={searchedRecipes}
          onChange={(event) => setSearchedRecipes(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      {boxItems.map((item) => {
        return (
          <Link to={`/recipe-list/${item.id}`}>
            <div key={item.id}>
              <h2>{item.title}</h2>
              <img src={item.image} alt="" />
            </div>
          </Link>
        );
      })}

    </div>
  );
}

export default RecipeList;
