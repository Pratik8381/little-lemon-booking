import React, { useEffect, useState } from "react";
import "../App.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?cuisine=Mediterranean&number=60&apiKey=b887b3744a984730a96690a6cb899e8c`
    )
      .then((res) => res.json())
      .then((data) => setMenuItems(data.results))
      .catch((err) => console.error("Error fetching menu items:", err));
  }, []);

  return (
    <section className="menu-section">
      <h2>Explore Our Menu</h2>
      <div className="menu-vertical-card">
        {menuItems.map((item) => (
          <div className="menu-item-vertical" key={item.id}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
