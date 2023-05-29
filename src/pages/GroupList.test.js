import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import GroupList from "./GroupList";
import {setGroups} from "../store/reducers/group";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("Display component", () => {
    const groups = [
        {"@id": "/api/groups/1", name: "Groupe 1", description: "Hello"},
        {"@id": "/api/groups/2", name: "Groupe 2", description: ""},
    ]

    store.dispatch(setGroups(groups))

    render(<GroupList/>, {wrapper});

    const n1 = screen.getByText(/Groupe 1/i);
    const d1 = screen.getByText(/Hello/i);

    const n2 = screen.getByText(/Groupe 2/i);
    const d2 = screen.getByText(/Pas de description/i);

    expect(n1).toBeInTheDocument();
    expect(d1).toBeInTheDocument();

    expect(n2).toBeInTheDocument();
    expect(d2).toBeInTheDocument();
});
