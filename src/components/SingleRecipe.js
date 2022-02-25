import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./SingleRecipe.module.css";
import Loading from "./Loading";

const API_KEY = process.env.REACT_APP_VEG_API_KEY;

function SingleRecipe() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  let params = useParams();
  console.log(params.id);

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles["color"]}>
          <h1>{item?.title}</h1>
          <img src={item?.image} alt="" />
        </div>
      )}
    </>
  );
}

export default SingleRecipe;
