import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import GroupCard from "./GroupCard";
import {store} from "../../store/store";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("renders component", () => {
    const group = {
        name: "TestGroup",
        description: "",
    };

    render(<GroupCard img={`https://source.unsplash.com/collection/0/200x200`} group={group}/>, {wrapper});

    const img = screen.getByRole("img");
    const name = screen.getByText(/TestGroup/i);
    const desc = screen.getByText(/Pas de description/i);
    expect(img).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
});
