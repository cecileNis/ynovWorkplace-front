import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import Toast from "./Toast";
import {store} from "../store/store";
import {setToast} from "../store/reducers/toast";

const wrapper = ({children}) => <Provider store={store}>{children}</Provider>;

test("renders component", () => {
    store.dispatch(setToast({message: "test"}));
    render(<Toast/>, {wrapper});

    const message = screen.getByText("test");
    
    expect(message).toBeInTheDocument();
});
