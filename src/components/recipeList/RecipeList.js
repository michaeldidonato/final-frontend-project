import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import axios from "axios";
import styles from "./RecipeList.module.css";
import { apiCLient } from "../../apiClient/apiClient";

function RecipeList() {
  const [boxItems, setBoxItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { baseUrl, apiKey, recipeList } = apiCLient;
  const { register, handleSubmit } = useForm();

  const searchRecipes = async (data) => {
    try {
      if (data.recipe !== "") {
        setBoxItems([]);
        setLoading(true);
        let fetchSearch = await axios.get(
          baseUrl +
            recipeList.endpoint +
            `${data.recipe}` +
            recipeList.params +
            apiKey
        );
        let vegRecipes = await fetchSearch?.data?.results;
        setBoxItems(vegRecipes);
        setLoading(false);
      } else {
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
        <form onSubmit={handleSubmit(searchRecipes)}>
          <input
            type="text"
            name="recipes"
            placeholder="Search..."
            {...register("recipe")}
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
          <section className="mx-auto">
            <h3 className={styles["undefined-recipes"]}>
              Nothing found right now
              <br />
              try to search something else
            </h3>
            {loading ? <Loading /> : <div></div>}
          </section>
        ) : (
          <>
            {boxItems.map((item) => {
              return (
                <div className="card col-md-4 mb-4" key={item?.id}>
                  <img
                    src={item?.image}
                    className={`rounded mx-auto d-block ${styles["img-size"]}`}
                    alt={item?.title}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{item?.title}</h3>
                    <Link to={`/recipe-list/${item?.id}`}>
                      <button className="mt-3 btn btn-warning">
                        Read more
                      </button>
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
