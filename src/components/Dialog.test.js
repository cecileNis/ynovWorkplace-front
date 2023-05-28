import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {BrowserRouter} from "react-router-dom";
import AlertDialog from "./Dialog";
import {setLoggedUser} from "../store/reducers/auth";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("renders component", () => {
    store.dispatch(setLoggedUser({id: 1}));
    render(<AlertDialog/>, {wrapper});

    const btn = screen.getByText(/Supprimer mon compte/i);
    
    expect(btn).toBeInTheDocument();
});
