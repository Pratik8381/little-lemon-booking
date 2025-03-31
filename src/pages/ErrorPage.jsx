import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="confirmation-message error" role="alert">
      <h2>❌ Reservation Failed</h2>
      <p>Please ensure all required fields are filled in correctly.</p>
      <Link to="/reserve" className="reserve-link">
        Back to Reservation Form
      </Link>
    </section>
  );
};

export default ErrorPage;
