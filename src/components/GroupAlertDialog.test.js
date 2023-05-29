import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { BrowserRouter } from "react-router-dom";
import GroupAlertDialog from "./GroupAlertDialog";

const wrapper = ({ children }) => (
  <BrowserRouter>
    <Provider store={store}>{children}</Provider>;
  </BrowserRouter>
);

test("renders component", () => {
  render(<GroupAlertDialog />, { wrapper });

  const btn = screen.getByText(/M'inscrire a ce groupe/i);
  expect(btn).toBeInTheDocument();
});
