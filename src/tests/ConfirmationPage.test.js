import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ConfirmationPage from "../pages/ConfirmationPage";

const mockState = {
  name: "John",
  guests: "2",
  date: "2025-04-01",
  time: "18:30",
  contactMethod: "email",
  contactInfo: "john@example.com",
};

const setup = () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: "/confirmation", state: mockState }]}>
      <Routes>
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("ConfirmationPage", () => {
  test("renders confirmation details", () => {
    setup();
    expect(screen.getByText(/Reservation Confirmed/i)).toBeInTheDocument();
    expect(screen.getAllByText(/John/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText((content) =>
        content.includes("your reservation for") && content.includes("guest")
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/2025-04-01/i)).toBeInTheDocument();
    expect(screen.getByText(/18:30/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });
});
