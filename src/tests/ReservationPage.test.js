import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReservationPage from "../pages/ReservationPage";

 beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ReservationPage", () => {
    test("renders with initial available times", () => {
        renderWithRouter(<ReservationPage />);

        const timeSelect = screen.getByLabelText(/time/i);
        expect(timeSelect.children.length).toBeGreaterThan(0);
    });

    test("updates available times when date changes", () => {
        renderWithRouter(<ReservationPage />);

        const dateInput = screen.getByLabelText(/date/i);
        const initialTimes = [...screen.getByLabelText(/time/i).children].map(option => option.value);

        // Change date to a different date
        act(() => {
            fireEvent.change(dateInput, { target: { value: "2025-04-02" } });
        });

        // Available times should update based on the new date
        const updatedTimes = [...screen.getByLabelText(/time/i).children].map(option => option.value);

        // This test needs to be adjusted based on your actual implementation
        // But in concept, we're testing that the times array changes when the date changes
        expect(updatedTimes).not.toEqual(expect.arrayContaining(initialTimes));
    });

    test("form validation prevents submission with invalid data", () => {
        renderWithRouter(<ReservationPage />);

        // Clear the name field
        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: "" } });

         const submitButton = screen.getByRole("button", { name: /book table/i });
        fireEvent.click(submitButton);

         expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    test("validates guest count limits", () => {
        renderWithRouter(<ReservationPage />);

         const guestsInput = screen.getByLabelText(/number of guests/i);
        fireEvent.change(guestsInput, { target: { value: "15" } });

         const submitButton = screen.getByRole("button", { name: /book table/i });
        fireEvent.click(submitButton);

         expect(screen.getByText(/maximum 10 guests/i)).toBeInTheDocument();
    });
});