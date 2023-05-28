import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "../../store/store";
import GroupThreadList from "./GroupThreadList";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("render component", () => {
    const threads = [{
        "@id ": "/api/users/1",
        title: "thread 1",
    }, {
        "@id ": "/api/users/2",
        title: "thread 2",
    }, {
        "@id ": "/api/users/3",
        title: "thread 3",
    },]
    render(<GroupThreadList threads={threads} onSearch={() => {
    }} onReset={() => {
    }}/>, {wrapper});

    const createThreadBtn = screen.getByText(/Je crée un fil de discussion/i);
    const t1 = screen.getByText(/thread 1/i);
    const t2 = screen.getByText(/thread 2/i);
    const t3 = screen.getByText(/thread 3/i);

    expect(createThreadBtn).toBeInTheDocument();
    expect(t1).toBeInTheDocument();
    expect(t2).toBeInTheDocument();
    expect(t3).toBeInTheDocument();
})