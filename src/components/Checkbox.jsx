// @flow
import React from "react";

type Props = {
  id: string,
  value: string,
  checked: boolean,
  onChange: () => void
};

const Checkbox = ({ id, value, checked, onChange }: Props) => (
  <div>
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      {value}
    </label>
  </div>
);

export default Checkbox;
