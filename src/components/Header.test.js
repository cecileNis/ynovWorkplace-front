import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

const wrapper = ({ children }) => (
  <BrowserRouter>
    <Provider store={store}>{children}</Provider>;
  </BrowserRouter>
);

test("renders component", () => {
  render(<Header />, { wrapper });

  const logo = screen.getByText(/Ynov Workplace/i);
  expect(logo).toBeInTheDocument();
});
