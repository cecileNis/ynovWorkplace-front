import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import GroupDetails from "./GroupDetails";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("Display component", () => {
    render(<GroupDetails/>, {wrapper});

    const btn = screen.getByText(/Faire une requête/i);

    expect(btn).toBeInTheDocument();
});
