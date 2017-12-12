// @flow
import React from "react";

type Props = {
  isChecked: boolean,
  onChange: () => void,
  value: string
};

class Toggle extends React.Component {
  static props: Props;

  state = {
    isChecked: false
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.isChecked !== nextProps.isChecked) {
      this.setState({
        isChecked: nextProps.isChecked
      });
    }
  }

  onClick = () => {
    this.setState({ isChecked: !this.state.isChecked });
    this.props.onChange(this.props.value);
  };

  render() {
    return (
      <div className="toggle-wrapper">
        <input
          type="checkbox"
          className="toggle hidden"
          name={this.props.value}
          checked={this.state.isChecked}
          onChange={this.onClick}
          value={this.props.value}
        />
        <label htmlFor={this.props.value} onClick={this.onClick} />
        <span>{this.props.value}</span>
      </div>
    );
  }
}

export default Toggle;
