import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ContactDetailsPage from "../pages/ContactDetailsPage";

const setup = (contactMethod) => {
  render(
    <MemoryRouter initialEntries={[{ pathname: "/contact-details", state: { contactMethod } }]}>
      <Routes>
        <Route path="/contact-details" element={<ContactDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("ContactDetailsPage", () => {
  test("shows email input for email method", () => {
    setup("email");
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  test("shows phone input for text method", () => {
    setup("text");
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  });

  test("validates empty input", () => {
    setup("email");
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });
});
