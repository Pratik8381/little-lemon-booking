import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookingForm from "../components/BookingForm";

const mockProps = {
    formData: {
        name: "",
        date: "2025-04-01",
        time: "18:00",
        guests: "2",
        contactMethod: "email",
    },
    formErrors: {},
    handleChange: jest.fn(),
    validateForm: jest.fn(),
    availableTimes: ["17:00", "18:00", "19:00", "20:00"],
};

const MockForm = (props) => (
    <BrowserRouter>
        <BookingForm {...props} />
    </BrowserRouter>
);

describe("BookingForm", () => {
    test("renders all form fields", () => {
        render(<MockForm {...mockProps} />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
        expect(screen.getByText(/preferred contact method/i)).toBeInTheDocument();
        expect(screen.getByText(/email/i)).toBeInTheDocument();
        expect(screen.getByText(/text/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /book table/i })).toBeInTheDocument();
    });

    test("displays time options from availableTimes prop", () => {
        render(<MockForm {...mockProps} />);

        const timeSelect = screen.getByLabelText(/time/i);
        expect(timeSelect.children.length).toBe(4);
        expect(timeSelect.children[0].textContent).toBe("17:00");
        expect(timeSelect.children[1].textContent).toBe("18:00");
    });

    test("calls handleChange when inputs change", () => {
        render(<MockForm {...mockProps} />);

        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: "John Doe" } });

        expect(mockProps.handleChange).toHaveBeenCalled();
    });

    test("calls validateForm on submit", () => {
        render(<MockForm {...mockProps} />);

        const form = screen.getByRole("form", { name: /reservation form/i });
        fireEvent.submit(form);

        expect(mockProps.validateForm).toHaveBeenCalled();
    });

    test("displays error messages when they exist", () => {
        const propsWithErrors = {
            ...mockProps,
            formErrors: {
                name: "Name is required",
                guests: "Maximum 10 guests per reservation",
            },
        };

        render(<MockForm {...propsWithErrors} />);

        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/maximum 10 guests/i)).toBeInTheDocument();
    });
});