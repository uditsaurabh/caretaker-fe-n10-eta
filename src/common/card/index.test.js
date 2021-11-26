import React from "react";
import renderer from "react-test-renderer";
import CommonCard from "./index";

it("Card renders correctly", () => {
  const tree = renderer
    .create(
      <CommonCard>
        <div>Hi</div>
      </CommonCard>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
