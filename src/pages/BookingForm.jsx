import React from "react";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ formData, formErrors, handleChange, validateForm, availableTimes }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();

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
        <form
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
            <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                aria-required="true"
            >
                {availableTimes.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
            {formErrors.time && <span className="error">{formErrors.time}</span>}

            <label htmlFor="guests">Number of Guests:</label>
            <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                aria-required="true"
            />
            {formErrors.guests && <span className="error">{formErrors.guests}</span>}

            <label>Preferred Contact Method:</label>
            <div className="contact-options">
                <label
                    className={`radio-option ${formData.contactMethod === "email" ? "selected" : ""
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
                    className={`radio-option ${formData.contactMethod === "text" ? "selected" : ""
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
    );
};

export default BookingForm;