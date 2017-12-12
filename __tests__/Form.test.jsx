import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { _Form as Form } from "../src/Form";

const defaultProps = {
  setInitialModel: jest.fn(),
  schema: {
    fields: {
      a: {
        errors: null
      }
    }
  },
  setTouched: jest.fn(),
  setProperty: jest.fn(),
  model: {
    a: { value: [] },
    b: { value: "" },
    text: { value: "" },
    c: { value: "" }
  },
  failSubmit: jest.fn(),
  succeedSubmit: jest.fn()
};

describe("Form", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Form {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("validates the textinput", () => {
    const schema = {
      schema: {
        fields: {
          a: { isValid: true },
          b: { isValid: true },
          text: { isValid: false },
          c: { isValid: false },
        }
      }
    };
    const wrapper = mount(<Form {...defaultProps} {...schema} />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, "validateTextInput");

    wrapper.setState({ inputText: "@test", isCheckButtonDisabled: false });
    wrapper.find('#text-input').simulate('keydown', { keyCode: 13 });

    expect(spy).toBeCalled();
    expect(wrapper.state('textError')).toBe(null);
  });
});
