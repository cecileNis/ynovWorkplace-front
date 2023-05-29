import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import Home from "./Home";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("Display component", () => {
    render(<Home/>, {wrapper});

    const time = screen.getByText(/It's.*/i);

    expect(time).toBeInTheDocument();
});
