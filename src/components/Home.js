import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { RiPlantFill } from "react-icons/ri";
import { BsFillSunFill } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import Loading from "./Loading";
import styles from "./Home.module.css";

const API_KEY = process.env.REACT_APP_VEG_API_KEY;

function Home() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    randomItems();
  }, []);

  const randomItems = async () => {
    try {
      let fetchItems = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=60`
      );
      let random = await fetchItems?.data?.recipes;
      let vegRecipes = random.filter((item) => item?.vegetarian === true);
      setRandomRecipes(vegRecipes.slice(0, 12));
      setLoading(!loading);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <div className={styles["Header"]}>
        <div className={styles["Header-background"]}></div>
        <div className={styles["Header-content"]}>
          <div className={styles["Header-hero"]}>
            <h1>
              Veg Recipes App <br />
            </h1>
            <p>
              Tired to looking for the same recipes every day?
              <br /> Here you'll find something new
            </p>
            <Link to="recipe-list">
              <button className={styles["Button"]}>GO!</button>
            </Link>
          </div>
        </div>
      </div>

      <div className={`container-fluid mt-3`}>
        <div className="row">
          <div className="col-lg-4 p-3">
            <RiPlantFill className={styles["icon"]} />
            <h2>Titolo 1</h2>
            <p className="lead mb-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
          <div className={`col-lg-4 p-3`}>
            <BsFillSunFill className={styles["icon"]} />
            <h2>Titolo 2</h2>
            <p className="lead mb-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <div className="col-lg-4 p-3">
            <FaLeaf className={styles["icon"]} />
            <h2>Titolo 3</h2>
            <p className="lead mb-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <h2 className="mt-2 mb-2">Highlights</h2>
            <div className="container-fluid mx-auto row">
              {randomRecipes.map((item) => (
                <div className="card col-lg-4" key={item?.id}>
                  <img
                    src={item?.image}
                    className="card-img-top"
                    alt={item?.title}
                  />
                  <div className="card-body">
                    <Link to={`/recipe-list/${item?.id}`}>
                      <h3 className="card-title">{item?.title}</h3>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Home;
