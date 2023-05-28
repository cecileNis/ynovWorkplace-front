import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import Login from "./Login";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("Display component", () => {
    render(<Login/>, {wrapper});

    const emailField = screen.getByTestId("email-input");
    const passwordField = screen.getByTestId("password-input");

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
});
