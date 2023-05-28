import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "../../store/store";
import GroupRequestList from "./GroupRequestList";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("render component", () => {
    const requests = [{
        id: 1,
        targetUser: "/api/users/1"
    }, {
        id: 2,
        targetUser: "/api/users/2"
    }, {
        id: 3,
        targetUser: "/api/users/3"
    },]
    render(<GroupRequestList requests={requests}/>, {wrapper});

    const r1 = screen.getByText(/\/api\/users\/1/i);
    const r2 = screen.getByText(/\/api\/users\/2/i);
    const r3 = screen.getByText(/\/api\/users\/3/i);

    expect(r1).toBeInTheDocument();
    expect(r2).toBeInTheDocument();
    expect(r3).toBeInTheDocument();
})