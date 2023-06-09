import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {setUsers} from "./store/reducers/user";
import {setLoggedUser} from "./store/reducers/auth";
import {API_URL, INFO_ID} from "./conf/api.conf";
import {setGroups} from "./store/reducers/group";
import {setLoading} from "./store/reducers/loading";
import socketIOClient from "socket.io-client";

const url = API_URL;
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

async function retrieveUsers() {
    try {
        let response = await axios.get(`${url}/api/users`);
        let users = response.data["hydra:member"];
        store.dispatch(setUsers(users));
    } catch (e) {
        store.dispatch(setUsers([]));
    }
}

async function retrieveLoggedUser() {
    try {
        let loggedUser = await axios.get(`${url}/api/users/${INFO_ID}/info`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("TOKEN")}`},
        });
        let user = loggedUser.data;
        store.dispatch(setLoggedUser(user));
        socket.emit("user login", {id: user.id, username: user.nickname});
    } catch (e) {
    }
}

async function retrieveGroups() {
    try {
        let response = await axios.get(`${url}/api/groups`);
        let groups = response.data["hydra:member"];
        store.dispatch(setGroups(groups));
    } catch (e) {
        store.dispatch(setGroups([]));
    }
}

Promise.all([retrieveLoggedUser(), retrieveUsers(), retrieveGroups()]).finally(() => store.dispatch(setLoading(false)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
