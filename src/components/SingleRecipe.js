import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./SingleRecipe.module.css";
import Loading from "./Loading";
import { Markup } from 'interweave';

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
          <h1 className="p-2">{item?.title}</h1>
          <img
            className={`rounded ${styles["img-size"]}`}
            src={item?.image}
            alt={item?.title}
          />
        <Markup content={contentArticle} />
        </div>
      )}
    </>
  );
}

export default SingleRecipe;
