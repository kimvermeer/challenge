// @flow
import React, { Component, KeyboardEvent } from "react";
import { connect } from "react-redux";
import { withValidation, Validator } from "@bynder/react-formulation";

import "./App.css";
import { checkIt, submitIt } from "./api";
import Checkbox from "./components/Checkbox";
import Toggle from "./components/Toggle";
import Select, { Option } from "./components/Select";
import { failSubmit, succeedSubmit } from "./actions/form";
import { getSubmitValidation } from "./reducers/formReducer";

export type FormModel = {
  a: Array<string>,
  b: string,
  text: string,
  c: string
};

type Props = {
  setInitialModel: FormModel => void,
  schema: {
    fields: Object
  },
  setTouched: () => void,
  setProperty: (property: string, value: any) => void,
  model: Object,
  submitValidation: ?string,
  failSubmit: (err: Error) => void,
  succeedSubmit: (data: FormModel) => void
};

export class _Form extends Component {
  static props: Props;

  state = {
    textError: null,
    inputText: "",
    isCheckButtonDisabled: true
  };

  componentWillMount() {
    this.props.setInitialModel({
      a: [],
      b: "",
      text: "",
      c: ""
    });
  }

  onCheckboxChange = (e: InputEvent) => {
    const { target: { value } } = e;
    const model = this.props.model.a.value;

    this.props.setTouched();

    if (!model.find(val => val === value)) {
      model.push(value);
      this.props.setProperty("a", model);
    } else {
      // Filter out existing value
      this.props.setProperty("a", model.filter(val => val !== value));
    }
  };

  onToggleChange = (value: string) => {
    this.props.setProperty("b", value);
  };

  onSelectChange = (e: Event) => {
    if (!e.target.value) {
      return;
    }
    this.props.setProperty("c", e.target.value);
  };

  onInputKeyDown = (e: KeyboardEvent) => {
    // Check if pressed key is 'Enter'
    if (e.keyCode === 13 && !this.state.isCheckButtonDisabled) {
      this.validateTextInput();
    }
  };

  onTextChange = (e: InputEvent) => {
    if (
      this.state.isCheckButtonDisabled &&
      this.textInput.value.trim().length
    ) {
      this.setState({ isCheckButtonDisabled: false });
    }

    this.setState({ inputText: e.target.value });
  };

  onSubmit = () => {
    const { model } = this.props;
    const submittableObject = {
      a: model.a.value,
      b: model.b.value,
      text: model.text.value,
      c: model.c.value
    };

    submitIt(submittableObject)
      .then(() => {
        this.props.succeedSubmit(submittableObject);
      })
      .catch((err: Error) => {
        this.props.failSubmit(err);
      });
  };

  validateTextInput = () => {
    const value = this.state.inputText;

    /**
     * Disable the 'check' button so that the check function doesn't run multiple times
     * And clear error messages
     */
    this.setState({
      isCheckButtonDisabled: true,
      textError: null
    });

    checkIt(value)
      .then(() => {
        this.props.setProperty("text", value);
      })
      .catch((err: Error) => {
        this.setState({
          textError: err.message
        });
      })
      .then(() => {
        this.setState({ isCheckButtonDisabled: false });
      });
  };

  render() {
    const { schema: { fields }, model } = this.props;
    return (
      <div className="Form">
        <Validator.Form onSubmit={this.onSubmit}>
          <div className="form-group">
            <Checkbox
              id="a1-checkbox"
              value="A1"
              onChange={this.onCheckboxChange}
            />
            <Checkbox
              id="a2-checkbox"
              value="A2"
              onChange={this.onCheckboxChange}
            />
          </div>
          <span>{fields.a.errors}</span>
          {fields.a.isValid && (
            <div className="form-group">
              <Toggle
                id="b1-toggle"
                value="B1"
                onChange={this.onToggleChange}
                isChecked={model.b.value === "B1"}
              />
              <Toggle
                id="b2-toggle"
                value="B2"
                onChange={this.onToggleChange}
                isChecked={model.b.value === "B2"}
              />
            </div>
          )}
          {fields.a.isValid &&
            fields.b.isValid && (
              <div className="form-group">
                <input
                  id="text-input"
                  ref={input => {
                    this.textInput = input;
                  }}
                  onKeyDown={this.onInputKeyDown}
                  onChange={this.onTextChange}
                  value={this.state.inputText}
                />
                <button
                  type="button"
                  onClick={this.validateTextInput}
                  disabled={this.state.isCheckButtonDisabled}
                >
                  Check
                </button>
                <p>{this.state.textError || ""}</p>
              </div>
            )}
          {fields.a.isValid &&
            fields.b.isValid &&
            fields.text.isValid && (
              <div className="form-group">
                <label htmlFor="c-select">C </label>
                <Select
                  name="c-select"
                  onChange={this.onSelectChange}
                  value={this.props.model.c.value}
                >
                  <Option value="" hidden />
                  <Option value="C1" />
                  <Option value="C2" />
                  <Option value="C3" />
                </Select>
              </div>
            )}
          {fields.a.isValid &&
            fields.b.isValid &&
            fields.text.isValid &&
            fields.c.isValid && (
              <div className="form-group">
                <button type="submit">Submit</button>
                <p>{this.props.submitValidation}</p>
              </div>
            )}
        </Validator.Form>
      </div>
    );
  }
}

const enhance = withValidation({
  validateOn: "change",
  schema: {
    a: {
      hasCheckboxValue: {
        test: val => val && val.length,
        message: "At least 1 value must be selected"
      }
    },
    b: {
      required: true
    },
    text: {
      required: true
    },
    c: {
      required: true
    }
  }
});

export default connect(
  store => ({
    submitValidation: getSubmitValidation(store)
  }),
  {
    failSubmit,
    succeedSubmit
  }
)(enhance(_Form));
