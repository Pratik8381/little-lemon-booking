import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const ContactDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [contactInfo, setContactInfo] = useState("");
  const [error, setError] = useState("");

  const method = state?.contactMethod || "email";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (method === "email" && !/\S+@\S+\.\S+/.test(contactInfo)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (method === "text" && !/^[0-9+\s()-]{7,}$/.test(contactInfo)) {
      setError("Please enter a valid phone number.");
      return;
    }

    navigate("/confirmation", {
      state: {
        ...state,
        contactInfo: contactInfo,
      },
    });
  };

  return (
    <section className="reservation-page">
      <h2 className="reservation-title">Contact Details</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        <label htmlFor="contactInput">
          {method === "email" ? "Email Address:" : "Phone Number:"}
        </label>
        <input
          type={method === "email" ? "email" : "tel"}
          id="contactInput"
          name="contactInput"
          placeholder={method === "email" ? "you@example.com" : "07123456789"}
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        {error && <span className="error">{error}</span>}

        <button type="submit" className="reserve-btn">
          Confirm
        </button>
      </form>
    </section>
  );
};

export default ContactDetailsPage;
