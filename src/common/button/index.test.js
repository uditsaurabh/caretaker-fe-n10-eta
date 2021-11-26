import React from "react";
import renderer from "react-test-renderer";
import OrangeButton from "./index";

it("ActiveMark renders correctly", () => {
  const tree = renderer.create(<OrangeButton>Button</OrangeButton>).toJSON();
  expect(tree).toMatchSnapshot();
});
