import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import NewThread from "./NewThread";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("Display component", () => {
    render(<NewThread/>, {wrapper});

    const titleField = screen.getByTestId("title-input");
    const contentField = screen.getByTestId("content-input");

    expect(titleField).toBeInTheDocument();
    expect(contentField).toBeInTheDocument();
});
