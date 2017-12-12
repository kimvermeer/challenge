// @flow
import React from "react";
import type { Children } from 'react';

type Props = {
  value: string,
  name: string,
  onChange: () => void,
  children: Children,
};

type OptionProps = {
  value: string,
  hidden: bool,
};

const Select = ({ value, name, onChange, children }: Props) => (
  <select
    value={value}
    name={name}
    onChange={(val) => { onChange(val) }}
  >
    {children}
  </select>
);

export const Option = ({ value, hidden }: OptionProps) => (
  <option
      value={value}
      hidden={hidden}
  >
      {value}
  </option>
);

export default Select;
