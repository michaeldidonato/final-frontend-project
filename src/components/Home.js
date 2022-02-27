import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHospitalSymbol } from "react-icons/fa";
import { GiMeat } from "react-icons/gi";
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

      <div className={`container-fluid ${styles["sizing-box"]}`}>
        <div className="row">
          <div className="col-lg-4 p-3">
            <FaLeaf className={styles["icon"]} />
            <h2>Green</h2>
            <p className="lead mb-0">
            From recycling our household rubbish to cycling to work, we're all aware of ways
            to live a greener life. One of the most effective things an individual can do to
            lower their carbon footprint is to avoid all animal products
            </p>
          </div>
          <div className={`col-lg-4 p-3`}>
            <GiMeat className={styles["icon"]} />
            <h2>Animal frendly</h2>
            <p className="lead mb-0">
            Preventing the exploitation of animals is not the only reason for becoming vegan,
             but for many it remains the key factor.
             Avoiding animal products is one of the most obvious ways you can 
             take a stand against animal cruelty and animal exploitation everywhere
            </p>
          </div>

          <div className="col-lg-4 p-3">
            <FaHospitalSymbol className={styles["icon"]} />
            <h2>Healty</h2>
            <p className="lead mb-0">
            Well-planned vegan diets follow healthy eating guidelines, 
            and contain all the nutrients that our bodies need.
            Some research has linked vegan diets with lower blood pressure and cholesterol,
            and lower rates of heart disease, type 2 diabetes and some types of cancer
            </p>
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <Loading />
        ) : (
          <section className={styles["bg-color"]}>
            <h1 className="pt-5 pb-4">Highlights</h1>
            <div className="container-fluid mx-auto row pb-3">
              {randomRecipes.map((item) => (
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
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default Home;
