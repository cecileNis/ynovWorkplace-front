import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import NotFound from "./NotFound";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("Display component", () => {
    render(<NotFound/>, {wrapper});

    const message = screen.getByText(/Oups ! Il semblerait que la page que vous recherchez n'existe pas/i);

    expect(message).toBeInTheDocument();
});
