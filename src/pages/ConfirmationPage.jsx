import React from "react";
import { useLocation, Link } from "react-router-dom";

const ConfirmationPage = () => {
  const { state } = useLocation();
  const name = state?.name || "Guest";
  const guests = state?.guests || "?";
  const date = state?.date || "[date]";
  const time = state?.time || "[time]";
  const contactMethod = state?.contactMethod || "your preferred method";
  const contactInfo = state?.contactInfo || "[contact info]";

  return (
    <section className="confirmation-message" role="status">
      <h2>✅ Reservation Confirmed!</h2>
      <p>
        Thank you <strong>{name}</strong>, your reservation for{" "}
        <strong>{guests}</strong> guest(s) on <strong>{date}</strong> at{" "}
        <strong>{time}</strong> has been confirmed.
      </p>
      <p>
        We will contact you via <strong>{contactMethod}</strong> at:{" "}
        <strong>{contactInfo}</strong>
      </p>
      <Link to="/" className="reserve-link">
        Back to Home
      </Link>
    </section>
  );
};

export default ConfirmationPage;
