import { render, screen } from "@testing-library/react";
import UserList, { sortUsersByNickname } from "./UserList";
import { Provider } from "react-redux";
import { store } from "../store/store";

test("Sort users by nickname", () => {
  const users = [
    { nickname: "b" },
    { nickname: "a" },
    { nickname: "d" },
    { nickname: "c" },
  ];
  const expected = [
    { nickname: "a" },
    { nickname: "b" },
    { nickname: "c" },
    { nickname: "d" },
  ];

  let res = sortUsersByNickname(users);

  expect(res).toEqual(expected);
});

const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

test("Display component", () => {
  render(<UserList />, { wrapper });
  const linkElement = screen.getByText(/liste des utilisateurs/i);
  expect(linkElement).toBeInTheDocument();
});
