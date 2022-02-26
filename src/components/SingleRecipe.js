import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./SingleRecipe.module.css";
import Loading from "./Loading";
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
    console.log(details);
    setItem(details);
    setLoading(!loading);
    console.log(item);
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
            className={`${styles["img-size"]} rounded pb-4`}
            src={item?.image}
            alt={item?.title}
          />
          </div>
          <div className="container mx-auto">
            <Markup content={contentArticle} />
          </div>

          {item?.extendedIngredients.map(ing => {
            return(
             <div>
               <img src={ing?.image} alt="" />
               <p>{ing?.name}</p>
             </div> 
            )
          })}

        </div>


      )}

        

    </>
  );
}

export default SingleRecipe;
