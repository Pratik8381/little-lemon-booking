import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReservationPage from "../pages/ReservationPage";

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ReservationPage", () => {
  test("renders reservation form", () => {
    renderWithRouter(<ReservationPage />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Guests/i)).toBeInTheDocument();
  });

  test("shows error if form is submitted empty", () => {
    renderWithRouter(<ReservationPage />);
    fireEvent.click(screen.getByRole("button", { name: /book table/i }));
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
  });

  test("allows selecting contact method", () => {
    renderWithRouter(<ReservationPage />);
    const textOption = screen.getByLabelText(/Text/i);
    fireEvent.click(textOption);
    expect(textOption.checked).toBe(true);
  });
});
