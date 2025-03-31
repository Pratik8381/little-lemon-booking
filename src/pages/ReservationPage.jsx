import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ReservationPage = () => {
  const formRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [formData, setFormData] = useState({
    name: "",
    date: today,
    time: now,
    guests: "1",
    contactMethod: "email",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.date) errors.date = "Date is required";
    if (!formData.time) errors.time = "Time is required";
    if (!formData.guests || formData.guests < 1)
      errors.guests = "Guests must be at least 1";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      navigate("/contact-details", {
        state: {
          name: formData.name,
          date: formData.date,
          time: formData.time,
          guests: formData.guests,
          contactMethod: formData.contactMethod,
        },
      });
    } else {
      navigate("/error");
    }
  };

  return (
    <section className="reservation-page">
      <h2 className="reservation-title">Reserve a Table</h2>

      <form
        ref={formRef}
        className="reservation-form"
        onSubmit={handleSubmit}
        aria-label="Reservation Form"
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          aria-required="true"
        />
        {formErrors.name && <span className="error">{formErrors.name}</span>}

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          aria-required="true"
        />
        {formErrors.date && <span className="error">{formErrors.date}</span>}

        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          aria-required="true"
        />
        {formErrors.time && <span className="error">{formErrors.time}</span>}

        <label htmlFor="guests">Number of Guests:</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          aria-required="true"
        />
        {formErrors.guests && (
          <span className="error">{formErrors.guests}</span>
        )}

        <label>Preferred Contact Method:</label>
        <div className="contact-options">
          <label
            className={`radio-option ${
              formData.contactMethod === "email" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={formData.contactMethod === "email"}
              onChange={handleChange}
            />
            Email
          </label>

          <label
            className={`radio-option ${
              formData.contactMethod === "text" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="contactMethod"
              value="text"
              checked={formData.contactMethod === "text"}
              onChange={handleChange}
            />
            Text
          </label>
        </div>

        <button type="submit" className="reserve-btn">
          Book Table
        </button>
      </form>
    </section>
  );
};

export default ReservationPage;
