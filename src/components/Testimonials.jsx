import React, { useState, useEffect } from "react";
import "../App.css";

const testimonials = [
  {
    name: "Amira",
    quote:
      "Little Lemon brings the true taste of the Mediterranean right to my table. Absolutely delicious!",
  },
  {
    name: "Leo",
    quote:
      "I love the cozy vibe and the friendly service. The lamb kofta is next level.",
  },
  {
    name: "Sofia",
    quote: "Baklava to die for. I'm coming back every week!",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section className="testimonial-section">
      <h2>What Our Guests Say</h2>
      <div className="testimonial-card">
        <p className="quote">“{current.quote}”</p>
        <p className="guest">— {current.name}</p>
      </div>
    </section>
  );
};

export default Testimonials;
