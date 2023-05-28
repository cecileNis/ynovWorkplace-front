import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "../../store/store";
import GroupMemberList from "./GroupMemberList";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("renders component", () => {
    const members = [
        "Membre 001",
        "Membre 002",
        "Membre 003",
    ]

    render(<GroupMemberList members={members}/>, {wrapper});

    const m1 = screen.getByText(/Membre 001/i);
    const m2 = screen.getByText(/Membre 002/i);
    const m3 = screen.getByText(/Membre 003/i);

    expect(m1).toBeInTheDocument();
    expect(m2).toBeInTheDocument();
    expect(m3).toBeInTheDocument();
});
