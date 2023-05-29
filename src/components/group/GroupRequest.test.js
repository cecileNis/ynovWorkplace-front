import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "../../store/store";
import GroupRequest from "./GroupRequest";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("render component", () => {
    const request = {
        id: 1,
        targetUser: "/api/users/1"
    }
    render(<GroupRequest request={request}/>, {wrapper});

    const targetUserItem = screen.getByText(/\/api\/users\/1/i);

    expect(targetUserItem).toBeInTheDocument();
})