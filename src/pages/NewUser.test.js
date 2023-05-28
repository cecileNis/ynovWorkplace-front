import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import NewUser from "./NewUser";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("Display component", () => {
    render(<NewUser/>, {wrapper});

    const pseudoField = screen.getByTestId("name-input");
    const emailField = screen.getByTestId("email-input");
    const passwordField = screen.getByTestId("password-input");

    expect(pseudoField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
});
