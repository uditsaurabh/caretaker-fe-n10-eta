import React from "react";
import renderer from "react-test-renderer";
import Header from "./index";

it("NavBar renders correctly", () => {
  const tree = renderer.create(<Header handleLogout={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
