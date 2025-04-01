import React, { useRef, useEffect, useState, useReducer } from "react";
import BookingForm from "../components/BookingForm";
import "../App.css";

// This would normally fetch from an API
const fetchAPI = (date) => {
    // Simulate API that returns different available times based on date
    const availableTimes = {
        '2025-04-01': ['17:00', '18:00', '19:00', '20:00', '21:00'],
        '2025-04-02': ['17:30', '18:30', '19:30', '20:30'],
        '2025-04-03': ['17:00', '18:00', '20:00', '21:00'],
        // Add more dates as needed
    };

    // Default times if date is not found
    const defaultTimes = ['17:00', '18:00', '19:00', '20:00'];

    return availableTimes[date] || defaultTimes;
};

// Reducer for managing available times
const timesReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return fetchAPI(action.payload);
        default:
            return state;
    }
};

const ReservationPage = () => {
    const formRef = useRef();
    const today = new Date().toISOString().split("T")[0];

    // Initialize available times state with a reducer
    const [availableTimes, dispatch] = useReducer(timesReducer, [], () => fetchAPI(today));

    // Form data state
    const [formData, setFormData] = useState({
        name: "",
        date: today,
        time: availableTimes[0] || "17:00",
        guests: "1",
        contactMethod: "email",
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    // Update available times when date changes
    useEffect(() => {
        dispatch({ type: 'UPDATE_TIMES', payload: formData.date });
    }, [formData.date]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.date) errors.date = "Date is required";
        if (!formData.time) errors.time = "Time is required";
        if (!formData.guests || formData.guests < 1)
            errors.guests = "Guests must be at least 1";
        if (formData.guests > 10)
            errors.guests = "Maximum 10 guests per reservation";
        return errors;
    };

    return (
        <section className="reservation-page" ref={formRef}>
            <h2 className="reservation-title">Reserve a Table</h2>

            <BookingForm
                formData={formData}
                formErrors={formErrors}
                handleChange={handleChange}
                validateForm={validateForm}
                availableTimes={availableTimes}
            />
        </section>
    );
};

export default ReservationPage;
