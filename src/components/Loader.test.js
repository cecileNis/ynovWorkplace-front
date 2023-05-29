import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Loader from "./Loader";

const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

test("renders component", () => {
  render(<Loader />, { wrapper });

  const img = screen.getByRole("img");
  expect(img).toBeInTheDocument();
});
