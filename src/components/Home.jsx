import React from "react";
import "../App.css";
import Menu from "../components/Menu";
import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";

const dishes = [
  {
    id: 1,
    title: "Fresh Greek Salad",
    image: "greek-salad.jpg",
    summary:
      "A refreshing mix of cucumbers, tomatoes, olives, and feta cheese tossed in a light olive oil dressing.",
    ingredients: [
      "Cucumbers",
      "Cherry tomatoes",
      "Red onion",
      "Kalamata olives",
      "Feta cheese",
      "Olive oil",
      "Oregano",
    ],
  },
  {
    id: 2,
    title: "Grilled Lamb Kofta",
    image: "Lamb-kofta.jpg",
    summary:
      "Juicy spiced lamb skewers grilled to perfection and served with warm flatbread and tzatziki sauce.",
    ingredients: [
      "Ground lamb",
      "Garlic",
      "Cumin",
      "Coriander",
      "Cilantro",
      "Flatbread",
      "Tzatziki",
    ],
  },
  {
    id: 3,
    title: "Classic Baklava",
    image: "Baklava.jpg",
    summary:
      "Crispy layers of filo pastry filled with chopped nuts and sweetened with fragrant honey syrup.",
    ingredients: [
      "Filo dough",
      "Walnuts",
      "Pistachios",
      "Butter",
      "Cinnamon",
      "Honey",
      "Sugar",
      "Lemon juice",
    ],
  },
];

const HomePage = () => {
  return (
    <main className="homepage">
      <section className="hero">
        <h1>
          <span className="logo-lemon">🍋</span>Little Lemon
        </h1>
        <p className="tagline">
          A family-owned Mediterranean restaurant blending time-honored recipes
          with a modern flair.
        </p>
      </section>

      <section className="bio">
        <h2>Our Story</h2>
        <p>
          Welcome to Little Lemon, where we serve authentic Mediterranean
          flavors crafted with love and the freshest ingredients. From tangy
          tabbouleh to savory lamb kofta, every dish tells a story of tradition
          and passion.
        </p>
      </section>

      <section className="food-gallery">
        <h2>Featured Dishes</h2>
        <div className="gallery">
          {dishes.map((dish) => (
            <figure key={dish.id}>
              <img src={dish.image} alt={dish.title} />
              <figcaption>
                <strong>{dish.title}</strong>
              </figcaption>
              <p className="dish-summary">{dish.summary}</p>
              <div className="dish-ingredients">
                <strong>Ingredients:</strong>
                <ul className="ingredient-list">
                  {dish.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </figure>
          ))}
        </div>
        <Menu />
        <Testimonials />
        <section className="reserve-cta">
          <h2>Ready to dine with us?</h2>
          <Link to="/reserve" className="reserve-link">
            Reserve a Table
          </Link>
        </section>
      </section>
    </main>
  );
};

export default HomePage;
