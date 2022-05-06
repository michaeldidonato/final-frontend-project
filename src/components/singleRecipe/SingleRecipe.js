import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./SingleRecipe.module.css";
import Loading from "../loading/Loading";
import { Markup } from "interweave";

const API_KEY = process.env.REACT_APP_VEG_API_KEY;

function SingleRecipe() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  let params = useParams();

  useEffect(() => {
    itemDetails();
  }, []);

  const itemDetails = async () => {
    let fetchItem = await axios.get(
      `https://api.spoonacular.com/recipes/${params.id}/information?includeNutrition=true&apiKey=${API_KEY}`
    );
    let details = await fetchItem.data;
    setItem(details);
    setLoading(!loading);
  };

  const contentArticle = `<p>${item?.summary}</p>`;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={`container-fluid`}>
          <h1 className="text-center p-2">{item?.title}</h1>
          <div className={styles["img-center"]}>
            <img
              className={`${styles["img-size"]} mb-4`}
              src={item?.image}
              alt={item?.title}
            />
            <p>Ready in {item?.readyInMinutes} minutes</p>
          </div>

          <div className={`container mx-auto p-2 ${styles["bg-summary"]}`}>
            <Markup content={contentArticle} />
          </div>

          <div className="container mx-auto">
            <>
              <h2 className="text-center mt-2 pt-4">Ingredients</h2>
            </>
            <div className={styles["ingredients"]}>
              {item?.extendedIngredients.map((ing) => {
                return (
                  <div className="col-md-2 m-2 p-2" key={ing?.id}>
                    <img
                      className={styles["center"]}
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ing?.image}`}
                      alt={ing?.name}
                    />
                    <p className={styles["center"]}>
                      {ing?.name} {ing?.measures?.metric?.amount}{" "}
                      {ing?.measures?.metric?.unitShort}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <section className="container mx-auto">
            <h2 className="pt-3 pb-1">Instructions</h2>
            <div className={`p-1 mb-3 ${styles["bg-inst"]}`}>
              <Markup content={item?.instructions} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default SingleRecipe;
