import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import User from "./User";

const wrapper = ({children}) => <Provider store={store}>{children}</Provider>;

test("Display component", () => {
    render(<User/>, {wrapper});
    const name = screen.getByText(/User A/i);
    expect(name).toBeInTheDocument();
});
