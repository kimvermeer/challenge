import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Toggle from "../../src/components/Toggle";

const defaultProps = {
  value: "B1",
  onChange: jest.fn()
};

describe("Toggle", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Toggle {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("checks the input when clicking on the label", () => {
    const wrapper = mount(<Toggle {...defaultProps} />);

    expect(wrapper.state("isChecked")).toBeFalsy();
    wrapper.find("label").simulate("click");
    expect(wrapper.state("isChecked")).toBeTruthy();
  });
});
