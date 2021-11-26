import React from "react";
import renderer from "react-test-renderer";
import TextInput from "./index";

it("ActiveMark renders correctly", () => {
  const tree = renderer.create(<TextInput />).toJSON();
  expect(tree).toMatchSnapshot();
});
