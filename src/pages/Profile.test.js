import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import Profile from "./Profile";
import {setLoggedUser} from "../store/reducers/auth";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("Display component", () => {
    store.dispatch(setLoggedUser({nickname: "TestUser"}))
    render(<Profile/>, {wrapper});

    const message = screen.getByText(/Bienvenue TestUser/i);

    expect(message).toBeInTheDocument();
});
