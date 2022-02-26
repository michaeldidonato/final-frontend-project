import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./RecipeList.module.css";

const API_KEY = process.env.REACT_APP_VEG_API_KEY;

function RecipeList() {
  const [searchedRecipes, setSearchedRecipes] = useState("");
  const [boxItems, setBoxItems] = useState([]);

  const searchRecipes = async (event) => {
    try {
      if (searchedRecipes !== "") {
        event.preventDefault();
        let fetchSearch = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${searchedRecipes}&number=100&diet=vegetarian&apiKey=${API_KEY}`
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
    <section>
      <div className={`container-fluid mx-auto ${styles["search-box"]}`}>
        <h1 className=" pb-3 text-white">Type a Recipe you need</h1>
        <form onSubmit={searchRecipes}>
          <input
            type="text"
            name="recipes"
            placeholder="Search..."
            value={searchedRecipes}
            onChange={(event) => setSearchedRecipes(event.target.value)}
          />
          <button className={styles["button"]} type="submit">
            GO!
          </button>
        </form>
      </div>

      <div
        className={`container-fluid mx-auto row pt-4 pb-3 ${styles["bg-color"]}`}
      >
        {!boxItems.length ? (
          <h3 className={styles["undefined-recipes"]}>
            Nothing found right now<br />
            try to search something else
          </h3>
        ) : (
          <>
            {boxItems.map((item) => {
              return (
                <div className="card col-lg-4 mb-4" key={item?.id}>
                  <img
                    src={item?.image}
                    className={`rounded mx-auto d-block ${styles["img-size"]}`}
                    alt={item?.title}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{item?.title}</h3>
                    <Link to={`/recipe-list/${item?.id}`}>
                      <button class="mt-3 btn btn-warning">Read more</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}

export default RecipeList;
