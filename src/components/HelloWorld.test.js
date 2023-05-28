import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import HelloWorld from "./HelloWorld";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("renders component", () => {
    render(<HelloWorld name="Test"/>, {wrapper});

    const text = screen.getByText(/Hello Test/i);
    expect(text).toBeInTheDocument();
});
