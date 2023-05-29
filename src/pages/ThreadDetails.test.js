import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import ThreadDetails from "./ThreadDetails";
import {setCurrentThread} from "../store/reducers/thread";
import {setMessages} from "../store/reducers/message";
import {BrowserRouter} from "react-router-dom";

const wrapper = ({children}) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>;
    </BrowserRouter>
);

test("Display component", () => {
    store.dispatch(setCurrentThread({title: "TestThread"}))
    store.dispatch(setMessages([
        {"@id": "/api/messages/1", owner: "/api/users/1", content: "content 1"},
        {"@id": "/api/messages/2", owner: "/api/users/2", content: "content 2"},
    ]))
    render(<ThreadDetails/>, {wrapper});

    const title = screen.getByText(/TestThread/i);
    const m1 = screen.getByText(/content 1/i);
    const m2 = screen.getByText(/content 2/i);

    expect(title).toBeInTheDocument();
    expect(m1).toBeInTheDocument();
    expect(m2).toBeInTheDocument();
});
